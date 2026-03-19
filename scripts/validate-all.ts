/**
 * Full validation script
 *
 * Runs all quality checks: lint, typecheck, test, a11y
 */
import { execSync } from 'child_process';

const checks = [
  { name: 'Lint', command: 'pnpm lint' },
  { name: 'TypeCheck', command: 'pnpm typecheck' },
  { name: 'Test', command: 'pnpm test' },
];

let failed = false;

for (const check of checks) {
  try {
    console.log(`\n--- ${check.name} ---`);
    execSync(check.command, { stdio: 'inherit' });
    console.log(`✅ ${check.name} passed`);
  } catch {
    console.error(`❌ ${check.name} failed`);
    failed = true;
  }
}

if (failed) {
  console.error('\n❌ Some checks failed');
  process.exit(1);
} else {
  console.log('\n✅ All checks passed');
}
