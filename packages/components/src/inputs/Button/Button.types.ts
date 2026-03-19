import type { ViewStyle, TextStyle } from 'react-native';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps {
  /** Button style variant */
  variant?: ButtonVariant;
  /** Button size */
  size?: ButtonSize;
  /** Disabled state */
  disabled?: boolean;
  /** Loading state */
  loading?: boolean;
  /** Full width */
  fullWidth?: boolean;
  /** Left icon */
  iconLeft?: React.ReactNode;
  /** Right icon */
  iconRight?: React.ReactNode;
  /** Press handler */
  onPress?: () => void;
  /** Accessibility label */
  accessibilityLabel?: string;
  /** Children (button text) */
  children: React.ReactNode;
  /** Style override (not recommended) */
  style?: ViewStyle;
  /** Text style override (not recommended) */
  textStyle?: TextStyle;
  /** Test ID */
  testID?: string;
}
