import { createStyles } from '@zzem-design-system/engine';

export const useStyles = createStyles((tokens) => ({
  wrapper: {
    position: 'absolute' as const,
    bottom: tokens.component.snackbar.wrapper.bottom,
    left: tokens.component.snackbar.wrapper.horizontal,
    right: tokens.component.snackbar.wrapper.horizontal,
    zIndex: 9999,
  },
  container: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    backgroundColor: tokens.component.snackbar.background,
    borderRadius: tokens.component.snackbar.radius,
    paddingHorizontal: tokens.component.snackbar.paddingHorizontal,
    paddingVertical: tokens.component.snackbar.paddingVertical,
    ...({
      shadowColor: tokens.color.black,
      shadowOffset: { width: 0, height: tokens.component.snackbar.shadow.offsetY },
      shadowOpacity: tokens.component.snackbar.shadow.opacity,
      shadowRadius: tokens.component.snackbar.shadow.radius,
      elevation: tokens.component.snackbar.shadow.elevation,
    }),
  },
  message: {
    flex: 1,
    fontSize: tokens.component.snackbar.message.fontSize,
    lineHeight: tokens.component.snackbar.message.lineHeight,
    color: tokens.component.snackbar.message.color,
  },
  action: {
    marginLeft: tokens.component.snackbar.action.marginLeft,
    fontSize: tokens.component.snackbar.action.fontSize,
    fontWeight: tokens.component.snackbar.action.fontWeight as '600',
    color: tokens.component.snackbar.action.color,
  },
}));
