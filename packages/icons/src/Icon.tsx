import React from 'react';
import { View } from 'react-native';
import { tokens } from '@zzem-design-system/tokens/output/tokens';

export interface IconProps {
  /** Icon name */
  name: string;
  /** Icon size */
  size?: number;
  /** Icon color (semantic token value) */
  color?: string;
  /** Accessibility label */
  accessibilityLabel?: string;
  /** Test ID */
  testID?: string;
}

/**
 * Generic Icon component.
 * For type-safe icons, use the generated icon components from @zzem-design-system/icons.
 */
export const Icon = ({
  name,
  size = 24,
  color = tokens.color.text.primary,
  accessibilityLabel,
  testID,
}: IconProps) => {
  return (
    <View
      style={{ width: size, height: size }}
      accessibilityRole="image"
      accessibilityLabel={accessibilityLabel ?? name}
      testID={testID}
    />
  );
};

Icon.displayName = 'Icon';
