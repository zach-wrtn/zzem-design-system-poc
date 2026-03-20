import { createStyles } from '@zzem-design-system/engine';

interface StyleParams {
  itemCount: number;
}

export const useStyles = createStyles(
  (tokens, { itemCount }: StyleParams) => ({
    container: {
      flexDirection: 'row' as const,
      backgroundColor: tokens.component.tabBar.background,
      borderTopWidth: 1,
      borderTopColor: tokens.component.tabBar.border,
      paddingBottom: tokens.spacing[4],
    },
    tab: {
      flex: 1,
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
      paddingTop: tokens.spacing[4],
      paddingBottom: tokens.spacing[2],
      minHeight: tokens.component.tabBar.height,
    },
    iconContainer: {
      position: 'relative' as const,
      marginBottom: tokens.spacing[1],
    },
    labelActive: {
      fontSize: tokens.typography.fontSize.xs,
      lineHeight: tokens.typography.lineHeight.xs,
      fontWeight: tokens.component.tabBar.active.fontWeight as '500',
      color: tokens.component.tabBar.active.color,
    },
    labelInactive: {
      fontSize: tokens.typography.fontSize.xs,
      lineHeight: tokens.typography.lineHeight.xs,
      fontWeight: tokens.component.tabBar.inactive.fontWeight as '400',
      color: tokens.component.tabBar.inactive.color,
    },
    badge: {
      position: 'absolute' as const,
      top: -4,
      right: -8,
      minWidth: tokens.component.tabBar.badge.minWidth,
      height: tokens.component.tabBar.badge.height,
      borderRadius: tokens.radius.full,
      backgroundColor: tokens.component.tabBar.badge.background,
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
      paddingHorizontal: tokens.spacing[2],
    },
    badgeText: {
      fontSize: tokens.component.tabBar.badge.fontSize,
      fontWeight: tokens.typography.fontWeight.bold as '700',
      color: tokens.component.tabBar.badge.text,
    },
  }),
);
