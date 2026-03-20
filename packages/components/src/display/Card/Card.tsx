import React, { forwardRef } from 'react';
import { View, Pressable } from 'react-native';
import { useStyles } from './Card.styles';
import type { CardProps } from './Card.types';

export const Card = forwardRef<View, CardProps>(
  ({ children, onPress, accessibilityLabel, style, testID }, ref) => {
    const styles = useStyles({});

    if (onPress) {
      return (
        <Pressable
          ref={ref}
          style={({ pressed }) => [
            styles.card,
            pressed && styles.pressed,
            style,
          ]}
          onPress={onPress}
          accessibilityRole="button"
          accessibilityLabel={accessibilityLabel}
          testID={testID}
        >
          {children}
        </Pressable>
      );
    }

    return (
      <View
        ref={ref}
        style={[styles.card, style]}
        accessibilityLabel={accessibilityLabel}
        testID={testID}
      >
        {children}
      </View>
    );
  },
);

Card.displayName = 'Card';
