import { createStyles } from '@zzem-design-system/engine';
import type { AvatarSize } from './Avatar.types';

interface StyleParams {
  size: AvatarSize;
}

const sizeMap = {
  xs: { container: 24, fontSize: 10 },
  sm: { container: 32, fontSize: 12 },
  md: { container: 40, fontSize: 16 },
  lg: { container: 56, fontSize: 20 },
  xl: { container: 72, fontSize: 28 },
};

export const useStyles = createStyles(
  (tokens, { size }: StyleParams) => {
    const sizeValues = sizeMap[size];

    return {
      container: {
        width: sizeValues.container,
        height: sizeValues.container,
        borderRadius: tokens.radius.full,
        backgroundColor: tokens.color.background.tertiary,
        alignItems: 'center' as const,
        justifyContent: 'center' as const,
        overflow: 'hidden' as const,
      },
      image: {
        width: sizeValues.container,
        height: sizeValues.container,
      },
      initials: {
        fontSize: sizeValues.fontSize,
        fontWeight: tokens.typography.fontWeight.semibold as '600',
        color: tokens.color.text.secondary,
      },
    };
  },
);
