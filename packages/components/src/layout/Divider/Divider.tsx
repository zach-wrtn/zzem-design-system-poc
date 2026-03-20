import React from 'react';
import { View } from 'react-native';
import { useTheme } from '@zzem-design-system/engine';
import type { DividerProps } from './Divider.types';

export const Divider = ({
  orientation = 'horizontal',
  style,
  testID,
}: DividerProps) => {
  const { tokens } = useTheme();
  const isHorizontal = orientation === 'horizontal';

  return (
    <View
      style={[
        {
          backgroundColor: tokens.component.divider.color,
          ...(isHorizontal
            ? { height: tokens.component.divider.thickness, width: '100%' as const }
            : { width: tokens.component.divider.thickness, height: '100%' as const }),
        },
        style,
      ]}
      accessibilityRole="none"
      testID={testID}
    />
  );
};

Divider.displayName = 'Divider';
