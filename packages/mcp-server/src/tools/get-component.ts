import * as fs from 'fs';
import * as path from 'path';

export function getComponent(name: string, section: string = 'all') {
  const docsPath = path.resolve(__dirname, '../../../../docs/components');
  const docPath = path.join(docsPath, `${name.toLowerCase()}.md`);

  if (!fs.existsSync(docPath)) {
    return { error: `Component "${name}" not found` };
  }

  const content = fs.readFileSync(docPath, 'utf-8');

  if (section === 'all') {
    return { content };
  }

  // Parse sections
  const sections = content.split(/^## /m).slice(1);
  const matched = sections.find((s) =>
    s.toLowerCase().startsWith(section.toLowerCase()),
  );

  return matched
    ? { content: `## ${matched}` }
    : { error: `Section "${section}" not found in ${name}` };
}
