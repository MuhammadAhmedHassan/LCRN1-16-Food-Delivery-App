import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {MenuListType} from '../constants/dummy-data';
import {COLORS, FONTS, icons, SIZES} from '../constants';

interface IVerticalFoodCard {
  containerStyles: ViewStyle;
  item: MenuListType;
  onPress(): void;
}

const VerticalFoodCard = ({
  containerStyles,
  item,
  onPress,
}: IVerticalFoodCard) => {
  return (
    <TouchableOpacity
      style={{
        width: 200,
        padding: SIZES.radius,
        alignItems: 'center',
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.lightGray2,
        ...containerStyles,
      }}>
      {/* Calories and Favorite */}
      <View style={{flexDirection: 'row'}}>
        {/* Calories */}
        <View style={{flex: 1, flexDirection: 'row'}}>
          <Image
            source={icons.calories}
            resizeMode="contain"
            style={{width: 30, height: 30}}
          />
          <Text style={{color: COLORS.darkGray2, ...FONTS.body5}}>
            {item.calories} Calories
          </Text>
        </View>

        {/* Favorite */}
        <Image
          source={icons.love}
          resizeMode="contain"
          style={{
            width: 20,
            height: 20,
            tintColor: item.isFavorite ? COLORS.primary : COLORS.gray,
          }}
        />
      </View>

      {/* Image */}
      <View
        style={{
          height: 150,
          width: 150,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          source={item.image}
          resizeMode="contain"
          style={{
            height: '100%',
            width: '100%',
          }}
        />
      </View>

      {/* Info */}
      <View style={{alignItems: 'center', marginTop: -20}}>
        <Text style={{...FONTS.h3}}>{item.name}</Text>
        <Text
          style={{
            color: COLORS.darkGray2,
            textAlign: 'center',
            ...FONTS.body5,
          }}>
          {item.description}
        </Text>
        <Text style={{marginTop: SIZES.radius, ...FONTS.h2}}>
          ${item.price}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default VerticalFoodCard;

const styles = StyleSheet.create({});
