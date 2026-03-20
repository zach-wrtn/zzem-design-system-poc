import { createStyles } from '@zzem-design-system/engine';

interface StyleParams {
  direction: 'vertical' | 'horizontal';
  disabled: boolean;
}

export const useStyles = createStyles(
  (tokens, { direction, disabled }: StyleParams) => ({
    container: {
      opacity: disabled ? tokens.opacity.disabled : 1,
    },
    groupLabel: {
      fontSize: tokens.typography.fontSize.sm,
      lineHeight: tokens.typography.lineHeight.sm,
      fontWeight: tokens.typography.fontWeight.medium as '500',
      color: tokens.color.text.primary,
      marginBottom: tokens.spacing[4],
    },
    optionsContainer: {
      flexDirection: direction === 'horizontal' ? ('row' as const) : ('column' as const),
      gap: direction === 'horizontal' ? tokens.spacing[8] : tokens.spacing[6],
    },
    option: {
      flexDirection: 'row' as const,
      alignItems: 'center' as const,
    },
    radio: {
      width: tokens.component.radio.size,
      height: tokens.component.radio.size,
      borderRadius: tokens.radius.full,
      borderWidth: 2,
      borderColor: tokens.color.border.default,
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
    },
    radioSelected: {
      borderColor: tokens.color.interactive.primary,
    },
    radioDot: {
      width: tokens.component.radio.innerSize,
      height: tokens.component.radio.innerSize,
      borderRadius: tokens.radius.full,
      backgroundColor: tokens.color.interactive.primary,
    },
    optionLabel: {
      marginLeft: tokens.spacing[4],
      fontSize: tokens.typography.fontSize.md,
      lineHeight: tokens.typography.lineHeight.md,
      color: tokens.color.text.primary,
    },
  }),
);
