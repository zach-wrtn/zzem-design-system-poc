import type { TextInputProps as RNTextInputProps, ViewStyle } from 'react-native';

export type TextInputSize = 'sm' | 'md' | 'lg';

export interface TextInputProps extends Omit<RNTextInputProps, 'style'> {
  /** Input size */
  size?: TextInputSize;
  /** Label text */
  label?: string;
  /** Helper text */
  helperText?: string;
  /** Error message */
  error?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Left icon */
  iconLeft?: React.ReactNode;
  /** Right icon */
  iconRight?: React.ReactNode;
  /** Container style override */
  style?: ViewStyle;
  /** Test ID */
  testID?: string;
}
