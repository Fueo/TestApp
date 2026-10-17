import { useEffect } from 'react';
import { create } from 'zustand';
import { CategorySidebarItem } from '@/src/components';
import { SubCategoryGroupData } from '@/src/mocks';
import {
  fetchCategoryInitialData,
  fetchSubCategoriesByCategoryId,
} from '@/src/services';

interface CategoryState {
  isLoadingInitial: boolean;
  isLoadingSubCategories: boolean;
  hasFetchedInitial: boolean;

  categories: CategorySidebarItem[];
  selectedCategoryId: string;
  subCategories: SubCategoryGroupData[];

  fetchInitialData: () => Promise<void>;
  selectCategory: (categoryId: string) => Promise<void>;
}

export const useCategoryStore = create<CategoryState>((set, get) => ({
  isLoadingInitial: true,
  isLoadingSubCategories: false,
  hasFetchedInitial: false,

  categories: [],
  selectedCategoryId: '',
  subCategories: [],

  fetchInitialData: async () => {
    if (get().hasFetchedInitial && !get().isLoadingInitial) return;
    set({ isLoadingInitial: true, hasFetchedInitial: true });

    try {
      const data = await fetchCategoryInitialData();
      set({
        categories: data.categories,
        selectedCategoryId: data.selectedCategoryId,
        subCategories: data.subCategories,
        isLoadingInitial: false,
      });
    } catch {
      set({ isLoadingInitial: false });
    }
  },

  selectCategory: async (categoryId: string) => {
    const { selectedCategoryId } = get();
    if (selectedCategoryId === categoryId) return;

    set({ selectedCategoryId: categoryId, isLoadingSubCategories: true });

    try {
      const subs = await fetchSubCategoriesByCategoryId(categoryId);
      set({ subCategories: subs, isLoadingSubCategories: false });
    } catch {
      set({ isLoadingSubCategories: false });
    }
  },
}));

export const useCategoryData = () => {
  const store = useCategoryStore();

  useEffect(() => {
    store.fetchInitialData();
  }, []);

  return store;
};
