import * as fs from 'fs';
import * as path from 'path';

export function getGuidelines(query: string, category?: string) {
  const docsRoot = path.resolve(__dirname, '../../../../docs');
  const results: { file: string; excerpt: string }[] = [];

  function searchDir(dir: string) {
    if (!fs.existsSync(dir)) return;
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        searchDir(fullPath);
      } else if (entry.name.endsWith('.md')) {
        const content = fs.readFileSync(fullPath, 'utf-8');
        if (content.toLowerCase().includes(query.toLowerCase())) {
          const relativePath = path.relative(docsRoot, fullPath);
          results.push({ file: relativePath, excerpt: content.slice(0, 500) });
        }
      }
    }
  }

  searchDir(category ? path.join(docsRoot, category) : docsRoot);
  return results;
}
