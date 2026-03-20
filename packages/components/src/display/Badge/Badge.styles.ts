import { createStyles } from '@zzem-design-system/engine';
import type { BadgeVariant, BadgeSize } from './Badge.types';

interface StyleParams {
  variant: BadgeVariant;
  size: BadgeSize;
}

export const useStyles = createStyles(
  (tokens, { variant, size }: StyleParams) => {
    const variantColors: Record<string, { bg: string; text: string }> = {
      default: { bg: tokens.component.badge.default.background, text: tokens.component.badge.default.text },
      success: { bg: tokens.component.badge.success.background, text: tokens.component.badge.success.text },
      warning: { bg: tokens.component.badge.warning.background, text: tokens.component.badge.warning.text },
      danger: { bg: tokens.component.badge.danger.background, text: tokens.component.badge.danger.text },
      info: { bg: tokens.component.badge.info.background, text: tokens.component.badge.info.text },
    };

    const colors = variantColors[variant];
    const sizeTokens = tokens.component.badge.size[size];

    return {
      container: {
        backgroundColor: colors.bg,
        borderRadius: tokens.component.badge.radius,
        paddingHorizontal: sizeTokens.paddingHorizontal,
        paddingVertical: sizeTokens.paddingVertical,
        alignSelf: 'flex-start' as const,
      },
      label: {
        color: colors.text,
      },
    };
  },
);
