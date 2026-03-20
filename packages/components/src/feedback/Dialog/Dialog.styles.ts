import { createStyles } from '@zzem-design-system/engine';

export const useStyles = createStyles((tokens) => ({
  overlay: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: tokens.component.dialog.overlay,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    zIndex: 10000,
  },
  container: {
    backgroundColor: tokens.component.dialog.background,
    borderRadius: tokens.component.dialog.radius,
    paddingTop: tokens.component.dialog.padding,
    paddingHorizontal: tokens.component.dialog.padding,
    paddingBottom: tokens.spacing[8],
    marginHorizontal: tokens.spacing[16],
    maxWidth: tokens.component.dialog.maxWidth,
    width: '100%' as unknown as number,
    ...tokens.component.dialog.elevation,
  },
  title: {
    fontSize: tokens.typography.fontSize.lg,
    lineHeight: tokens.typography.lineHeight.lg,
    fontWeight: tokens.typography.fontWeight.semibold as '600',
    color: tokens.color.text.primary,
    textAlign: 'center' as const,
    marginBottom: tokens.spacing[4],
  },
  message: {
    fontSize: tokens.typography.fontSize.sm,
    lineHeight: tokens.typography.lineHeight.sm,
    color: tokens.color.text.secondary,
    textAlign: 'center' as const,
    marginBottom: tokens.spacing[8],
  },
  actions: {
    flexDirection: 'row' as const,
    justifyContent: 'flex-end' as const,
    gap: tokens.spacing[4],
    marginTop: tokens.spacing[4],
  },
  actionButton: {
    paddingHorizontal: tokens.spacing[8],
    paddingVertical: tokens.spacing[4],
    borderRadius: tokens.radius.md,
    minWidth: 64,
    alignItems: 'center' as const,
  },
  actionPrimary: {
    backgroundColor: tokens.color.interactive.primary,
  },
  actionSecondary: {
    backgroundColor: 'transparent',
  },
  actionDanger: {
    backgroundColor: tokens.color.interactive.danger,
  },
  actionTextPrimary: {
    fontSize: tokens.typography.fontSize.sm,
    fontWeight: tokens.typography.fontWeight.semibold as '600',
    color: tokens.color.white,
  },
  actionTextSecondary: {
    fontSize: tokens.typography.fontSize.sm,
    fontWeight: tokens.typography.fontWeight.semibold as '600',
    color: tokens.color.interactive.primary,
  },
  actionTextDanger: {
    fontSize: tokens.typography.fontSize.sm,
    fontWeight: tokens.typography.fontWeight.semibold as '600',
    color: tokens.color.white,
  },
}));
