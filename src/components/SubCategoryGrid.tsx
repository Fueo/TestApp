import React from 'react';
import {
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import { AppFlatList } from './AppFlatList';
import { AppText } from './AppText';
import { COLORS, MARGIN, PADDING, RADIUS, TYPOGRAPHY } from '@/src/constants/design';
import { scale } from '@/src/utils/scale';
import { truncateTitle } from '@/src/utils/text';

export interface SubCategoryItem {
  id: string;
  name: string;
  image: ImageSourcePropType;
}

export interface SubCategoryGroup {
  id: string;
  title?: string;
  items: SubCategoryItem[];
}

interface SubCategoryGridProps {
  bannerImage?: ImageSourcePropType;
  onPressBanner?: () => void;
  groups: SubCategoryGroup[];
  onSelectItem?: (item: SubCategoryItem) => void;
}

export const SubCategoryGrid: React.FC<SubCategoryGridProps> = ({
  bannerImage,
  onPressBanner,
  groups,
  onSelectItem,
}) => {
  const renderSubItem = (item: SubCategoryItem) => (
    <Pressable
      key={item.id}
      style={styles.subItemContainer}
      onPress={() => onSelectItem?.(item)}
    >
      <View style={styles.imageWrapper}>
        <Image
          source={item.image}
          style={styles.subItemImage}
          resizeMode="contain"
        />
      </View>
      <AppText
        variant="caption"
        color={COLORS.text.primary}
        style={styles.subItemLabel}
        numberOfLines={2}
      >
        {truncateTitle(item.name, 24)}
      </AppText>
    </Pressable>
  );

  const renderGroup = ({ item: group }: { item: SubCategoryGroup }) => (
    <View style={styles.groupContainer}>
      {group.title && (
        <View style={styles.groupHeader}>
          <AppText
            variant="labelSmall"
            color={COLORS.text.categoryTitle}
          >
            {group.title}
          </AppText>
        </View>
      )}
      <View style={styles.gridContainer}>
        {group.items.map(renderSubItem)}
      </View>
    </View>
  );

  const renderHeader = () => {
    if (!bannerImage) return null;
    return (
      <Pressable onPress={onPressBanner} style={styles.bannerContainer}>
        <Image
          source={bannerImage}
          style={styles.bannerImage}
          resizeMode="cover"
        />
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <AppFlatList<SubCategoryGroup>
        data={groups}
        renderItem={renderGroup}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.surface,
  },
  listContent: {
    paddingHorizontal: PADDING.md,
    paddingTop: PADDING.md,
    paddingBottom: PADDING.xl,
  },
  bannerContainer: {
    width: '100%',
    height: scale(100),
    borderRadius: RADIUS.md,
    overflow: 'hidden',
    marginBottom: MARGIN.md,
    backgroundColor: COLORS.background.cardSecondary,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  groupContainer: {
    marginBottom: MARGIN.lg,
  },
  groupHeader: {
    marginBottom: MARGIN.sm,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: scale(10),
  },
  subItemContainer: {
    width: scale(76),
    alignItems: 'center',
  },
  imageWrapper: {
    width: scale(72),
    height: scale(72),
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.background.main,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: MARGIN.xs,
    borderWidth: 1,
    borderColor: COLORS.border.light,
  },
  subItemImage: {
    width: scale(52),
    height: scale(52),
  },
  subItemLabel: {
    textAlign: 'center',
  },
});
