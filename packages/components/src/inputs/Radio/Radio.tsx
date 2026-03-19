import React, { forwardRef } from 'react';
import { Pressable, View } from 'react-native';
import { Text } from '../../primitives/Text';
import { useStyles } from './Radio.styles';
import type { RadioGroupProps } from './Radio.types';

export const RadioGroup = forwardRef<View, RadioGroupProps>(
  (
    {
      options,
      value,
      onChange,
      label,
      direction = 'vertical',
      disabled = false,
      accessibilityLabel,
      style,
      testID,
    },
    ref,
  ) => {
    const styles = useStyles({ direction, disabled });

    return (
      <View
        ref={ref}
        style={[styles.container, style]}
        accessibilityRole="radiogroup"
        accessibilityLabel={accessibilityLabel ?? label}
        testID={testID}
      >
        {label && <Text style={styles.groupLabel}>{label}</Text>}
        <View style={styles.optionsContainer}>
          {options.map((option) => {
            const isSelected = option.value === value;
            const isDisabled = disabled || option.disabled;

            return (
              <Pressable
                key={option.value}
                style={styles.option}
                onPress={() => !isDisabled && onChange(option.value)}
                disabled={isDisabled}
                accessibilityRole="radio"
                accessibilityLabel={option.label}
                accessibilityState={{ selected: isSelected, disabled: isDisabled }}
              >
                <View style={[styles.radio, isSelected && styles.radioSelected]}>
                  {isSelected && <View style={styles.radioDot} />}
                </View>
                <Text style={styles.optionLabel}>{option.label}</Text>
              </Pressable>
            );
          })}
        </View>
      </View>
    );
  },
);

RadioGroup.displayName = 'RadioGroup';
