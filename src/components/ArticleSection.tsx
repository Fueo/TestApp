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
  ICON_SIZE,
  MARGIN,
  PADDING,
  RADIUS,
} from '@/src/constants/design';
import { scale } from '@/src/utils/scale';
import { truncateTitle } from '@/src/utils/text';
import { AppFlatList } from './AppFlatList';
import { AppText } from './AppText';
import { SectionHeader } from './SectionHeader';

import { ArticleItemData } from '@/src/mocks';
import { useHomeData } from '@/src/store';
import { AppSkeleton } from './Skeletons';

export type { ArticleItemData };

interface ArticleCardProps {
  item: ArticleItemData;
  onPress?: (item: ArticleItemData) => void;
  style?: StyleProp<ViewStyle>;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  item,
  onPress,
  style,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => onPress?.(item)}
      disabled={!onPress}
      style={[styles.card, style]}
    >
      <Image
        source={item.image}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.contentContainer}>
        <AppText
          variant="titleSmall"
          numberOfLines={2}
          ellipsizeMode="tail"
          color={COLORS.text.primary}
        >
          {truncateTitle(item.title)}
        </AppText>
        <AppText
          variant="bodySmall"
          color={COLORS.text.date}
        >
          {item.date}
        </AppText>
      </View>
    </TouchableOpacity>
  );
};

interface ArticleSectionProps {
  data?: ArticleItemData[];
  title?: string;
  onPressViewMore?: () => void;
  onPressArticle?: (item: ArticleItemData) => void;
  style?: StyleProp<ViewStyle>;
}

export const ArticleSection: React.FC<ArticleSectionProps> = ({
  data,
  title = 'Bài viết nổi bật',
  onPressViewMore,
  onPressArticle,
  style,
}) => {
  const store = useHomeData();
  const articleList = (data && data.length > 0 ? data : store.articles) ?? [];
  const isLoading = store.isLoadingInitial && (!data || data.length === 0);

  if (isLoading) {
    return (
      <View style={[styles.container, style]}>
        {title ? (
          <SectionHeader
            title={title}
            leftIcon={
              <Image
                source={ASSETS.icons.titleBaiVietNoiBat}
                style={styles.headerIcon}
                resizeMode="contain"
              />
            }
            showViewMore={true}
            viewMoreColor="blue"
            onPressViewMore={onPressViewMore}
          />
        ) : null}
        <AppSkeleton
          count={2}
          width="100%"
          height={scale(88)}
          borderRadius={RADIUS.sm}
          horizontal={false}
          gap={scale(12)}
        />
      </View>
    );
  }

  if (!articleList || articleList.length === 0) {
    return null;
  }

  return (
    <View style={[styles.container, style]}>
      {title ? (
        <SectionHeader
          title={title}
          leftIcon={
            <Image
              source={ASSETS.icons.titleBaiVietNoiBat}
              style={styles.headerIcon}
              resizeMode="contain"
            />
          }
          showViewMore={true}
          viewMoreColor="blue"
          onPressViewMore={onPressViewMore}
        />
      ) : null}

      <AppFlatList<ArticleItemData>
        data={articleList}
        renderItem={({ item }) => (
          <ArticleCard item={item} onPress={onPressArticle} />
        )}
        keyExtractor={(item) => String(item.id)}
        scrollEnabled={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    gap: MARGIN.lg,
  },
  headerIcon: {
    width: ICON_SIZE.sm,
    height: ICON_SIZE.sm,
  },
  separator: {
    height: MARGIN.lg,
  },
  card: {
    width: '100%',
    height: scale(88),
    backgroundColor: COLORS.background.card,
    borderRadius: RADIUS.sm,
    padding: PADDING.xs,
    flexDirection: 'row',
    alignItems: 'center',
    gap: MARGIN.lg,
  },
  image: {
    width: scale(120),
    height: scale(80),
    borderRadius: RADIUS.sm,
  },
  contentContainer: {
    flex: 1,
    height: scale(80),
    justifyContent: 'space-between',
    gap: MARGIN.xs,
  },
});
