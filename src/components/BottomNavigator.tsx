import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Image,
  ImageSourcePropType,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ASSETS } from '@/src/constants/assets';
import {
  COLORS,
  ICON_SIZE,
  PADDING,
  RADIUS,
} from '@/src/constants/design';
import { scale } from '@/src/utils/scale';
import { AppText } from './AppText';

export type BottomTabKey = 'home' | 'cart' | 'categories' | 'news' | 'profile';

export interface BottomNavItemData {
  key: BottomTabKey;
  label: string;
  icon: ImageSourcePropType;
  badgeCount?: number;
}

export const DEFAULT_BOTTOM_NAV_ITEMS: BottomNavItemData[] = [
  {
    key: 'home',
    label: 'Trang chủ',
    icon: ASSETS.icons.bottomNavHome,
  },
  {
    key: 'cart',
    label: 'Giỏ hàng',
    icon: ASSETS.icons.bottomNavCart,
    badgeCount: 12,
  },
  {
    key: 'categories',
    label: 'Danh mục',
    icon: ASSETS.icons.bottomNavWidget,
  },
  {
    key: 'news',
    label: 'Tin tức',
    icon: ASSETS.icons.bottomNavBill,
  },
  {
    key: 'profile',
    label: 'Tài khoản',
    icon: ASSETS.icons.bottomNavProfile,
  },
];

interface BottomNavItemProps {
  item: BottomNavItemData;
  isActive: boolean;
  onPress: (key: BottomTabKey) => void;
  style?: StyleProp<ViewStyle>;
}

export const BottomNavItem: React.FC<BottomNavItemProps> = ({
  item,
  isActive,
  onPress,
  style,
}) => {
  const iconColor = isActive ? COLORS.text.brandActive : COLORS.border.divider;
  const textColor = isActive ? COLORS.text.brandActive : COLORS.text.disabled;

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => onPress(item.key)}
      style={[styles.itemContainer, style]}
    >
      <View style={styles.iconWrapper}>
        <Image
          source={item.icon}
          style={[styles.icon, { tintColor: iconColor }]}
          resizeMode="contain"
        />
        {item.badgeCount !== undefined && item.badgeCount > 0 && (
          <View style={styles.badge}>
            <AppText variant="badge" color={COLORS.text.white}>
              {item.badgeCount > 99 ? '99+' : String(item.badgeCount)}
            </AppText>
          </View>
        )}
      </View>

      <AppText
        variant={isActive ? 'tabLabelActive' : 'tabLabel'}
        color={textColor}
        style={styles.label}
      >
        {item.label}
      </AppText>
    </TouchableOpacity>
  );
};

interface BottomNavigatorProps {
  items?: BottomNavItemData[];
  activeTab?: BottomTabKey;
  onTabPress?: (key: BottomTabKey) => void;
  style?: StyleProp<ViewStyle>;
}

export const BottomNavigator: React.FC<BottomNavigatorProps> = ({
  items = DEFAULT_BOTTOM_NAV_ITEMS,
  activeTab = 'home',
  onTabPress,
  style,
}) => {
  const insets = useSafeAreaInsets();
  const [rowWidth, setRowWidth] = useState<number>(0);
  const activeIndex = items.findIndex((item) => item.key === activeTab);
  const validIndex = activeIndex >= 0 ? activeIndex : 0;
  const translateX = useRef(new Animated.Value(0)).current;
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (rowWidth > 0) {
      const tabWidth = rowWidth / items.length;
      const targetX = tabWidth * validIndex + (tabWidth - scale(51)) / 2;
      if (isFirstRender.current) {
        translateX.setValue(targetX);
        isFirstRender.current = false;
      } else {
        Animated.spring(translateX, {
          toValue: targetX,
          damping: 20,
          stiffness: 180,
          mass: 0.8,
          useNativeDriver: true,
        }).start();
      }
    }
  }, [validIndex, rowWidth, items.length, translateX]);

  return (
    <View style={styles.wrapper}>
      <View
        style={[
          styles.container,
          { paddingBottom: Math.max(insets.bottom, PADDING.xs) },
          style,
        ]}
      >
        <View
          style={styles.itemsRow}
          onLayout={(e) => setRowWidth(e.nativeEvent.layout.width)}
        >
          {rowWidth > 0 && (
            <Animated.View
              style={[
                styles.activeIndicator,
                {
                  transform: [{ translateX }],
                },
              ]}
            />
          )}
          {items.map((item) => (
            <BottomNavItem
              key={item.key}
              item={item}
              isActive={activeTab === item.key}
              onPress={(key) => onTabPress?.(key)}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: COLORS.background.main,
  },
  container: {
    backgroundColor: COLORS.background.card,
    borderTopLeftRadius: RADIUS.lg,
    borderTopRightRadius: RADIUS.lg,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 10,
  },
  itemsRow: {
    flexDirection: 'row',
    height: scale(64),
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: PADDING.sm,
  },
  itemContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    position: 'relative',
    gap: scale(4),
  },
  activeIndicator: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: scale(51),
    height: scale(3.6),
    backgroundColor: COLORS.text.brand,
    borderBottomLeftRadius: scale(3.6),
    borderBottomRightRadius: scale(3.6),
    zIndex: 1,
  },
  iconWrapper: {
    position: 'relative',
    width: ICON_SIZE.sm,
    height: ICON_SIZE.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: ICON_SIZE.sm,
    height: ICON_SIZE.sm,
  },
  badge: {
    position: 'absolute',
    top: -scale(4),
    right: -scale(10),
    minWidth: scale(16),
    height: scale(16),
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.badge.solidCounter,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scale(3),
  },
  label: {
    textAlign: 'center',
  },
});
