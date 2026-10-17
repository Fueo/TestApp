import React, { useState } from 'react';
import {
  Image,
  ImageSourcePropType,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { ASSETS } from '@/src/constants/assets';
import { COLORS, FONT_FAMILY, PADDING, RADIUS } from '@/src/constants/design';
import { scale } from '@/src/utils/scale';
import { AppFlatList } from './AppFlatList';
import { AppText } from './AppText';
import { SectionHeader } from './SectionHeader';

import { CategoryItemData } from '@/src/mocks';
import { useHomeData } from '@/src/store';
import { AppSkeleton } from './Skeletons';

export type { CategoryItemData };

interface CategoryItemProps {
  item: CategoryItemData;
  onPress?: (item: CategoryItemData) => void;
  style?: StyleProp<ViewStyle>;
}

export const CategoryItem: React.FC<CategoryItemProps> = ({
  item,
  onPress,
  style,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => onPress?.(item)}
      disabled={!onPress}
      style={[styles.card, style]}
    >
      <View style={styles.imageWrapper}>
        <Image
          source={item.image}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      <AppText
        variant="bodySmall"
        numberOfLines={2}
        style={styles.title}
      >
        {item.title}
      </AppText>
    </TouchableOpacity>
  );
};

interface CategorySectionProps {
  data?: CategoryItemData[];
  title?: string;
  loading?: boolean;
  onSelectCategory?: (item: CategoryItemData) => void;
  style?: StyleProp<ViewStyle>;
}

export const CategorySection: React.FC<CategorySectionProps> = ({
  data,
  title = 'Danh mục tiêu biểu',
  loading = false,
  onSelectCategory,
  style,
}) => {
  const store = useHomeData();
  const categoryList = (data && data.length > 0 ? data : store.categories) ?? [];
  const isLoading = loading || (store.isLoadingInitial && (!data || data.length === 0));

  const [scrollProgress, setScrollProgress] = useState(0);

  const trackWidth = scale(60);
  const thumbWidth = scale(24);
  const maxThumbTravel = trackWidth - thumbWidth - scale(2);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
    const maxScroll = contentSize.width - layoutMeasurement.width;
    if (maxScroll > 0) {
      const progress = Math.max(0, Math.min(1, contentOffset.x / maxScroll));
      setScrollProgress(progress);
    }
  };

  if (isLoading) {
    return (
      <View style={[styles.sectionContainer, style]}>
        {title ? (
          <SectionHeader
            title={title}
            titleColor={COLORS.text.categoryTitle}
            titleFont="medium"
          />
        ) : null}
        <AppSkeleton
          count={5}
          width={scale(79)}
          height={scale(98)}
          borderRadius={RADIUS.sm}
          gap={scale(4)}
        />
      </View>
    );
  }

  if (!categoryList || categoryList.length === 0) {
    return null;
  }

  return (
    <View style={[styles.sectionContainer, style]}>
      {title ? (
        <SectionHeader
          title={title}
          titleColor={COLORS.text.categoryTitle}
          titleFont="medium"
        />
      ) : null}

      <AppFlatList<CategoryItemData>
        data={categoryList}
        renderItem={({ item }) => (
          <CategoryItem item={item} onPress={onSelectCategory} />
        )}
        keyExtractor={(item) => String(item.id)}
        horizontal
        onScroll={handleScroll}
        scrollEventThrottle={16}
        ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
        contentContainerStyle={styles.listContent}
      />

      <View style={[styles.sliderTrack, { width: trackWidth }]}>
        <View
          style={[
            styles.sliderThumb,
            {
              width: thumbWidth,
              transform: [{ translateX: scrollProgress * maxThumbTravel }],
            },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    width: '100%',
    gap: scale(12),
  },
  listContent: {
    paddingVertical: scale(2),
  },
  itemSeparator: {
    width: scale(4),
  },
  card: {
    width: scale(79),
    height: scale(98),
    borderRadius: RADIUS.sm,
    backgroundColor: COLORS.background.card,
    padding: PADDING.xs,
    alignItems: 'center',
    gap: scale(8),
  },
  skeletonCard: {
    width: scale(79),
    height: scale(98),
    borderRadius: RADIUS.sm,
    backgroundColor: COLORS.border.divider,
  },
  imageWrapper: {
    width: scale(50),
    height: scale(50),
    borderRadius: RADIUS.sm,
    backgroundColor: COLORS.background.card,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  title: {
    width: scale(71),
    minHeight: scale(32),
    textAlign: 'center',
  },
  sliderTrack: {
    height: scale(8),
    borderRadius: RADIUS.xs,
    backgroundColor: COLORS.progressBar.track,
    alignSelf: 'center',
    justifyContent: 'center',
    paddingHorizontal: scale(1),
  },
  sliderThumb: {
    height: scale(6),
    borderRadius: RADIUS.xs,
    backgroundColor: COLORS.progressBar.sliderActive,
  },
});
