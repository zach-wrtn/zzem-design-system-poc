import type { ViewStyle, FlexAlignType } from 'react-native';

export interface StackProps {
  /** Direction of stack */
  direction?: 'horizontal' | 'vertical';
  /** Gap between items (spacing token key) */
  gap?: number;
  /** Alignment */
  align?: FlexAlignType;
  /** Justify content */
  justify?: ViewStyle['justifyContent'];
  /** Wrap behavior */
  wrap?: boolean;
  /** Style override */
  style?: ViewStyle;
  /** Children */
  children?: React.ReactNode;
  /** Test ID */
  testID?: string;
}
