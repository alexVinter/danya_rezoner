import assert from 'node:assert/strict';
import { after, before, test } from 'node:test';
import { createServer } from 'vite';

let server;
let seo;
let renderPage;

before(async () => {
  server = await createServer({
    configFile: false,
    optimizeDeps: { noDiscovery: true, include: [] },
    server: { middlewareMode: true, ws: false, watch: null },
  });
  seo = await server.ssrLoadModule('/src/seo.ts');
  ({ renderPage } = await server.ssrLoadModule('/src/entry-server.tsx'));
});

after(async () => {
  await server?.close();
});

test('every commercial URL has its own HTML content, metadata and crawlable link from home', () => {
  const home = renderPage(seo.sitePages[0]).markup;
  const titles = new Set();
  const descriptions = new Set();
  for (const page of seo.sitePages) {
    const { markup, metadata } = renderPage(page);
    assert.equal([...markup.matchAll(/<h1\b/g)].length, 1, page.path);
    assert.equal(metadata.canonical, seo.siteOrigin + page.path);
    assert.equal(metadata.socialTags['og:title'], page.title);
    assert.equal(metadata.socialTags['og:description'], page.description);
    assert.equal(metadata.nameTags.robots, page.indexable ? undefined : 'noindex, follow');
    if (page.indexable && page.path !== '/') assert.ok(home.includes(`href="${page.path}"`), page.path);
    titles.add(page.title);
    descriptions.add(page.description);
  }
  assert.equal(titles.size, seo.sitePages.length);
  assert.equal(descriptions.size, seo.sitePages.length);
});

test('legacy URLs resolve to canonical pages and unknown paths resolve to a non-indexable 404', () => {
  assert.equal(seo.resolvePage('/case-extern.html').page.path, '/cases/kontur-extern');
  assert.equal(seo.resolvePage('/', '#service-direct').page.path, '/services/yandex-direct');
  assert.equal(seo.resolvePage('/services/vk-ads/index.html').page.path, '/services/vk-ads');
  assert.equal(seo.resolvePage('/privacy').page.path, '/policy');
  assert.equal(seo.resolvePage('/cases/kontur-elba').removed, true);
  const missing = seo.resolvePage('/services/not-a-service').page;
  assert.equal(missing.view, 'not-found');
  assert.equal(seo.pageMetadata(missing).nameTags.robots, 'noindex, follow');
  assert.equal(seo.pageMetadata(missing).canonical, null);
});
