import React, { forwardRef } from 'react';
import { View } from 'react-native';
import type { BoxProps } from './Box.types';

export const Box = forwardRef<View, BoxProps>(
  ({ style, children, ...props }, ref) => {
    return (
      <View ref={ref} style={style} {...props}>
        {children}
      </View>
    );
  },
);

Box.displayName = 'Box';
