import React, { forwardRef } from 'react';
import { View } from 'react-native';
import { Text } from '../../primitives/Text';
import { useStyles } from './Header.styles';
import type { HeaderProps } from './Header.types';

export const Header = forwardRef<View, HeaderProps>(
  ({ title, left, right, border = true, style, testID }, ref) => {
    const styles = useStyles({ border });

    return (
      <View
        ref={ref}
        style={[styles.container, style]}
        accessibilityRole="header"
        testID={testID}
      >
        <View style={styles.left}>{left}</View>
        <View style={styles.titleContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
        </View>
        <View style={styles.right}>{right}</View>
      </View>
    );
  },
);

Header.displayName = 'Header';
