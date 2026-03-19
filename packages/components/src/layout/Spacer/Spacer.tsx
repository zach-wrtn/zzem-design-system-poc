import React from 'react';
import { View } from 'react-native';
import type { SpacerProps } from './Spacer.types';

export const Spacer = ({
  size,
  direction = 'vertical',
  testID,
}: SpacerProps) => {
  return (
    <View
      style={
        direction === 'vertical'
          ? { height: size }
          : { width: size }
      }
      testID={testID}
    />
  );
};

Spacer.displayName = 'Spacer';
