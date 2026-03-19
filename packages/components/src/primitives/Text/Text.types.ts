import type { TextProps as RNTextProps, TextStyle } from 'react-native';

export type TextVariant = 'heading-xl' | 'heading-lg' | 'heading-md' | 'heading-sm' | 'body-lg' | 'body-md' | 'body-sm' | 'label-lg' | 'label-md' | 'label-sm' | 'caption';

export interface TextProps extends RNTextProps {
  /** Typography variant */
  variant?: TextVariant;
  /** Text color semantic token key */
  color?: string;
  /** Text alignment */
  align?: 'left' | 'center' | 'right';
  /** Style override */
  style?: TextStyle;
  /** Children */
  children?: React.ReactNode;
}
