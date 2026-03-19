import type { ViewStyle } from 'react-native';

export interface NavigationBarProps {
  /** Title */
  title?: string;
  /** Large title mode */
  largeTitle?: boolean;
  /** Left action (e.g., back) */
  leftAction?: {
    label?: string;
    icon?: React.ReactNode;
    onPress: () => void;
  };
  /** Right actions */
  rightActions?: Array<{
    label?: string;
    icon?: React.ReactNode;
    onPress: () => void;
  }>;
  /** Background transparent */
  transparent?: boolean;
  /** Style override */
  style?: ViewStyle;
  /** Test ID */
  testID?: string;
}
