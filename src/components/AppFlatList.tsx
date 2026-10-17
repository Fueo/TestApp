import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  FlatList,
  FlatListProps,
  LayoutChangeEvent,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native';
import { COLORS, MARGIN, PADDING, RADIUS } from '@/src/constants/design';
import { scale } from '@/src/utils/scale';
import { AppSkeleton } from './Skeletons';

const DefaultSkeleton: React.FC = () => {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.7,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 700,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, [opacity]);

  return <Animated.View style={[styles.defaultSkeleton, { opacity }]} />;
};

export interface AppFlatListProps<T>
  extends Omit<FlatListProps<T>, 'data' | 'renderItem'> {
  data?: readonly T[] | null;
  renderItem: FlatListProps<T>['renderItem'];
  loading?: boolean;
  loadingMore?: boolean;
  onLoadMore?: () => void;
  onRefresh?: () => void;
  refreshing?: boolean;
  SkeletonComponent?: React.ComponentType<any>;
  skeletonCount?: number;
  skeletonWidth?: number | string;
  skeletonHeight?: number | string;
  skeletonBorderRadius?: number;
  EmptyComponent?: React.ComponentType<any> | React.ReactElement;
}

const SKELETON_ITEM_KEY = '__APP_FLATLIST_SKELETON_ITEM__';

function AppFlatListInner<T>(
  {
    data,
    renderItem,
    loading = false,
    loadingMore = false,
    onLoadMore,
    onRefresh,
    refreshing = false,
    SkeletonComponent = DefaultSkeleton,
    skeletonCount = 4,
    skeletonWidth,
    skeletonHeight,
    skeletonBorderRadius,
    EmptyComponent,
    onEndReachedThreshold,
    contentContainerStyle,
    horizontal = false,
    ListFooterComponent,
    keyExtractor,
    ...restProps
  }: AppFlatListProps<T>,
  ref: React.ForwardedRef<FlatList<T>>
) {
  const onEndReachedCalled = useRef(false);
  const [measuredItemSize, setMeasuredItemSize] = useState<{
    width: number;
    height: number;
  } | null>(null);

  const handleItemLayout = (e: LayoutChangeEvent) => {
    if (measuredItemSize) return;
    const { width, height } = e.nativeEvent.layout;
    if (width > 0 && height > 0) {
      setMeasuredItemSize({ width, height });
    }
  };

  useEffect(() => {
    if (!loadingMore) {
      onEndReachedCalled.current = false;
    }
  }, [loadingMore]);

  const handleEndReached = () => {
    if (loading || loadingMore || onEndReachedCalled.current) {
      return;
    }
    onEndReachedCalled.current = true;
    onLoadMore?.();
  };

  const listData = useMemo(() => {
    if (horizontal && loadingMore && data && data.length > 0) {
      return [...data, { [SKELETON_ITEM_KEY]: true } as unknown as T];
    }
    return data ?? [];
  }, [data, loadingMore, horizontal]);

  const effectiveSkeletonWidth =
    skeletonWidth ?? measuredItemSize?.width ?? scale(148);
  const effectiveSkeletonHeight =
    skeletonHeight ?? measuredItemSize?.height ?? scale(230);

  const renderItemWrapper: FlatListProps<T>['renderItem'] = (info) => {
    if ((info.item as any)?.[SKELETON_ITEM_KEY]) {
      if (SkeletonComponent && SkeletonComponent !== DefaultSkeleton) {
        const SkeletonComp = SkeletonComponent;
        return <SkeletonComp />;
      }
      return (
        <AppSkeleton
          width={effectiveSkeletonWidth}
          height={effectiveSkeletonHeight}
          borderRadius={skeletonBorderRadius ?? RADIUS.sm}
        />
      );
    }

    if (!measuredItemSize && info.index === 0) {
      return (
        <View onLayout={handleItemLayout}>
          {renderItem(info)}
        </View>
      );
    }

    return renderItem(info);
  };

  const resolvedKeyExtractor = (item: T, index: number) => {
    if ((item as any)?.[SKELETON_ITEM_KEY]) {
      return `${SKELETON_ITEM_KEY}_${index}`;
    }
    if (keyExtractor) {
      return keyExtractor(item, index);
    }
    return String(index);
  };

  if (loading && (!data || data.length === 0)) {
    const dummySkeletons = Array.from({ length: skeletonCount }, (_, i) => i);
    return (
      <View
        style={[
          horizontal ? styles.skeletonHorizontal : styles.skeletonVertical,
          contentContainerStyle,
        ]}
      >
        {dummySkeletons.map((index) => (
          <SkeletonComponent key={index} />
        ))}
      </View>
    );
  }

  const renderFooter = () => {
    if (loadingMore) {
      if (horizontal) {
        return null;
      }
      return (
        <View style={styles.footerLoader}>
          <ActivityIndicator size="small" color={COLORS.background.headerBlue} />
        </View>
      );
    }
    if (typeof ListFooterComponent === 'function') {
      const Component = ListFooterComponent;
      return <Component />;
    }
    return ListFooterComponent ?? null;
  };

  const refreshControl = onRefresh ? (
    <RefreshControl
      refreshing={refreshing}
      onRefresh={onRefresh}
      tintColor={COLORS.background.headerBlue}
      colors={[COLORS.background.headerBlue]}
    />
  ) : undefined;

  const resolvedThreshold =
    onEndReachedThreshold !== undefined
      ? onEndReachedThreshold
      : horizontal
      ? 0.6
      : 0.2;

  return (
    <FlatList<T>
      ref={ref}
      data={listData}
      renderItem={renderItemWrapper}
      keyExtractor={resolvedKeyExtractor}
      horizontal={horizontal}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      onEndReached={handleEndReached}
      onEndReachedThreshold={resolvedThreshold}
      refreshControl={refreshControl}
      ListFooterComponent={renderFooter()}
      ListEmptyComponent={EmptyComponent}
      windowSize={horizontal ? 7 : 11}
      maxToRenderPerBatch={horizontal ? 5 : 10}
      contentContainerStyle={[
        horizontal && styles.horizontalContent,
        contentContainerStyle,
      ]}
      {...restProps}
    />
  );
}

export const AppFlatList = React.forwardRef(AppFlatListInner) as <T>(
  props: AppFlatListProps<T> & { ref?: React.ForwardedRef<FlatList<T>> }
) => React.ReactElement;

const styles = StyleSheet.create({
  skeletonHorizontal: {
    flexDirection: 'row',
    gap: MARGIN.sm,
  },
  skeletonVertical: {
    gap: MARGIN.sm,
  },
  defaultSkeleton: {
    width: scale(79),
    height: scale(98),
    borderRadius: RADIUS.sm,
    backgroundColor: COLORS.border.divider,
  },
  footerLoader: {
    paddingVertical: PADDING.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  horizontalContent: {
    alignItems: 'flex-start',
  },
});
