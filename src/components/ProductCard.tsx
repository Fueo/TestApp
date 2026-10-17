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
  COLORS,
  FONT_FAMILY,
  ICON_SIZE,
  PADDING,
  RADIUS,
} from '@/src/constants/design';
import { scale } from '@/src/utils/scale';
import { truncateTitle } from '@/src/utils/text';
import { ProductItemData } from '@/src/mocks';
import { AppBadge } from './AppBadge';
import { AppGradient } from './AppGradient';
import { AppText } from './AppText';

export type { ProductItemData };

interface ProductCardProps {
  item: ProductItemData;
  showBadge?: boolean;
  showProgressBar?: boolean;
  onPress?: (item: ProductItemData) => void;
  onPressBuy?: (item: ProductItemData) => void;
  style?: StyleProp<ViewStyle>;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  item,
  showBadge = true,
  showProgressBar = true,
  onPress,
  onPressBuy,
  style,
}) => {
  const formatPrice = (val: number | string | undefined) => {
    if (val === undefined) return '';
    if (typeof val === 'number') {
      return `${val.toLocaleString('vi-VN')} đ`;
    }
    return val.includes('đ') ? val : `${val} đ`;
  };

  const sold = item.soldCount ?? 88;
  const total = item.totalStock ?? 100;
  const progressRatio = Math.max(0.1, Math.min(1, sold / total));
  const progressPercent = Math.round(progressRatio * 100);

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => onPress?.(item)}
      disabled={!onPress}
      style={[styles.card, style]}
    >
      <View style={styles.imageContainer}>
        <Image
          source={item.image}
          style={styles.productImage}
          resizeMode="contain"
        />
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.detailsGroup}>
          {showBadge && (item.badgeText || item.isNew) ? (
            <AppBadge
              label={item.badgeText ?? 'Mới'}
              icon={item.isNew && !item.badgeText ? undefined : ASSETS.icons.hot}
              colors={
                item.isNew && !item.badgeText
                  ? COLORS.badge.solidNew
                  : COLORS.badge.gradientGold
              }
              textColor={
                item.isNew && !item.badgeText
                  ? COLORS.text.white
                  : COLORS.text.alert
              }
            />
          ) : showBadge ? (
            <View style={styles.badgeSpacer} />
          ) : null}

          <AppText
            variant="labelSmall"
            numberOfLines={2}
            ellipsizeMode="tail"
            color={COLORS.text.primary}
            style={styles.productTitle}
          >
            {truncateTitle(item.title)}
          </AppText>

          <View style={styles.priceContainer}>
            <AppText
              variant="bodyMedium"
              color={COLORS.text.price}
              style={styles.currentPrice}
            >
              {formatPrice(item.price)}
            </AppText>

            {(item.originalPrice || item.discountPercent) && (
              <View style={styles.originalPriceRow}>
                {item.originalPrice && (
                  <AppText
                    variant="caption"
                    color={COLORS.text.muted}
                    style={styles.originalPrice}
                  >
                    {formatPrice(item.originalPrice)}
                  </AppText>
                )}
                {item.discountPercent && (
                  <AppText
                    variant="caption"
                    color={COLORS.text.price}
                  >
                    {typeof item.discountPercent === 'number'
                      ? `-${item.discountPercent}%`
                      : item.discountPercent}
                  </AppText>
                )}
              </View>
            )}
          </View>

          {showProgressBar && (
            <View style={styles.progressSection}>
              <View style={styles.progressTrack}>
                <AppGradient
                  type="progress"
                  style={[styles.progressFill, { width: `${progressPercent}%` }]}
                />
                <Image
                  source={ASSETS.icons.hot}
                  style={[
                    styles.progressFlame,
                    { left: `${Math.min(94, progressPercent)}%` },
                  ]}
                  resizeMode="contain"
                />
              </View>
              <AppText variant="caption" color={COLORS.text.secondary}>
                {`Đã bán ${sold} sản phẩm`}
              </AppText>
            </View>
          )}
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => (onPressBuy ? onPressBuy(item) : onPress?.(item))}
          style={styles.buyButton}
        >
          <AppText
            variant="buttonSmall"
            color={COLORS.text.brand}
          >
            Mua ngay
          </AppText>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: scale(148),
    alignSelf: 'flex-start',
    borderRadius: RADIUS.sm,
    backgroundColor: COLORS.background.card,
    overflow: 'hidden',
    shadowColor: COLORS.text.muted,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 3,
  },
  imageContainer: {
    width: '100%',
    height: scale(132),
    padding: PADDING.xs,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background.card,
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  infoContainer: {
    padding: PADDING.sm,
    gap: scale(8),
  },
  detailsGroup: {
    gap: scale(4),
  },
  badgeSpacer: {
    height: scale(16),
  },
  productTitle: {
    minHeight: scale(34),
  },
  priceContainer: {
    gap: scale(2),
  },
  currentPrice: {
    fontFamily: FONT_FAMILY.bold,
  },
  originalPriceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(6),
  },
  originalPrice: {
    textDecorationLine: 'line-through',
  },
  progressSection: {
    gap: PADDING.xs,
    marginVertical: scale(2),
  },
  progressTrack: {
    width: '100%',
    height: scale(6),
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.progressBar.trackRed,
    justifyContent: 'center',
    position: 'relative',
  },
  progressFill: {
    height: scale(6),
    borderRadius: RADIUS.full,
  },
  progressFlame: {
    width: ICON_SIZE.flame,
    height: ICON_SIZE.flame,
    position: 'absolute',
    top: -scale(4),
    marginLeft: -scale(7),
  },
  buyButton: {
    width: '100%',
    height: scale(24),
    borderRadius: RADIUS.xs,
    backgroundColor: COLORS.background.cardSecondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
