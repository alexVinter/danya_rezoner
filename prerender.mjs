import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { createServer } from 'vite';

const dist = 'dist';
const template = await readFile(join(dist, 'index.html'), 'utf8');
const metadataMarker = '<!-- page-metadata -->';
const rootMarker = '<div id="root"></div>';
if (!template.includes(metadataMarker) || !template.includes(rootMarker)) {
  throw new Error('The HTML template is missing the prerender insertion points.');
}

const escape = (value) => value.replace(/[&<>"']/g, (char) => (
  { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]
));

const server = await createServer({
  configFile: false,
  mode: 'production',
  optimizeDeps: { noDiscovery: true, include: [] },
  server: { middlewareMode: true, ws: false, watch: null },
});

try {
  const { heroPortrait, notFoundPage, renderPage, siteOrigin, sitePages } = await server.ssrLoadModule('/src/entry-server.tsx');

  for (const page of [...sitePages, notFoundPage]) {
    const { markup, initialAdVisible, metadata, structuredData } = renderPage(page);
    const { canonical, nameTags, socialTags } = metadata;
    const head = [
      `<title>${escape(page.title)}</title>`,
      ...Object.entries(nameTags).map(([name, value]) => `<meta name="${name}" content="${escape(value)}" />`),
      ...Object.entries(socialTags).map(([name, value]) => `<meta property="${name}" content="${escape(value)}" />`),
    ];
    if (page.view === 'home') {
      const { src, srcSet, sizes } = heroPortrait;
      head.unshift(`<link rel="preload" as="image" href="${src}" imagesrcset="${srcSet}" imagesizes="${sizes}" fetchpriority="high" />`);
    }
    if (canonical) head.push(`<link rel="canonical" href="${escape(canonical)}" />`);
    if (structuredData) {
      const json = JSON.stringify(structuredData).replace(/</g, '\\u003c');
      head.push(`<script id="page-structured-data" type="application/ld+json">${json}</script>`);
    }

    const output = template
      .replace('<script type="module"', '<script type="module" fetchpriority="low"')
      .replace(metadataMarker, () => head.join('\n    '))
      .replace(rootMarker, () => `<div id="root" data-page="${page.path}" data-ad-visible="${initialAdVisible}">${markup}</div>`);
    const filename = page.view === 'not-found'
      ? join(dist, '404.html')
      : join(dist, page.path.slice(1), 'index.html');
    await mkdir(dirname(filename), { recursive: true });
    await writeFile(filename, output);
  }

  const urls = sitePages.filter((page) => page.indexable)
    .map((page) => `  <url><loc>${escape(siteOrigin + page.path)}</loc></url>`);
  const sitemap = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls,
    '</urlset>',
    '',
  ].join('\n');
  await writeFile(join(dist, 'sitemap.xml'), sitemap);
  await writeFile(join(dist, 'robots.txt'), `User-agent: *\nDisallow:\n\nSitemap: ${siteOrigin}/sitemap.xml\n`);
  console.log(`Prerendered ${sitePages.length} pages and a 404 page. Sitemap contains ${urls.length} URLs.`);
} finally {
  await server.close();
}
