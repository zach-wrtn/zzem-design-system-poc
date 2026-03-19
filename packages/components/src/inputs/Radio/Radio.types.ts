import type { ViewStyle } from 'react-native';

export interface RadioOption {
  /** Option value */
  value: string;
  /** Option label */
  label: string;
  /** Disabled state for this option */
  disabled?: boolean;
}

export interface RadioGroupProps {
  /** Available options */
  options: RadioOption[];
  /** Selected value */
  value: string;
  /** Change handler */
  onChange: (value: string) => void;
  /** Group label */
  label?: string;
  /** Layout direction */
  direction?: 'vertical' | 'horizontal';
  /** Disabled state for all options */
  disabled?: boolean;
  /** Accessibility label */
  accessibilityLabel?: string;
  /** Style override */
  style?: ViewStyle;
  /** Test ID */
  testID?: string;
}
