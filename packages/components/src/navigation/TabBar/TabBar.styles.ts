import { createStyles } from '@zzem-design-system/engine';

interface StyleParams {
  itemCount: number;
}

export const useStyles = createStyles(
  (tokens, { itemCount }: StyleParams) => ({
    container: {
      flexDirection: 'row' as const,
      backgroundColor: tokens.color.background.primary,
      borderTopWidth: 1,
      borderTopColor: tokens.color.border.default,
      paddingBottom: tokens.spacing[4],
    },
    tab: {
      flex: 1,
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
      paddingTop: tokens.spacing[4],
      paddingBottom: tokens.spacing[2],
      minHeight: 48,
    },
    iconContainer: {
      position: 'relative' as const,
      marginBottom: tokens.spacing[1],
    },
    labelActive: {
      fontSize: tokens.typography.fontSize.xs,
      lineHeight: tokens.typography.lineHeight.xs,
      fontWeight: tokens.typography.fontWeight.medium as '500',
      color: tokens.color.interactive.primary,
    },
    labelInactive: {
      fontSize: tokens.typography.fontSize.xs,
      lineHeight: tokens.typography.lineHeight.xs,
      fontWeight: tokens.typography.fontWeight.regular as '400',
      color: tokens.color.text.tertiary,
    },
    badge: {
      position: 'absolute' as const,
      top: -4,
      right: -8,
      minWidth: 16,
      height: 16,
      borderRadius: tokens.radius.full,
      backgroundColor: tokens.color.status.danger,
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
      paddingHorizontal: tokens.spacing[2],
    },
    badgeText: {
      fontSize: 10,
      fontWeight: tokens.typography.fontWeight.bold as '700',
      color: tokens.color.white,
    },
  }),
);
