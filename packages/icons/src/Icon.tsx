import React from 'react';
import { View } from 'react-native';
import { useTheme } from '@zzem-design-system/engine';
import { iconRegistry, type IconName } from './registry';

export interface IconProps {
  /** Icon name from the registry */
  name: IconName;
  /** Icon size in pixels */
  size?: number;
  /** Icon color (defaults to text.primary token) */
  color?: string;
  /** Accessibility label */
  accessibilityLabel?: string;
  /** Test ID */
  testID?: string;
}

/**
 * Renders an icon from the zzem-design-system icon registry.
 *
 * Usage:
 * ```tsx
 * import { Icon } from '@zzem-design-system/icons';
 * <Icon name="search" size={24} />
 * ```
 */
export const Icon = ({
  name,
  size = 24,
  color,
  accessibilityLabel,
  testID,
}: IconProps) => {
  const { tokens } = useTheme();
  const resolvedColor = color ?? tokens.color.text.primary;
  const SvgComponent = iconRegistry[name];

  if (!SvgComponent) {
    return (
      <View
        style={{ width: size, height: size }}
        accessibilityRole="image"
        accessibilityLabel={accessibilityLabel ?? name}
        testID={testID}
      />
    );
  }

  return (
    <View
      accessibilityRole="image"
      accessibilityLabel={accessibilityLabel ?? name}
      testID={testID}
    >
      <SvgComponent width={size} height={size} color={resolvedColor} />
    </View>
  );
};

Icon.displayName = 'Icon';
