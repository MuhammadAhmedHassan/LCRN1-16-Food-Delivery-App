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
import {COLORS, constants, FONTS, icons, SIZES} from '../constants';
import IconButton from './IconButton';
import TwoPointsSlider from './TwoPointsSlider';
import TextButton from './TextButton';
import TextIconButton from './TextIconButton';
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

            {/* Delivery Time Section */}
            <DeliveryTimeSection />

            {/* Price range section */}
            <PriceRangeSection />

            {/* Ratings */}
            <RatingsSection />
          </ScrollView>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default FilterModal;

const styles = StyleSheet.create({});

type IDeliveryTimeSection = {};

const DeliveryTimeSection: FC<IDeliveryTimeSection> = () => {
  const [deliveryTime, setDeliveryTime] = useState(-1);
  return (
    <Section title="Delivery Time" containerStyle={{marginTop: 40}}>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          marginTop: SIZES.radius,
        }}>
        {constants.delivery_time.map(item => {
          const isSelected = item.id === deliveryTime;
          return (
            <TextButton
              key={`delivery-time-${item.id}`}
              label={item.label}
              labelStyle={{
                color: isSelected ? COLORS.white : COLORS.gray,
                ...FONTS.body3,
              }}
              buttonContainerStyle={{
                width: '30%',
                height: 50,
                margin: 5,
                alignItems: 'center',
                borderRadius: SIZES.base,
                backgroundColor: isSelected
                  ? COLORS.primary
                  : COLORS.lightGray2,
              }}
              onPress={() => setDeliveryTime(item.id)}
            />
          );
        })}
      </View>
    </Section>
  );
};

type IDistanceSection = {};

const DistanceSection: FC<IDistanceSection> = () => {
  return (
    <Section title="Distance">
      <View
        style={{
          alignItems: 'center',
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
  );
};

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

interface IPriceRangeSection {}

const PriceRangeSection: FC<IPriceRangeSection> = () => {
  return (
    <Section title="Pricing Range">
      <View style={{alignItems: 'center'}}>
        <TwoPointsSlider
          values={[10, 50]}
          min={1}
          max={100}
          prefix="$"
          postfix=""
          onValueChange={console.log}
        />
      </View>
    </Section>
  );
};

interface IRatingsSection {}

const RatingsSection = (props: IRatingsSection) => {
  const [ratings, setRatings] = useState(-1);
  return (
    <Section title="Ratings" containerStyle={{marginTop: 4}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        {constants.ratings.map(rating => {
          const isSelected = rating.id === ratings;
          return (
            <TextIconButton
              key={`rating-${rating.id}`}
              containerStyle={{
                flex: 1,
                height: 50,
                margin: 5,
                alignItems: 'center',
                borderRadius: SIZES.base,
                backgroundColor: isSelected
                  ? COLORS.primary
                  : COLORS.lightGray2,
              }}
              label={rating.label}
              labelStyle={{
                color: isSelected ? COLORS.white : COLORS.gray,
              }}
              icon={icons.star}
              iconStyle={{tintColor: isSelected ? COLORS.white : COLORS.gray}}
              onPress={() => setRatings(rating.id)}
            />
          );
        })}
      </View>
    </Section>
  );
};
