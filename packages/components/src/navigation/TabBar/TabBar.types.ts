import type { ViewStyle } from 'react-native';

export interface TabBarItem {
  /** Tab key */
  key: string;
  /** Tab label */
  label: string;
  /** Tab icon */
  icon?: React.ReactNode;
  /** Active tab icon */
  activeIcon?: React.ReactNode;
  /** Badge count */
  badge?: number;
}

export interface TabBarProps {
  /** Tab items */
  items: TabBarItem[];
  /** Active tab key */
  activeKey: string;
  /** Tab change handler */
  onChange: (key: string) => void;
  /** Style override */
  style?: ViewStyle;
  /** Test ID */
  testID?: string;
}
