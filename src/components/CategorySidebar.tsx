import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Image,
  ImageSourcePropType,
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import {
  COLORS,
  ICON_SIZE,
  PADDING,
  RADIUS,
  TYPOGRAPHY,
} from '@/src/constants/design';
import { scale } from '@/src/utils/scale';
import { AppFlatList } from './AppFlatList';

export interface CategorySidebarItem {
  id: string;
  name: string;
  icon: ImageSourcePropType;
}

interface CategoryNavItemProps {
  item: CategorySidebarItem;
  isActive: boolean;
  onPress: (item: CategorySidebarItem) => void;
}

const CategoryNavItem: React.FC<CategoryNavItemProps> = ({
  item,
  isActive,
  onPress,
}) => {
  const anim = useRef(new Animated.Value(isActive ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(anim, {
      toValue: isActive ? 1 : 0,
      duration: 250,
      useNativeDriver: false,
    }).start();
  }, [isActive, anim]);

  const animatedWidth = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, scale(90)],
  });

  const animatedTextColor = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [COLORS.text.date, COLORS.text.primary],
  });

  return (
    <Pressable
      style={styles.itemContainer}
      onPress={() => onPress(item)}
    >
      <Animated.View
        style={[
          styles.activeBackground,
          {
            width: animatedWidth,
          },
        ]}
      />

      <View style={styles.itemContent}>
        <View style={styles.iconContainer}>
          <Image
            source={item.icon}
            style={styles.icon}
            resizeMode="contain"
          />
        </View>
        <Animated.Text
          numberOfLines={2}
          style={[
            styles.label,
            {
              color: animatedTextColor,
            },
          ]}
        >
          {item.name}
        </Animated.Text>
      </View>
    </Pressable>
  );
};

interface CategorySidebarProps {
  data: CategorySidebarItem[];
  selectedId: string;
  onSelect: (item: CategorySidebarItem) => void;
  style?: StyleProp<ViewStyle>;
}

export const CategorySidebar: React.FC<CategorySidebarProps> = ({
  data,
  selectedId,
  onSelect,
  style,
}) => {
  const renderItem = ({ item }: { item: CategorySidebarItem }) => (
    <CategoryNavItem
      item={item}
      isActive={item.id === selectedId}
      onPress={onSelect}
    />
  );

  return (
    <View style={[styles.container, style]}>
      <AppFlatList<CategorySidebarItem>
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        style={styles.list}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: scale(90),
    backgroundColor: COLORS.background.cardSecondary,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingBottom: PADDING.xl,
  },
  itemContainer: {
    width: scale(90),
    height: scale(100),
    position: 'relative',
    overflow: 'hidden',
  },
  activeBackground: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.background.card,
    borderTopLeftRadius: RADIUS.lg,
    borderBottomLeftRadius: RADIUS.lg,
  },
  itemContent: {
    flex: 1,
    paddingTop: PADDING.md,
    paddingBottom: PADDING.md,
    paddingLeft: PADDING.md,
    paddingRight: PADDING.sm,
    alignItems: 'center',
    justifyContent: 'center',
    gap: scale(4),
  },
  iconContainer: {
    width: ICON_SIZE.lg,
    height: ICON_SIZE.lg,
    borderRadius: RADIUS.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: ICON_SIZE.sidebar,
    height: ICON_SIZE.sidebar,
  },
  label: {
    width: scale(60),
    textAlign: 'center',
    ...TYPOGRAPHY.labelSmall,
  },
});
