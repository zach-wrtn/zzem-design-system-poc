import React, { useEffect } from 'react';
import { View, Pressable } from 'react-native';
import { Text } from '../../primitives/Text';
import { useStyles } from './Toast.styles';
import type { ToastProps } from './Toast.types';

export const Toast = ({
  message,
  variant = 'info',
  position = 'bottom',
  visible,
  duration = 3000,
  onDismiss,
  actionLabel,
  onAction,
  style,
  testID,
}: ToastProps) => {
  const styles = useStyles({ variant, position });

  useEffect(() => {
    if (visible && duration > 0 && onDismiss) {
      const timer = setTimeout(onDismiss, duration);
      return () => clearTimeout(timer);
    }
  }, [visible, duration, onDismiss]);

  if (!visible) return null;

  return (
    <View style={[styles.wrapper, style]} testID={testID}>
      <Pressable
        style={styles.container}
        onPress={onDismiss}
        accessibilityRole="alert"
        accessibilityLiveRegion="polite"
      >
        <View style={styles.indicator} />
        <Text style={styles.message}>{message}</Text>
        {actionLabel && onAction && (
          <Pressable onPress={onAction} hitSlop={8}>
            <Text style={styles.action}>{actionLabel}</Text>
          </Pressable>
        )}
      </Pressable>
    </View>
  );
};

Toast.displayName = 'Toast';
