import React from 'react';
import {
  ScrollView,
  ScrollViewProps,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { COLORS, MARGIN, PADDING, RADIUS } from '@/src/constants/design';
import { scale } from '@/src/utils/scale';

interface SectionContainerProps extends ScrollViewProps {
  scrollable?: boolean;
  roundedTop?: boolean;
  gap?: number;
  horizontalPadding?: number;
  contentContainerStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

export const SectionContainer: React.FC<SectionContainerProps> = ({
  scrollable = true,
  roundedTop = true,
  gap = MARGIN.xl,
  horizontalPadding = PADDING.md,
  contentContainerStyle,
  style,
  children,
  ...scrollViewProps
}) => {
  const dynamicContentStyle: ViewStyle = {
    paddingHorizontal: horizontalPadding,
    gap,
  };

  if (!scrollable) {
    return (
      <View
        style={[
          styles.container,
          roundedTop && styles.roundedTop,
          dynamicContentStyle,
          style,
        ]}
      >
        {children}
      </View>
    );
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={[styles.scrollView, roundedTop && styles.roundedTop, style]}
      contentContainerStyle={[
        styles.contentContainer,
        dynamicContentStyle,
        contentContainerStyle,
      ]}
      {...scrollViewProps}
    >
      {children}
    </ScrollView>
  );
};

interface AppSectionProps {
  fullWidth?: boolean;
  noPadding?: boolean;
  gap?: number;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

export const AppSection: React.FC<AppSectionProps> = ({
  fullWidth = false,
  noPadding = false,
  gap,
  style,
  contentStyle,
  children,
}) => {
  if (fullWidth) {
    return (
      <View style={[styles.fullWidthSection, style]}>
        <View
          style={[
            styles.fullWidthContent,
            noPadding && styles.noPadding,
            gap !== undefined && { gap },
            contentStyle,
          ]}
        >
          {children}
        </View>
      </View>
    );
  }

  return (
    <View
      style={[
        styles.section,
        noPadding && styles.noPadding,
        gap !== undefined && { gap },
        style,
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background.main,
    paddingTop: PADDING.md,
    paddingBottom: PADDING.bottomSpacing,
  },
  scrollView: {
    flex: 1,
    backgroundColor: COLORS.background.main,
  },
  contentContainer: {
    paddingTop: PADDING.md,
    paddingBottom: PADDING.bottomSpacing,
  },
  roundedTop: {
    borderTopLeftRadius: RADIUS.md,
    borderTopRightRadius: RADIUS.md,
  },
  section: {
    width: '100%',
  },
  fullWidthSection: {
    marginHorizontal: -PADDING.md,
  },
  fullWidthContent: {
    paddingHorizontal: PADDING.md,
  },
  noPadding: {
    paddingHorizontal: 0,
  },
});
