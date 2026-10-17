import { ImageSourcePropType } from 'react-native';
import { ASSETS } from '@/src/constants/assets';

export interface CategoryItemData {
  id: string | number;
  title: string;
  image: ImageSourcePropType;
}

export const CATEGORIES_MOCK: CategoryItemData[] = [
  {
    id: '1',
    title: 'Bộ lọc không khí',
    image: ASSETS.categories.airFilter,
  },
  {
    id: '2',
    title: 'Bộ lọc dầu',
    image: ASSETS.categories.oilFilter,
  },
  {
    id: '3',
    title: 'Bộ lọc nhiên liệu',
    image: ASSETS.categories.fuelFilter,
  },
  {
    id: '4',
    title: 'Bộ lọc trong cabin',
    image: ASSETS.categories.cabinFilter,
  },
  {
    id: '5',
    title: 'Bộ lọc gió',
    image: ASSETS.categories.airFilter2,
  },
  {
    id: '6',
    title: 'Bộ lọc thô',
    image: ASSETS.categories.airFilter,
  },
  {
    id: '7',
    title: 'Bộ lọc cao cấp',
    image: ASSETS.categories.oilFilter,
  },
];

export const FEATURED_BANNER_MOCK = ASSETS.banners.featuredBanner;
