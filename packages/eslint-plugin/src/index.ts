import { noHardcodedColors } from './rules/no-hardcoded-colors';
import { noHardcodedSpacing } from './rules/no-hardcoded-spacing';
import { noInlineStyles } from './rules/no-inline-styles';
import { useDesignTokens } from './rules/use-design-tokens';
import { validComponentProps } from './rules/valid-component-props';

export const rules = {
  'no-hardcoded-colors': noHardcodedColors,
  'no-hardcoded-spacing': noHardcodedSpacing,
  'no-inline-styles': noInlineStyles,
  'use-design-tokens': useDesignTokens,
  'valid-component-props': validComponentProps,
};

export const configs = {
  recommended: {
    plugins: ['@zzem-design-system'],
    rules: {
      '@zzem-design-system/no-hardcoded-colors': 'error',
      '@zzem-design-system/no-hardcoded-spacing': 'warn',
      '@zzem-design-system/no-inline-styles': 'warn',
      '@zzem-design-system/use-design-tokens': 'error',
      '@zzem-design-system/valid-component-props': 'error',
    },
  },
};
