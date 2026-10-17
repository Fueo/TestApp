import React from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { ASSETS } from '@/src/constants/assets';
import { RADIUS } from '@/src/constants/design';
import { scale } from '@/src/utils/scale';
import { AppSection } from './SectionContainer';

interface FeaturedSectionProps {
  source?: ImageSourcePropType;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

export const FeaturedSection: React.FC<FeaturedSectionProps> = ({
  source = ASSETS.banners.featuredBanner,
  onPress,
  style,
}) => {
  return (
    <AppSection style={style}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={onPress}
        disabled={!onPress}
        style={styles.container}
      >
        <Image
          source={source}
          style={styles.bannerImage}
          resizeMode="cover"
        />
      </TouchableOpacity>
    </AppSection>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: scale(65),
    borderRadius: RADIUS.sm,
    overflow: 'hidden',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
  },
});
