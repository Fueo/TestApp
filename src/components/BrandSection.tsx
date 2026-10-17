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
import { COLORS, ICON_SIZE, MARGIN, PADDING, RADIUS } from '@/src/constants/design';
import { scale } from '@/src/utils/scale';
import { BrandItemData } from '@/src/mocks';
import { useHomeData } from '@/src/store';
import { AppFlatList } from './AppFlatList';
import { SectionHeader } from './SectionHeader';
import { AppSkeleton } from './Skeletons';

export type { BrandItemData };

interface BrandItemProps {
  item: BrandItemData;
  onPress?: (item: BrandItemData) => void;
  style?: StyleProp<ViewStyle>;
}

export const BrandItem: React.FC<BrandItemProps> = ({
  item,
  onPress,
  style,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => onPress?.(item)}
      disabled={!onPress}
      style={[styles.brandCard, style]}
    >
      <Image
        source={item.logo}
        style={styles.brandLogo}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

interface BrandSectionProps {
  data?: BrandItemData[];
  title?: string;
  horizontal?: boolean;
  onPressBrand?: (item: BrandItemData) => void;
  style?: StyleProp<ViewStyle>;
}

export const BrandSection: React.FC<BrandSectionProps> = ({
  data,
  title = 'Thương hiệu nổi bật',
  horizontal = false,
  onPressBrand,
  style,
}) => {
  const store = useHomeData();
  const brandList = (data && data.length > 0 ? data : store.brands) ?? [];
  const isLoading = store.isLoadingInitial && (!data || data.length === 0);

  if (isLoading) {
    return (
      <View style={[styles.container, style]}>
        {title ? (
          <SectionHeader
            title={title}
            leftIcon={
              <Image
                source={ASSETS.icons.titleThuongHieu}
                style={styles.headerIcon}
                resizeMode="contain"
              />
            }
          />
        ) : null}
        <AppSkeleton
          count={5}
          width={scale(68)}
          height={scale(54)}
          borderRadius={RADIUS.xs}
          gap={MARGIN.sm}
        />
      </View>
    );
  }

  if (!brandList || brandList.length === 0) {
    return null;
  }

  return (
    <View style={[styles.container, style]}>
      {title ? (
        <SectionHeader
          title={title}
          leftIcon={
            <Image
              source={ASSETS.icons.titleThuongHieu}
              style={styles.headerIcon}
              resizeMode="contain"
            />
          }
        />
      ) : null}

      <AppFlatList<BrandItemData>
        data={brandList}
        renderItem={({ item }) => (
          <BrandItem item={item} onPress={onPressBrand} />
        )}
        keyExtractor={(item) => String(item.id)}
        horizontal={horizontal}
        numColumns={horizontal ? undefined : 5}
        columnWrapperStyle={horizontal ? undefined : styles.columnWrapper}
        ItemSeparatorComponent={
          horizontal ? () => <View style={styles.itemSeparator} /> : undefined
        }
        scrollEnabled={horizontal}
      />
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
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: MARGIN.sm,
  },
  itemSeparator: {
    width: MARGIN.sm,
  },
  brandCard: {
    width: scale(68),
    height: scale(54),
    borderRadius: RADIUS.xs,
    backgroundColor: COLORS.background.card,
    borderWidth: 0.5,
    borderColor: COLORS.border.light,
    justifyContent: 'center',
    alignItems: 'center',
    padding: PADDING.xs,
  },
  brandLogo: {
    width: '100%',
    height: '100%',
  },
});
