import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import LinearGradient, {
  LinearGradientProps,
} from 'react-native-linear-gradient';
import { COLORS } from '../constants/design';

export type GradientType =
  | 'badge'
  | 'badgeGoldLight'
  | 'badgeOrange'
  | 'progress';

const GRADIENT_MAP: Record<GradientType, readonly string[]> = {
  badge: COLORS.badge.gradientGold,
  badgeGoldLight: COLORS.badge.gradientGoldLight,
  badgeOrange: COLORS.badge.gradientOrange,
  progress: COLORS.progressBar.gradientFill,
};

interface AppGradientProps extends Omit<LinearGradientProps, 'colors'> {
  type?: GradientType;
  colors?: (string | number)[] | readonly string[];
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

export const AppGradient: React.FC<AppGradientProps> = ({
  type = 'badge',
  colors,
  style,
  children,
  start = { x: 0, y: 0 },
  end = { x: 1, y: 0 },
  ...props
}) => {
  const gradientColors = (colors ?? GRADIENT_MAP[type]) as unknown as string[];

  return (
    <LinearGradient
      colors={gradientColors}
      start={start}
      end={end}
      style={style}
      {...props}
    >
      {children}
    </LinearGradient>
  );
};

