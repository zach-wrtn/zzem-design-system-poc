import { createStyles } from '@zzem-design-system/engine';

interface StyleParams {
  checked: boolean;
  disabled: boolean;
}

export const useStyles = createStyles(
  (tokens, { checked, disabled }: StyleParams) => ({
    container: {
      flexDirection: 'row' as const,
      alignItems: 'center' as const,
      opacity: disabled ? tokens.opacity.disabled : 1,
    },
    checkbox: {
      width: 20,
      height: 20,
      borderRadius: tokens.radius.sm,
      borderWidth: 2,
      borderColor: checked
        ? tokens.color.interactive.primary
        : tokens.color.border.default,
      backgroundColor: checked
        ? tokens.color.interactive.primary
        : 'transparent',
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
    },
    checkmark: {
      width: 10,
      height: 6,
      borderLeftWidth: 2,
      borderBottomWidth: 2,
      borderColor: tokens.color.white,
      transform: [{ rotate: '-45deg' }],
      marginTop: -2,
    },
    label: {
      marginLeft: tokens.spacing[4],
      fontSize: tokens.typography.fontSize.md,
      lineHeight: tokens.typography.lineHeight.md,
      color: tokens.color.text.primary,
    },
  }),
);
