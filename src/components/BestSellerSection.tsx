import React from 'react';
import {
  Image,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { ASSETS } from '@/src/constants/assets';
import { ICON_SIZE, MARGIN, PADDING, RADIUS } from '@/src/constants/design';
import { ProductItemData } from '@/src/mocks';
import { useHomeData } from '@/src/store';
import { scale } from '@/src/utils/scale';
import { AppFlatList } from './AppFlatList';
import { ProductCard } from './ProductCard';
import { SectionHeader } from './SectionHeader';
import { AppSkeleton } from './Skeletons';

interface BestSellerSectionProps {
  data?: ProductItemData[];
  title?: string;
  onPressViewMore?: () => void;
  onPressProduct?: (item: ProductItemData) => void;
  onPressBuyProduct?: (item: ProductItemData) => void;
  style?: StyleProp<ViewStyle>;
}

export const BestSellerSection: React.FC<BestSellerSectionProps> = ({
  data,
  title = 'Sản phẩm bán chạy',
  onPressViewMore,
  onPressProduct,
  onPressBuyProduct,
  style,
}) => {
  const store = useHomeData();
  const productList = data ?? store.bestSeller?.items ?? [];
  const isLoading = store.isLoadingInitial && (!data || data.length === 0);

  if (!isLoading && (!productList || productList.length === 0)) {
    return null;
  }

  return (
    <View style={[styles.container, style]}>
      {title ? (
        <SectionHeader
          title={title}
          leftIcon={
            <Image
              source={ASSETS.icons.titleSanPhamBanChay}
              style={styles.headerIcon}
              resizeMode="contain"
            />
          }
          showViewMore={true}
          viewMoreColor="blue"
          onPressViewMore={onPressViewMore}
        />
      ) : null}

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
              showBadge={true}
              showProgressBar={false}
              onPress={onPressProduct}
              onPressBuy={onPressBuyProduct}
            />
          )}
          keyExtractor={(item) => String(item.id)}
          horizontal
          loadingMore={store.bestSeller.loadingMore}
          onLoadMore={store.loadMoreBestSeller}
          ItemSeparatorComponent={() => <View style={styles.cardSeparator} />}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    gap: MARGIN.md,
  },
  headerIcon: {
    width: ICON_SIZE.sm,
    height: ICON_SIZE.sm,
  },
  cardSeparator: {
    width: MARGIN.sm,
  },
  listContent: {
    paddingVertical: PADDING.xs,
  },
});
