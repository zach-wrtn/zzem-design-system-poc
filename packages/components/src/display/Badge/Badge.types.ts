import type { ViewStyle } from 'react-native';

export type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'info';
export type BadgeSize = 'sm' | 'md';

export interface BadgeProps {
  /** Badge variant */
  variant?: BadgeVariant;
  /** Badge size */
  size?: BadgeSize;
  /** Badge label */
  label: string;
  /** Accessibility label */
  accessibilityLabel?: string;
  /** Style override */
  style?: ViewStyle;
  /** Test ID */
  testID?: string;
}
