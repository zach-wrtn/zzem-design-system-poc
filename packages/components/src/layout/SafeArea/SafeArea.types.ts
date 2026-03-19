import type { ViewStyle } from 'react-native';

export interface SafeAreaProps {
  /** Which edges to apply safe area */
  edges?: Array<'top' | 'bottom' | 'left' | 'right'>;
  /** Background color */
  backgroundColor?: string;
  /** Children */
  children: React.ReactNode;
  /** Style override */
  style?: ViewStyle;
  /** Test ID */
  testID?: string;
}
