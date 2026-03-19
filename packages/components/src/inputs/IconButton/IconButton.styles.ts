import { createStyles } from '@zzem-design-system/engine';
import type { IconButtonVariant, IconButtonSize } from './IconButton.types';

interface StyleParams {
  variant: IconButtonVariant;
  size: IconButtonSize;
  disabled: boolean;
}

const sizeMap = {
  sm: { size: 32, iconSize: 16 },
  md: { size: 40, iconSize: 20 },
  lg: { size: 48, iconSize: 24 },
};

export const useStyles = createStyles(
  (tokens, { variant, size, disabled }: StyleParams) => {
    const sizeValues = sizeMap[size];

    const variantStyles = {
      filled: {
        backgroundColor: tokens.color.interactive.primary,
        borderWidth: 0,
        borderColor: 'transparent',
        iconColor: tokens.color.white,
      },
      outlined: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: tokens.color.border.default,
        iconColor: tokens.color.text.primary,
      },
      ghost: {
        backgroundColor: 'transparent',
        borderWidth: 0,
        borderColor: 'transparent',
        iconColor: tokens.color.text.primary,
      },
    };

    const vs = variantStyles[variant];

    return {
      container: {
        width: sizeValues.size,
        height: sizeValues.size,
        borderRadius: tokens.radius.full,
        backgroundColor: vs.backgroundColor,
        borderWidth: vs.borderWidth,
        borderColor: vs.borderColor,
        alignItems: 'center' as const,
        justifyContent: 'center' as const,
        opacity: disabled ? tokens.opacity.disabled : 1,
      },
      pressed: {
        opacity: tokens.opacity.pressed,
      },
      iconColor: vs.iconColor,
      iconSize: sizeValues.iconSize,
    };
  },
);
