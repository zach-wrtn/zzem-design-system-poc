import React, { forwardRef } from 'react';
import { View, Pressable } from 'react-native';
import { Text } from '../../primitives/Text';
import { useStyles } from './NavigationBar.styles';
import type { NavigationBarProps } from './NavigationBar.types';

export const NavigationBar = forwardRef<View, NavigationBarProps>(
  (
    {
      title,
      largeTitle = false,
      leftAction,
      rightActions,
      transparent = false,
      style,
      testID,
    },
    ref,
  ) => {
    const styles = useStyles({ transparent, largeTitle });

    return (
      <View ref={ref} style={[styles.container, style]} accessibilityRole="header" testID={testID}>
        <View style={styles.topBar}>
          {leftAction ? (
            <Pressable
              style={styles.leftAction}
              onPress={leftAction.onPress}
              accessibilityRole="button"
              accessibilityLabel={leftAction.label ?? '뒤로'}
            >
              {leftAction.icon}
              {leftAction.label && (
                <Text style={styles.leftLabel}>{leftAction.label}</Text>
              )}
            </Pressable>
          ) : (
            <View style={styles.leftAction} />
          )}

          {!largeTitle && title && (
            <View style={styles.centerTitle}>
              <Text style={styles.smallTitle} numberOfLines={1}>
                {title}
              </Text>
            </View>
          )}

          <View style={styles.rightActions}>
            {rightActions?.map((action, index) => (
              <Pressable
                key={index}
                style={styles.rightButton}
                onPress={action.onPress}
                accessibilityRole="button"
                accessibilityLabel={action.label}
              >
                {action.icon ?? (
                  <Text style={styles.rightLabel}>{action.label}</Text>
                )}
              </Pressable>
            ))}
          </View>
        </View>

        {largeTitle && title && (
          <View style={styles.largeTitleContainer}>
            <Text style={styles.largeTitleText}>{title}</Text>
          </View>
        )}
      </View>
    );
  },
);

NavigationBar.displayName = 'NavigationBar';
