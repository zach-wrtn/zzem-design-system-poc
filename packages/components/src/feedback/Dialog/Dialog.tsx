import React from 'react';
import { View, Pressable, Modal } from 'react-native';
import { Text } from '../../primitives/Text';
import { useStyles } from './Dialog.styles';
import type { DialogProps } from './Dialog.types';

export const Dialog = ({
  visible,
  title,
  message,
  actions = [],
  onDismiss,
  children,
  style,
  testID,
}: DialogProps) => {
  const styles = useStyles({});

  if (!visible) return null;

  const getActionStyle = (variant: string = 'secondary') => {
    switch (variant) {
      case 'primary': return styles.actionPrimary;
      case 'danger': return styles.actionDanger;
      default: return styles.actionSecondary;
    }
  };

  const getActionTextStyle = (variant: string = 'secondary') => {
    switch (variant) {
      case 'primary': return styles.actionTextPrimary;
      case 'danger': return styles.actionTextDanger;
      default: return styles.actionTextSecondary;
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onDismiss}
    >
      <Pressable
        style={styles.overlay}
        onPress={onDismiss}
        accessibilityRole="none"
      >
        <Pressable
          style={[styles.container, style]}
          onPress={(e) => e.stopPropagation()}
          accessibilityRole="alert"
          accessibilityLabel={title}
          testID={testID}
        >
          <Text style={styles.title}>{title}</Text>
          {message && <Text style={styles.message}>{message}</Text>}
          {children}
          {actions.length > 0 && (
            <View style={styles.actions}>
              {actions.map((action) => (
                <Pressable
                  key={action.label}
                  style={[styles.actionButton, getActionStyle(action.variant)]}
                  onPress={action.onPress}
                  accessibilityRole="button"
                  accessibilityLabel={action.label}
                >
                  <Text style={getActionTextStyle(action.variant)}>
                    {action.label}
                  </Text>
                </Pressable>
              ))}
            </View>
          )}
        </Pressable>
      </Pressable>
    </Modal>
  );
};

Dialog.displayName = 'Dialog';
