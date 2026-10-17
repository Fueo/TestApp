import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  AppHeader,
  AppSection,
  AppText,
  CategorySidebar,
  CategorySidebarItem,
  SectionContainer,
  SubCategorySection,
} from '@/src/components';
import { ASSETS } from '@/src/constants/assets';
import {
  COLORS,
  ICON_SIZE,
  MARGIN,
  PADDING,
} from '@/src/constants/design';
import { useCategoryData } from '@/src/store';

interface CategoryScreenProps {
  onPressBack?: () => void;
  onPressNotification?: () => void;
  onPressSearch?: () => void;
}

export const CategoryScreen: React.FC<CategoryScreenProps> = ({
  onPressBack,
  onPressNotification,
  onPressSearch,
}) => {
  const {
    categories,
    selectedCategoryId,
    subCategories,
    selectCategory,
  } = useCategoryData();

  const selectedCategory =
    categories.find((c) => c.id === selectedCategoryId) ?? categories[0];

  const handleSelectCategory = (item: CategorySidebarItem) => {
    selectCategory(item.id);
  };

  return (
    <View style={styles.container}>
      <AppHeader
        showBack={true}
        showSearch={true}
        showNotification={true}
        onPressBack={onPressBack}
        onPressNotification={onPressNotification}
      />

      <SectionContainer
        scrollable={false}
        roundedTop={true}
        horizontalPadding={0}
        gap={0}
        style={styles.sectionContainer}
      >
        <AppSection noPadding style={styles.body}>
          <CategorySidebar
            data={categories}
            selectedId={selectedCategoryId}
            onSelect={handleSelectCategory}
          />

          <View style={styles.contentArea}>
            {selectedCategory && (
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.categoryTitleRow}
              >
                <AppText
                  variant="titleSmall"
                  color={COLORS.text.primary}
                >
                  {selectedCategory.name}
                </AppText>
                <Image
                  source={ASSETS.icons.arrowDoubleRight}
                  style={styles.arrowIcon}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            )}

            <View style={styles.divider} />

            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollContent}
            >
              {subCategories.map((group, index) => (
                <React.Fragment key={group.id}>
                  {index > 0 && <View style={styles.groupDivider} />}
                  <SubCategorySection
                    title={group.title}
                    items={group.items}
                  />
                </React.Fragment>
              ))}
            </ScrollView>
          </View>
        </AppSection>
      </SectionContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.headerBlue,
  },
  sectionContainer: {
    flex: 1,
    paddingTop: 0,
    paddingBottom: 0,
    overflow: 'hidden',
  },
  body: {
    flex: 1,
    flexDirection: 'row',
  },
  contentArea: {
    flex: 1,
    backgroundColor: COLORS.background.card,
    paddingHorizontal: PADDING.md,
    paddingTop: PADDING.md,
  },
  categoryTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: PADDING.sm,
  },
  arrowIcon: {
    width: ICON_SIZE.xs,
    height: ICON_SIZE.xs,
    tintColor: COLORS.text.primary,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border.subtle,
    marginBottom: MARGIN.sm,
  },
  groupDivider: {
    height: 1,
    backgroundColor: COLORS.border.subtle,
    marginVertical: MARGIN.md,
  },
  scrollContent: {
    paddingBottom: PADDING.xl,
  },
});
