import React, { forwardRef } from 'react';
import { Text as RNText } from 'react-native';
import { tokens } from '@zzem-design-system/tokens/output/tokens';
import type { TextProps } from './Text.types';

const variantStyles: Record<string, { fontSize: number; lineHeight: number; fontWeight: string }> = {
  'heading-xl': { fontSize: 36, lineHeight: 40, fontWeight: '700' },
  'heading-lg': { fontSize: 30, lineHeight: 36, fontWeight: '700' },
  'heading-md': { fontSize: 24, lineHeight: 32, fontWeight: '600' },
  'heading-sm': { fontSize: 20, lineHeight: 28, fontWeight: '600' },
  'body-lg': { fontSize: 18, lineHeight: 28, fontWeight: '400' },
  'body-md': { fontSize: 16, lineHeight: 24, fontWeight: '400' },
  'body-sm': { fontSize: 14, lineHeight: 20, fontWeight: '400' },
  'label-lg': { fontSize: 16, lineHeight: 24, fontWeight: '500' },
  'label-md': { fontSize: 14, lineHeight: 20, fontWeight: '500' },
  'label-sm': { fontSize: 12, lineHeight: 16, fontWeight: '500' },
  'caption': { fontSize: 12, lineHeight: 16, fontWeight: '400' },
};

export const Text = forwardRef<RNText, TextProps>(
  ({ variant = 'body-md', color, align, style, children, ...props }, ref) => {
    const variantStyle = variantStyles[variant];

    return (
      <RNText
        ref={ref}
        style={[
          {
            fontSize: variantStyle.fontSize,
            lineHeight: variantStyle.lineHeight,
            fontWeight: variantStyle.fontWeight as TextProps['style'] extends { fontWeight?: infer W } ? W : never,
            textAlign: align,
          },
          style,
        ]}
        {...props}
      >
        {children}
      </RNText>
    );
  },
);

Text.displayName = 'Text';
