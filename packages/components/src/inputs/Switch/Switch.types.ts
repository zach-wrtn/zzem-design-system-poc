import type { ViewStyle } from 'react-native';

export interface SwitchProps {
  /** On/off state */
  value: boolean;
  /** Change handler */
  onValueChange: (value: boolean) => void;
  /** Label text */
  label?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Accessibility label */
  accessibilityLabel?: string;
  /** Style override */
  style?: ViewStyle;
  /** Test ID */
  testID?: string;
}
