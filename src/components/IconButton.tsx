import React from 'react';
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';
import { ICON_SIZE, RADIUS } from '../constants/design';

export const ICON_BUTTON_SIZES = {
  xxs: ICON_SIZE.xxs,
  xs: ICON_SIZE.xs,
  sm: ICON_SIZE.sm,
  md: ICON_SIZE.md,
  lg: ICON_SIZE.lg,
} as const;

export type IconButtonSize = keyof typeof ICON_BUTTON_SIZES;

interface IconButtonProps extends Omit<TouchableOpacityProps, 'style'> {
  icon: React.ReactNode;
  size?: IconButtonSize;
  backgroundColor?: string;
  borderRadius?: number;
  style?: StyleProp<ViewStyle>;
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  size = 'lg',
  backgroundColor = 'transparent',
  borderRadius,
  style,
  ...props
}) => {
  const buttonDimension = ICON_BUTTON_SIZES[size];
  const defaultRadius =
    size === 'xxs' || size === 'xs'
      ? RADIUS.full
      : size === 'sm'
      ? RADIUS.xs
      : size === 'md'
      ? RADIUS.sm
      : RADIUS.md;

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[
        styles.button,
        {
          width: buttonDimension,
          height: buttonDimension,
          borderRadius: borderRadius ?? defaultRadius,
          backgroundColor,
        },
        style,
      ]}
      {...props}
    >
      {icon}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
