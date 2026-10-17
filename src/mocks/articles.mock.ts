import { ImageSourcePropType } from 'react-native';
import { ASSETS } from '@/src/constants/assets';

export interface ArticleItemData {
  id: string | number;
  title: string;
  date: string;
  image: ImageSourcePropType;
}

export const ARTICLES_MOCK: ArticleItemData[] = [
  {
    id: '1',
    title: 'Đầu phun sprinkler là gì? Cấu tạo, ứng dụng và nguyên lý hoạt động',
    date: '13/02/2025',
    image: ASSETS.articles.sprinkler,
  },
  {
    id: '2',
    title: 'Kinh nghiệm bảo dưỡng hệ thống phanh an toàn cho xe hơi',
    date: '14/02/2025',
    image: ASSETS.articles.article2,
  },
  {
    id: '3',
    title: 'Cách lựa chọn dầu nhớt tổng hợp chuẩn theo từng đời xe',
    date: '15/02/2025',
    image: ASSETS.articles.article3,
  },
];
