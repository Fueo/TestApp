import React from 'react';
import {
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { COLORS, FONT_FAMILY, MARGIN, TYPOGRAPHY } from '@/src/constants/design';
import { scale } from '@/src/utils/scale';
import { AppCountdown, CountdownValues } from './AppCountdown';
import { AppText } from './AppText';
import { IconButton } from './IconButton';
import { ViewMoreButton, ViewMoreColor } from './ViewMoreButton';

interface SectionHeaderProps {
  title: string;
  titleColor?: string;
  titleFont?: 'medium' | 'semiBold';
  leftIcon?: React.ReactNode;
  onPressLeftIcon?: () => void;
  countdown?: boolean | CountdownValues;
  showViewMore?: boolean;
  viewMoreTitle?: string;
  viewMoreColor?: ViewMoreColor;
  onPressViewMore?: () => void;
  rightComponent?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  titleColor = COLORS.text.primary,
  titleFont = 'semiBold',
  leftIcon,
  onPressLeftIcon,
  countdown,
  showViewMore = false,
  viewMoreTitle = 'Xem tất cả',
  viewMoreColor = 'blue',
  onPressViewMore,
  rightComponent,
  style,
}) => {
  const countdownValues: CountdownValues | undefined =
    typeof countdown === 'object' ? countdown : countdown ? {} : undefined;

  const textStyle =
    titleFont === 'medium'
      ? { ...TYPOGRAPHY.titleSmall, fontFamily: FONT_FAMILY.medium, color: titleColor }
      : { color: titleColor };

  return (
    <View style={[styles.container, style]}>
      <View style={styles.leftGroup}>
        {leftIcon && (
          <IconButton
            size="sm"
            backgroundColor="transparent"
            onPress={onPressLeftIcon}
            disabled={!onPressLeftIcon}
            icon={leftIcon}
          />
        )}
        <AppText
          variant={titleFont === 'medium' ? undefined : 'titleSmall'}
          style={textStyle}
        >
          {title}
        </AppText>
        {countdownValues && <AppCountdown values={countdownValues} />}
      </View>

      <View style={styles.rightGroup}>
        {rightComponent}
        {showViewMore && (
          <ViewMoreButton
            title={viewMoreTitle}
            color={viewMoreColor}
            onPress={onPressViewMore}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    minHeight: scale(26),
  },
  leftGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: MARGIN.sm,
  },
  rightGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
