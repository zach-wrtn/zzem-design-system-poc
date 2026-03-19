import React, { forwardRef } from 'react';
import { Pressable, View } from 'react-native';
import { Text } from '../../primitives/Text';
import { useStyles } from './Checkbox.styles';
import type { CheckboxProps } from './Checkbox.types';

export const Checkbox = forwardRef<View, CheckboxProps>(
  (
    {
      checked,
      onChange,
      label,
      disabled = false,
      accessibilityLabel,
      style,
      testID,
    },
    ref,
  ) => {
    const styles = useStyles({ checked, disabled });

    return (
      <Pressable
        ref={ref}
        style={[styles.container, style]}
        onPress={() => !disabled && onChange(!checked)}
        disabled={disabled}
        accessibilityRole="checkbox"
        accessibilityLabel={accessibilityLabel ?? label}
        accessibilityState={{ checked, disabled }}
        testID={testID}
      >
        <View style={styles.checkbox}>
          {checked && <View style={styles.checkmark} />}
        </View>
        {label && <Text style={styles.label}>{label}</Text>}
      </Pressable>
    );
  },
);

Checkbox.displayName = 'Checkbox';
