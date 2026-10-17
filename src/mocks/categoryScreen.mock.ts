import { ImageSourcePropType } from 'react-native';
import { ASSETS } from '@/src/constants/assets';
import { CategorySidebarItem, SubCategoryItemData } from '@/src/components';

export interface SubCategoryGroupData {
  id: string;
  title: string;
  items: SubCategoryItemData[];
}

export const CATEGORIES_DATA: CategorySidebarItem[] = [
  {
    id: 'filters',
    name: 'Bộ lọc ô tô',
    icon: ASSETS.categories.airFilter,
  },
  {
    id: 'oils',
    name: 'Dầu & Dung dịch',
    icon: ASSETS.categories.oilFilter,
  },
  {
    id: 'brakes',
    name: 'Hệ thống phanh',
    icon: ASSETS.categories.fuelFilter,
  },
  {
    id: 'battery',
    name: 'Ắc quy & Điện',
    icon: ASSETS.categories.cabinFilter,
  },
  {
    id: 'tires',
    name: 'Lốp & Mâm xe',
    icon: ASSETS.categories.airFilter2,
  },
  {
    id: 'accessories',
    name: 'Phụ kiện nội thất',
    icon: ASSETS.categories.airFilter,
  },
  {
    id: 'exterior',
    name: 'Ngoại thất xe',
    icon: ASSETS.categories.oilFilter,
  },
  {
    id: 'lights',
    name: 'Hệ thống đèn',
    icon: ASSETS.categories.airFilter,
  },
  {
    id: 'cooling',
    name: 'Làm mát động cơ',
    icon: ASSETS.categories.cabinFilter,
  },
  {
    id: 'suspension',
    name: 'Hệ thống treo',
    icon: ASSETS.categories.fuelFilter,
  },
  {
    id: 'exhaust',
    name: 'Hệ thống xả',
    icon: ASSETS.categories.oilFilter,
  },
  {
    id: 'tools',
    name: 'Dụng cụ sửa xe',
    icon: ASSETS.categories.airFilter2,
  },
  {
    id: 'care',
    name: 'Chăm sóc xe',
    icon: ASSETS.categories.airFilter,
  },
];

