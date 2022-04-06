import {
  Image,
  ImageStyle,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, {FC} from 'react';
import {MenuListType} from '../constants/dummy-data';
import {COLORS, FONTS, icons, SIZES} from '../constants';

interface IProps {
  containerStyle: ViewStyle;
  imageStyle: ImageStyle;
  onPress(): void;
  item: MenuListType;
}

const HorizontalFoodCard: FC<IProps> = ({
  containerStyle,
  imageStyle,
  onPress,
  item,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: 'row',
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.lightGray2,
        ...containerStyle,
      }}>
      {/* Image */}
      <Image source={item.image} style={imageStyle} resizeMode="contain" />

      {/* Info */}
      <View style={{flex: 1}}>
        {/* Name */}
        <Text style={{...FONTS.h3, fontSize: 17, color: COLORS.black}}>
          {item.name}
        </Text>
        {/* Description */}
        <Text style={{...FONTS.h4, color: COLORS.darkGray2}}>
          {item.description}
        </Text>
        {/* Price */}
        <Text style={{...FONTS.h2, marginTop: SIZES.base, color: COLORS.black}}>
          ${item.price}
        </Text>
      </View>

      {/* Calories */}
      <View
        style={{
          flexDirection: 'row',
          position: 'absolute',
          top: 5,
          right: SIZES.radius,
        }}>
        <Image
          source={icons.calories}
          resizeMode="contain"
          style={{width: 30, height: 30}}
        />
        <Text style={{color: COLORS.darkGray2, ...FONTS.body5}}>
          {item.calories} Calories
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default HorizontalFoodCard;

const styles = StyleSheet.create({});
