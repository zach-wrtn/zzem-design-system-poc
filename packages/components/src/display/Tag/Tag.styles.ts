import { createStyles } from '@zzem-design-system/engine';
import type { TagVariant } from './Tag.types';

interface StyleParams {
  variant: TagVariant;
}

export const useStyles = createStyles(
  (tokens, { variant }: StyleParams) => {
    const variantColors: Record<string, { bg: string; text: string; border: string }> = {
      default: {
        bg: tokens.color.background.tertiary,
        text: tokens.color.text.primary,
        border: tokens.color.border.default,
      },
      primary: {
        bg: tokens.color.status.infoBg,
        text: tokens.color.interactive.primary,
        border: tokens.color.interactive.primary,
      },
      success: {
        bg: tokens.color.status.successBg,
        text: tokens.color.status.success,
        border: tokens.color.status.success,
      },
      warning: {
        bg: tokens.color.status.warningBg,
        text: tokens.color.status.warning,
        border: tokens.color.status.warning,
      },
      danger: {
        bg: tokens.color.status.dangerBg,
        text: tokens.color.status.danger,
        border: tokens.color.status.danger,
      },
    };

    const colors = variantColors[variant];

    return {
      container: {
        flexDirection: 'row' as const,
        alignItems: 'center' as const,
        alignSelf: 'flex-start' as const,
        backgroundColor: colors.bg,
        borderRadius: tokens.radius.sm,
        borderWidth: 1,
        borderColor: colors.border,
        paddingHorizontal: tokens.spacing[4],
        paddingVertical: tokens.spacing[1],
      },
      label: {
        fontSize: tokens.typography.fontSize.xs,
        lineHeight: tokens.typography.lineHeight.xs,
        fontWeight: tokens.typography.fontWeight.medium as '500',
        color: colors.text,
      },
      closeButton: {
        marginLeft: tokens.spacing[2],
        width: tokens.component.tag.closeButton.size,
        height: tokens.component.tag.closeButton.size,
        borderRadius: tokens.radius.full,
        alignItems: 'center' as const,
        justifyContent: 'center' as const,
      },
      closeIcon: {
        fontSize: tokens.component.tag.closeButton.fontSize,
        color: colors.text,
        fontWeight: tokens.typography.fontWeight.bold as '700',
      },
    };
  },
);
