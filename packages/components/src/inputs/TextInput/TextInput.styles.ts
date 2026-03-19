import { createStyles } from '@zzem-design-system/engine';
import type { TextInputSize } from './TextInput.types';

interface StyleParams {
  size: TextInputSize;
  disabled: boolean;
  hasError: boolean;
  isFocused: boolean;
}

export const useStyles = createStyles(
  (tokens, { size, disabled, hasError, isFocused }: StyleParams) => {
    const sizeTokens = tokens.component.input.size[size];

    const borderColor = hasError
      ? tokens.component.input.border.error
      : isFocused
        ? tokens.component.input.border.focus
        : tokens.component.input.border.default;

    return {
      container: {},
      label: {
        fontSize: tokens.typography.fontSize.sm,
        lineHeight: tokens.typography.lineHeight.sm,
        fontWeight: tokens.typography.fontWeight.medium as '500',
        color: tokens.color.text.primary,
        marginBottom: tokens.spacing[2],
      },
      inputContainer: {
        flexDirection: 'row' as const,
        alignItems: 'center' as const,
        height: sizeTokens.height,
        paddingHorizontal: sizeTokens.paddingHorizontal,
        backgroundColor: disabled
          ? tokens.component.input.background.disabled
          : tokens.component.input.background.default,
        borderRadius: tokens.component.input.radius,
        borderWidth: 1,
        borderColor,
      },
      input: {
        flex: 1,
        fontSize: sizeTokens.fontSize,
        color: disabled
          ? tokens.component.input.text.disabled
          : tokens.component.input.text.default,
        padding: 0,
      },
      iconLeft: {
        marginRight: tokens.spacing[4],
      },
      iconRight: {
        marginLeft: tokens.spacing[4],
      },
      helperText: {
        fontSize: tokens.typography.fontSize.xs,
        lineHeight: tokens.typography.lineHeight.xs,
        color: tokens.color.text.secondary,
        marginTop: tokens.spacing[2],
      },
      errorText: {
        fontSize: tokens.typography.fontSize.xs,
        lineHeight: tokens.typography.lineHeight.xs,
        color: tokens.color.text.danger,
        marginTop: tokens.spacing[2],
      },
    };
  },
);
