import React, { forwardRef } from 'react';
import { Pressable, View } from 'react-native';
import type { IconButtonProps } from './IconButton.types';
import { useStyles } from './IconButton.styles';

export const IconButton = forwardRef<View, IconButtonProps>(
  (
    {
      variant = 'ghost',
      size = 'md',
      icon,
      disabled = false,
      onPress,
      accessibilityLabel,
      style,
      testID,
    },
    ref,
  ) => {
    const styles = useStyles({ variant, size, disabled });

    return (
      <Pressable
        ref={ref}
        style={({ pressed }) => [
          styles.container,
          pressed && !disabled && styles.pressed,
          style,
        ]}
        disabled={disabled}
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}
        accessibilityState={{ disabled }}
        testID={testID}
      >
        {icon}
      </Pressable>
    );
  },
);

IconButton.displayName = 'IconButton';
