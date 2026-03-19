import { Platform } from 'react-native';

interface PlatformSelectOptions<T> {
  ios: T;
  android: T;
  default?: T;
}

/**
 * Platform utilities for iOS/Android abstraction.
 * All platform-specific code must go through these helpers.
 *
 * Usage:
 * ```
 * const shadow = platform.select({
 *   ios: { shadowOpacity: 0.1 },
 *   android: { elevation: 2 },
 * });
 * ```
 */
export const platform = {
  /** Current platform: 'ios' | 'android' */
  os: Platform.OS as 'ios' | 'android',

  /** True if running on iOS */
  isIOS: Platform.OS === 'ios',

  /** True if running on Android */
  isAndroid: Platform.OS === 'android',

  /** Platform-specific value selection */
  select: <T>(options: PlatformSelectOptions<T>): T => {
    return Platform.select({
      ios: options.ios,
      android: options.android,
      default: options.default ?? options.ios,
    }) as T;
  },

  /** Platform version number */
  version: typeof Platform.Version === 'string' ? parseInt(Platform.Version, 10) : Platform.Version,

  /**
   * Apply haptic feedback (iOS only).
   * On Android, ripple effect is used via android_ripple prop.
   */
  haptic: (style: 'light' | 'medium' | 'heavy' = 'medium') => {
    // Requires react-native-haptic-feedback in production
    // This is a no-op placeholder for the engine
    if (Platform.OS === 'ios') {
      // UIImpactFeedbackGenerator integration
    }
  },
};
