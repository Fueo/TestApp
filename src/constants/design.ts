import { scale, moderateScale } from '../utils/scale';
export { scale, moderateScale } from '../utils/scale';

export const COLORS = {
  background: {
    main: '#F9FAFB',
    card: '#FFFFFF',
    cardSecondary: '#E6F1FF',
    surface: '#FFFFFF',
    dark: '#111827',
    headerBlue: '#025FCA',
  },
  text: {
    primary: '#1C252E',
    secondary: '#454F5B',
    muted: '#919EAB',
    disabled: '#9CA3AF',
    white: '#FFFFFF',
    price: '#B71D18',
    alert: '#7A0916',
    countdown: '#E53935',
    brand: '#025FCA',
    brandActive: '#0373F3',
    categoryTitle: '#013065',
    date: '#024897',
  },
  input: {
    background: '#FFFFFF',
    placeholder: '#919EAB',
    text: '#1C252E',
    border: '#DEE5E9',
    icon: '#919EAB',
  },
  badge: {
    gradientGold: ['#FFD666', '#FFAB00'] as const,
    gradientGoldLight: ['#FFF5CC', '#FFD666'] as const,
    gradientOrange: ['#C95A1E', '#FE912A'] as const,
    solidRed: '#FF5630',
    solidCounter: '#F53F3F',
    solidNew: '#00B8D9',
  },
  progressBar: {
    track: '#DFE3E8',
    trackRed: '#FFD9D2',
    gradientFill: ['#FF5630', '#B71D18'] as const,
    sliderActive: '#025FCA',
  },
  border: {
    light: '#DEE5E9',
    divider: '#C4CDD5',
    subtle: 'rgba(145, 158, 171, 0.2)',
  },
  shadow: '#000000',
} as const;

export const PADDING = {
  xs: scale(4),
  sm: scale(8),
  md: scale(12),
  lg: scale(16),
  xl: scale(20),
  xxl: scale(24),
  xxxl: scale(40),
  bottomSpacing: scale(40),
} as const;

export const MARGIN = {
  xs: scale(4),
  sm: scale(8),
  md: scale(12),
  lg: scale(16),
  xl: scale(24),
} as const;

export const RADIUS = {
  xs: scale(4),
  sm: scale(8),
  md: scale(12),
  lg: scale(16),
  xl: scale(20),
  full: 999,
} as const;

export const ICON_SIZE = {
  xxs: scale(10),
  arrow: scale(12),
  flame: scale(14),
  xs: scale(16),
  input: scale(20),
  sm: scale(24),
  bell: scale(28),
  sidebar: scale(30),
  md: scale(32),
  lg: scale(40),
} as const;

export const FONT_FAMILY = {
  regular: 'Epilogue-Regular',
  medium: 'Epilogue-Medium',
  semiBold: 'Epilogue-SemiBold',
  bold: 'Epilogue-Bold',
} as const;

export const FONT_WEIGHT = {
  regular: '400',
  medium: '500',
  semiBold: '600',
  bold: '700',
} as const;

export const FONT_SIZE = {
  xxs: moderateScale(8),
  xs: moderateScale(10),
  sm: moderateScale(12),
  md: moderateScale(14),
  lg: moderateScale(16),
  xl: moderateScale(18),
  xxl: moderateScale(20),
  xxxl: moderateScale(24),
  hero: moderateScale(32),
} as const;

export const LINE_HEIGHT = {
  xxs: moderateScale(12),
  xs: moderateScale(14),
  sm: moderateScale(16),
  md: moderateScale(20),
  lg: moderateScale(24),
  xl: moderateScale(26),
  xxl: moderateScale(28),
  xxxl: moderateScale(32),
  hero: moderateScale(36),
} as const;

export const TYPOGRAPHY = {
  caption: {
    fontFamily: FONT_FAMILY.regular,
    fontSize: FONT_SIZE.xs,
    lineHeight: LINE_HEIGHT.xs,
  },
  tabLabel: {
    fontFamily: FONT_FAMILY.regular,
    fontSize: FONT_SIZE.xs,
    lineHeight: LINE_HEIGHT.xs,
  },
  tabLabelActive: {
    fontFamily: FONT_FAMILY.medium,
    fontSize: FONT_SIZE.xs,
    lineHeight: LINE_HEIGHT.xs,
  },
  bodySmall: {
    fontFamily: FONT_FAMILY.regular,
    fontSize: FONT_SIZE.sm,
    lineHeight: LINE_HEIGHT.sm,
  },
  buttonSmall: {
    fontFamily: FONT_FAMILY.bold,
    fontSize: FONT_SIZE.sm,
    lineHeight: LINE_HEIGHT.sm,
  },
  labelSmall: {
    fontFamily: FONT_FAMILY.semiBold,
    fontSize: FONT_SIZE.sm,
    lineHeight: LINE_HEIGHT.sm,
  },
  badge: {
    fontFamily: FONT_FAMILY.semiBold,
    fontSize: FONT_SIZE.xxs,
    lineHeight: LINE_HEIGHT.xxs,
  },
  body: {
    fontFamily: FONT_FAMILY.regular,
    fontSize: FONT_SIZE.md,
    lineHeight: LINE_HEIGHT.md,
  },
  bodyBold: {
    fontFamily: FONT_FAMILY.bold,
    fontSize: FONT_SIZE.md,
    lineHeight: LINE_HEIGHT.md,
  },
  hero: {
    fontFamily: FONT_FAMILY.bold,
    fontSize: FONT_SIZE.hero,
    lineHeight: LINE_HEIGHT.hero,
  },
  body: {
    fontFamily: FONT_FAMILY.regular,
    fontSize: FONT_SIZE.md,
    lineHeight: LINE_HEIGHT.md,
  },
  bodyMedium: {
    fontFamily: FONT_FAMILY.medium,
    fontSize: FONT_SIZE.md,
    lineHeight: LINE_HEIGHT.md,
  },
  titleSmall: {
    fontFamily: FONT_FAMILY.semiBold,
    fontSize: FONT_SIZE.lg,
    lineHeight: LINE_HEIGHT.lg,
  },
  titleMedium: {
    fontFamily: FONT_FAMILY.bold,
    fontSize: FONT_SIZE.xl,
    lineHeight: LINE_HEIGHT.xl,
  },
  titleLarge: {
    fontFamily: FONT_FAMILY.bold,
    fontSize: FONT_SIZE.xxl,
    lineHeight: LINE_HEIGHT.xxl,
  },
} as const;

export type ColorType = typeof COLORS;
export type PaddingType = typeof PADDING;
export type MarginType = typeof MARGIN;
export type RadiusType = typeof RADIUS;
export type IconSizeType = typeof ICON_SIZE;
export type FontFamilyType = typeof FONT_FAMILY;
export type FontWeightType = typeof FONT_WEIGHT;
export type FontSizeType = typeof FONT_SIZE;
export type LineHeightType = typeof LINE_HEIGHT;
export type TypographyType = typeof TYPOGRAPHY;
