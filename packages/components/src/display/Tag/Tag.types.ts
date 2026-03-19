import type { ViewStyle } from 'react-native';

export type TagVariant = 'default' | 'primary' | 'success' | 'warning' | 'danger';

export interface TagProps {
  /** Tag label */
  label: string;
  /** Tag variant */
  variant?: TagVariant;
  /** Show close button */
  closable?: boolean;
  /** Close handler */
  onClose?: () => void;
  /** Accessibility label */
  accessibilityLabel?: string;
  /** Style override */
  style?: ViewStyle;
  /** Test ID */
  testID?: string;
}
