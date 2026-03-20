import React from 'react';
import { View } from 'react-native';
import { Text } from '../../primitives/Text';
import { useStyles } from './Badge.styles';
import type { BadgeProps } from './Badge.types';

export const Badge = ({
  variant = 'default',
  size = 'md',
  label,
  accessibilityLabel,
  style,
  testID,
}: BadgeProps) => {
  const styles = useStyles({ variant, size });
  const isSmall = size === 'sm';

  return (
    <View
      style={[styles.container, style]}
      accessibilityRole="text"
      accessibilityLabel={accessibilityLabel ?? label}
      testID={testID}
    >
      <Text
        variant={isSmall ? 'caption' : 'label-sm'}
        style={styles.label}
      >
        {label}
      </Text>
    </View>
  );
};

Badge.displayName = 'Badge';
