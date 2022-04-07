import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import {COLORS, FONTS, SIZES} from '../constants';

interface IProps {
  values: [number, number];
  min: number;
  max: number;
  postfix: string;
  onValueChange(values: number[]): void;
  prefix: string;
}

const TwoPointsSlider: FC<IProps> = ({
  values,
  min,
  max,
  postfix,
  onValueChange,
  prefix,
}) => {
  return (
    <MultiSlider
      values={values}
      sliderLength={SIZES.width - SIZES.padding * 2 - 20}
      min={min}
      max={max}
      step={1}
      markerOffsetY={20}
      selectedStyle={{borderRightColor: COLORS.primary}}
      trackStyle={{
        height: 10,
        borderRadius: 10,
        backgroundColor: COLORS.lightGray2,
      }}
      minMarkerOverlapDistance={50}
      customMarker={e => {
        return (
          <View
            style={{
              height: 60,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                height: 30,
                width: 30,
                borderRadius: 15,
                borderWidth: 4,
                borderColor: COLORS.white,
                backgroundColor: COLORS.primary,
                ...styles.shadow,
              }}></View>
            <Text
              style={{
                marginTop: 5,
                color: COLORS.darkGray,
                ...FONTS.body3,
              }}>
              {prefix}
              {e.currentValue}
              {postfix}
            </Text>
          </View>
        );
      }}
      onValuesChange={onValueChange}
    />
  );
};

export default TwoPointsSlider;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowRadius: 1,
    shadowOpacity: 0.1,
    elevation: 4,
  },
});
