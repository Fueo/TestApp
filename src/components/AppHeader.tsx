import React, { useEffect, useState } from 'react';
import {
  Image,
  Platform,
  StatusBar,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ASSETS } from '@/src/constants/assets';
import { COLORS, ICON_SIZE, MARGIN, PADDING, RADIUS } from '@/src/constants/design';
import { scale } from '@/src/utils/scale';
import { AppInput } from './AppInput';
import { IconButton } from './IconButton';

const DEFAULT_SUGGESTIONS: string[] = [
  'Lọc gió động cơ ô tô',
  'Dầu nhớt tổng hợp cao cấp',
  'Má phanh gốm ceramic',
  'Ắc quy khô 12V 60Ah',
  'Lọc dầu nhiên liệu',
  'Nước làm mát động cơ',
];

interface AppHeaderProps {
  showBack?: boolean;
  showSearch?: boolean;
  showNotification?: boolean;
  hasNotification?: boolean;
  searchValue?: string;
  searchPlaceholder?: string;
  searchSuggestions?: string[];
  onSearchChangeText?: (text: string) => void;
  onPressBack?: () => void;
  onPressCamera?: () => void;
  onPressNotification?: () => void;
  style?: StyleProp<ViewStyle>;
  safeArea?: boolean;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  showBack = false,
  showSearch = true,
  showNotification = true,
  hasNotification = false,
  searchValue,
  searchPlaceholder = 'Tìm kiếm sản phẩm',
  searchSuggestions = DEFAULT_SUGGESTIONS,
  onSearchChangeText,
  onPressBack,
  onPressCamera,
  onPressNotification,
  style,
  safeArea = true,
}) => {
  const insets = useSafeAreaInsets();
  const [displayText, setDisplayText] = useState('');
  const [suggestionIndex, setSuggestionIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (searchSuggestions.length === 0) return;

    const currentWord =
      searchSuggestions[suggestionIndex % searchSuggestions.length];
    let timer: NodeJS.Timeout;

    if (!isDeleting) {
      if (displayText.length < currentWord.length) {
        timer = setTimeout(() => {
          setDisplayText(currentWord.slice(0, displayText.length + 1));
        }, 80);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 3000);
      }
    } else {
      if (displayText.length > 0) {
        timer = setTimeout(() => {
          setDisplayText(currentWord.slice(0, displayText.length - 1));
        }, 40);
      } else {
        setIsDeleting(false);
        setSuggestionIndex((prev) => (prev + 1) % searchSuggestions.length);
      }
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, suggestionIndex, searchSuggestions]);

  const activePlaceholder = displayText || searchPlaceholder;

  const topInset = safeArea
    ? insets.top > 0
      ? insets.top
      : Platform.OS === 'android'
      ? (StatusBar.currentHeight ?? 0)
      : 0
    : 0;

  return (
    <View style={[styles.container, { paddingTop: topInset }, style]}>
      <View style={styles.content}>
        {showBack && (
          <IconButton
            size="md"
            onPress={onPressBack}
            icon={<View style={styles.backChevron} />}
          />
        )}

        {showSearch && (
          <View style={styles.searchWrapper}>
            <AppInput
              value={searchValue}
              onChangeText={onSearchChangeText}
              placeholder={activePlaceholder}
              leftIcon={
                <Image
                  source={ASSETS.icons.searchMagnifier}
                  style={styles.searchIcon}
                  resizeMode="contain"
                />
              }
              rightIcon={
                <IconButton
                  size="xs"
                  onPress={onPressCamera}
                  icon={
                    <Image
                      source={ASSETS.icons.searchCamera}
                      style={styles.cameraIcon}
                      resizeMode="contain"
                    />
                  }
                />
              }
            />
          </View>
        )}

        {showNotification && (
          <View style={styles.notificationWrapper}>
            <IconButton
              size="lg"
              onPress={onPressNotification}
              borderRadius={RADIUS.md}
              icon={
                <Image
                  source={ASSETS.icons.headerBell}
                  style={styles.bellIcon}
                  resizeMode="contain"
                />
              }
            />
            {hasNotification && <View style={styles.redDot} />}
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background.headerBlue,
    paddingHorizontal: PADDING.md,
    paddingBottom: PADDING.md,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(12),
  },
  searchWrapper: {
    flex: 1,
  },
  searchIcon: {
    width: ICON_SIZE.input,
    height: ICON_SIZE.input,
  },
  cameraIcon: {
    width: ICON_SIZE.input,
    height: ICON_SIZE.input,
  },
  bellIcon: {
    width: ICON_SIZE.bell,
    height: ICON_SIZE.bell,
  },
  notificationWrapper: {
    position: 'relative',
  },
  redDot: {
    position: 'absolute',
    top: scale(6),
    right: scale(6),
    width: ICON_SIZE.xxs,
    height: ICON_SIZE.xxs,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.badge.solidRed,
    borderWidth: 1,
    borderColor: COLORS.background.headerBlue,
  },
  backChevron: {
    width: ICON_SIZE.arrow,
    height: ICON_SIZE.arrow,
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    borderColor: COLORS.text.white,
    transform: [{ rotate: '45deg' }],
    marginLeft: MARGIN.xs,
  },
});
