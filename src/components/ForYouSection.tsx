import React from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { ASSETS } from '@/src/constants/assets';
import {
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
import { SectionHeader } from './SectionHeader';
import { AppSkeleton } from './Skeletons';

interface ForYouSectionProps {
  data?: ProductItemData[];
  title?: string;
  bannerImage?: ImageSourcePropType;
  onPressBanner?: () => void;
  onPressViewMore?: () => void;
  onPressProduct?: (item: ProductItemData) => void;
  onPressBuyProduct?: (item: ProductItemData) => void;
  style?: StyleProp<ViewStyle>;
}

export const ForYouSection: React.FC<ForYouSectionProps> = ({
  data,
  title = 'Dành cho bạn',
  bannerImage = ASSETS.banners.danhChoBan,
  onPressBanner,
  onPressViewMore,
  onPressProduct,
  onPressBuyProduct,
  style,
}) => {
  const store = useHomeData();
  const productList = data ?? store.forYou?.items ?? [];
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
              source={ASSETS.icons.titleDanhChoBan}
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
          ListHeaderComponent={
            bannerImage ? (
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={onPressBanner}
                disabled={!onPressBanner}
                style={styles.bannerCard}
              >
                <Image
                  source={bannerImage}
                  style={styles.bannerImage}
                  resizeMode="cover"
                />
              </TouchableOpacity>
            ) : null
          }
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
          loadingMore={store.forYou.loadingMore}
          onLoadMore={store.loadMoreForYou}
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
  bannerCard: {
    width: scale(150),
    height: scale(270),
    borderRadius: RADIUS.sm,
    overflow: 'hidden',
    marginRight: MARGIN.sm,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  cardSeparator: {
    width: MARGIN.sm,
  },
  listContent: {
    paddingVertical: PADDING.xs,
  },
});
