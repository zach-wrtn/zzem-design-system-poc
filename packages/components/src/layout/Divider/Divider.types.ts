import type { ViewStyle } from 'react-native';

export interface DividerProps {
  /** Orientation */
  orientation?: 'horizontal' | 'vertical';
  /** Style override */
  style?: ViewStyle;
  /** Test ID */
  testID?: string;
}
