import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { tokens, type Tokens } from '@zzem-design-system/tokens/output/tokens';

type StyleFactory<P, S> = (tokens: Tokens, params: P) => S;

/**
 * Creates a hook that generates memoized styles using design tokens.
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
    return useMemo(() => {
      const rawStyles = factory(tokens, params);
      return rawStyles;
    }, [params]);
  };
}
