import {StyleSheet, Text, View} from 'react-native';
import React, {FC, useEffect, useRef, useState} from 'react';
import {DrawerActions} from '@react-navigation/native';
import {
  DrawerScreenProps,
  useDrawerProgress,
  useDrawerStatus,
} from '@react-navigation/drawer';
import {DrawerParamListBase} from '../../types/types';
import {COLORS, dummyData, icons, SIZES} from '../../constants';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import {Home, Search, CartTab, Favorite, Notification} from '../../screens';
import {useAppSelector} from '../../stores/hooks';
import {CustomHeader} from '../../components';
import {MainTabs} from './components';

interface IProps {}

const MainLayout: FC<
  DrawerScreenProps<DrawerParamListBase, 'MainLayout'> & IProps
> = props => {
  // const {navigation} = props;
  // const selectedTab = useAppSelector(root => root.tabs.selectedTab);

  //#region Animation on drawer open and close
  const status = useDrawerStatus();

  const progress = useRef<Animated.Value<number>>(
    new Animated.Value(0),
  ).current;

  useEffect(() => {
    progress.setValue(status === 'open' ? 1 : 0);
  }, [status]);

  // const drawerProgress = useDrawerProgress() as Animated.SharedValue<number>;
  // drawerProgress.value &&
  // prettier-ignore
  const scale = Animated.interpolateNode(status === 'open' ? 1 : 0, {
    inputRange: [0, 1],
    outputRange: [1, 0.8],
    extrapolate: Animated.Extrapolate.CLAMP,
  });
  // drawerProgress.value &&
  // prettier-ignore
  const borderRadius = Animated.interpolateNode(status === 'open' ? 1 : 0, {
    inputRange: [0, 1],
    outputRange: [1, 26],
    extrapolate: Animated.Extrapolate.CLAMP,
  });
  //#endregion

  return (
    <Animated.View
      style={{
        backgroundColor: COLORS.white,
        flex: 1,
        transform: [{scale}],
        borderRadius,
        overflow: 'hidden',
      }}>
      <MainTabs {...props} />
    </Animated.View>
  );
};

export default MainLayout;

const styles = StyleSheet.create({});

const MainContent = () => {
  return (
    <View style={{flex: 1, backgroundColor: 'pink'}}>
      <Text style={{color: COLORS.black}}>MainLayout</Text>
    </View>
  );
};
