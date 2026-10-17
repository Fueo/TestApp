import React, { useEffect, useState } from 'react';
import {
  Image,
  ImageBackground,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { ASSETS } from '@/src/constants/assets';
import { COLORS, ICON_SIZE, MARGIN, PADDING, RADIUS } from '@/src/constants/design';
import { ProductItemData } from '@/src/mocks';
import { useHomeData } from '@/src/store';
import { getRemainingTime } from '@/src/utils/time';
import { AppFlatList } from './AppFlatList';
import { ProductCard } from './ProductCard';
import { AppSection } from './SectionContainer';
import { SectionHeader } from './SectionHeader';
import { AppSkeleton } from './Skeletons';
import { scale } from '../utils';

interface FlashSaleSectionProps {
  products?: ProductItemData[];
  endTime?: string | number | Date;
  initialSeconds?: number;
  onPressViewMore?: () => void;
  onPressProduct?: (item: ProductItemData) => void;
  onPressBuyProduct?: (item: ProductItemData) => void;
  style?: StyleProp<ViewStyle>;
}

export const FlashSaleSection: React.FC<FlashSaleSectionProps> = ({
  products,
  endTime,
  initialSeconds,
  onPressViewMore,
  onPressProduct,
  onPressBuyProduct,
  style,
}) => {
  const store = useHomeData();
  const productList = products ?? store.flashSale?.items ?? [];
  const isLoading = store.isLoadingInitial && (!products || products.length === 0);

  const effectiveEndTime =
    endTime ??
    store.flashSale?.endTime ??
    (initialSeconds ? new Date(Date.now() + initialSeconds * 1000).toISOString() : null);

  const [remainingTime, setRemainingTime] = useState(() =>
    getRemainingTime(effectiveEndTime)
  );

  useEffect(() => {
    setRemainingTime(getRemainingTime(effectiveEndTime));
    const timer = setInterval(() => {
      const next = getRemainingTime(effectiveEndTime);
      setRemainingTime(next);
      if (next.isExpired) {
        clearInterval(timer);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [effectiveEndTime]);

  if (!isLoading && (!productList || productList.length === 0)) {
    return null;
  }

  return (
    <AppSection fullWidth noPadding style={style}>
      <ImageBackground
        source={ASSETS.backgrounds.flashSale}
        style={styles.bgImage}
        resizeMode="cover"
      >
        <View style={styles.content}>
          <SectionHeader
            title="FLASH SALE"
            titleColor={COLORS.text.primary}
            leftIcon={
              <Image
                source={ASSETS.icons.titleFlashSale}
                style={styles.headerIcon}
                resizeMode="contain"
              />
            }
            countdown={{
              hours: remainingTime.hours,
              minutes: remainingTime.minutes,
              seconds: remainingTime.seconds,
            }}
            showViewMore={true}
            viewMoreColor="red"
            onPressViewMore={onPressViewMore}
          />

          {isLoading ? (
            <AppSkeleton
              count={4}
              width={scale(148)}
              height={scale(270)}
              borderRadius={RADIUS.sm}
              gap={scale(8)}
            />
          ) : (
            <AppFlatList<ProductItemData>
              data={productList}
              renderItem={({ item }) => (
                <ProductCard
                  item={item}
                  showBadge={false}
                  onPress={onPressProduct}
                  onPressBuy={onPressBuyProduct}
                />
              )}
              keyExtractor={(item) => String(item.id)}
              horizontal
              loadingMore={store.flashSale.loadingMore}
              onLoadMore={store.loadMoreFlashSale}
              ItemSeparatorComponent={() => <View style={styles.cardSeparator} />}
              contentContainerStyle={styles.listContent}
            />
          )}
        </View>
      </ImageBackground>
    </AppSection>
  );
};

const styles = StyleSheet.create({
  bgImage: {
    width: '100%',
  },
  content: {
    paddingHorizontal: PADDING.md,
    paddingVertical: PADDING.md,
    gap: MARGIN.md,
  },
  headerIcon: {
    width: ICON_SIZE.sm,
    height: ICON_SIZE.sm,
  },
  listContent: {
    paddingVertical: PADDING.xs,
  },
  cardSeparator: {
    width: MARGIN.sm,
  },
});
