import React from 'react';
import { View } from 'react-native';
import { tokens } from '@zzem-design-system/tokens/output/tokens';
import type { DividerProps } from './Divider.types';

export const Divider = ({
  orientation = 'horizontal',
  style,
  testID,
}: DividerProps) => {
  const isHorizontal = orientation === 'horizontal';

  return (
    <View
      style={[
        {
          backgroundColor: tokens.color.border.default,
          ...(isHorizontal
            ? { height: 1, width: '100%' as const }
            : { width: 1, height: '100%' as const }),
        },
        style,
      ]}
      accessibilityRole="none"
      testID={testID}
    />
  );
};

Divider.displayName = 'Divider';
