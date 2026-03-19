import React, { useEffect } from 'react';
import { View, Pressable } from 'react-native';
import { Text } from '../../primitives/Text';
import { useStyles } from './Snackbar.styles';
import type { SnackbarProps } from './Snackbar.types';

export const Snackbar = ({
  message,
  visible,
  duration = 4000,
  onDismiss,
  actionLabel,
  onAction,
  style,
  testID,
}: SnackbarProps) => {
  const styles = useStyles({});

  useEffect(() => {
    if (visible && duration > 0 && onDismiss) {
      const timer = setTimeout(onDismiss, duration);
      return () => clearTimeout(timer);
    }
  }, [visible, duration, onDismiss]);

  if (!visible) return null;

  return (
    <View style={[styles.wrapper, style]} testID={testID}>
      <View
        style={styles.container}
        accessibilityRole="alert"
        accessibilityLiveRegion="polite"
      >
        <Text style={styles.message}>{message}</Text>
        {actionLabel && onAction && (
          <Pressable onPress={onAction} hitSlop={8}>
            <Text style={styles.action}>{actionLabel}</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
};

Snackbar.displayName = 'Snackbar';
