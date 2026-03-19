import { createStyles } from '@zzem-design-system/engine';

interface StyleParams {
  transparent: boolean;
  largeTitle: boolean;
}

export const useStyles = createStyles(
  (tokens, { transparent, largeTitle }: StyleParams) => ({
    container: {
      backgroundColor: transparent ? 'transparent' : tokens.color.background.primary,
      borderBottomWidth: transparent ? 0 : 1,
      borderBottomColor: tokens.color.border.default,
    },
    topBar: {
      flexDirection: 'row' as const,
      alignItems: 'center' as const,
      height: 44,
      paddingHorizontal: tokens.spacing[4],
    },
    leftAction: {
      flexDirection: 'row' as const,
      alignItems: 'center' as const,
      minWidth: 44,
      height: 44,
      justifyContent: 'flex-start' as const,
      paddingHorizontal: tokens.spacing[4],
    },
    leftLabel: {
      fontSize: tokens.typography.fontSize.md,
      color: tokens.color.interactive.primary,
      marginLeft: tokens.spacing[2],
    },
    centerTitle: {
      flex: 1,
      alignItems: 'center' as const,
    },
    smallTitle: {
      fontSize: tokens.typography.fontSize.md,
      fontWeight: tokens.typography.fontWeight.semibold as '600',
      color: tokens.color.text.primary,
    },
    rightActions: {
      flexDirection: 'row' as const,
      alignItems: 'center' as const,
      minWidth: 44,
      justifyContent: 'flex-end' as const,
      gap: tokens.spacing[2],
    },
    rightButton: {
      width: 44,
      height: 44,
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
    },
    rightLabel: {
      fontSize: tokens.typography.fontSize.md,
      color: tokens.color.interactive.primary,
      fontWeight: tokens.typography.fontWeight.semibold as '600',
    },
    largeTitleContainer: {
      paddingHorizontal: tokens.spacing[8],
      paddingBottom: tokens.spacing[4],
    },
    largeTitleText: {
      fontSize: tokens.typography.fontSize['4xl'],
      lineHeight: tokens.typography.lineHeight['4xl'],
      fontWeight: tokens.typography.fontWeight.bold as '700',
      color: tokens.color.text.primary,
    },
  }),
);