export const SUB_CATEGORIES_DATA: Record<string, SubCategoryGroupData[]> = {
  filters: [
    {
      id: 'filters_sub_1',
      title: 'Sub category 1',
      items: [
        {
          id: 'filter_item_1',
          name: 'Bộ lọc gió',
          image: ASSETS.categories.airFilter,
        },
        {
          id: 'filter_item_2',
          name: 'Bộ lọc trong cabin',
          image: ASSETS.categories.cabinFilter,
        },
        {
          id: 'filter_item_3',
          name: 'Bộ lọc nhiên liệu',
          image: ASSETS.categories.fuelFilter,
        },
        {
          id: 'filter_item_4',
          name: 'Bộ lọc gió',
          image: ASSETS.categories.airFilter,
        },
        {
          id: 'filter_item_5',
          name: 'Bộ lọc gió',
          image: ASSETS.categories.airFilter2,
        },
        {
          id: 'filter_item_6',
          name: 'Bộ lọc gió',
          image: ASSETS.categories.airFilter,
        },
        {
          id: 'filter_item_7',
          name: 'Bộ lọc gió',
          image: ASSETS.categories.airFilter,
        },
        {
          id: 'filter_item_8',
          name: 'Bộ lọc gió',
          image: ASSETS.categories.cabinFilter,
        },
        {
          id: 'filter_item_9',
          name: 'Bộ lọc gió',
          image: ASSETS.categories.fuelFilter,
        },
      ],
    },
    {
      id: 'filters_sub_2',
      title: 'Sub category 2',
      items: [
        {
          id: 'filter_item_10',
          name: 'Bộ lọc gió',
          image: ASSETS.categories.airFilter,
        },
        {
          id: 'filter_item_11',
          name: 'Bộ lọc trong cabin',
          image: ASSETS.categories.cabinFilter,
        },
        {
          id: 'filter_item_12',
          name: 'Bộ lọc nhiên liệu',
          image: ASSETS.categories.fuelFilter,
        },
        {
          id: 'filter_item_13',
          name: 'Bộ lọc gió',
          image: ASSETS.categories.airFilter,
        },
        {
          id: 'filter_item_14',
          name: 'Bộ lọc gió',
          image: ASSETS.categories.airFilter2,
        },
        {
          id: 'filter_item_15',
          name: 'Bộ lọc gió',
          image: ASSETS.categories.oilFilter,
        },
      ],
    },
  ],
  oils: [
    {
      id: 'oils_sub_1',
      title: 'Dầu nhớt động cơ',
      items: [
        {
          id: 'oil_item_1',
          name: 'Dầu tổng hợp',
          image: ASSETS.categories.oilFilter,
        },
        {
          id: 'oil_item_2',
          name: 'Dầu bán tổng hợp',
          image: ASSETS.categories.oilFilter,
        },
        {
          id: 'oil_item_3',
          name: 'Dầu gốc khoáng',
          image: ASSETS.categories.fuelFilter,
        },
      ],
    },
    {
      id: 'oils_sub_2',
      title: 'Dung dịch làm mát',
      items: [
        {
          id: 'oil_item_4',
          name: 'Nước làm mát',
          image: ASSETS.categories.airFilter,
        },
        {
          id: 'oil_item_5',
          name: 'Dung dịch kính',
          image: ASSETS.categories.cabinFilter,
        },
        {
          id: 'oil_item_6',
          name: 'Dầu hộp số',
          image: ASSETS.categories.fuelFilter,
        },
      ],
    },
  ],
  brakes: [
    {
      id: 'brakes_sub_1',
      title: 'Hệ thống phanh trước',
      items: [
        {
          id: 'brake_item_1',
          name: 'Má phanh trước',
          image: ASSETS.categories.fuelFilter,
        },
        {
          id: 'brake_item_2',
          name: 'Đĩa phanh trước',
          image: ASSETS.categories.oilFilter,
        },
        {
          id: 'brake_item_3',
          name: 'Cùm phanh trước',
          image: ASSETS.categories.airFilter,
        },
      ],
    },
  ],
  battery: [
    {
      id: 'battery_sub_1',
      title: 'Ắc quy khởi động',
      items: [
        {
          id: 'battery_item_1',
          name: 'Ắc quy AGM',
          image: ASSETS.categories.cabinFilter,
        },
        {
          id: 'battery_item_2',
          name: 'Ắc quy chì axit',
          image: ASSETS.categories.cabinFilter,
        },
        {
          id: 'battery_item_3',
          name: 'Cáp câu bình',
          image: ASSETS.categories.airFilter2,
        },
      ],
    },
  ],
  tires: [
    {
      id: 'tires_sub_1',
      title: 'Lốp theo kích thước',
      items: [
        {
          id: 'tire_item_1',
          name: 'Lốp R15',
          image: ASSETS.categories.airFilter2,
        },
        {
          id: 'tire_item_2',
          name: 'Lốp R16',
          image: ASSETS.categories.airFilter2,
        },
        {
          id: 'tire_item_3',
          name: 'Lốp R17',
          image: ASSETS.categories.oilFilter,
        },
      ],
    },
  ],
  accessories: [
    {
      id: 'acc_sub_1',
      title: 'Phụ kiện nội thất',
      items: [
        {
          id: 'acc_item_1',
          name: 'Thảm lót sàn',
          image: ASSETS.categories.airFilter,
        },
        {
          id: 'acc_item_2',
          name: 'Bọc vô lăng',
          image: ASSETS.categories.cabinFilter,
        },
        {
          id: 'acc_item_3',
          name: 'Nước hoa ô tô',
          image: ASSETS.categories.airFilter2,
        },
      ],
    },
  ],
  exterior: [
    {
      id: 'ext_sub_1',
      title: 'Ngoại thất xe',
      items: [
        {
          id: 'ext_item_1',
          name: 'Gạt mưa',
          image: ASSETS.categories.oilFilter,
        },
        {
          id: 'ext_item_2',
          name: 'Bạt phủ xe',
          image: ASSETS.categories.fuelFilter,
        },
        {
          id: 'ext_item_3',
          name: 'Gương chiếu hậu',
          image: ASSETS.categories.airFilter,
        },
      ],
    },
  ],
  lights: [
    {
      id: 'lights_sub_1',
      title: 'Đèn chiếu sáng',
      items: [
        {
          id: 'light_item_1',
          name: 'Bóng đèn pha LED',
          image: ASSETS.categories.airFilter,
        },
        {
          id: 'light_item_2',
          name: 'Đèn sương mù',
          image: ASSETS.categories.cabinFilter,
        },
        {
          id: 'light_item_3',
          name: 'Đèn hậu',
          image: ASSETS.categories.fuelFilter,
        },
      ],
    },
  ],
  cooling: [
    {
      id: 'cooling_sub_1',
      title: 'Hệ thống làm mát',
      items: [
        {
          id: 'cool_item_1',
          name: 'Két nước làm mát',
          image: ASSETS.categories.oilFilter,
        },
        {
          id: 'cool_item_2',
          name: 'Quạt tản nhiệt',
          image: ASSETS.categories.airFilter2,
        },
        {
          id: 'cool_item_3',
          name: 'Van hằng nhiệt',
          image: ASSETS.categories.airFilter,
        },
      ],
    },
  ],
  suspension: [
    {
      id: 'suspension_sub_1',
      title: 'Giảm xóc & Treo',
      items: [
        {
          id: 'susp_item_1',
          name: 'Phuộc nhún trước',
          image: ASSETS.categories.fuelFilter,
        },
        {
          id: 'susp_item_2',
          name: 'Lò xo giảm xóc',
          image: ASSETS.categories.oilFilter,
        },
        {
          id: 'susp_item_3',
          name: 'Thanh cân bằng',
          image: ASSETS.categories.cabinFilter,
        },
      ],
    },
  ],
  exhaust: [
    {
      id: 'exhaust_sub_1',
      title: 'Ống xả & Khí thải',
      items: [
        {
          id: 'exh_item_1',
          name: 'Bầu giảm thanh',
          image: ASSETS.categories.oilFilter,
        },
        {
          id: 'exh_item_2',
          name: 'Cảm biến oxy',
          image: ASSETS.categories.airFilter,
        },
        {
          id: 'exh_item_3',
          name: 'Cổ góp xả',
          image: ASSETS.categories.airFilter2,
        },
      ],
    },
  ],
  tools: [
    {
      id: 'tools_sub_1',
      title: 'Dụng cụ cầm tay',
      items: [
        {
          id: 'tool_item_1',
          name: 'Bộ cờ lê tròng',
          image: ASSETS.categories.airFilter2,
        },
        {
          id: 'tool_item_2',
          name: 'Kích nâng xe',
          image: ASSETS.categories.fuelFilter,
        },
        {
          id: 'tool_item_3',
          name: 'Bơm lốp mini',
          image: ASSETS.categories.airFilter,
        },
      ],
    },
  ],
  care: [
    {
      id: 'care_sub_1',
      title: 'Vệ sinh & Chăm sóc',
      items: [
        {
          id: 'care_item_1',
          name: 'Dung dịch rửa xe',
          image: ASSETS.categories.airFilter,
        },
        {
          id: 'care_item_2',
          name: 'Khăn lau vi sợi',
          image: ASSETS.categories.cabinFilter,
        },
        {
          id: 'care_item_3',
          name: 'Xi đánh bóng',
          image: ASSETS.categories.oilFilter,
        },
      ],
    },
  ],
};
