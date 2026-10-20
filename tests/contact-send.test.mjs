// node --test tests/*.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { validate, buildPayload, sendContact, CONTACT_ENDPOINT } from '../contact-send.js';

const good = { name: ' Jane Doe ', email: 'jane@company.com ', message: 'Hello, let us talk data.', lang: 'fr', page: 'https://x/' };
const reply = (status, body) => async () => ({ ok: status >= 200 && status < 300, status, json: async () => body });

test('validation: name required, real-looking email, message of 10+ chars', () => {
  assert.deepEqual(validate(good), { name: true, email: true, message: true });
  assert.deepEqual(validate({ name: '  ', email: 'nope@x', message: 'short' }), { name: false, email: false, message: false });
});

test('payload is trimmed, has subject, reply-to and FormSubmit options', () => {
  const p = buildPayload(good);
  assert.equal(p.name, 'Jane Doe');
  assert.equal(p.email, 'jane@company.com');
  assert.equal(p._subject, '[Portfolio] Jane Doe');
  assert.equal(p._replyto, 'jane@company.com');
  assert.equal(p._captcha, 'false');
  assert.equal(p.language, 'fr');
});

test('posts JSON to the FormSubmit AJAX endpoint and reports success', async () => {
  let seen;
  const fetchImpl = async (url, init) => { seen = { url, init }; return reply(200, { success: 'true', message: 'The form was submitted successfully.' })(); };
  assert.deepEqual(await sendContact(good, { fetchImpl }), { ok: true });
  assert.equal(seen.url, CONTACT_ENDPOINT);
  assert.equal(seen.init.method, 'POST');
  assert.equal(seen.init.headers['Content-Type'], 'application/json');
  assert.equal(JSON.parse(seen.init.body).message, 'Hello, let us talk data.');
});

test('form not activated yet is reported as "activation"', async () => {
  const r = await sendContact(good, { fetchImpl: reply(200, { success: 'false', message: 'This form needs Activation. We\'ve sent you an email containing an \'Activate Form\' button.' }) });
  assert.equal(r.ok, false);
  assert.equal(r.reason, 'activation');
});

test('other refusals, HTTP errors, network errors and timeouts all fail cleanly', async () => {
  assert.equal((await sendContact(good, { fetchImpl: reply(200, { success: 'false', message: 'Blocked' }) })).reason, 'rejected');
  assert.equal((await sendContact(good, { fetchImpl: reply(500, {}) })).reason, 'http');
  assert.equal((await sendContact(good, { fetchImpl: async () => { throw new TypeError('Failed to fetch'); } })).reason, 'network');
  const hang = (_u, { signal }) => new Promise((_, rej) => signal.addEventListener('abort', () => rej(Object.assign(new Error('aborted'), { name: 'AbortError' }))));
  assert.equal((await sendContact(good, { fetchImpl: hang, timeoutMs: 20 })).reason, 'timeout');
});

test('a filled honeypot (bot) never reaches the network', async () => {
  let called = false;
  const r = await sendContact(good, { fetchImpl: async () => { called = true; }, honeypot: 'http://spam' });
  assert.equal(r.ok, true);
  assert.equal(called, false);
});

test('the site publishes no email address or phone number', () => {
  const root = new URL('../', import.meta.url);
  const published = readdirSync(root).filter(f => /\.(html|js|css|md|json)$/.test(f))
    .concat(readdirSync(new URL('data/', root)).map(f => `data/${f}`));
  const email = /[A-Za-z0-9._%+-]+@(gmail|yahoo|hotmail|outlook|icloud|proton)\.[a-z]{2,}/i;
  const phone = /(\+\d{1,3}[\s.()-]*)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}|\+33\s?\d(?:[\s.]?\d{2}){4}|tel:/;
  for (const f of published) {
    const text = readFileSync(new URL(f, root), 'utf8');
    assert.doesNotMatch(text, email, `email address in ${f}`);
    assert.doesNotMatch(text, phone, `phone number in ${f}`);
  }
  assert.doesNotMatch(CONTACT_ENDPOINT, /@/);
});
