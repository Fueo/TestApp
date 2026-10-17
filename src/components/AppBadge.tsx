import React from 'react';
import {
  Image,
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { COLORS, ICON_SIZE, RADIUS } from '../constants/design';
import { scale } from '../utils/scale';
import { AppGradient } from './AppGradient';
import { AppText } from './AppText';

export interface AppBadgeProps {
  label: string;
  icon?: ImageSourcePropType | React.ReactNode;
  colors?: readonly string[] | string;
  textColor?: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  iconStyle?: StyleProp<ImageStyle>;
}

export const AppBadge: React.FC<AppBadgeProps> = ({
  label,
  icon,
  colors = COLORS.badge.gradientGold,
  textColor = COLORS.text.alert,
  style,
  textStyle,
  iconStyle,
}) => {
  const isGradient = Array.isArray(colors);

  const renderContent = () => (
    <>
      {icon && (
        React.isValidElement(icon) ? (
          icon
        ) : (
          <Image
            source={icon as ImageSourcePropType}
            style={[styles.icon, iconStyle]}
            resizeMode="contain"
          />
        )
      )}
      <AppText variant="badge" color={textColor} style={textStyle}>
        {label}
      </AppText>
    </>
  );

  if (isGradient) {
    return (
      <AppGradient
        colors={colors as string[]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.container, style]}
      >
        {renderContent()}
      </AppGradient>
    );
  }

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors as string },
        style,
      ]}
    >
      {renderContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    height: scale(16),
    borderRadius: RADIUS.full,
    paddingHorizontal: scale(5),
    paddingVertical: scale(2),
    gap: scale(3),
  },
  icon: {
    width: ICON_SIZE.xxs,
    height: ICON_SIZE.xxs,
  },
});
