import React from 'react';
import { View, Pressable } from 'react-native';
import { Text } from '../../primitives/Text';
import { useStyles } from './Tag.styles';
import type { TagProps } from './Tag.types';

export const Tag = ({
  label,
  variant = 'default',
  closable = false,
  onClose,
  accessibilityLabel,
  style,
  testID,
}: TagProps) => {
  const styles = useStyles({ variant });

  return (
    <View
      style={[styles.container, style]}
      accessibilityRole="text"
      accessibilityLabel={accessibilityLabel ?? label}
      testID={testID}
    >
      <Text style={styles.label}>{label}</Text>
      {closable && (
        <Pressable
          style={styles.closeButton}
          onPress={onClose}
          accessibilityRole="button"
          accessibilityLabel={`${label} 삭제`}
          hitSlop={8}
        >
          <Text style={styles.closeIcon}>✕</Text>
        </Pressable>
      )}
    </View>
  );
};

Tag.displayName = 'Tag';
