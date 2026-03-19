import type { ViewStyle } from 'react-native';

export interface DialogAction {
  /** Button label */
  label: string;
  /** Button variant */
  variant?: 'primary' | 'secondary' | 'danger';
  /** Press handler */
  onPress: () => void;
}

export interface DialogProps {
  /** Show/hide */
  visible: boolean;
  /** Dialog title */
  title: string;
  /** Dialog message */
  message?: string;
  /** Action buttons */
  actions?: DialogAction[];
  /** Dismiss handler (backdrop tap) */
  onDismiss?: () => void;
  /** Custom content */
  children?: React.ReactNode;
  /** Style override */
  style?: ViewStyle;
  /** Test ID */
  testID?: string;
}
