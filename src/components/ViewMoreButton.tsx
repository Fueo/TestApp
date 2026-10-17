import React from 'react';
import {
  Image,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { ASSETS } from '@/src/constants/assets';
import { COLORS, ICON_SIZE } from '@/src/constants/design';
import { scale } from '@/src/utils/scale';
import { AppText } from './AppText';
import { IconButton } from './IconButton';

export type ViewMoreColor = 'red' | 'blue' | 'white';

const COLOR_MAP: Record<ViewMoreColor, string> = {
  red: COLORS.badge.solidRed,
  blue: COLORS.text.brand,
  white: COLORS.text.white,
};

interface ViewMoreButtonProps {
  title?: string;
  color?: ViewMoreColor;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

export const ViewMoreButton: React.FC<ViewMoreButtonProps> = ({
  title = 'Xem tất cả',
  color = 'blue',
  onPress,
  style,
}) => {
  const activeColor = COLOR_MAP[color];

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      disabled={!onPress}
      style={[styles.container, style]}
    >
      <AppText
        variant="badge"
        color={activeColor}
      >
        {title}
      </AppText>
      <IconButton
        size="xs"
        backgroundColor="transparent"
        onPress={onPress}
        disabled={!onPress}
        icon={
          <Image
            source={ASSETS.icons.arrowDoubleRight}
            style={[styles.icon, { tintColor: activeColor }]}
            resizeMode="contain"
          />
        }
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(2),
  },
  icon: {
    width: ICON_SIZE.arrow,
    height: ICON_SIZE.arrow,
  },
});
