import React, { forwardRef, useMemo } from 'react';
import { Text as RNText } from 'react-native';
import { useTheme } from '@zzem-design-system/engine';
import type { TextProps } from './Text.types';

type VariantConfig = {
  fontSize: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
  lineHeight: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
  fontWeight: 'regular' | 'medium' | 'semibold' | 'bold';
};

const variantMap: Record<string, VariantConfig> = {
  'heading-xl': { fontSize: '4xl', lineHeight: '4xl', fontWeight: 'bold' },
  'heading-lg': { fontSize: '3xl', lineHeight: '3xl', fontWeight: 'bold' },
  'heading-md': { fontSize: '2xl', lineHeight: '2xl', fontWeight: 'semibold' },
  'heading-sm': { fontSize: 'xl', lineHeight: 'xl', fontWeight: 'semibold' },
  'body-lg': { fontSize: 'lg', lineHeight: 'lg', fontWeight: 'regular' },
  'body-md': { fontSize: 'md', lineHeight: 'md', fontWeight: 'regular' },
  'body-sm': { fontSize: 'sm', lineHeight: 'sm', fontWeight: 'regular' },
  'label-lg': { fontSize: 'md', lineHeight: 'md', fontWeight: 'medium' },
  'label-md': { fontSize: 'sm', lineHeight: 'sm', fontWeight: 'medium' },
  'label-sm': { fontSize: 'xs', lineHeight: 'xs', fontWeight: 'medium' },
  'caption': { fontSize: 'xs', lineHeight: 'xs', fontWeight: 'regular' },
};

export const Text = forwardRef<RNText, TextProps>(
  ({ variant = 'body-md', color, align, style, children, ...props }, ref) => {
    const { tokens } = useTheme();
    const config = variantMap[variant];

    const variantStyle = useMemo(() => ({
      fontSize: tokens.typography.fontSize[config.fontSize],
      lineHeight: tokens.typography.lineHeight[config.lineHeight],
      fontWeight: tokens.typography.fontWeight[config.fontWeight] as TextProps['style'] extends { fontWeight?: infer W } ? W : never,
    }), [tokens, config]);

    return (
      <RNText
        ref={ref}
        style={[
          {
            fontSize: variantStyle.fontSize,
            lineHeight: variantStyle.lineHeight,
            fontWeight: variantStyle.fontWeight,
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
