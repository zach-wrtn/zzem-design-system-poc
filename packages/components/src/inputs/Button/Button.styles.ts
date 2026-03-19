import { createStyles } from '@zzem-design-system/engine';
import type { ButtonVariant, ButtonSize } from './Button.types';

interface StyleParams {
  variant: ButtonVariant;
  size: ButtonSize;
  disabled: boolean;
  fullWidth: boolean;
}

export const useStyles = createStyles(
  (tokens, { variant, size, disabled, fullWidth }: StyleParams) => {
    const variantTokens = tokens.component.button[variant];
    const sizeTokens = tokens.component.button.size[size];

    return {
      container: {
        flexDirection: 'row' as const,
        alignItems: 'center' as const,
        justifyContent: 'center' as const,
        height: sizeTokens.height,
        paddingHorizontal: sizeTokens.paddingHorizontal,
        backgroundColor: variantTokens.background.default,
        borderRadius: tokens.component.button.radius,
        borderWidth: variantTokens.border.width,
        borderColor: variantTokens.border.color,
        opacity: disabled ? tokens.opacity.disabled : 1,
        ...(fullWidth && { width: '100%' as const }),
      },
      pressed: {
        backgroundColor: variantTokens.background.pressed,
        opacity: tokens.opacity.pressed,
      },
      label: {
        fontSize: sizeTokens.fontSize,
        fontWeight: '600' as const,
        lineHeight: sizeTokens.lineHeight,
        color: variantTokens.label.default,
      },
      iconLeft: {
        marginRight: tokens.spacing[4],
      },
      iconRight: {
        marginLeft: tokens.spacing[4],
      },
      loaderColor: variantTokens.label.default,
    };
  },
);
