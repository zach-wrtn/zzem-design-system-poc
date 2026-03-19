import React, { forwardRef } from 'react';
import { Pressable, View, ActivityIndicator } from 'react-native';
import { useTheme } from '@zzem-design-system/engine';
import { Text } from '../../primitives/Text';
import { useStyles } from './Button.styles';
import type { ButtonProps } from './Button.types';

export const Button = forwardRef<View, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      disabled = false,
      loading = false,
      fullWidth = false,
      iconLeft,
      iconRight,
      onPress,
      accessibilityLabel,
      children,
      style,
      textStyle,
      testID,
    },
    ref,
  ) => {
    const theme = useTheme();
    const styles = useStyles({ variant, size, disabled, fullWidth });

    const isDisabled = disabled || loading;

    return (
      <Pressable
        ref={ref}
        style={({ pressed }) => [
          styles.container,
          pressed && !isDisabled && styles.pressed,
          style,
        ]}
        disabled={isDisabled}
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}
        accessibilityState={{ disabled: isDisabled, busy: loading }}
        testID={testID}
      >
        {loading ? (
          <ActivityIndicator
            size="small"
            color={styles.loaderColor}
          />
        ) : (
          <>
            {iconLeft && <View style={styles.iconLeft}>{iconLeft}</View>}
            <Text style={[styles.label, textStyle]}>{children}</Text>
            {iconRight && <View style={styles.iconRight}>{iconRight}</View>}
          </>
        )}
      </Pressable>
    );
  },
);

Button.displayName = 'Button';
