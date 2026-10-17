import React, { useCallback, useMemo, useState } from 'react';
import {
  Image,
  ImageSourcePropType,
  LayoutChangeEvent,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
  ViewStyle,
} from 'react-native';
import { ASSETS } from '@/src/constants/assets';
import {
  COLORS,
  MARGIN,
  PADDING,
  RADIUS,
} from '@/src/constants/design';
import { scale } from '@/src/utils/scale';
import { AppFlatList } from './AppFlatList';
import { AppGradient } from './AppGradient';
import { AppText } from './AppText';

import { HighlightCardData, HighlightCardType } from '@/src/mocks';
import { useHomeData } from '@/src/store';
import { AppSkeleton } from './Skeletons';

export type { HighlightCardData, HighlightCardType };

interface HighlightCardProps {
  item: HighlightCardData;
  cardWidth?: number;
  cardHeight?: number;
  onPress?: (item: HighlightCardData) => void;
  style?: StyleProp<ViewStyle>;
}

export const HighlightCard: React.FC<HighlightCardProps> = ({
  item,
  cardWidth,
  cardHeight,
  onPress,
  style,
}) => {
  if (item.type === 'square') {
    return (
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={() => onPress?.(item)}
        disabled={!onPress}
        style={[
          styles.squareCard,
          {
            backgroundColor: item.backgroundColor,
            width: cardWidth ?? '100%',
            height: cardHeight,
          },
          style,
        ]}
      >
        <AppText
          variant="bodyBold"
          color={item.textColor ?? COLORS.text.white}
          style={styles.uppercaseText}
        >
          {item.title}
        </AppText>
        <Image
          source={item.image}
          style={styles.squareImage}
          resizeMode="contain"
        />
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={() => onPress?.(item)}
      disabled={!onPress}
      style={[
        styles.tallCard,
        {
          backgroundColor: item.backgroundColor,
          width: cardWidth,
          height: cardHeight,
        },
        style,
      ]}
    >
      {item.badge ? (
        <AppGradient
          type="badgeGoldLight"
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.tallBadge}
        >
          <AppText
            variant="labelSmall"
            color={COLORS.text.price}
          >
            {item.badge}
          </AppText>
        </AppGradient>
      ) : null}

      <View style={styles.tallTextContainer}>
        <AppText
          variant="bodyBold"
          color={item.textColor ?? COLORS.text.white}
          style={styles.uppercaseText}
        >
          {item.title}
        </AppText>
        {item.highlightText ? (
          <AppText
            variant="hero"
            color={item.textColor ?? COLORS.text.white}
            style={styles.uppercaseText}
          >
            {item.highlightText}
          </AppText>
        ) : null}
      </View>

      <Image
        source={item.image}
        style={styles.tallImage}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

type HighlightColumnItem =
  | { type: 'column'; items: HighlightCardData[] }
  | { type: 'single'; item: HighlightCardData };

interface HighlightSectionProps {
  data?: HighlightCardData[];
  onPressCard?: (item: HighlightCardData) => void;
  style?: StyleProp<ViewStyle>;
}

export const HighlightSection: React.FC<HighlightSectionProps> = ({
  data,
  onPressCard,
  style,
}) => {
  const store = useHomeData();
  const cardList = (data && data.length > 0 ? data : store.highlightCards) ?? [];
  const isLoading = store.isLoadingInitial && (!data || data.length === 0);

  const { width: windowWidth } = useWindowDimensions();
  const [containerWidth, setContainerWidth] = useState(
    windowWidth - PADDING.md * 2,
  );

  const handleLayout = useCallback((event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    if (width > 0) {
      setContainerWidth(width);
    }
  }, []);

  const cardWidth = Math.floor((containerWidth - MARGIN.md) / 2);
  const squareHeight = Math.round(cardWidth * (129 / 177));
  const tallHeight = squareHeight * 2 + MARGIN.md;

  const columnData: HighlightColumnItem[] = useMemo(() => {
    const squareCards = cardList.filter((d) => d.type === 'square');
    const tallCards = cardList.filter((d) => d.type === 'tall');

    const result: HighlightColumnItem[] = [];
    if (squareCards.length > 0) {
      result.push({ type: 'column', items: squareCards });
    }
    tallCards.forEach((tall) => {
      result.push({ type: 'single', item: tall });
    });
    return result;
  }, [cardList]);

  if (isLoading) {
    return (
      <AppSkeleton
        count={2}
        width={scale(177)}
        height={scale(266)}
        borderRadius={RADIUS.md}
        gap={scale(12)}
      />
    );
  }

  if (!cardList || cardList.length === 0) {
    return null;
  }

  return (
    <View style={[styles.container, style]} onLayout={handleLayout}>
      <AppFlatList<HighlightColumnItem>
        data={columnData}
        renderItem={({ item }) => {
          if (item.type === 'column') {
            return (
              <View
                style={[
                  styles.leftColumn,
                  { width: cardWidth, height: tallHeight },
                ]}
              >
                {item.items.map((card) => (
                  <HighlightCard
                    key={card.id}
                    item={card}
                    cardHeight={squareHeight}
                    onPress={onPressCard}
                  />
                ))}
              </View>
            );
          }
          return (
            <HighlightCard
              item={item.item}
              cardWidth={cardWidth}
              cardHeight={tallHeight}
              onPress={onPressCard}
            />
          );
        }}
        keyExtractor={(_, index) => String(index)}
        horizontal
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.columnSeparator} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  leftColumn: {
    gap: MARGIN.md,
    justifyContent: 'space-between',
  },
  columnSeparator: {
    width: MARGIN.md,
  },
  squareCard: {
    borderRadius: RADIUS.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: PADDING.md,
    overflow: 'hidden',
  },
  squareImage: {
    width: scale(82),
    height: scale(115),
  },
  tallCard: {
    borderRadius: RADIUS.md,
    overflow: 'hidden',
    justifyContent: 'space-between',
  },
  tallBadge: {
    alignSelf: 'flex-start',
    marginTop: MARGIN.md,
    paddingVertical: PADDING.xs,
    paddingHorizontal: PADDING.md,
    borderTopRightRadius: RADIUS.full,
    borderBottomRightRadius: RADIUS.full,
  },
  tallTextContainer: {
    paddingHorizontal: PADDING.md,
    paddingTop: PADDING.xxl,
  },
  uppercaseText: {
    textTransform: 'uppercase',
  },
  tallImage: {
    width: '100%',
    height: scale(155),
    alignSelf: 'center',
  },
});
