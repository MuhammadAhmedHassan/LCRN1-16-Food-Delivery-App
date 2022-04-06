import {
  Image,
  ImageSourcePropType,
  ImageStyle,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, {FC} from 'react';
import {COLORS, FONTS, SIZES} from '../constants';
import {BottomTabHeaderProps} from '@react-navigation/bottom-tabs';

interface IProps {
  containerStyles: ViewStyle;
  // title: string;
  leftIcon: ImageSourcePropType;
  rightIcon: ImageSourcePropType;
  onLeftPress: () => void;
  rightIconStyles?: ImageStyle;
}

const CustomHeader: FC<BottomTabHeaderProps & IProps> = ({
  containerStyles,
  // title,
  leftIcon,
  rightIcon,
  onLeftPress,
  rightIconStyles,
  route,
}) => {
  const renderBtn = (
    icon: ImageSourcePropType,
    onPress?: () => void,
    imageStyles?: ImageStyle,
  ) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={{
          width: 40,
          height: 40,
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: 1,
          borderColor: COLORS.gray2,
          borderRadius: SIZES.radius,
        }}>
        <Image source={icon} resizeMode="contain" style={imageStyles} />
      </TouchableOpacity>
    );
  };
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: COLORS.white,
        ...containerStyles,
      }}>
      {renderBtn(leftIcon, onLeftPress)}
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{...FONTS.h3, color: COLORS.black}}>{route.name}</Text>
      </View>
      {renderBtn(rightIcon, undefined, rightIconStyles)}
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({});
