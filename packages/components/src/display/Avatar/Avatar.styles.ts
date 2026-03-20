import { createStyles } from '@zzem-design-system/engine';
import type { AvatarSize } from './Avatar.types';

interface StyleParams {
  size: AvatarSize;
}

export const useStyles = createStyles(
  (tokens, { size }: StyleParams) => {
    const containerSize = tokens.component.avatar.sizes[size];
    const fontSize = tokens.component.avatar.fontSize[size];

    return {
      container: {
        width: containerSize,
        height: containerSize,
        borderRadius: tokens.radius.full,
        backgroundColor: tokens.color.background.tertiary,
        alignItems: 'center' as const,
        justifyContent: 'center' as const,
        overflow: 'hidden' as const,
      },
      image: {
        width: containerSize,
        height: containerSize,
      },
      initials: {
        fontSize,
        fontWeight: tokens.typography.fontWeight.semibold as '600',
        color: tokens.color.text.secondary,
      },
    };
  },
);
