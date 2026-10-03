import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

const root = resolve(import.meta.dirname, '..', 'public');
function checkScripts(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) checkScripts(path);
    else if (entry.name.endsWith('.js')) {
      const result = spawnSync(process.execPath, ['--check', path], { encoding: 'utf8' });
      if (result.status !== 0) throw new Error(result.stderr);
    }
  }
}
checkScripts(join(root, 'scripts'));
const html = readFileSync(join(root, 'index.html'), 'utf8');
for (const match of html.matchAll(/(?:src|href)="([^"#]+\.(?:js|css))"/g)) {
  if (!existsSync(join(root, match[1]))) throw new Error(`Missing entry asset: ${match[1]}`);
}
const { products } = JSON.parse(readFileSync(join(root, 'data/catalog.json'), 'utf8'));
if (new Set(products.map((product) => product.id)).size !== products.length) {
  throw new Error('Duplicate product identifiers');
}
for (const product of products) {
  if (!existsSync(join(root, product.image)))
    throw new Error(`Missing product image: ${product.id}`);
}
console.log(`Syntax, entry assets and ${products.length} product images verified.`);
