import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import test from 'node:test';
import ts from 'typescript';

const source = readFileSync(new URL('../src/utils/sendLead.ts', import.meta.url), 'utf8');
const { outputText } = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
});
const exports = {};
runInNewContext(outputText, { exports });
const { sendTelegramMessage } = exports;
const message = { botToken: 'test-token', chatId: 'test-chat', text: 'Test message' };

test('stops after a confirmed delivery without sending a duplicate', async () => {
  const calls = [];
  const request = async (url, options) => {
    calls.push({ url, options });
    return { ok: true, json: async () => ({ ok: true }) };
  };
  assert.equal(await sendTelegramMessage(message, request), true);
  assert.equal(calls.length, 1);
  assert.deepEqual(JSON.parse(calls[0].options.body), { chat_id: 'test-chat', text: 'Test message', parse_mode: 'HTML' });
});

test('uses the existing proxy if the direct request is blocked', async () => {
  const calls = [];
  const request = async url => {
    calls.push(url);
    if (calls.length === 1) throw new Error('Network unavailable');
    return { ok: true, json: async () => ({ ok: true }) };
  };
  assert.equal(await sendTelegramMessage(message, request), true);
  assert.equal(calls[1], '/api/telegram/bottest-token/sendMessage');
});

test('never reports success for API errors or a non-JSON proxy response', async () => {
  let calls = 0;
  const request = async () => {
    calls++;
    return calls === 1
      ? { ok: true, json: async () => ({ ok: false }) }
      : { ok: true, json: async () => { throw new Error('HTML fallback'); } };
  };
  assert.equal(await sendTelegramMessage(message, request), false);
  assert.equal(calls, 2);
});
