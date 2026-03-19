import type { ViewStyle, ImageSourcePropType } from 'react-native';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface AvatarProps {
  /** Image source */
  source?: ImageSourcePropType;
  /** Fallback initials (1-2 characters) */
  initials?: string;
  /** Avatar size */
  size?: AvatarSize;
  /** Accessibility label */
  accessibilityLabel?: string;
  /** Style override */
  style?: ViewStyle;
  /** Test ID */
  testID?: string;
}
