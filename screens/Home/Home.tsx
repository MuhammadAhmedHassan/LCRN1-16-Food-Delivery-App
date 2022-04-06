import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {COLORS, dummyData, FONTS, icons, SIZES} from '../../constants';
import {MenuListType} from '../../constants/dummy-data';
import { HorizontalFoodCard } from '../../components';

const Home = () => {
  const getSelectedMenu = (menuTypeId: number) => {
    // Find the menu based on the menu type id
    const selectedMenu = dummyData.menu.find(menu => menu.id === menuTypeId);
    return selectedMenu;
  };

  const [selectedCategoryId, setSelectedCategoryId] = useState(1);
  const [selectedMenuType, setSelectedMenuType] = useState(1);
  const [menuList, setMenuList] = useState(
    getSelectedMenu(selectedMenuType)?.list.filter(list =>
      list.categories.includes(selectedCategoryId),
    ),
  );

  const handleChangeCategory = (categoryId: number, menuTypeId: number) => {
    // Find the menu based on the menu type id
    const selectedMenu = getSelectedMenu(menuTypeId);

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
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
