import { createStyles } from '@zzem-design-system/engine';

export const useStyles = createStyles((tokens) => ({
  wrapper: {
    position: 'absolute' as const,
    bottom: tokens.spacing[12],
    left: tokens.spacing[8],
    right: tokens.spacing[8],
    zIndex: 9999,
  },
  container: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    backgroundColor: tokens.color.background.inverse,
    borderRadius: tokens.radius.md,
    paddingHorizontal: tokens.spacing[8],
    paddingVertical: tokens.spacing[6],
    ...({
      shadowColor: tokens.color.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 6,
      elevation: 6,
    }),
  },
  message: {
    flex: 1,
    fontSize: tokens.typography.fontSize.sm,
    lineHeight: tokens.typography.lineHeight.sm,
    color: tokens.color.text.inverse,
  },
  action: {
    marginLeft: tokens.spacing[6],
    fontSize: tokens.typography.fontSize.sm,
    fontWeight: tokens.typography.fontWeight.semibold as '600',
    color: tokens.color.interactive.primary,
  },
}));
