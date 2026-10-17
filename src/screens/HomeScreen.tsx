import React, { useState } from 'react';
import {
  RefreshControl,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import {
  AppHeader,
  AppSection,
  ArticleSection,
  BannerCarousel,
  BestSellerSection,
  BrandSection,
  CategorySection,
  FeaturedSection,
  FlashSaleSection,
  ForYouSection,
  HighlightSection,
  NewArrivalsSection,
  SectionContainer,
} from '@/src/components';
import { COLORS, PADDING } from '@/src/constants/design';
import { useHomeData } from '@/src/store';

interface HomeScreenProps {
  style?: StyleProp<ViewStyle>;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ style }) => {
  const {
    isRefreshing,
    refreshAll,
    isLoadingInitial,
    categories,
    banners,
    flashSale,
    brands,
    bestSeller,
    highlightCards,
    forYou,
    newArrivals,
    articles,
  } = useHomeData();

  const [search, setSearch] = useState('');
  const [hasNotif, setHasNotif] = useState(true);

  return (
    <View style={[styles.container, style]}>
      <AppHeader
        showSearch={true}
        showNotification={true}
        hasNotification={hasNotif}
        searchValue={search}
        onSearchChangeText={setSearch}
        onPressNotification={() => setHasNotif(!hasNotif)}
      />

      <SectionContainer
        contentContainerStyle={styles.sectionContent}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={refreshAll}
            tintColor={COLORS.text.brand}
            colors={[COLORS.text.brand]}
          />
        }
      >
        <FeaturedSection />

        {(isLoadingInitial || (categories?.length ?? 0) > 0) && (
          <AppSection>
            <CategorySection />
          </AppSection>
        )}

        {(isLoadingInitial || (banners?.length ?? 0) > 0) && (
          <AppSection>
            <BannerCarousel />
          </AppSection>
        )}

        {(isLoadingInitial || (flashSale?.items?.length ?? 0) > 0) && (
          <FlashSaleSection />
        )}

        {(isLoadingInitial || (brands?.length ?? 0) > 0) && (
          <AppSection>
            <BrandSection />
          </AppSection>
        )}

        {(isLoadingInitial || (bestSeller?.items?.length ?? 0) > 0) && (
          <AppSection>
            <BestSellerSection />
          </AppSection>
        )}

        {(isLoadingInitial || (highlightCards?.length ?? 0) > 0) && (
          <AppSection>
            <HighlightSection />
          </AppSection>
        )}

        {(isLoadingInitial || (forYou?.items?.length ?? 0) > 0) && (
          <AppSection>
            <ForYouSection />
          </AppSection>
        )}

        {(isLoadingInitial || (newArrivals?.items?.length ?? 0) > 0) && (
          <NewArrivalsSection />
        )}

        {(isLoadingInitial || (articles?.length ?? 0) > 0) && (
          <AppSection>
            <ArticleSection />
          </AppSection>
        )}
      </SectionContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.headerBlue,
  },
  sectionContent: {
    paddingTop: PADDING.xxl,
  },
});
