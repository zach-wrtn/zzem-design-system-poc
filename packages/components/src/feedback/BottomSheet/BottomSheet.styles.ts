import { createStyles } from '@zzem-design-system/engine';

export const useStyles = createStyles((tokens) => ({
  overlay: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end' as const,
    zIndex: 10000,
  },
  container: {
    backgroundColor: tokens.color.background.primary,
    borderTopLeftRadius: tokens.radius.xl,
    borderTopRightRadius: tokens.radius.xl,
    paddingBottom: tokens.spacing[16],
    maxHeight: '80%' as unknown as number,
    ...({
      shadowColor: tokens.color.black,
      shadowOffset: { width: 0, height: -4 },
      shadowOpacity: 0.15,
      shadowRadius: 12,
      elevation: 12,
    }),
  },
  handle: {
    alignSelf: 'center' as const,
    width: 36,
    height: 4,
    borderRadius: tokens.radius.full,
    backgroundColor: tokens.color.border.default,
    marginTop: tokens.spacing[4],
    marginBottom: tokens.spacing[4],
  },
  header: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    paddingHorizontal: tokens.spacing[8],
    paddingVertical: tokens.spacing[6],
    borderBottomWidth: 1,
    borderBottomColor: tokens.color.border.default,
  },
  title: {
    fontSize: tokens.typography.fontSize.lg,
    lineHeight: tokens.typography.lineHeight.lg,
    fontWeight: tokens.typography.fontWeight.semibold as '600',
    color: tokens.color.text.primary,
  },
  content: {
    paddingHorizontal: tokens.spacing[8],
    paddingTop: tokens.spacing[8],
  },
}));
