import React from 'react';
import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';
import { COLORS, PADDING, RADIUS, TYPOGRAPHY } from '../constants/design';
import { scale } from '../utils/scale';

type ButtonVariant = 'primary' | 'secondary' | 'outline';

interface AppButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: ButtonVariant;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const AppButton: React.FC<AppButtonProps> = ({
  title,
  variant = 'primary',
  loading = false,
  style,
  textStyle,
  leftIcon,
  rightIcon,
  disabled,
  ...props
}) => {
  const isPrimary = variant === 'primary';
  const isSecondary = variant === 'secondary';
  const isOutline = variant === 'outline';

  const containerStyle: ViewStyle = {
    backgroundColor: isPrimary
      ? COLORS.background.headerBlue
      : isSecondary
      ? COLORS.background.cardSecondary
      : 'transparent',
    borderWidth: isOutline ? 1 : 0,
    borderColor: isOutline ? COLORS.border.light : undefined,
    opacity: disabled ? 0.6 : 1,
  };

  const labelColor = isPrimary
    ? COLORS.text.white
    : isSecondary
    ? COLORS.text.brand
    : COLORS.text.primary;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={disabled || loading}
      style={[styles.button, containerStyle, style]}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={labelColor} size="small" />
      ) : (
        <>
          {leftIcon}
          <Text style={[TYPOGRAPHY.titleSmall, { color: labelColor }, textStyle]}>
            {title}
          </Text>
          {rightIcon}
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: RADIUS.sm,
    paddingVertical: PADDING.sm,
    paddingHorizontal: PADDING.lg,
    minHeight: scale(40),
    gap: PADDING.xs,
  },
});
