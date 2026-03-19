interface ValidationResult {
  valid: boolean;
  issues: string[];
}

export function validateUsage(code: string): ValidationResult {
  const issues: string[] = [];

  // Hardcoded colors
  const hexPattern = /#[0-9A-Fa-f]{3,8}/g;
  if (hexPattern.test(code)) {
    issues.push('@zzem-design-system/no-hardcoded-colors: Use tokens instead of hex values');
  }

  // Hardcoded spacing
  if (/(?:padding|margin):\s*\d+/.test(code)) {
    issues.push('@zzem-design-system/no-hardcoded-spacing: Use spacing tokens');
  }

  // StyleSheet.create
  if (code.includes('StyleSheet.create')) {
    issues.push('@zzem-design-system/no-inline-styles: Use createStyles from @zzem-design-system/engine');
  }

  // Platform.OS
  if (code.includes('Platform.OS')) {
    issues.push('Use platform.select() from @zzem-design-system/engine');
  }

  // default export
  if (code.includes('export default')) {
    issues.push('Use named exports only');
  }

  return { valid: issues.length === 0, issues };
}
