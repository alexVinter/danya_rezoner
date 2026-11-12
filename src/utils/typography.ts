/** Keep short words with the following word without changing markup or line breaks. */
const PREPOSITIONS = [
  'в', 'во', 'без', 'безо', 'до', 'для', 'за', 'из', 'изо', 'из-за', 'из-под',
  'к', 'ко', 'на', 'над', 'надо', 'о', 'об', 'обо', 'от', 'ото', 'перед', 'передо',
  'по', 'под', 'подо', 'при', 'про', 'с', 'со', 'у', 'через', 'после', 'между',
  'вместо', 'вне', 'внутри', 'около', 'вокруг', 'ради', 'кроме', 'вдоль', 'против',
  'среди', 'сквозь', 'возле', 'ввиду', 'благодаря', 'согласно', 'вследствие',
  'а', 'и', 'но', 'да', 'или', 'не', 'ни', 'как', 'что', 'то',
];
const PREP_REGEX = new RegExp(
  `(?<![\\p{L}\\p{N}_])(${PREPOSITIONS.join('|')})([ \\t\\u00A0]+)(?=\\S)`,
  'giu'
);
const NUMBER_UNIT_REGEX = /(\d)([ \t\u00A0]+)(?=(?:[₽€$%]|руб\.?|евро|человек|проекта|проектов|дня|дней|часа|часов|минут)(?!\p{L}))/giu;
const THOUSANDS_REGEX = /(\d)([ \t]+)(?=\d{3}(?!\d))/gu;
const DASH_REGEX = /([ \t\u00A0]+)(?=[—–][ \t\u00A0])/gu;
const nonbreaking = (spaces: string) => spaces.replace(/[ \t]/g, '\u00A0');

/** Replacements preserve length so spaces spanning inline elements can be mapped back safely. */
export function typograph(text: string): string {
  const result = text.replace(PREP_REGEX, (_match, word: string, spaces: string) => word + nonbreaking(spaces));
  return result
    .replace(NUMBER_UNIT_REGEX, (_match, digit: string, spaces: string) => digit + nonbreaking(spaces))
    .replace(THOUSANDS_REGEX, (_match, digit: string, spaces: string) => digit + nonbreaking(spaces))
    .replace(DASH_REGEX, nonbreaking);
}

const SKIP_SELECTOR = 'script, style, textarea, input, pre, code, svg, noscript, [contenteditable]:not([contenteditable="false"])';
const BLOCK_DISPLAYS = new Set(['block', 'flex', 'inline-flex', 'grid', 'inline-grid', 'list-item', 'table-cell']);

export function applyTypographerToDOM(root: Node = document.body): void {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      if (node.nodeType === Node.ELEMENT_NODE) {
        const element = node as Element;
        if (element.matches(SKIP_SELECTOR)) return NodeFilter.FILTER_REJECT;
        return element.tagName === 'BR' ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
      }
      return node.nodeValue && node.parentElement && !node.parentElement.closest(SKIP_SELECTOR)
        ? NodeFilter.FILTER_ACCEPT
        : NodeFilter.FILTER_REJECT;
    },
  });
  const boundaries = new WeakMap<Element, Element>();
  const boundaryFor = (element: Element): Element => {
    const cached = boundaries.get(element);
    if (cached) return cached;
    const boundary = BLOCK_DISPLAYS.has(getComputedStyle(element).display) || !element.parentElement
      ? element
      : boundaryFor(element.parentElement);
    boundaries.set(element, boundary);
    return boundary;
  };
  let group: Text[] = [];
  let boundary: Element | undefined;
  const flush = () => {
    const original = group.map(node => node.data).join('');
    const formatted = typograph(original);
    if (formatted !== original) {
      let offset = 0;
      for (const node of group) {
        const next = formatted.slice(offset, offset + node.length);
        offset += node.length;
        if (next !== node.data) node.data = next;
      }
    }
    group = [];
  };
  let node: Node | null;
  while ((node = walker.nextNode())) {
    if (node.nodeType !== Node.TEXT_NODE) {
      flush();
      boundary = undefined;
      continue;
    }
    const nextBoundary = boundaryFor(node.parentElement!);
    if (boundary !== nextBoundary) flush();
    boundary = nextBoundary;
    group.push(node as Text);
  }
  flush();
}
