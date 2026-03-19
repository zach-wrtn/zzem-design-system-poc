import type { ViewStyle } from 'react-native';

export interface BottomSheetProps {
  /** Show/hide */
  visible: boolean;
  /** Dismiss handler */
  onDismiss: () => void;
  /** Title */
  title?: string;
  /** Content */
  children: React.ReactNode;
  /** Show drag handle */
  showHandle?: boolean;
  /** Style override */
  style?: ViewStyle;
  /** Test ID */
  testID?: string;
}
