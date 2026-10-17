import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  LayoutChangeEvent,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { COLORS, RADIUS } from '@/src/constants/design';
import { scale } from '@/src/utils/scale';

export interface AppSkeletonProps {
  loading?: boolean;
  children?: React.ReactNode;
  width?: number | string;
  height?: number | string;
  count?: number;
  horizontal?: boolean;
  gap?: number;
  borderRadius?: number;
  style?: StyleProp<ViewStyle>;
}

export const AppSkeleton: React.FC<AppSkeletonProps> = ({
  loading = true,
  children,
  width,
  height,
  count = 1,
  horizontal = true,
  gap = scale(8),
  borderRadius = RADIUS.sm,
  style,
}) => {
  const opacity = useRef(new Animated.Value(0.3)).current;
  const [measuredSize, setMeasuredSize] = useState<{
    width: number;
    height: number;
  } | null>(null);

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.7,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 700,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, [opacity]);

  const handleLayout = (e: LayoutChangeEvent) => {
    const { width: w, height: h } = e.nativeEvent.layout;
    if (w > 0 && h > 0) {
      setMeasuredSize({ width: w, height: h });
    }
  };

  if (!loading && children) {
    return <>{children}</>;
  }

  if (children) {
    return (
      <View style={[styles.wrapper, style]}>
        <View style={styles.hiddenLayout} onLayout={handleLayout}>
          {children}
        </View>
        <View style={StyleSheet.absoluteFill}>
          <Animated.View
            style={[
              styles.box,
              {
                opacity,
                width: measuredSize ? measuredSize.width : '100%',
                height: measuredSize ? measuredSize.height : '100%',
                borderRadius,
              },
            ]}
          />
        </View>
      </View>
    );
  }

  const effectiveWidth = width ?? '100%';
  const effectiveHeight = height ?? scale(20);

  return (
    <View
      style={[
        horizontal ? styles.row : styles.column,
        count > 1 && { gap },
        style,
      ]}
    >
      {Array.from({ length: count }, (_, i) => (
        <Animated.View
          key={i}
          style={[
            styles.box,
            {
              opacity,
              width: effectiveWidth as any,
              height: effectiveHeight as any,
              borderRadius,
            },
          ]}
        />
      ))}
    </View>
  );
};

export const Skeleton = AppSkeleton;

const styles = StyleSheet.create({
  box: {
    backgroundColor: COLORS.border.divider,
  },
  wrapper: {
    position: 'relative',
    overflow: 'hidden',
  },
  hiddenLayout: {
    opacity: 0,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  column: {
    flexDirection: 'column',
    width: '100%',
  },
});
