import type { PressableProps as RNPressableProps, ViewStyle } from 'react-native';

export interface ZDSPressableProps extends Omit<RNPressableProps, 'style'> {
  /** Style or style function */
  style?: ViewStyle | ((state: { pressed: boolean }) => ViewStyle);
  /** Children */
  children?: React.ReactNode | ((state: { pressed: boolean }) => React.ReactNode);
}
