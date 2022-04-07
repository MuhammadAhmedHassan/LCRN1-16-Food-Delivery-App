import {
  Image,
  ImageSourcePropType,
  ImageStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {COLORS} from '../constants';

interface IIconButton {
  icon: ImageSourcePropType;
  containerStyles: ViewStyle;
  iconStyle: ImageStyle;
  onPress(): void;
}

const IconButton = ({
  icon,
  containerStyles,
  iconStyle,
  onPress,
}: IIconButton) => {
  return (
    <TouchableOpacity style={containerStyles} onPress={onPress}>
      <Image
        source={icon}
        resizeMode="contain"
        style={[
          {
            height: 30,
            width: 30,
            tintColor: COLORS.white,
          },
          iconStyle,
        ]}
      />
    </TouchableOpacity>
  );
};

export default IconButton;
