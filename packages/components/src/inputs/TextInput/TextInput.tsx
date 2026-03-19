import React, { forwardRef, useState } from 'react';
import { TextInput as RNTextInput, View } from 'react-native';
import { tokens } from '@zzem-design-system/tokens/output/tokens';
import { Text } from '../../primitives/Text';
import { useStyles } from './TextInput.styles';
import type { TextInputProps } from './TextInput.types';

export const TextInput = forwardRef<RNTextInput, TextInputProps>(
  (
    {
      size = 'md',
      label,
      helperText,
      error,
      disabled = false,
      iconLeft,
      iconRight,
      style,
      testID,
      onFocus,
      onBlur,
      ...props
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const hasError = !!error;
    const styles = useStyles({ size, disabled, hasError, isFocused });

    const handleFocus = (e: any) => {
      setIsFocused(true);
      onFocus?.(e);
    };

    const handleBlur = (e: any) => {
      setIsFocused(false);
      onBlur?.(e);
    };

    return (
      <View style={[styles.container, style]} testID={testID}>
        {label && (
          <Text style={styles.label}>{label}</Text>
        )}
        <View style={styles.inputContainer}>
          {iconLeft && <View style={styles.iconLeft}>{iconLeft}</View>}
          <RNTextInput
            ref={ref}
            style={styles.input}
            editable={!disabled}
            placeholderTextColor={tokens.component.input.text.placeholder}
            onFocus={handleFocus}
            onBlur={handleBlur}
            accessibilityLabel={label}
            accessibilityState={{ disabled }}
            {...props}
          />
          {iconRight && <View style={styles.iconRight}>{iconRight}</View>}
        </View>
        {error && <Text style={styles.errorText}>{error}</Text>}
        {!error && helperText && <Text style={styles.helperText}>{helperText}</Text>}
      </View>
    );
  },
);

TextInput.displayName = 'TextInput';
