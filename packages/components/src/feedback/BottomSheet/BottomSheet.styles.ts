import { createStyles } from '@zzem-design-system/engine';

export const useStyles = createStyles((tokens) => ({
  overlay: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: tokens.component.bottomSheet.overlay,
    justifyContent: 'flex-end' as const,
    zIndex: 10000,
  },
  container: {
    backgroundColor: tokens.component.bottomSheet.background,
    borderTopLeftRadius: tokens.component.bottomSheet.radius,
    borderTopRightRadius: tokens.component.bottomSheet.radius,
    paddingBottom: tokens.spacing[16],
    maxHeight: '80%' as unknown as number,
    ...tokens.component.bottomSheet.elevation,
  },
  handle: {
    alignSelf: 'center' as const,
    width: tokens.component.bottomSheet.handleWidth,
    height: tokens.component.bottomSheet.handleHeight,
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
