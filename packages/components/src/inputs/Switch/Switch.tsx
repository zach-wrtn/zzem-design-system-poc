import React, { forwardRef } from 'react';
import { Pressable, View } from 'react-native';
import { Text } from '../../primitives/Text';
import { useStyles } from './Switch.styles';
import type { SwitchProps } from './Switch.types';

export const Switch = forwardRef<View, SwitchProps>(
  (
    {
      value,
      onValueChange,
      label,
      disabled = false,
      accessibilityLabel,
      style,
      testID,
    },
    ref,
  ) => {
    const styles = useStyles({ value, disabled });

    return (
      <Pressable
        ref={ref}
        style={[styles.container, style]}
        onPress={() => !disabled && onValueChange(!value)}
        disabled={disabled}
        accessibilityRole="switch"
        accessibilityLabel={accessibilityLabel ?? label}
        accessibilityState={{ checked: value, disabled }}
        testID={testID}
      >
        <View style={styles.track}>
          <View style={styles.thumb} />
        </View>
        {label && <Text style={styles.label}>{label}</Text>}
      </Pressable>
    );
  },
);

Switch.displayName = 'Switch';
