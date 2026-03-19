import type { ViewStyle } from 'react-native';

/**
 * TODO: Replace 'Component' with actual component name
 * TODO: Define all variants and sizes as union types
 */
export type ComponentVariant = 'default';
export type ComponentSize = 'sm' | 'md' | 'lg';

export interface ComponentProps {
  /** Component style variant */
  variant?: ComponentVariant;
  /** Component size */
  size?: ComponentSize;
  /** Disabled state */
  disabled?: boolean;
  /** Accessibility label (required for non-text content) */
  accessibilityLabel?: string;
  /** Children */
  children?: React.ReactNode;
  /** Style override (not recommended) */
  style?: ViewStyle;
  /** Test ID for testing */
  testID?: string;
}
