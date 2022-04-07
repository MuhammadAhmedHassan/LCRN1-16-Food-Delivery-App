import {
  FlatList,
  Image,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, {FC, PropsWithChildren, useState} from 'react';
import {COLORS, dummyData, FONTS, icons, SIZES} from '../../constants';
import {MenuListType} from '../../constants/dummy-data';
import {HorizontalFoodCard, VerticalFoodCard} from '../../components';

interface IProps {
  title: string;
  onPress(): void;
}

const Section: FC<PropsWithChildren<IProps>> = ({title, onPress, children}) => {
  return (
    <View>
      {/* Header */}
      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: SIZES.padding,
          marginTop: 30,
          marginBottom: 20,
        }}>
        <Text style={{flex: 1, ...FONTS.h3}}>{title}</Text>
        <TouchableOpacity onPress={onPress}>
          <Text style={{color: COLORS.primary, ...FONTS.body3}}>Show All</Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      {children}
    </View>
  );
};

const Home = () => {
  const getSelectedMenu = (menuTypeId: number) => {
    // Find the menu based on the menu type id
    const selectedMenu = dummyData.menu.find(menu => menu.id === menuTypeId);
    return selectedMenu;
  };
  const getRecommendedMenu = (categoryId: number) => {
    // Retrieve the recommended menu
    const selectedRecommend = dummyData.menu.find(
      menu => menu.name === 'Recommended',
    );

    return selectedRecommend?.list.filter(item =>
      item.categories.includes(categoryId),
    );
  };
  const getPopularMenu = (categoryId: number) => {
    const selectedPopular = dummyData.menu.find(
      item => item.name === 'Popular',
    );

    return selectedPopular?.list.filter(item =>
      item.categories.includes(categoryId),
    );
  };

  const [selectedCategoryId, setSelectedCategoryId] = useState(1);
  const [selectedMenuType, setSelectedMenuType] = useState(1);
  const [menuList, setMenuList] = useState(
    getSelectedMenu(selectedMenuType)?.list.filter(list =>
      list.categories.includes(selectedCategoryId),
    ),
  );
  const [recommends, setRecommends] = useState(
    getRecommendedMenu(selectedCategoryId),
  );
  const [popular, setPopular] = useState(getPopularMenu(selectedCategoryId));

  const handleChangeCategory = (categoryId: number, menuTypeId: number) => {
    // Find the menu based on the menu type id
    const selectedMenu = getSelectedMenu(menuTypeId);

    // Set the recommended menu based on the categoryId
    setRecommends(getRecommendedMenu(categoryId));

    // Set the popular based on the categoryId
    setPopular(getPopularMenu(categoryId));

    // Set the menu based on the category id
    const menuList = selectedMenu?.list.filter(list =>
      list.categories.includes(categoryId),
    );
    if (menuList) setMenuList(menuList);
  };

  const renderSearch = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          height: 40,
          alignItems: 'center',
          marginHorizontal: SIZES.padding,
          marginVertical: SIZES.base,
          paddingHorizontal: SIZES.radius,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.lightGray2,
        }}>
        {/* Icon */}
        <Image
          source={icons.search}
          style={{height: 20, width: 20, tintColor: COLORS.black}}
        />
        {/* TextInput */}
        <TextInput
          style={{
            flex: 1,
            marginLeft: SIZES.radius,
            ...FONTS.body3,
            color: COLORS.black,
          }}
          placeholder="Search food..."
        />

        {/* Filter Button */}
        <TouchableOpacity
        // onPress={}
        >
          <Image
            source={icons.filter}
            resizeMode="contain"
            style={{height: 20, width: 20, tintColor: COLORS.black}}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const renderMenuType = () => {
    return (
      <FlatList
        horizontal
        data={dummyData.menu}
        keyExtractor={item => `menu-type-${item.id}`}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{marginTop: 30, marginBottom: 20}}
        renderItem={({item, index}) => {
          const lastItem = index === dummyData.menu.length - 1;
          const selectedItem = selectedMenuType === item.id;
          return (
            <TouchableOpacity
              style={{
                marginLeft: SIZES.padding,
                marginRight: lastItem ? SIZES.padding : 0,
              }}
              onPress={() => {
                setSelectedMenuType(item.id);
                handleChangeCategory(selectedCategoryId, item.id);
              }}>
              <Text
                style={{
                  color: selectedItem ? COLORS.primary : COLORS.black,
                  ...FONTS.h3,
                }}>
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    );
  };

  const renderRecommendedSection = () => {
    return (
      <Section
        title="Recommended"
        onPress={() => console.log('Show all recommended')}>
        <FlatList
          data={recommends}
          keyExtractor={item => `recommended-${item.id}`}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => {
            const first = index === 0;
            const last = index === (recommends?.length || 0) - 1;
            return (
              <HorizontalFoodCard
                containerStyle={{
                  height: 180,
                  width: SIZES.width * 0.85,
                  marginLeft: first ? SIZES.padding : 18,
                  marginRight: last ? SIZES.padding : 0,
                  paddingRight: SIZES.radius,
                  alignItems: 'center',
                }}
                imageStyle={{
                  marginTop: 35,
                  height: 150,
                  width: 150,
                }}
                item={item}
                onPress={() => console.log('recommend')}
              />
            );
          }}
        />
      </Section>
    );
  };

  const renderPopularSection = () => {
    return (
      <Section
        title="Popular Near You"
        onPress={() => console.log('show all popular items')}>
        <FlatList
          data={popular}
          keyExtractor={item => `popular-${item.id}`}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => {
            const first = index === 0;
            const last = index === (popular?.length || 0) - 1;
            return (
              <VerticalFoodCard
                containerStyles={{
                  marginLeft: first ? SIZES.padding : 18,
                  marginRight: last ? SIZES.padding : 0,
                }}
                item={item}
                onPress={() => console.log('Vertical food card')}
              />
            );
          }}
        />
      </Section>
    );
  };

  const renderFoodCategories = () => {
    return (
      <FlatList
        data={dummyData.categories}
        keyExtractor={item => `food-categories-${item.id}`}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => {
          const first = index === 0;
          const last = index === dummyData.categories.length - 1;
          const isSelected = selectedCategoryId === item.id;
          return (
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                height: 55,
                marginTop: SIZES.padding,
                marginLeft: first ? SIZES.padding : SIZES.radius,
                marginRight: last ? SIZES.padding : 0,
                paddingHorizontal: 8,
                borderRadius: SIZES.radius,
                backgroundColor: isSelected
                  ? COLORS.primary
                  : COLORS.lightGray2,
              }}
              onPress={() => {
                setSelectedCategoryId(item.id);
                handleChangeCategory(item.id, selectedMenuType);
              }}>
              <Image
                source={item.icon}
                resizeMode="contain"
                style={{
                  marginTop: 5,
                  height: 50,
                  width: 50,
                }}
              />
              <Text
                style={{
                  alignSelf: 'center',
                  textAlign: 'center',
                  marginRight: SIZES.base,
                  color: isSelected ? COLORS.white : COLORS.darkGray,
                  ...FONTS.h3,
                }}>
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    );
  };

  const renderDeliveryTo = () => {
    return (
      <View
        style={{
          marginTop: SIZES.padding,
          marginHorizontal: SIZES.padding,
        }}>
        <Text
          style={{
            color: COLORS.primary,
            ...FONTS.body3,
          }}>
          DELIVERY TO
        </Text>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            marginTop: SIZES.base,
            alignItems: 'center',
          }}>
          <Text
            style={{
              ...FONTS.h3,
            }}>
            {dummyData.myProfile.address}
          </Text>
          <Image
            source={icons.down_arrow}
            resizeMode="contain"
            style={{
              marginLeft: SIZES.base,
              height: 20,
              width: 20,
            }}
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}>
      {/* Search */}
      {renderSearch()}

      {/* List */}
      <FlatList
        data={menuList}
        keyExtractor={items => `menu-list-${items.id}`}
        showsVerticalScrollIndicator={false}
        keyboardDismissMode="on-drag"
        ListHeaderComponent={
          <View>
            {/* Delivery To */}
            {renderDeliveryTo()}

            {/* Food Categories Section */}
            {renderFoodCategories()}

            {/* Popular */}
            {renderPopularSection()}

            {/* Recommended Section */}
            {renderRecommendedSection()}

            {/* Menu Type */}
            {renderMenuType()}
          </View>
        }
        renderItem={({item}) => {
          return (
            <HorizontalFoodCard
              containerStyle={{
                height: 130,
                alignItems: 'center',
                marginHorizontal: SIZES.padding,
                marginBottom: SIZES.radius,
              }}
              imageStyle={{marginTop: 20, height: 110, width: 110}}
              item={item}
              onPress={() => console.log('Horizontal food card')}
            />
          );
        }}
        ListFooterComponent={
          <View style={{height: Platform.OS === 'ios' ? 200 : 0}} />
        }
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
