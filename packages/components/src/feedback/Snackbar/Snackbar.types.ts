import type { ViewStyle } from 'react-native';

export interface SnackbarProps {
  /** Snackbar message */
  message: string;
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
