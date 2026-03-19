/**
 * Component scaffolding script
 *
 * Usage: pnpm new-component ButtonGroup
 */
import * as fs from 'fs';
import * as path from 'path';

const TEMPLATE_DIR = path.resolve(__dirname, '../packages/components/src/__template__');
const COMPONENTS_DIR = path.resolve(__dirname, '../packages/components/src');

function main() {
  const name = process.argv[2];
  const category = process.argv[3] || 'display';

  if (!name) {
    console.error('Usage: tsx scripts/generate-component.ts <ComponentName> [category]');
    console.error('Categories: primitives, inputs, display, feedback, navigation, layout');
    process.exit(1);
  }

  const componentDir = path.join(COMPONENTS_DIR, category, name);

  if (fs.existsSync(componentDir)) {
    console.error(`Component ${name} already exists at ${componentDir}`);
    process.exit(1);
  }

  fs.mkdirSync(componentDir, { recursive: true });

  const templateFiles = fs.readdirSync(TEMPLATE_DIR);

  for (const file of templateFiles) {
    const content = fs.readFileSync(path.join(TEMPLATE_DIR, file), 'utf-8');
    const newContent = content.replace(/Component/g, name);
    const newFileName = file.replace(/Component/g, name);
    fs.writeFileSync(path.join(componentDir, newFileName), newContent);
    console.log(`Created: ${category}/${name}/${newFileName}`);
  }

  console.log(`\nComponent ${name} created successfully!`);
  console.log(`Don't forget to:`);
  console.log(`  1. Write docs/components/${name.toLowerCase()}.md`);
  console.log(`  2. Create packages/tokens/src/component/${name.toLowerCase()}.tokens.json`);
  console.log(`  3. Export from packages/components/src/index.ts`);
}

main();
