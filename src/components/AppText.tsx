import React from 'react';
import { Text, TextProps, TextStyle } from 'react-native';
import { COLORS, TYPOGRAPHY } from '../constants/design';

type TypographyVariant = keyof typeof TYPOGRAPHY;

interface AppTextProps extends TextProps {
  variant?: TypographyVariant;
  color?: string;
  style?: TextStyle | TextStyle[];
}

export const AppText: React.FC<AppTextProps> = ({
  variant = 'body',
  color = COLORS.text.primary,
  style,
  children,
  ...props
}) => {
  return (
    <Text
      style={[
        TYPOGRAPHY[variant],
        { color },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};
