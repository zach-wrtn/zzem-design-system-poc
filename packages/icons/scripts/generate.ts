/**
 * SVG → React Native component generator
 *
 * Reads SVG files from src/svg/ and generates
 * React Native components using react-native-svg.
 *
 * Usage: pnpm generate
 */
import * as fs from 'fs';
import * as path from 'path';

const SVG_DIR = path.resolve(__dirname, '../src/svg');
const OUTPUT_DIR = path.resolve(__dirname, '../src/generated');

function toPascalCase(str: string): string {
  return str
    .replace(/[-_](\w)/g, (_, c) => c.toUpperCase())
    .replace(/^\w/, (c) => c.toUpperCase());
}

function generateIconComponent(name: string, svgContent: string): string {
  const componentName = `${toPascalCase(name)}Icon`;

  return `// Auto-generated — do not edit manually
import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface ${componentName}Props {
  size?: number;
  color?: string;
  accessibilityLabel?: string;
}

export const ${componentName} = ({
  size = 24,
  color = '#000000',
  accessibilityLabel,
}: ${componentName}Props) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      accessibilityRole="image"
      accessibilityLabel={accessibilityLabel ?? '${name}'}
    >
      {/* TODO: Extract paths from SVG */}
      <Path d="" fill={color} />
    </Svg>
  );
};

${componentName}.displayName = '${componentName}';
`;
}

function main() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  if (!fs.existsSync(SVG_DIR)) {
    fs.mkdirSync(SVG_DIR, { recursive: true });
    console.log('Created svg directory. Add SVG files and run again.');
    return;
  }

  const svgFiles = fs.readdirSync(SVG_DIR).filter((f) => f.endsWith('.svg'));

  if (svgFiles.length === 0) {
    console.log('No SVG files found in src/svg/');
    return;
  }

  const exports: string[] = [];

  for (const file of svgFiles) {
    const name = path.basename(file, '.svg');
    const svgContent = fs.readFileSync(path.join(SVG_DIR, file), 'utf-8');
    const component = generateIconComponent(name, svgContent);
    const componentName = `${toPascalCase(name)}Icon`;
    const outputPath = path.join(OUTPUT_DIR, `${componentName}.tsx`);

    fs.writeFileSync(outputPath, component);
    exports.push(`export { ${componentName} } from './${componentName}';`);
    console.log(`Generated: ${componentName}`);
  }

  // Write index
  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'index.ts'),
    exports.join('\n') + '\n',
  );

  console.log(`\nGenerated ${svgFiles.length} icon components.`);
}

main();
