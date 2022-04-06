import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {FC, useEffect} from 'react';
import {
  BottomTabBar,
  BottomTabBarButtonProps,
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import LinearGradient from 'react-native-linear-gradient';
import {
  COLORS,
  constants,
  dummyData,
  FONTS,
  icons,
  SIZES,
} from '../../../constants';
import Animated, {
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {Home, Search, CartTab, Favorite, Notification} from '../../';
import {CustomHeader} from '../../../components';
import {
  DrawerParamListBase,
  HomeBottomTabParamList,
} from '../../../types/types';
import {DrawerScreenProps} from '@react-navigation/drawer';

const Tab = createBottomTabNavigator<HomeBottomTabParamList>();

interface ITabIcon {
  focused: boolean;
  color: string;
  size: number;
  icon: ImageSourcePropType;
}

const TabIcon = ({focused, icon}: ITabIcon) => {
  return null;
  // return (
  //   <Image
  //     source={icon}
  //     resizeMode="contain"
  //     style={{
  //       width: 25,
  //       height: 25,
  //       // tintColor: focused ? COLORS.primary : COLORS.secondary,
  //     }}
  //   />
  // );
};

interface ITabBarButton {
  icon: ImageSourcePropType;
  label: string;
  outerContainerStyles: {[key: string]: any};
  innerContainerStyles: {[key: string]: any};
  tabFlex: SharedValue<number>;
  tabBackgroundColor: SharedValue<string>;
}

const TabBarButton = ({
  children,
  icon,
  accessibilityState,
  label,
  accessibilityLabel,
  onPress,
  outerContainerStyles,
  innerContainerStyles,
  tabFlex,
  tabBackgroundColor,
}: BottomTabBarButtonProps & ITabBarButton) => {
  const isSelected = !!accessibilityState?.selected;

  useEffect(() => {
    if (isSelected) {
      tabFlex.value = withTiming(4, {duration: 200});
      tabBackgroundColor.value = withTiming(COLORS.primary, {duration: 200});
    } else {
      tabFlex.value = withTiming(1, {duration: 200});
      tabBackgroundColor.value = withTiming(COLORS.white, {duration: 200});
    }
  }, [isSelected]);

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Animated.View
        style={[
          {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          },
          outerContainerStyles,
        ]}>
        <Animated.View
          style={[
            {
              flexDirection: 'row',
              width: '80%',
              height: 50,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 25,
            },
            innerContainerStyles,
          ]}>
          <Image
            source={icon}
            resizeMode="contain"
            style={{
              width: 20,
              height: 20,
              tintColor: isSelected ? COLORS.white : COLORS.gray,
            }}
          />
          {isSelected && (
            <Text
              numberOfLines={1}
              style={{
                marginLeft: SIZES.base,
                color: COLORS.white,
                ...FONTS.h3,
              }}>
              {label}
            </Text>
          )}
        </Animated.View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const CustomTabBar: FC<BottomTabBarProps> = props => {
  return (
    <View style={{height: 60}}>
      {/* Shadow */}
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 0, y: 4}}
        colors={[COLORS.transparent, COLORS.lightGray1]}
        // colors={['pink', COLORS.lightGray1]} // uncomment to see shadow
        style={{
          position: 'absolute',
          top: -20,
          left: 0,
          right: 0,
          height: 80,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
        }}
      />
      <View
        style={{
          flex: 1,
          paddingHorizontal: SIZES.radius,
          paddingBottom: 10,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          backgroundColor: COLORS.white,
          borderWidth: 0,
        }}>
        <BottomTabBar {...props} />
      </View>
    </View>
  );
};

const MainTabs: FC<DrawerScreenProps<DrawerParamListBase, 'MainLayout'>> = ({
  navigation,
}) => {
  //#region Animation for TabBar buttons
  // Home values
  const homeTabFlex = useSharedValue(1);
  const homeTabBackgroundColor = useSharedValue(COLORS.white);
  const homeFlexStyle = useAnimatedStyle(() => ({
    flex: homeTabFlex.value,
  }));
  const homeBackgroundColorStyle = useAnimatedStyle(() => ({
    backgroundColor: homeTabBackgroundColor.value,
  }));
  // Search values
  const searchTabFlex = useSharedValue(1);
  const searchTabBackgroundColor = useSharedValue(COLORS.white);
  const searchFlexStyle = useAnimatedStyle(() => ({
    flex: searchTabFlex.value,
  }));
  const searchBackgroundColorStyle = useAnimatedStyle(() => ({
    backgroundColor: searchTabBackgroundColor.value,
  }));
  // Cart values
  const cartTabFlex = useSharedValue(1);
  const cartTabBackgroundColor = useSharedValue(COLORS.white);
  const cartFlexStyle = useAnimatedStyle(() => ({
    flex: cartTabFlex.value,
  }));
  const cartBackgroundColorStyle = useAnimatedStyle(() => ({
    backgroundColor: cartTabBackgroundColor.value,
  }));
  // Favorite values
  const favoriteTabFlex = useSharedValue(1);
  const favoriteTabBackgroundColor = useSharedValue(COLORS.white);
  const favoriteFlexStyle = useAnimatedStyle(() => ({
    flex: favoriteTabFlex.value,
  }));
  const favoriteBackgroundColorStyle = useAnimatedStyle(() => ({
    backgroundColor: favoriteTabBackgroundColor.value,
  }));
  // Notification values
  const notificationTabFlex = useSharedValue(1);
  const notificationTabBackgroundColor = useSharedValue(COLORS.white);
  const notificationFlexStyle = useAnimatedStyle(() => ({
    flex: notificationTabFlex.value,
  }));
  const notificationBackgroundColorStyle = useAnimatedStyle(() => ({
    backgroundColor: notificationTabBackgroundColor.value,
  }));
  //#endregion

  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: COLORS.transparent,
          elevation: 0,
          shadowColor: undefined, // mark all other fields related to shadow undefined and see if it doesn't show any shadow on IOS
          borderWidth: 0,
          paddingVertical: SIZES.radius,
        },
        header: props => (
          <CustomHeader
            containerStyles={{
              paddingHorizontal: SIZES.padding,
              paddingTop: 20,
              alignItems: 'center',
            }}
            // title={'selectedTab.toUpperCase()'}
            leftIcon={icons.menu}
            rightIcon={dummyData.myProfile.profile_image}
            onLeftPress={navigation.openDrawer}
            rightIconStyles={{
              width: 40,
              height: 40,
              borderRadius: SIZES.radius,
            }}
            {...props}
          />
        ),
      }}
      tabBar={CustomTabBar}>
      <Tab.Screen
        name="HomeScreen"
        component={Home}
        options={{
          tabBarIcon: props => <TabIcon {...props} icon={icons.home} />,
          tabBarButton: props => (
            <TabBarButton
              {...props}
              icon={icons.home}
              label={constants.screens.home}
              outerContainerStyles={homeFlexStyle}
              innerContainerStyles={homeBackgroundColorStyle}
              tabFlex={homeTabFlex}
              tabBackgroundColor={homeTabBackgroundColor}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: props => <TabIcon {...props} icon={icons.search} />,
          tabBarButton: props => (
            <TabBarButton
              {...props}
              icon={icons.search}
              label={constants.screens.search}
              outerContainerStyles={searchFlexStyle}
              innerContainerStyles={searchBackgroundColorStyle}
              tabFlex={searchTabFlex}
              tabBackgroundColor={searchTabBackgroundColor}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartTab}
        options={{
          tabBarIcon: props => <TabIcon {...props} icon={icons.cart} />,
          tabBarButton: props => (
            <TabBarButton
              {...props}
              icon={icons.cart}
              label={constants.screens.cart}
              outerContainerStyles={cartFlexStyle}
              innerContainerStyles={cartBackgroundColorStyle}
              tabFlex={cartTabFlex}
              tabBackgroundColor={cartTabBackgroundColor}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Favorite"
        component={Favorite}
        options={{
          tabBarIcon: props => <TabIcon {...props} icon={icons.favorite} />,
          tabBarButton: props => (
            <TabBarButton
              {...props}
              icon={icons.favorite}
              label={constants.screens.favorite}
              outerContainerStyles={favoriteFlexStyle}
              innerContainerStyles={favoriteBackgroundColorStyle}
              tabFlex={favoriteTabFlex}
              tabBackgroundColor={favoriteTabBackgroundColor}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Notification"
        component={Notification}
        options={{
          tabBarIcon: props => <TabIcon {...props} icon={icons.notification} />,
          tabBarButton: props => (
            <TabBarButton
              {...props}
              icon={icons.notification}
              label={constants.screens.notification}
              outerContainerStyles={notificationFlexStyle}
              innerContainerStyles={notificationBackgroundColorStyle}
              tabFlex={notificationTabFlex}
              tabBackgroundColor={notificationTabBackgroundColor}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabs;

const styles = StyleSheet.create({});

function HomeScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.white,
      }}>
      <Text style={{color: COLORS.black}}>Home!</Text>
    </View>
  );
}
