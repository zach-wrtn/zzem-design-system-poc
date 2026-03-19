import React, { forwardRef } from 'react';
import { Pressable as RNPressable, View } from 'react-native';
import { platform } from '@zzem-design-system/engine';
import type { ZDSPressableProps } from './Pressable.types';

export const Pressable = forwardRef<View, ZDSPressableProps>(
  ({ style, children, onPress, ...props }, ref) => {
    const handlePress = () => {
      if (onPress) {
        platform.haptic('medium');
        (onPress as () => void)();
      }
    };

    return (
      <RNPressable
        ref={ref}
        style={style as RNPressableProps['style']}
        onPress={handlePress}
        android_ripple={platform.isAndroid ? { color: 'rgba(0,0,0,0.1)' } : undefined}
        {...props}
      >
        {children}
      </RNPressable>
    );
  },
);

Pressable.displayName = 'Pressable';
