import {
  StyleSheet,
  Text,
  TextStyle,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
import React, {FC} from 'react';
import {COLORS, FONTS} from '../constants';

interface IProps {
  label: string;
  labelStyle?: TextStyle;
  buttonContainerStyle: ViewStyle;
  onPress(): void;
}

const TextButton: FC<IProps> = ({
  label,
  labelStyle,
  buttonContainerStyle,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.primary,
        ...buttonContainerStyle,
      }}
      onPress={onPress}>
      <Text
        style={{
          color: COLORS.white,
          ...FONTS.h3,
          ...labelStyle,
        }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default TextButton;

const styles = StyleSheet.create({});
