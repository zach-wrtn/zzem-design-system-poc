#!/usr/bin/env tsx
/**
 * usage-metrics.ts
 *
 * Scans application source code to report:
 * 1. Import count per @zzem-design-system/components component
 * 2. Hardcoded color/spacing violations (potential token bypass)
 *
 * Usage:
 *   tsx scripts/usage-metrics.ts [app-source-dir]
 *   tsx scripts/usage-metrics.ts ../my-app/src
 */

import * as fs from 'node:fs';
import * as path from 'node:path';

const COMPONENTS = [
  'Box', 'Text', 'Pressable', 'Stack', 'HStack', 'VStack',
  'Button', 'IconButton', 'TextInput', 'Checkbox', 'Switch', 'RadioGroup',
  'Avatar', 'Badge', 'Card', 'Tag',
  'Toast', 'Dialog', 'BottomSheet', 'Snackbar',
  'Header', 'TabBar', 'NavigationBar',
  'Divider', 'Spacer', 'SafeArea',
];

const HEX_COLOR_RE = /#(?:[0-9a-fA-F]{3,4}){1,2}\b/g;
const HARDCODED_SPACING_RE = /(?:margin|padding|gap|top|bottom|left|right|width|height)\s*:\s*\d+/g;

interface FileMetrics {
  file: string;
  imports: string[];
  hexColors: string[];
  hardcodedSpacings: string[];
}

function walkDir(dir: string, exts: string[]): string[] {
  const results: string[] = [];
  if (!fs.existsSync(dir)) return results;

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name.startsWith('.')) continue;
      results.push(...walkDir(fullPath, exts));
    } else if (exts.some((ext) => entry.name.endsWith(ext))) {
      results.push(fullPath);
    }
  }
  return results;
}

function analyzeFile(filePath: string): FileMetrics {
  const content = fs.readFileSync(filePath, 'utf-8');
  const imports: string[] = [];

  // Detect @zzem-design-system/components imports
  const importRegex = /import\s*\{([^}]+)\}\s*from\s*['"]@zzem-design-system\/components['"]/g;
  let match: RegExpExecArray | null;
  while ((match = importRegex.exec(content)) !== null) {
    const names = match[1].split(',').map((n) => n.trim()).filter((n) => n && !n.startsWith('type '));
    imports.push(...names);
  }

  // Detect hardcoded hex colors (skip comments/imports)
  const codeLines = content.split('\n').filter(
    (line) => !line.trimStart().startsWith('//') && !line.trimStart().startsWith('*'),
  );
  const codeContent = codeLines.join('\n');
  const hexColors = [...codeContent.matchAll(HEX_COLOR_RE)].map((m) => m[0]);
  const hardcodedSpacings = [...codeContent.matchAll(HARDCODED_SPACING_RE)].map((m) => m[0]);

  return { file: filePath, imports, hexColors, hardcodedSpacings };
}

function main() {
  const targetDir = process.argv[2];
  if (!targetDir) {
    console.error('Usage: tsx scripts/usage-metrics.ts <app-source-dir>');
    process.exit(1);
  }

  const resolvedDir = path.resolve(targetDir);
  const files = walkDir(resolvedDir, ['.tsx', '.ts', '.jsx', '.js']);

  console.log(`\n📊 zzem-design-system Usage Metrics`);
  console.log(`${'─'.repeat(50)}`);
  console.log(`Scanning: ${resolvedDir}`);
  console.log(`Files found: ${files.length}\n`);

  const allMetrics = files.map(analyzeFile);

  // Component usage counts
  const componentCounts: Record<string, number> = {};
  for (const comp of COMPONENTS) {
    componentCounts[comp] = 0;
  }
  for (const m of allMetrics) {
    for (const imp of m.imports) {
      if (imp in componentCounts) {
        componentCounts[imp]++;
      }
    }
  }

  console.log('Component Import Counts:');
  const sorted = Object.entries(componentCounts).sort((a, b) => b[1] - a[1]);
  for (const [name, count] of sorted) {
    const bar = count > 0 ? ' ' + '█'.repeat(Math.min(count, 30)) : '';
    console.log(`  ${name.padEnd(16)} ${String(count).padStart(4)}${bar}`);
  }

  // Hardcoding violations
  const totalHex = allMetrics.reduce((sum, m) => sum + m.hexColors.length, 0);
  const totalSpacing = allMetrics.reduce((sum, m) => sum + m.hardcodedSpacings.length, 0);
  const filesWithViolations = allMetrics.filter(
    (m) => m.hexColors.length > 0 || m.hardcodedSpacings.length > 0,
  );

  console.log(`\nHardcoding Violations:`);
  console.log(`  Hex colors:         ${totalHex}`);
  console.log(`  Hardcoded spacings: ${totalSpacing}`);
  console.log(`  Files with issues:  ${filesWithViolations.length}`);

  if (filesWithViolations.length > 0) {
    console.log(`\n  Top offenders:`);
    const topOffenders = filesWithViolations
      .map((m) => ({ file: m.file, count: m.hexColors.length + m.hardcodedSpacings.length }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
    for (const { file, count } of topOffenders) {
      console.log(`    ${path.relative(resolvedDir, file)} (${count} violations)`);
    }
  }

  // Summary
  const totalImports = Object.values(componentCounts).reduce((a, b) => a + b, 0);
  const usedComponents = Object.values(componentCounts).filter((c) => c > 0).length;
  const adoptionRate = COMPONENTS.length > 0 ? Math.round((usedComponents / COMPONENTS.length) * 100) : 0;

  console.log(`\nSummary:`);
  console.log(`  Total component imports: ${totalImports}`);
  console.log(`  Components adopted:      ${usedComponents}/${COMPONENTS.length} (${adoptionRate}%)`);
  console.log(`  Hardcoding ratio:        ${totalHex + totalSpacing} violations across ${files.length} files`);
  console.log('');
}

main();
