import { pageMetadata, pageStructuredData, type SitePage } from './seo';

export function updatePageMetadata(page: SitePage) {
  document.title = page.title;
  const { canonical, nameTags, socialTags } = pageMetadata(page);

  for (const [attribute, tags] of [['name', nameTags], ['property', socialTags]] as const) {
    for (const [key, value] of Object.entries(tags)) {
      let tag = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attribute, key);
        document.head.append(tag);
      }
      tag.content = value;
    }
  }
  if (page.indexable) document.head.querySelector('meta[name="robots"]')?.remove();
  if (!canonical) document.head.querySelector('meta[property="og:url"]')?.remove();

  let canonicalLink = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (canonical) {
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.append(canonicalLink);
    }
    canonicalLink.href = canonical;
  } else {
    canonicalLink?.remove();
  }

  let schema = document.querySelector<HTMLScriptElement>('#page-structured-data');
  const data = pageStructuredData(page);
  if (data) {
    if (!schema) {
      schema = document.createElement('script');
      schema.type = 'application/ld+json';
      schema.id = 'page-structured-data';
      document.head.append(schema);
    }
    schema.textContent = JSON.stringify(data);
  } else {
    schema?.remove();
  }
}
