import { ImageSourcePropType } from 'react-native';
import { ASSETS } from '@/src/constants/assets';

export interface BrandItemData {
  id: string | number;
  name?: string;
  logo: ImageSourcePropType;
}

export const BRANDS_MOCK: BrandItemData[] = [
  { id: '1', name: 'Honda', logo: ASSETS.logos.honda },
  { id: '2', name: 'Audi', logo: ASSETS.logos.audi },
  { id: '3', name: 'BMW', logo: ASSETS.logos.bmw },
  { id: '4', name: 'Chevrolet', logo: ASSETS.logos.chevrolet },
  { id: '5', name: 'Ford', logo: ASSETS.logos.ford },
  { id: '6', name: 'Kia', logo: ASSETS.logos.kia },
  { id: '7', name: 'Lexus', logo: ASSETS.logos.lexus },
  { id: '8', name: 'Nissan', logo: ASSETS.logos.nissan },
  { id: '9', name: 'Volkswagen', logo: ASSETS.logos.volkswagen },
  { id: '10', name: 'Volvo', logo: ASSETS.logos.volvo },
];
