import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC} from 'react';
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from '@react-navigation/drawer';

import {MainLayout} from '../screens';
import {COLORS, FONTS, SIZES, constants, icons, dummyData} from '../constants';
import {DrawerParamListBase} from '../types/types';
import {useAppDispatch, useAppSelector} from '../stores/hooks';
import {setSelectedTab} from '../stores/tabs/tabs.slice';
import {NavigationProp, useNavigation} from '@react-navigation/native';

const Drawer = createDrawerNavigator<DrawerParamListBase>();

type CustomDrawerItemType = {
  label: string;
  icon: ImageSourcePropType;
};
const CustomDrawerItem = ({label, icon}: CustomDrawerItemType) => {
  const dispatch = useAppDispatch();
  const selectedTab = useAppSelector(root => root.tabs.selectedTab);
  const navigation = useNavigation<NavigationProp<DrawerParamListBase>>();

  const handleSelectedTab = () => {
    dispatch(setSelectedTab(label));
  };
  const isSelected = selectedTab === label;
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        height: 40,
        marginBottom: SIZES.base,
        alignItems: 'center',
        paddingLeft: SIZES.radius,
        borderRadius: SIZES.base,
        backgroundColor: isSelected ? COLORS.transparentBlack1 : undefined,
      }}
      onPress={handleSelectedTab}>
      <Image
        source={icon}
        style={{width: 20, height: 20, tintColor: COLORS.white}}
      />
      <Text style={{marginLeft: 15, color: COLORS.white, ...FONTS.h3}}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const CustomDrawerContent: FC<DrawerContentComponentProps> = ({navigation}) => {
  return (
    <DrawerContentScrollView scrollEnabled contentContainerStyle={{flex: 1}}>
      <View style={{flex: 1, paddingHorizontal: SIZES.radius}}>
        {/* Close button */}
        <TouchableOpacity
          style={{justifyContent: 'center'}}
          onPress={() => navigation.closeDrawer()}>
          <Image
            source={icons.cross}
            resizeMode="contain"
            style={styles.closeIcon}
          />
        </TouchableOpacity>

        {/* Profile section */}
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            marginTop: SIZES.radius,
            alignItems: 'center',
          }}
          onPress={() => console.log('Profile')}>
          <Image
            source={dummyData.myProfile.profile_image}
            style={{height: 50, width: 50, borderRadius: SIZES.radius}}
          />
          <View style={{marginLeft: SIZES.radius}}>
            <Text
              style={{
                color: COLORS.white,
                ...FONTS.h3,
              }}>
              {dummyData.myProfile.name}
            </Text>
            <Text
              style={{
                color: COLORS.white,
                ...FONTS.body4,
              }}>
              {dummyData.myProfile.name}
            </Text>
          </View>
        </TouchableOpacity>

        {/* Drawer item */}
        <View style={{flex: 1, marginTop: SIZES.padding}}>
          <CustomDrawerItem label={constants.screens.home} icon={icons.home} />
          <CustomDrawerItem
            label={constants.screens.my_wallet}
            icon={icons.wallet}
          />
          <CustomDrawerItem
            label={constants.screens.notification}
            icon={icons.notification}
          />
          <CustomDrawerItem
            label={constants.screens.favorite}
            icon={icons.favorite}
          />

          {/* Line Divider */}
          <View
            style={{
              height: 1,
              marginVertical: SIZES.radius,
              marginHorizontal: SIZES.radius,
              backgroundColor: COLORS.lightGray1,
            }}
          />

          <CustomDrawerItem label="Track Your Order" icon={icons.location} />
          <CustomDrawerItem label="Coupons" icon={icons.coupon} />
          <CustomDrawerItem label="Settings" icon={icons.setting} />
          <CustomDrawerItem label="Invite a Friend" icon={icons.profile} />
          <CustomDrawerItem label="Help Center" icon={icons.help} />
        </View>

        <View style={{marginBottom: SIZES.padding}}>
          <CustomDrawerItem label="Logout" icon={icons.logout} />
        </View>
      </View>
    </DrawerContentScrollView>
  );
};

const CustomDrawer = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.primary,
      }}>
      <Drawer.Navigator
        screenOptions={{
          drawerType: 'slide',
          overlayColor: 'transparent',
          drawerStyle: {
            flex: 1,
            width: '65%',
            backgroundColor: 'transparent',
          },
          sceneContainerStyle: {
            backgroundColor: 'transparent',
          },
          headerShown: false,
          swipeEnabled: false,
        }}
        drawerContent={CustomDrawerContent}
        initialRouteName="MainLayout">
        <Drawer.Screen name="MainLayout">
          {props => <MainLayout {...props} />}
        </Drawer.Screen>
      </Drawer.Navigator>
    </View>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  center: {alignItems: 'center', justifyContent: 'center'},
  closeIcon: {height: 35, width: 35, tintColor: COLORS.white},
});
