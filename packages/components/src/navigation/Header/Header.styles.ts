import { createStyles } from '@zzem-design-system/engine';

interface StyleParams {
  border: boolean;
}

export const useStyles = createStyles(
  (tokens, { border }: StyleParams) => ({
    container: {
      flexDirection: 'row' as const,
      alignItems: 'center' as const,
      height: 56,
      paddingHorizontal: tokens.spacing[8],
      backgroundColor: tokens.color.background.primary,
      borderBottomWidth: border ? 1 : 0,
      borderBottomColor: tokens.color.border.default,
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
      fontSize: tokens.typography.fontSize.lg,
      lineHeight: tokens.typography.lineHeight.lg,
      fontWeight: tokens.typography.fontWeight.semibold as '600',
      color: tokens.color.text.primary,
    },
    right: {
      minWidth: 40,
      alignItems: 'flex-end' as const,
      flexDirection: 'row' as const,
      gap: tokens.spacing[4],
    },
  }),
);
