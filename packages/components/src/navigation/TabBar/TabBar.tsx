import React, { forwardRef } from 'react';
import { View, Pressable } from 'react-native';
import { Text } from '../../primitives/Text';
import { useStyles } from './TabBar.styles';
import type { TabBarProps } from './TabBar.types';

export const TabBar = forwardRef<View, TabBarProps>(
  ({ items, activeKey, onChange, style, testID }, ref) => {
    const styles = useStyles({ itemCount: items.length });

    return (
      <View
        ref={ref}
        style={[styles.container, style]}
        accessibilityRole="tablist"
        testID={testID}
      >
        {items.map((item) => {
          const isActive = item.key === activeKey;

          return (
            <Pressable
              key={item.key}
              style={styles.tab}
              onPress={() => onChange(item.key)}
              accessibilityRole="tab"
              accessibilityLabel={item.label}
              accessibilityState={{ selected: isActive }}
            >
              <View style={styles.iconContainer}>
                {isActive ? (item.activeIcon ?? item.icon) : item.icon}
                {item.badge !== undefined && item.badge > 0 && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>
                      {item.badge > 99 ? '99+' : String(item.badge)}
                    </Text>
                  </View>
                )}
              </View>
              <Text style={isActive ? styles.labelActive : styles.labelInactive}>
                {item.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    );
  },
);

TabBar.displayName = 'TabBar';
