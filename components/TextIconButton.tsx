import {
  Image,
  ImageSourcePropType,
  ImageStyle,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {COLORS, FONTS} from '../constants';

interface IProps {
  containerStyle: ViewStyle;
  label: number;
  labelStyle: TextStyle;
  icon: ImageSourcePropType;
  iconStyle: ImageStyle;
  onPress(): void;
}

const TextIconButton = ({
  containerStyle,
  label,
  labelStyle,
  icon,
  iconStyle,
  onPress,
}: IProps) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        ...containerStyle,
      }}
      onPress={onPress}>
      <Text
        style={{
          ...FONTS.body3,
          ...labelStyle,
        }}>
        {label}
      </Text>
      <Image
        source={icon}
        resizeMode="contain"
        style={{
          marginLeft: 5,
          width: 20,
          height: 20,
          tintColor: COLORS.black,
          ...iconStyle,
        }}
      />
    </TouchableOpacity>
  );
};

export default TextIconButton;

const styles = StyleSheet.create({});
