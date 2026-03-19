import React, { forwardRef } from 'react';
import { View } from 'react-native';
import type { StackProps } from './Stack.types';

export const Stack = forwardRef<View, StackProps>(
  (
    {
      direction = 'vertical',
      gap = 0,
      align,
      justify,
      wrap = false,
      style,
      children,
      testID,
    },
    ref,
  ) => {
    return (
      <View
        ref={ref}
        style={[
          {
            flexDirection: direction === 'horizontal' ? 'row' : 'column',
            gap,
            alignItems: align,
            justifyContent: justify,
            flexWrap: wrap ? 'wrap' : 'nowrap',
          },
          style,
        ]}
        testID={testID}
      >
        {children}
      </View>
    );
  },
);

Stack.displayName = 'Stack';

export const HStack = forwardRef<View, Omit<StackProps, 'direction'>>(
  (props, ref) => <Stack ref={ref} direction="horizontal" {...props} />,
);
HStack.displayName = 'HStack';

export const VStack = forwardRef<View, Omit<StackProps, 'direction'>>(
  (props, ref) => <Stack ref={ref} direction="vertical" {...props} />,
);
VStack.displayName = 'VStack';
