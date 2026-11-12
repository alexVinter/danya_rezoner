import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import test from 'node:test';
import ts from 'typescript';

const source = readFileSync(new URL('../src/utils/typography.ts', import.meta.url), 'utf8');
const { outputText } = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
});
const exports = {};
runInNewContext(outputText, { exports });
const { typograph } = exports;

test('keeps consecutive Russian short words with the next word', () => {
  assert.equal(typograph('И в Telegram, а не в рекламе'), 'И\u00a0в\u00a0Telegram, а\u00a0не\u00a0в\u00a0рекламе');
  assert.equal(typograph('«Для вас» и (после созвона)'), '«Для\u00a0вас» и\u00a0(после\u00a0созвона)');
});

test('preserves deliberate line breaks and does not rewrite parts of words', () => {
  assert.equal(typograph('Трафик в\nTelegram\nкоторый продаёт'), 'Трафик в\nTelegram\nкоторый продаёт');
  assert.equal(typograph('Какой канал? Новый формат. выбор'), 'Какой канал? Новый формат. выбор');
});

test('keeps grouped amounts, units and a long dash together', () => {
  assert.equal(typograph('25 000 ₽ — за 2 часа'), '25\u00a0000\u00a0₽\u00a0— за\u00a02\u00a0часа');
  assert.equal(typograph('750 € и 10 %'), '750\u00a0€ и\u00a010\u00a0%');
});

test('preserves offsets and remains stable after repeated DOM observation', () => {
  for (const input of ['', 'И в Telegram', 'за 25 000 ₽', 'с  друзьями', 'О\nпроекте', 'Разбор — по делу']) {
    const formatted = typograph(input);
    assert.equal(formatted.length, input.length);
    assert.equal(typograph(formatted), formatted);
  }
});
