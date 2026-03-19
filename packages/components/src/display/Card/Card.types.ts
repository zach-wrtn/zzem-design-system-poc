import type { ViewStyle } from 'react-native';

export interface CardProps {
  /** Children */
  children?: React.ReactNode;
  /** Pressable card */
  onPress?: () => void;
  /** Accessibility label */
  accessibilityLabel?: string;
  /** Style override */
  style?: ViewStyle;
  /** Test ID */
  testID?: string;
}
