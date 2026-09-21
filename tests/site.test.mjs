import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import test from 'node:test';

const root = new URL('../dist/', import.meta.url);
const page = (path) => new URL(path, root);
const html = (path) => readFileSync(page(path), 'utf8');

test('the built site publishes the required public routes', () => {
  for (const route of ['', 'slove/', 'confidentialitate/slove/', 'termeni/']) {
    assert.ok(existsSync(page(`${route}index.html`)), `missing route: /${route}`);
  }
  assert.ok(existsSync(page('404.html')), 'missing branded 404 page');
});

test('the Slove page exposes the four approved games and no forbidden public names', () => {
  const slove = html('slove/index.html');
  for (const title of ['Corect sau greșit?', 'Ce înseamnă?', 'Vorba vine', 'Găsește greșeala']) {
    assert.match(slove, new RegExp(title.replace(/[?]/g, '\\?')));
  }
  assert.doesNotMatch(slove, /Lexio|New York Times/i);
});

test('the built site has honest SEO and legal surfaces', () => {
  const home = html('index.html');
  assert.match(home, /lang="ro"/);
  assert.match(home, /rel="canonical"/);
  assert.match(home, /property="og:title"/);
  assert.match(readFileSync(new URL('robots.txt', root), 'utf8'), /Sitemap:/);
  assert.ok(existsSync(new URL('sitemap-index.xml', root)) || existsSync(new URL('sitemap-0.xml', root)) || existsSync(new URL('sitemap.xml', root)));
  assert.match(html('confidentialitate/slove/index.html'), /Politica de confidențialitate Slove/);
  assert.match(html('termeni/index.html'), /Termeni de utilizare/);
});
