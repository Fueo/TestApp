import React from 'react';
import {
  Image,
  ImageSourcePropType,
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import {
  COLORS,
  MARGIN,
  PADDING,
  RADIUS,
} from '@/src/constants/design';
import { scale } from '@/src/utils/scale';
import { AppFlatList } from './AppFlatList';
import { AppText } from './AppText';
import { SectionHeader } from './SectionHeader';

export interface SubCategoryItemData {
  id: string;
  name: string;
  image: ImageSourcePropType;
}

interface SubCategorySectionProps {
  title: string;
  items: SubCategoryItemData[];
  onPressViewAll?: () => void;
  onPressItem?: (item: SubCategoryItemData) => void;
  showViewAll?: boolean;
  style?: StyleProp<ViewStyle>;
}

export const SubCategorySection: React.FC<SubCategorySectionProps> = ({
  title,
  items,
  onPressViewAll,
  onPressItem,
  showViewAll = true,
  style,
}) => {
  const renderItem = ({ item }: { item: SubCategoryItemData }) => (
    <Pressable
      style={styles.itemContainer}
      onPress={() => onPressItem?.(item)}
    >
      <View style={styles.imageContainer}>
        <Image
          source={item.image}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <AppText
        variant="bodySmall"
        numberOfLines={2}
        style={styles.itemTitle}
      >
        {item.name}
      </AppText>
    </Pressable>
  );

  return (
    <View style={[styles.container, style]}>
      <SectionHeader
        title={title}
        showViewMore={showViewAll}
        viewMoreTitle="Xem tất cả"
        viewMoreColor="blue"
        onPressViewMore={onPressViewAll}
        style={styles.header}
      />
      <AppFlatList<SubCategoryItemData>
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={3}
        scrollEnabled={false}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  header: {
    marginBottom: MARGIN.sm,
  },
  listContent: {
    paddingTop: PADDING.xs,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: MARGIN.md,
  },
  itemContainer: {
    width: scale(70),
    alignItems: 'center',
  },
  imageContainer: {
    width: scale(70),
    height: scale(70),
    borderRadius: RADIUS.sm,
    backgroundColor: COLORS.background.main,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  itemTitle: {
    marginTop: MARGIN.sm,
    textAlign: 'center',
  },
});
