import { createStyles } from '@zzem-design-system/engine';
import type { ComponentVariant, ComponentSize } from './Component.types';

interface StyleParams {
  variant: ComponentVariant;
  size: ComponentSize;
  disabled: boolean;
}

export const useStyles = createStyles(
  (tokens, { variant, size, disabled }: StyleParams) => ({
    container: {
      // TODO: Use tokens for all values
      // backgroundColor: tokens.color.background.primary,
      // borderRadius: tokens.radius.md,
      // padding: tokens.spacing[8],
      opacity: disabled ? tokens.opacity.disabled : tokens.opacity.opaque,
    },
  }),
);
