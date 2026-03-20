import React, { forwardRef } from 'react';
import { View, Platform, StatusBar } from 'react-native';
import { useTheme } from '@zzem-design-system/engine';
import type { SafeAreaProps } from './SafeArea.types';

// Fallback safe area insets (for use without react-native-safe-area-context)
const DEFAULT_INSETS = {
  top: Platform.OS === 'ios' ? 44 : (StatusBar.currentHeight ?? 0),
  bottom: Platform.OS === 'ios' ? 34 : 0,
  left: 0,
  right: 0,
};

export const SafeArea = forwardRef<View, SafeAreaProps>(
  (
    {
      edges = ['top', 'bottom'],
      backgroundColor,
      children,
      style,
      testID,
    },
    ref,
  ) => {
    const { tokens } = useTheme();
    const bgColor = backgroundColor ?? tokens.color.background.primary;

    const paddingStyle = {
      paddingTop: edges.includes('top') ? DEFAULT_INSETS.top : 0,
      paddingBottom: edges.includes('bottom') ? DEFAULT_INSETS.bottom : 0,
      paddingLeft: edges.includes('left') ? DEFAULT_INSETS.left : 0,
      paddingRight: edges.includes('right') ? DEFAULT_INSETS.right : 0,
    };

    return (
      <View
        ref={ref}
        style={[
          {
            flex: 1,
            backgroundColor: bgColor,
          },
          paddingStyle,
          style,
        ]}
        testID={testID}
      >
        {children}
      </View>
    );
  },
);

SafeArea.displayName = 'SafeArea';
