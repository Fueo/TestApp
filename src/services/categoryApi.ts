import { CategorySidebarItem } from '@/src/components';
import {
  CATEGORIES_DATA,
  SUB_CATEGORIES_DATA,
  SubCategoryGroupData,
} from '@/src/mocks';

const API_DELAY = 300;
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export interface CategoryScreenInitialData {
  categories: CategorySidebarItem[];
  selectedCategoryId: string;
  subCategories: SubCategoryGroupData[];
}

export const fetchCategoryInitialData = async (): Promise<CategoryScreenInitialData> => {
  await delay(API_DELAY);
  const defaultCategory = CATEGORIES_DATA[0];
  const defaultSubs = SUB_CATEGORIES_DATA[defaultCategory.id] ?? [];
  return {
    categories: CATEGORIES_DATA,
    selectedCategoryId: defaultCategory.id,
    subCategories: defaultSubs,
  };
};

export const fetchSubCategoriesByCategoryId = async (
  categoryId: string
): Promise<SubCategoryGroupData[]> => {
  await delay(API_DELAY);
  return SUB_CATEGORIES_DATA[categoryId] ?? [];
};
