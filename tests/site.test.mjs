import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import test from 'node:test';

const root = new URL('../dist/', import.meta.url);
const page = (path) => new URL(path, root);
const html = (path) => readFileSync(page(path), 'utf8');
const builtHtmlFiles = (directory = root) => readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
  const path = new URL(`${entry.name}${entry.isDirectory() ? '/' : ''}`, directory);
  return entry.isDirectory() ? builtHtmlFiles(path) : entry.name.endsWith('.html') ? [path] : [];
});

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

test('the Didactiv homepage uses the education tagline and app showcase', () => {
  const home = html('index.html');
  assert.match(home, /<h1 class="brand brand-heading">/);
  assert.match(home, /Didactiv — aplicații educative simple și atente/);
  assert.match(home, /class="app-showcase-content"/);
  assert.match(home, /<h2>Slove<\/h2>/);
  assert.match(home, /screenshots\/home\.png/);
  assert.doesNotMatch(home, /Descoperă Slove/);
  assert.match(home, /class="phone-frame"/);
  assert.match(home, /class="site-frame site-frame-home"/);
  assert.match(home, /store-button-app-store/);
  assert.match(home, /store-button-google-play/);
  assert.match(home, /class="brand-tagline"/);
  assert.doesNotMatch(home, /class="brand-mark"/);
  assert.doesNotMatch(home, /Navigație principală|>Aplicații<|>Despre</);
  assert.doesNotMatch(home, /class="eyebrow"/);
});

test('every built page has Romanian metadata and legal navigation', () => {
  for (const file of builtHtmlFiles()) {
    const document = readFileSync(file, 'utf8');
    assert.match(document, /<html lang="ro">/);
    assert.match(document, /<title>[^<]+<\/title>/);
    assert.match(document, /<meta name="description"/);
    assert.match(document, /<link rel="canonical"/);
    assert.match(document, /Confidențialitate Slove/);
    assert.match(document, /Termeni de utilizare/);
    assert.doesNotMatch(document, /class="eyebrow"/);
  }

  const home = html('index.html');
  assert.match(home, /property="og:title"/);
  assert.doesNotMatch(home, /property="og:image"/);
  assert.match(html('slove/index.html'), /property="og:image"/);
  assert.match(readFileSync(new URL('robots.txt', root), 'utf8'), /Sitemap:/);
  assert.ok(existsSync(new URL('sitemap-index.xml', root)) || existsSync(new URL('sitemap-0.xml', root)) || existsSync(new URL('sitemap.xml', root)));
  assert.match(html('confidentialitate/slove/index.html'), /Politica de confidențialitate Slove/);
  assert.match(html('termeni/index.html'), /Termeni de utilizare/);
});

test('public output contains no forbidden internal names or comparisons', () => {
  for (const file of builtHtmlFiles()) {
    assert.doesNotMatch(readFileSync(file, 'utf8'), /Lexio|New York Times/i);
  }
});
