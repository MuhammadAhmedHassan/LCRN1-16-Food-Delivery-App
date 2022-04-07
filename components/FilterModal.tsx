import {
  Modal,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  Animated,
  Image,
  ImageSourcePropType,
  ViewStyle,
  ImageStyle,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {FC, PropsWithChildren, useEffect, useRef, useState} from 'react';
import {COLORS, FONTS, icons, SIZES} from '../constants';
import IconButton from './IconButton';
import TwoPointsSlider from './TwoPointsSlider';
// import Animated from 'react-native-reanimated';

interface IProps {
  isVisible: boolean;
  onClose(): void;
}

const FilterModal: FC<IProps> = ({isVisible, onClose}) => {
  if (!isVisible) return null;
  const modalAnimatedValue = useRef(new Animated.Value(0)).current;

  const [showFilterModal, setShowFilterModal] = useState<boolean>(isVisible);

  useEffect(() => {
    if (showFilterModal) {
      // Here I'm changing the value of modalAnimatedValue to 1 with a duration of 500
      Animated.timing(modalAnimatedValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }).start();
    } else {
      // Here I'm changing the value of modalAnimatedValue to 0 with a duration of 500
      Animated.timing(modalAnimatedValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start(onClose);
    }
  }, [showFilterModal]);

  // Here I'm interpolating the modal animated value
  const modalY = modalAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [SIZES.height, SIZES.height - 680],
    extrapolate: 'clamp',
  });

  return (
    <Modal animationType="fade" transparent visible={isVisible}>
      <View style={{flex: 1, backgroundColor: COLORS.transparentBlack7}}>
        {/* Transparent background - close modal on click */}
        <TouchableWithoutFeedback onPress={() => setShowFilterModal(false)}>
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}></View>
        </TouchableWithoutFeedback>

        <Animated.View
          style={{
            position: 'absolute',
            left: 0,
            top: modalY,
            width: '100%',
            height: '100%',
            padding: SIZES.padding,
            borderTopRightRadius: SIZES.padding,
            borderTopLeftRadius: SIZES.padding,
            backgroundColor: COLORS.white,
          }}>
          {/* Header */}
          <Header onPress={() => setShowFilterModal(false)} />

          {/* Content */}
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: 250,
            }}>
            {/* Distance section */}
            <DistanceSection />
          </ScrollView>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default FilterModal;

const styles = StyleSheet.create({});

type IDistanceSection = {}

const DistanceSection: FC<IDistanceSection> = () => {
  return (
    <Section title='Distance'>
      <View style={{
        alignItems: 'center'
      }}>
        <TwoPointsSlider 
          values={[3, 10]}
          min={1}
          max={20}
          postfix="km"
          onValueChange={console.log}
          prefix=""
        />
      </View>
    </Section>
  )
}

type ISection = {
  containerStyle?: ViewStyle;
  title: string;
};

const Section: FC<PropsWithChildren<ISection>> = ({
  containerStyle,
  title,
  children,
}) => {
  return (
    <View style={[{marginTop: SIZES.padding}, containerStyle]}>
      <Text style={FONTS.h3}>{title}</Text>
      {children}
    </View>
  );
};

interface IHeader {
  onPress(): void;
}
const Header = ({onPress}: IHeader) => {
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <Text style={{flex: 1, ...FONTS.h3, color: COLORS.black, fontSize: 18}}>
        Filter Your Search
      </Text>

      <IconButton
        containerStyles={{
          borderWidth: 2,
          borderRadius: 10,
          borderColor: COLORS.gray2,
        }}
        icon={icons.cross}
        iconStyle={{
          tintColor: COLORS.gray2,
        }}
        onPress={onPress}
      />
    </View>
  );
};
