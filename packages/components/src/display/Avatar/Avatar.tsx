import React, { forwardRef } from 'react';
import { View, Image } from 'react-native';
import { Text } from '../../primitives/Text';
import { useStyles } from './Avatar.styles';
import type { AvatarProps } from './Avatar.types';

export const Avatar = forwardRef<View, AvatarProps>(
  (
    {
      source,
      initials,
      size = 'md',
      accessibilityLabel,
      style,
      testID,
    },
    ref,
  ) => {
    const styles = useStyles({ size });

    return (
      <View
        ref={ref}
        style={[styles.container, style]}
        accessibilityRole="image"
        accessibilityLabel={accessibilityLabel ?? initials ?? 'Avatar'}
        testID={testID}
      >
        {source ? (
          <Image source={source} style={styles.image} />
        ) : initials ? (
          <Text style={styles.initials}>
            {initials.slice(0, 2).toUpperCase()}
          </Text>
        ) : null}
      </View>
    );
  },
);

Avatar.displayName = 'Avatar';
