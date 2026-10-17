import { ImageSourcePropType } from 'react-native';
import { ASSETS } from '@/src/constants/assets';
import { COLORS } from '@/src/constants/design';

export interface BannerItemData {
  id: string | number;
  image: ImageSourcePropType;
  title?: string;
}

export type HighlightCardType = 'square' | 'tall';

export interface HighlightCardData {
  id: string | number;
  type: HighlightCardType;
  title: string;
  highlightText?: string;
  badge?: string;
  image: ImageSourcePropType;
  backgroundColor: string;
  textColor?: string;
}

export const CAROUSEL_BANNERS_MOCK: BannerItemData[] = [
  {
    id: '1',
    image: ASSETS.banners.carouselBanner,
    title: 'Bộ lọc dầu cao cấp',
  },
  {
    id: '2',
    image: ASSETS.banners.danhChoBan,
    title: 'Dành cho bạn',
  },
  {
    id: '3',
    image: ASSETS.banners.dongGia299k,
    title: 'Đồng giá 299k',
  },
];

export const HIGHLIGHT_CARDS_MOCK: HighlightCardData[] = [
  {
    id: '1',
    type: 'square',
    title: 'MUA 1\nTẶNG 1',
    image: ASSETS.banners.mua1Tang1,
    backgroundColor: COLORS.text.price,
    textColor: COLORS.text.white,
  },
  {
    id: '2',
    type: 'square',
    title: 'XẢ KHO\nGIÁ SỐC',
    image: ASSETS.banners.xaKhoGiaSoc,
    backgroundColor: COLORS.badge.gradientGold[1],
    textColor: COLORS.text.primary,
  },
  {
    id: '3',
    type: 'tall',
    badge: 'Mới cực hot!',
    title: 'ĐỒNG GIÁ',
    highlightText: '299K',
    image: ASSETS.banners.dongGia299k,
    backgroundColor: COLORS.background.headerBlue,
    textColor: COLORS.text.white,
  },
  {
    id: '4',
    type: 'tall',
    badge: 'Khuyến mãi đặc biệt',
    title: 'BỘ LỌC',
    highlightText: 'CAO CẤP',
    image: ASSETS.banners.boLocChatLuongCao,
    backgroundColor: COLORS.badge.solidNew,
    textColor: COLORS.text.white,
  },
];
