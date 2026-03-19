import type { ViewStyle } from 'react-native';

export type IconButtonVariant = 'filled' | 'outlined' | 'ghost';
export type IconButtonSize = 'sm' | 'md' | 'lg';

export interface IconButtonProps {
  /** Button variant */
  variant?: IconButtonVariant;
  /** Button size */
  size?: IconButtonSize;
  /** Icon element */
  icon: React.ReactNode;
  /** Disabled state */
  disabled?: boolean;
  /** Press handler */
  onPress?: () => void;
  /** Accessibility label (required) */
  accessibilityLabel: string;
  /** Style override */
  style?: ViewStyle;
  /** Test ID */
  testID?: string;
}
