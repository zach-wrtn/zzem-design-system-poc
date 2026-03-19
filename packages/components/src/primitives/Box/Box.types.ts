import type { ViewProps, ViewStyle } from 'react-native';

export interface BoxProps extends ViewProps {
  /** Style override */
  style?: ViewStyle;
  /** Children */
  children?: React.ReactNode;
}
