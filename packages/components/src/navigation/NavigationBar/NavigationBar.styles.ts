import { createStyles } from '@zzem-design-system/engine';

interface StyleParams {
  transparent: boolean;
  largeTitle: boolean;
}

export const useStyles = createStyles(
  (tokens, { transparent, largeTitle }: StyleParams) => ({
    container: {
      backgroundColor: transparent ? 'transparent' : tokens.component.navigationbar.background,
      borderBottomWidth: transparent ? 0 : tokens.component.navigationbar.borderWidth,
      borderBottomColor: tokens.component.navigationbar.borderColor,
    },
    topBar: {
      flexDirection: 'row' as const,
      alignItems: 'center' as const,
      height: tokens.component.navigationbar.height,
      paddingHorizontal: tokens.component.navigationbar.paddingHorizontal,
    },
    leftAction: {
      flexDirection: 'row' as const,
      alignItems: 'center' as const,
      minWidth: tokens.component.navigationbar.action.minWidth,
      height: tokens.component.navigationbar.action.height,
      justifyContent: 'flex-start' as const,
      paddingHorizontal: tokens.component.navigationbar.action.paddingHorizontal,
    },
    leftLabel: {
      fontSize: tokens.component.navigationbar.action.label.fontSize,
      color: tokens.component.navigationbar.action.label.color,
      marginLeft: tokens.spacing[2],
    },
    centerTitle: {
      flex: 1,
      alignItems: 'center' as const,
    },
    smallTitle: {
      fontSize: tokens.component.navigationbar.title.fontSize,
      fontWeight: tokens.component.navigationbar.title.fontWeight as '600',
      color: tokens.component.navigationbar.title.color,
    },
    rightActions: {
      flexDirection: 'row' as const,
      alignItems: 'center' as const,
      minWidth: tokens.component.navigationbar.action.minWidth,
      justifyContent: 'flex-end' as const,
      gap: tokens.component.navigationbar.action.gap,
    },
    rightButton: {
      width: tokens.component.navigationbar.action.minWidth,
      height: tokens.component.navigationbar.action.height,
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
    },
    rightLabel: {
      fontSize: tokens.component.navigationbar.action.label.fontSize,
      color: tokens.component.navigationbar.action.label.color,
      fontWeight: tokens.component.navigationbar.action.label.fontWeight as '600',
    },
    largeTitleContainer: {
      paddingHorizontal: tokens.component.navigationbar.largeTitle.paddingHorizontal,
      paddingBottom: tokens.component.navigationbar.largeTitle.paddingBottom,
    },
    largeTitleText: {
      fontSize: tokens.component.navigationbar.largeTitle.fontSize,
      lineHeight: tokens.component.navigationbar.largeTitle.lineHeight,
      fontWeight: tokens.component.navigationbar.largeTitle.fontWeight as '700',
      color: tokens.component.navigationbar.largeTitle.color,
    },
  }),
);
