import React from 'react';
import { View, Pressable, Modal, ScrollView } from 'react-native';
import { Text } from '../../primitives/Text';
import { useStyles } from './BottomSheet.styles';
import type { BottomSheetProps } from './BottomSheet.types';

export const BottomSheet = ({
  visible,
  onDismiss,
  title,
  children,
  showHandle = true,
  style,
  testID,
}: BottomSheetProps) => {
  const styles = useStyles({});

  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onDismiss}
    >
      <Pressable style={styles.overlay} onPress={onDismiss}>
        <Pressable
          style={[styles.container, style]}
          onPress={(e) => e.stopPropagation()}
          accessibilityRole="none"
          testID={testID}
        >
          {showHandle && <View style={styles.handle} />}
          {title && (
            <View style={styles.header}>
              <Text style={styles.title}>{title}</Text>
            </View>
          )}
          <ScrollView style={styles.content}>
            {children}
          </ScrollView>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

BottomSheet.displayName = 'BottomSheet';
