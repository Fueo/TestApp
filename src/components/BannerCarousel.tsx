import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  FlatList,
  Image,
  ImageSourcePropType,
  LayoutChangeEvent,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { ASSETS } from '@/src/constants/assets';
import { COLORS, MARGIN, RADIUS } from '@/src/constants/design';
import { BannerItemData } from '@/src/mocks';
import { useHomeData } from '@/src/store';
import { scale } from '@/src/utils/scale';
import { AppFlatList } from './AppFlatList';
import { AppSkeleton } from './Skeletons';

export type { BannerItemData };

interface BannerCarouselProps {
  data?: BannerItemData[];
  autoPlayInterval?: number;
  onPressBanner?: (item: BannerItemData, index: number) => void;
  style?: StyleProp<ViewStyle>;
}

export const BannerCarousel: React.FC<BannerCarouselProps> = ({
  data,
  autoPlayInterval = 3000,
  onPressBanner,
  style,
}) => {
  const store = useHomeData();
  const bannerList = (data && data.length > 0 ? data : store.banners) ?? [];
  const isLoading = store.isLoadingInitial && (!data || data.length === 0);

  const [containerWidth, setContainerWidth] = useState(scale(369));
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList<BannerItemData>>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startTimer = useCallback(() => {
    stopTimer();
    if (bannerList.length <= 1) return;
    timerRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % bannerList.length;
        flatListRef.current?.scrollToIndex({
          index: nextIndex,
          animated: true,
        });
        return nextIndex;
      });
    }, autoPlayInterval);
  }, [bannerList.length, autoPlayInterval, stopTimer]);

  useEffect(() => {
    startTimer();
    return () => stopTimer();
  }, [startTimer, stopTimer]);

  const handleLayout = (e: LayoutChangeEvent) => {
    const width = e.nativeEvent.layout.width;
    if (width > 0 && Math.abs(width - containerWidth) > 1) {
      setContainerWidth(width);
    }
  };

  const handleScrollBeginDrag = () => {
    stopTimer();
  };

  const handleMomentumScrollEnd = (
    e: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    const offsetX = e.nativeEvent.contentOffset.x;
    const newIndex = Math.round(offsetX / containerWidth);
    const clampedIndex = Math.max(0, Math.min(bannerList.length - 1, newIndex));
    setCurrentIndex(clampedIndex);
    startTimer();
  };

  const renderBannerItem = ({
    item,
    index,
  }: {
    item: BannerItemData;
    index: number;
  }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => onPressBanner?.(item, index)}
        disabled={!onPressBanner}
        style={[styles.bannerCard, { width: containerWidth }]}
      >
        <Image
          source={item.image}
          style={styles.bannerImage}
          resizeMode="cover"
        />
      </TouchableOpacity>
    );
  };

  if (isLoading) {
    return (
      <AppSkeleton
        width="100%"
        height={scale(170)}
        borderRadius={RADIUS.sm}
      />
    );
  }

  if (!bannerList || bannerList.length === 0) {
    return null;
  }

  return (
    <View style={[styles.container, style]} onLayout={handleLayout}>
      <AppFlatList<BannerItemData>
        ref={flatListRef}
        data={bannerList}
        renderItem={renderBannerItem}
        keyExtractor={(item) => String(item.id)}
        horizontal
        pagingEnabled
        snapToInterval={containerWidth}
        snapToAlignment="start"
        decelerationRate="fast"
        disableIntervalMomentum
        showsHorizontalScrollIndicator={false}
        onScrollBeginDrag={handleScrollBeginDrag}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        getItemLayout={(_, index) => ({
          length: containerWidth,
          offset: containerWidth * index,
          index,
        })}
      />

      <View style={styles.dotsContainer}>
        {bannerList.map((_, index) => {
          const isActive = index === currentIndex;
          return (
            <View
              key={index}
              style={[
                styles.dot,
                isActive ? styles.activeDot : styles.inactiveDot,
              ]}
            />
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  bannerCard: {
    height: scale(170),
    borderRadius: RADIUS.sm,
    overflow: 'hidden',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: scale(6),
    marginTop: MARGIN.sm,
  },
  dot: {
    height: scale(3),
    borderRadius: RADIUS.xs,
  },
  inactiveDot: {
    width: scale(10),
    backgroundColor: COLORS.border.divider,
  },
  activeDot: {
    width: scale(20),
    backgroundColor: COLORS.progressBar.sliderActive,
  },
});
