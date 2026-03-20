import { useMemo, useRef } from 'react';
import type { Tokens } from '@zzem-design-system/tokens/output/tokens';
import { useTheme } from './useTheme';

type StyleFactory<P, S> = (tokens: Tokens, params: P) => S;

/**
 * Creates a hook that generates memoized styles using design tokens from ThemeContext.
 *
 * Styles are recalculated only when the theme mode or params change,
 * not on every render.
 *
 * Usage:
 * ```
 * const useStyles = createStyles((tokens, { variant }: { variant: string }) => ({
 *   container: {
 *     backgroundColor: tokens.color.background.primary,
 *   },
 * }));
 *
 * // In component:
 * const styles = useStyles({ variant: 'primary' });
 * ```
 */
export function createStyles<P extends Record<string, unknown>, S extends Record<string, unknown>>(
  factory: StyleFactory<P, S>,
) {
  return (params: P): S => {
    const { tokens, mode } = useTheme();
    const paramsKey = JSON.stringify(params);

    return useMemo(() => {
      return factory(tokens, params);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [paramsKey, mode]);
  };
}
