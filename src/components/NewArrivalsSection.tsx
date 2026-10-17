import React from 'react';
import {
  Image,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { ASSETS } from '@/src/constants/assets';
import {
  COLORS,
  ICON_SIZE,
  MARGIN,
  PADDING,
  RADIUS,
} from '@/src/constants/design';
import { scale } from '@/src/utils/scale';
import { ProductItemData } from '@/src/mocks';
import { useHomeData } from '@/src/store';
import { AppFlatList } from './AppFlatList';
import { ProductCard } from './ProductCard';
import { AppSection } from './SectionContainer';
import { SectionHeader } from './SectionHeader';
import { AppSkeleton } from './Skeletons';

interface NewArrivalsSectionProps {
  data?: ProductItemData[];
  title?: string;
  onPressViewMore?: () => void;
  onPressProduct?: (item: ProductItemData) => void;
  onPressBuyProduct?: (item: ProductItemData) => void;
  style?: StyleProp<ViewStyle>;
}

export const NewArrivalsSection: React.FC<NewArrivalsSectionProps> = ({
  data,
  title = 'Hàng mới về',
  onPressViewMore,
  onPressProduct,
  onPressBuyProduct,
  style,
}) => {
  const store = useHomeData();
  const productList = data ?? store.newArrivals?.items ?? [];
  const isLoading = store.isLoadingInitial && (!data || data.length === 0);

  if (!isLoading && (!productList || productList.length === 0)) {
    return null;
  }

  return (
    <AppSection fullWidth noPadding style={[styles.section, style]}>
      <View style={styles.container}>
        {title ? (
          <SectionHeader
            title={title}
            titleColor={COLORS.text.white}
            leftIcon={
              <Image
                source={ASSETS.icons.titleHangMoiVe}
                style={styles.headerIcon}
                resizeMode="contain"
              />
            }
            showViewMore={true}
            viewMoreColor="white"
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
                showBadge={false}
                showProgressBar={false}
                onPress={onPressProduct}
                onPressBuy={onPressBuyProduct}
              />
            )}
            keyExtractor={(item) => String(item.id)}
            horizontal
            showsHorizontalScrollIndicator={false}
            loadingMore={store.newArrivals.loadingMore}
            onLoadMore={store.loadMoreNewArrivals}
            ItemSeparatorComponent={() => <View style={styles.cardSeparator} />}
            contentContainerStyle={styles.listContent}
          />
        )}
      </View>
    </AppSection>
  );
};

const styles = StyleSheet.create({
  section: {
    backgroundColor: COLORS.background.headerBlue,
  },
  container: {
    paddingVertical: PADDING.lg,
    paddingHorizontal: PADDING.md,
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
