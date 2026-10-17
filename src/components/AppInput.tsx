import React from 'react';
import {
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { COLORS, MARGIN, PADDING, RADIUS, TYPOGRAPHY } from '@/src/constants/design';
import { scale } from '@/src/utils/scale';

interface AppInputProps extends TextInputProps {
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const AppInput: React.FC<AppInputProps> = ({
  containerStyle,
  inputStyle,
  leftIcon,
  rightIcon,
  placeholderTextColor = COLORS.input.placeholder,
  ...props
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {leftIcon && <View style={styles.iconContainer}>{leftIcon}</View>}
      <TextInput
        style={[styles.input, inputStyle]}
        placeholderTextColor={placeholderTextColor}
        {...props}
      />
      {rightIcon && <View style={styles.iconContainer}>{rightIcon}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.input.background,
    borderRadius: RADIUS.full,
    paddingHorizontal: PADDING.md,
    height: scale(36),
    gap: MARGIN.sm,
  },
  input: {
    flex: 1,
    ...TYPOGRAPHY.body,
    color: COLORS.input.text,
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
