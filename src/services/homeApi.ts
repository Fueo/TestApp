import {
  ARTICLES_MOCK,
  ArticleItemData,
  BannerItemData,
  BEST_SELLER_PRODUCTS_MOCK,
  BrandItemData,
  BRANDS_MOCK,
  CAROUSEL_BANNERS_MOCK,
  CATEGORIES_MOCK,
  CategoryItemData,
  FLASH_SALE_PRODUCTS_MOCK,
  FOR_YOU_PRODUCTS_MOCK,
  HIGHLIGHT_CARDS_MOCK,
  HighlightCardData,
  NEW_ARRIVALS_PRODUCTS_MOCK,
  ProductItemData,
} from '@/src/mocks';

const API_DELAY = 500;
export const DEFAULT_PAGE_SIZE = 4;

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export interface PaginatedProductsResponse {
  items: ProductItemData[];
  hasMore: boolean;
  page: number;
}

export interface FlashSaleInitialData {
  items: ProductItemData[];
  hasMore: boolean;
  endTime: string;
}

export interface HomeInitialResponse {
  banners: BannerItemData[];
  categories: CategoryItemData[];
  brands: BrandItemData[];
  articles: ArticleItemData[];
  highlightCards: HighlightCardData[];
  flashSale: FlashSaleInitialData;
  bestSeller: PaginatedProductsResponse;
  forYou: PaginatedProductsResponse;
  newArrivals: PaginatedProductsResponse;
}

export const fetchHomeInitialData = async (): Promise<HomeInitialResponse> => {
  await delay(API_DELAY);

  const flashSaleEndTime = new Date(
    Date.now() + (19 * 3600 + 25 * 60) * 1000
  ).toISOString();

  return {
    banners: [...CAROUSEL_BANNERS_MOCK],
    categories: [...CATEGORIES_MOCK],
    brands: [...BRANDS_MOCK],
    articles: [...ARTICLES_MOCK],
    highlightCards: [...HIGHLIGHT_CARDS_MOCK],
    flashSale: {
      items: FLASH_SALE_PRODUCTS_MOCK.slice(0, DEFAULT_PAGE_SIZE),
      hasMore: FLASH_SALE_PRODUCTS_MOCK.length > DEFAULT_PAGE_SIZE,
      endTime: flashSaleEndTime,
    },
    bestSeller: {
      items: BEST_SELLER_PRODUCTS_MOCK.slice(0, DEFAULT_PAGE_SIZE),
      hasMore: BEST_SELLER_PRODUCTS_MOCK.length > DEFAULT_PAGE_SIZE,
      page: 1,
    },
    forYou: {
      items: FOR_YOU_PRODUCTS_MOCK.slice(0, DEFAULT_PAGE_SIZE),
      hasMore: FOR_YOU_PRODUCTS_MOCK.length > DEFAULT_PAGE_SIZE,
      page: 1,
    },
    newArrivals: {
      items: NEW_ARRIVALS_PRODUCTS_MOCK.slice(0, DEFAULT_PAGE_SIZE),
      hasMore: NEW_ARRIVALS_PRODUCTS_MOCK.length > DEFAULT_PAGE_SIZE,
      page: 1,
    },
  };
};

export const fetchFlashSaleProducts = async (
  page: number,
  pageSize: number = DEFAULT_PAGE_SIZE
): Promise<PaginatedProductsResponse> => {
  await delay(API_DELAY);
  const startIndex = (page - 1) * pageSize;
  const items = FLASH_SALE_PRODUCTS_MOCK.slice(startIndex, startIndex + pageSize);

  return {
    items,
    page,
    hasMore: startIndex + pageSize < FLASH_SALE_PRODUCTS_MOCK.length,
  };
};

export const fetchBestSellerProducts = async (
  page: number,
  pageSize: number = DEFAULT_PAGE_SIZE
): Promise<PaginatedProductsResponse> => {
  await delay(API_DELAY);
  const startIndex = (page - 1) * pageSize;
  const items = BEST_SELLER_PRODUCTS_MOCK.slice(startIndex, startIndex + pageSize);

  return {
    items,
    page,
    hasMore: startIndex + pageSize < BEST_SELLER_PRODUCTS_MOCK.length,
  };
};

export const fetchForYouProducts = async (
  page: number,
  pageSize: number = DEFAULT_PAGE_SIZE
): Promise<PaginatedProductsResponse> => {
  await delay(API_DELAY);
  const startIndex = (page - 1) * pageSize;
  const items = FOR_YOU_PRODUCTS_MOCK.slice(startIndex, startIndex + pageSize);

  return {
    items,
    page,
    hasMore: startIndex + pageSize < FOR_YOU_PRODUCTS_MOCK.length,
  };
};

export const fetchNewArrivalsProducts = async (
  page: number,
  pageSize: number = DEFAULT_PAGE_SIZE
): Promise<PaginatedProductsResponse> => {
  await delay(API_DELAY);
  const startIndex = (page - 1) * pageSize;
  const items = NEW_ARRIVALS_PRODUCTS_MOCK.slice(startIndex, startIndex + pageSize);

  return {
    items,
    page,
    hasMore: startIndex + pageSize < NEW_ARRIVALS_PRODUCTS_MOCK.length,
  };
};
