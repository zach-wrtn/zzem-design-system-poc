import { createStyles } from '@zzem-design-system/engine';
import type { ToastVariant, ToastPosition } from './Toast.types';

interface StyleParams {
  variant: ToastVariant;
  position: ToastPosition;
}

export const useStyles = createStyles(
  (tokens, { variant, position }: StyleParams) => {
    const variantColors: Record<string, { bg: string; text: string; icon: string }> = {
      info: { bg: tokens.color.background.inverse, text: tokens.color.text.inverse, icon: tokens.color.status.info },
      success: { bg: tokens.color.background.inverse, text: tokens.color.text.inverse, icon: tokens.color.status.success },
      warning: { bg: tokens.color.background.inverse, text: tokens.color.text.inverse, icon: tokens.color.status.warning },
      danger: { bg: tokens.color.background.inverse, text: tokens.color.text.inverse, icon: tokens.color.status.danger },
    };

    const colors = variantColors[variant];

    return {
      wrapper: {
        position: 'absolute' as const,
        left: tokens.spacing[8],
        right: tokens.spacing[8],
        ...(position === 'top' ? { top: tokens.spacing[24] } : { bottom: tokens.spacing[24] }),
        zIndex: 9999,
      },
      container: {
        flexDirection: 'row' as const,
        alignItems: 'center' as const,
        backgroundColor: colors.bg,
        borderRadius: tokens.radius.md,
        paddingHorizontal: tokens.spacing[8],
        paddingVertical: tokens.spacing[6],
        ...tokens.component.toast.elevation,
      },
      indicator: {
        width: tokens.component.toast.indicator.width,
        height: tokens.component.toast.indicator.height,
        borderRadius: tokens.radius.xs,
        backgroundColor: colors.icon,
        marginRight: tokens.spacing[6],
      },
      message: {
        flex: 1,
        fontSize: tokens.typography.fontSize.sm,
        lineHeight: tokens.typography.lineHeight.sm,
        color: colors.text,
      },
      action: {
        marginLeft: tokens.spacing[6],
        fontSize: tokens.typography.fontSize.sm,
        fontWeight: tokens.typography.fontWeight.semibold as '600',
        color: colors.icon,
      },
    };
  },
);
