import { createStyles } from '@zzem-design-system/engine';

export const useStyles = createStyles((tokens) => ({
  overlay: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    zIndex: 10000,
  },
  container: {
    backgroundColor: tokens.color.background.primary,
    borderRadius: tokens.radius.xl,
    paddingTop: tokens.spacing[12],
    paddingHorizontal: tokens.spacing[12],
    paddingBottom: tokens.spacing[8],
    marginHorizontal: tokens.spacing[16],
    maxWidth: 320,
    width: '100%' as unknown as number,
    ...({
      shadowColor: tokens.color.black,
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.2,
      shadowRadius: 16,
      elevation: 12,
    }),
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
