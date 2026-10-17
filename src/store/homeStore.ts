import { useEffect } from 'react';
import { create } from 'zustand';
import {
  ArticleItemData,
  BannerItemData,
  BrandItemData,
  CategoryItemData,
  HighlightCardData,
  ProductItemData,
} from '@/src/mocks';
import {
  fetchBestSellerProducts,
  fetchFlashSaleProducts,
  fetchForYouProducts,
  fetchHomeInitialData,
  fetchNewArrivalsProducts,
} from '@/src/services';

interface ProductPaginationState {
  items: ProductItemData[];
  page: number;
  hasMore: boolean;
  loadingMore: boolean;
}

interface FlashSaleState extends ProductPaginationState {
  endTime: string | null;
}

interface HomeState {
  isLoadingInitial: boolean;
  isRefreshing: boolean;
  hasFetchedInitial: boolean;

  banners: BannerItemData[];
  categories: CategoryItemData[];
  brands: BrandItemData[];
  articles: ArticleItemData[];
  highlightCards: HighlightCardData[];

  flashSale: FlashSaleState;
  bestSeller: ProductPaginationState;
  forYou: ProductPaginationState;
  newArrivals: ProductPaginationState;

  fetchInitialData: () => Promise<void>;
  refreshAll: () => Promise<void>;
  loadMoreFlashSale: () => Promise<void>;
  loadMoreBestSeller: () => Promise<void>;
  loadMoreForYou: () => Promise<void>;
  loadMoreNewArrivals: () => Promise<void>;
}

const initialPaginationState: ProductPaginationState = {
  items: [],
  page: 1,
  hasMore: true,
  loadingMore: false,
};

export const useHomeStore = create<HomeState>((set, get) => ({
  isLoadingInitial: true,
  isRefreshing: false,
  hasFetchedInitial: false,

  banners: [],
  categories: [],
  brands: [],
  articles: [],
  highlightCards: [],

  flashSale: { ...initialPaginationState, endTime: null },
  bestSeller: { ...initialPaginationState },
  forYou: { ...initialPaginationState },
  newArrivals: { ...initialPaginationState },

  fetchInitialData: async () => {
    if (get().hasFetchedInitial && !get().isLoadingInitial) return;
    set({ isLoadingInitial: true, hasFetchedInitial: true });

    try {
      const data = await fetchHomeInitialData();
      set({
        banners: data.banners,
        categories: data.categories,
        brands: data.brands,
        articles: data.articles,
        highlightCards: data.highlightCards,
        flashSale: {
          items: data.flashSale.items,
          page: 1,
          hasMore: data.flashSale.hasMore,
          loadingMore: false,
          endTime: data.flashSale.endTime,
        },
        bestSeller: {
          items: data.bestSeller.items,
          page: 1,
          hasMore: data.bestSeller.hasMore,
          loadingMore: false,
        },
        forYou: {
          items: data.forYou.items,
          page: 1,
          hasMore: data.forYou.hasMore,
          loadingMore: false,
        },
        newArrivals: {
          items: data.newArrivals.items,
          page: 1,
          hasMore: data.newArrivals.hasMore,
          loadingMore: false,
        },
        isLoadingInitial: false,
      });
    } catch {
      set({ isLoadingInitial: false });
    }
  },

  refreshAll: async () => {
    set({ isRefreshing: true });

    try {
      const data = await fetchHomeInitialData();
      set({
        banners: data.banners,
        categories: data.categories,
        brands: data.brands,
        articles: data.articles,
        highlightCards: data.highlightCards,
        flashSale: {
          items: data.flashSale.items,
          page: 1,
          hasMore: data.flashSale.hasMore,
          loadingMore: false,
          endTime: data.flashSale.endTime,
        },
        bestSeller: {
          items: data.bestSeller.items,
          page: 1,
          hasMore: data.bestSeller.hasMore,
          loadingMore: false,
        },
        forYou: {
          items: data.forYou.items,
          page: 1,
          hasMore: data.forYou.hasMore,
          loadingMore: false,
        },
        newArrivals: {
          items: data.newArrivals.items,
          page: 1,
          hasMore: data.newArrivals.hasMore,
          loadingMore: false,
        },
        isRefreshing: false,
      });
    } catch {
      set({ isRefreshing: false });
    }
  },

  loadMoreFlashSale: async () => {
    const { flashSale } = get();
    if (flashSale.loadingMore || !flashSale.hasMore) return;

    set((state) => ({
      flashSale: { ...state.flashSale, loadingMore: true },
    }));

    try {
      const nextPage = flashSale.page + 1;
      const res = await fetchFlashSaleProducts(nextPage);

      set((state) => ({
        flashSale: {
          ...state.flashSale,
          items: [...state.flashSale.items, ...res.items],
          page: res.page,
          hasMore: res.hasMore,
          loadingMore: false,
        },
      }));
    } catch {
      set((state) => ({
        flashSale: { ...state.flashSale, loadingMore: false },
      }));
    }
  },

  loadMoreBestSeller: async () => {
    const { bestSeller } = get();
    if (bestSeller.loadingMore || !bestSeller.hasMore) return;

    set((state) => ({
      bestSeller: { ...state.bestSeller, loadingMore: true },
    }));

    try {
      const nextPage = bestSeller.page + 1;
      const res = await fetchBestSellerProducts(nextPage);

      set((state) => ({
        bestSeller: {
          ...state.bestSeller,
          items: [...state.bestSeller.items, ...res.items],
          page: res.page,
          hasMore: res.hasMore,
          loadingMore: false,
        },
      }));
    } catch {
      set((state) => ({
        bestSeller: { ...state.bestSeller, loadingMore: false },
      }));
    }
  },

  loadMoreForYou: async () => {
    const { forYou } = get();
    if (forYou.loadingMore || !forYou.hasMore) return;

    set((state) => ({
      forYou: { ...state.forYou, loadingMore: true },
    }));

    try {
      const nextPage = forYou.page + 1;
      const res = await fetchForYouProducts(nextPage);

      set((state) => ({
        forYou: {
          ...state.forYou,
          items: [...state.forYou.items, ...res.items],
          page: res.page,
          hasMore: res.hasMore,
          loadingMore: false,
        },
      }));
    } catch {
      set((state) => ({
        forYou: { ...state.forYou, loadingMore: false },
      }));
    }
  },

  loadMoreNewArrivals: async () => {
    const { newArrivals } = get();
    if (newArrivals.loadingMore || !newArrivals.hasMore) return;

    set((state) => ({
      newArrivals: { ...state.newArrivals, loadingMore: true },
    }));

    try {
      const nextPage = newArrivals.page + 1;
      const res = await fetchNewArrivalsProducts(nextPage);

      set((state) => ({
        newArrivals: {
          ...state.newArrivals,
          items: [...state.newArrivals.items, ...res.items],
          page: res.page,
          hasMore: res.hasMore,
          loadingMore: false,
        },
      }));
    } catch {
      set((state) => ({
        newArrivals: { ...state.newArrivals, loadingMore: false },
      }));
    }
  },
}));

export const useHomeData = () => {
  const store = useHomeStore();

  useEffect(() => {
    store.fetchInitialData();
  }, []);

  return store;
};
