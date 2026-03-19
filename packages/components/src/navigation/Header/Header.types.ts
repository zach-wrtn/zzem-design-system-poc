import type { ViewStyle } from 'react-native';

export interface HeaderProps {
  /** Page title */
  title: string;
  /** Left element (usually back button) */
  left?: React.ReactNode;
  /** Right element(s) */
  right?: React.ReactNode;
  /** Show bottom border */
  border?: boolean;
  /** Style override */
  style?: ViewStyle;
  /** Test ID */
  testID?: string;
}
