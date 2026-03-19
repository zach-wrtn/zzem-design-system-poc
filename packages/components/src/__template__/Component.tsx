import React, { forwardRef } from 'react';
import { View } from 'react-native';
import { useTheme } from '@zzem-design-system/engine';
import { useStyles } from './Component.styles';
import type { ComponentProps } from './Component.types';

/**
 * TODO: Replace 'Component' with actual component name
 * TODO: Update accessibilityRole
 */
export const Component = forwardRef<View, ComponentProps>(
  (
    {
      variant = 'default',
      size = 'md',
      disabled = false,
      accessibilityLabel,
      children,
      style,
      testID,
    },
    ref,
  ) => {
    const theme = useTheme();
    const styles = useStyles({ variant, size, disabled });

    return (
      <View
        ref={ref}
        style={[styles.container, style]}
        accessibilityLabel={accessibilityLabel}
        testID={testID}
      >
        {children}
      </View>
    );
  },
);

Component.displayName = 'Component';
