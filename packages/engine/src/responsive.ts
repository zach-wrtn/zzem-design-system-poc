import { Dimensions, PixelRatio } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Base design dimensions (iPhone 14 Pro)
const BASE_WIDTH = 393;
const BASE_HEIGHT = 852;

/**
 * Responsive utilities for adaptive layouts.
 *
 * Usage:
 * ```
 * const styles = {
 *   fontSize: responsive.scale(16),
 *   padding: responsive.horizontalScale(20),
 * };
 * ```
 */
export const responsive = {
  /** Screen width */
  screenWidth: SCREEN_WIDTH,

  /** Screen height */
  screenHeight: SCREEN_HEIGHT,

  /** Scale a value based on screen width ratio */
  horizontalScale: (size: number): number => {
    return (SCREEN_WIDTH / BASE_WIDTH) * size;
  },

  /** Scale a value based on screen height ratio */
  verticalScale: (size: number): number => {
    return (SCREEN_HEIGHT / BASE_HEIGHT) * size;
  },

  /** Moderate scale (less aggressive than linear) */
  scale: (size: number, factor: number = 0.5): number => {
    return size + ((SCREEN_WIDTH / BASE_WIDTH) * size - size) * factor;
  },

  /** Normalize font size across devices */
  normalizeFont: (size: number): number => {
    const scale = SCREEN_WIDTH / BASE_WIDTH;
    const newSize = size * scale;
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  },

  /** Check if device is a small screen (< 375pt width) */
  isSmallDevice: SCREEN_WIDTH < 375,

  /** Check if device is a large screen (>= 428pt width) */
  isLargeDevice: SCREEN_WIDTH >= 428,
};
