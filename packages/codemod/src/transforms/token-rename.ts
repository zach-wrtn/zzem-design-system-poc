/**
 * Token Rename Transform
 *
 * Handles renaming of design token paths when tokens are restructured.
 * Usage: tsx packages/codemod/src/transforms/token-rename.ts --from old.path --to new.path
 */

interface RenameMapping {
  from: string;
  to: string;
}

export function tokenRename(source: string, mappings: RenameMapping[]): string {
  let result = source;

  for (const mapping of mappings) {
    const fromPattern = new RegExp(
      mapping.from.replace(/\./g, '\\.'),
      'g',
    );
    result = result.replace(fromPattern, mapping.to);
  }

  return result;
}
