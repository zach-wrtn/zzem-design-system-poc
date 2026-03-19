import { createStyles } from '@zzem-design-system/engine';

interface StyleParams {
  value: boolean;
  disabled: boolean;
}

export const useStyles = createStyles(
  (tokens, { value, disabled }: StyleParams) => ({
    container: {
      flexDirection: 'row' as const,
      alignItems: 'center' as const,
      opacity: disabled ? tokens.opacity.disabled : 1,
    },
    track: {
      width: 48,
      height: 28,
      borderRadius: tokens.radius.full,
      backgroundColor: value
        ? tokens.color.interactive.primary
        : tokens.color.background.tertiary,
      justifyContent: 'center' as const,
      padding: 2,
    },
    thumb: {
      width: 24,
      height: 24,
      borderRadius: tokens.radius.full,
      backgroundColor: tokens.color.white,
      alignSelf: value ? ('flex-end' as const) : ('flex-start' as const),
      ...({
        shadowColor: tokens.color.black,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.15,
        shadowRadius: 2,
        elevation: 2,
      }),
    },
    label: {
      marginLeft: tokens.spacing[4],
      fontSize: tokens.typography.fontSize.md,
      lineHeight: tokens.typography.lineHeight.md,
      color: tokens.color.text.primary,
    },
  }),
);
