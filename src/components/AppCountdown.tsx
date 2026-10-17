import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  ImageBackground,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { ASSETS } from '@/src/constants/assets';
import { COLORS, TYPOGRAPHY } from '@/src/constants/design';
import { scale } from '@/src/utils/scale';
import { AppText } from './AppText';

export interface CountdownValues {
  hours?: string | number;
  minutes?: string | number;
  seconds?: string | number;
}

interface AppCountdownProps {
  values?: CountdownValues;
  style?: ViewStyle;
}

interface FlipCardBoxProps {
  value: string;
}

const FlipCardBox: React.FC<FlipCardBoxProps> = ({ value }) => {
  const flipAnim = useRef(new Animated.Value(0)).current;
  const [displayedValue, setDisplayedValue] = useState(value);
  const [incomingValue, setIncomingValue] = useState(value);
  const [isFlipping, setIsFlipping] = useState(false);

  useEffect(() => {
    if (value !== displayedValue && !isFlipping) {
      setIncomingValue(value);
      setIsFlipping(true);
      flipAnim.setValue(0);
      Animated.timing(flipAnim, {
        toValue: 1,
        duration: 320,
        useNativeDriver: true,
      }).start(() => {
        setDisplayedValue(value);
        setIsFlipping(false);
        flipAnim.setValue(0);
      });
    }
  }, [value, displayedValue, isFlipping, flipAnim]);

  const frontRotateX = flipAnim.interpolate({
    inputRange: [0, 0.5],
    outputRange: ['0deg', '-90deg'],
    extrapolate: 'clamp',
  });

  const frontOpacity = flipAnim.interpolate({
    inputRange: [0, 0.499, 0.5, 1],
    outputRange: [1, 1, 0, 0],
  });

  const backRotateX = flipAnim.interpolate({
    inputRange: [0.5, 1],
    outputRange: ['90deg', '0deg'],
    extrapolate: 'clamp',
  });

  const backOpacity = flipAnim.interpolate({
    inputRange: [0, 0.5, 0.501, 1],
    outputRange: [0, 0, 1, 1],
  });

  if (!isFlipping) {
    return (
      <View style={styles.numberBox}>
        <ImageBackground
          source={ASSETS.backgrounds.number}
          style={styles.numberBg}
          resizeMode="contain"
        >
          <AppText style={styles.numberText}>{displayedValue}</AppText>
        </ImageBackground>
      </View>
    );
  }

  return (
    <View style={styles.numberBox}>
      <Animated.View
        style={[
          styles.faceContainer,
          {
            opacity: frontOpacity,
            transform: [{ perspective: 300 }, { rotateX: frontRotateX }],
          },
        ]}
      >
        <ImageBackground
          source={ASSETS.backgrounds.number}
          style={styles.numberBg}
          resizeMode="contain"
        >
          <AppText style={styles.numberText}>{displayedValue}</AppText>
        </ImageBackground>
      </Animated.View>

      <Animated.View
        style={[
          styles.faceContainer,
          {
            opacity: backOpacity,
            transform: [{ perspective: 300 }, { rotateX: backRotateX }],
          },
        ]}
      >
        <ImageBackground
          source={ASSETS.backgrounds.number}
          style={styles.numberBg}
          resizeMode="contain"
        >
          <AppText style={styles.numberText}>{incomingValue}</AppText>
        </ImageBackground>
      </Animated.View>
    </View>
  );
};

export const AppCountdown: React.FC<AppCountdownProps> = ({
  values = { hours: '02', minutes: '25', seconds: '00' },
  style,
}) => {
  const pad = (val: string | number | undefined, defaultVal: string) => {
    if (val === undefined) return defaultVal;
    const str = String(val);
    return str.length === 1 ? `0${str}` : str;
  };

  const h = pad(values.hours, '00');
  const m = pad(values.minutes, '00');
  const s = pad(values.seconds, '00');

  return (
    <View style={[styles.container, style]}>
      <FlipCardBox value={h} />
      <AppText style={styles.colon}>:</AppText>
      <FlipCardBox value={m} />
      <AppText style={styles.colon}>:</AppText>
      <FlipCardBox value={s} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(6),
  },
  numberBox: {
    width: scale(26),
    height: scale(26),
    position: 'relative',
  },
  faceContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  numberBg: {
    width: '100%',
    height: '100%',
    borderRadius: scale(2),
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  numberText: {
    ...TYPOGRAPHY.bodyMedium,
    color: COLORS.text.white,
  },
  colon: {
    ...TYPOGRAPHY.bodyMedium,
    color: COLORS.text.countdown,
  },
});
