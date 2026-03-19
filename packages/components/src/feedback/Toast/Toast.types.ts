import type { ViewStyle } from 'react-native';

export type ToastVariant = 'info' | 'success' | 'warning' | 'danger';
export type ToastPosition = 'top' | 'bottom';

export interface ToastProps {
  /** Toast message */
  message: string;
  /** Toast variant */
  variant?: ToastVariant;
  /** Position */
  position?: ToastPosition;
  /** Show/hide */
  visible: boolean;
  /** Auto-dismiss duration (ms), 0 to disable */
  duration?: number;
  /** Dismiss handler */
  onDismiss?: () => void;
  /** Action button label */
  actionLabel?: string;
  /** Action handler */
  onAction?: () => void;
  /** Style override */
  style?: ViewStyle;
  /** Test ID */
  testID?: string;
}
