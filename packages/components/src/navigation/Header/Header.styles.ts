import { createStyles } from '@zzem-design-system/engine';

interface StyleParams {
  border: boolean;
}

export const useStyles = createStyles(
  (tokens, { border }: StyleParams) => ({
    container: {
      flexDirection: 'row' as const,
      alignItems: 'center' as const,
      height: tokens.component.header.height,
      paddingHorizontal: tokens.spacing[8],
      backgroundColor: tokens.component.header.background,
      borderBottomWidth: border ? 1 : 0,
      borderBottomColor: tokens.component.header.border,
    },
    left: {
      minWidth: 40,
      alignItems: 'flex-start' as const,
    },
    titleContainer: {
      flex: 1,
      alignItems: 'center' as const,
    },
    title: {
      fontSize: tokens.component.header.title.fontSize,
      lineHeight: tokens.typography.lineHeight.lg,
      fontWeight: tokens.component.header.title.fontWeight as '600',
      color: tokens.component.header.title.color,
    },
    right: {
      minWidth: 40,
      alignItems: 'flex-end' as const,
      flexDirection: 'row' as const,
      gap: tokens.spacing[4],
    },
  }),
);
