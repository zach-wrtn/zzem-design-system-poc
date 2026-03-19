import React, { forwardRef } from 'react';
import { View, Pressable } from 'react-native';
import { tokens } from '@zzem-design-system/tokens/output/tokens';
import { platform } from '@zzem-design-system/engine';
import type { CardProps } from './Card.types';

const cardStyle = {
  backgroundColor: tokens.component.card.background,
  borderRadius: tokens.component.card.radius,
  borderWidth: tokens.component.card.border.width,
  borderColor: tokens.component.card.border.color,
  padding: tokens.component.card.padding,
  ...platform.select({
    ios: tokens.component.card.elevation,
    android: { elevation: (tokens.component.card.elevation as { elevation: number }).elevation },
  }),
};

export const Card = forwardRef<View, CardProps>(
  ({ children, onPress, accessibilityLabel, style, testID }, ref) => {
    if (onPress) {
      return (
        <Pressable
          ref={ref}
          style={({ pressed }) => [
            cardStyle,
            pressed && { opacity: tokens.opacity.pressed },
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
        style={[cardStyle, style]}
        accessibilityLabel={accessibilityLabel}
        testID={testID}
      >
        {children}
      </View>
    );
  },
);

Card.displayName = 'Card';
