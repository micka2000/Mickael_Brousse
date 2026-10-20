// Contact form delivery through FormSubmit (https://formsubmit.co), no DOM.
// Shared by script.js and tests/contact-send.test.mjs.
//
// FormSubmit forwards each submission to the inbox behind the endpoint.
// The first submission from a new site sends an activation email instead;
// until it is confirmed, every send answers success:"false".

export const CONTACT_EMAIL = 'mickabrousse@gmail.com';
export const CONTACT_ENDPOINT = `https://formsubmit.co/ajax/${CONTACT_EMAIL}`;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validate({ name = '', email = '', message = '' }) {
  return {
    name: name.trim().length > 0,
    email: EMAIL_RE.test(email.trim()),
    message: message.trim().length >= 10,
  };
}

export function buildPayload({ name, email, message, lang = 'en', page = '' }) {
  const n = name.trim();
  return {
    name: n,
    email: email.trim(),
    message: message.trim(),
    _subject: `[Portfolio] ${n}`,
    _replyto: email.trim(),
    _template: 'box',
    _captcha: 'false',
    language: lang,
    page,
  };
}

export function mailtoHref({ name = '', email = '', message = '' }) {
  const subject = `[Portfolio] ${name.trim()}`;
  const body = `${message.trim()}\n\n— ${name.trim()}\n${email.trim()}`;
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

// Returns { ok: true } or { ok: false, reason } with reason one of
// 'activation' | 'rejected' | 'http' | 'timeout' | 'network'.
// A filled honeypot (bots) resolves ok without sending anything.
export async function sendContact(fields, { fetchImpl = globalThis.fetch, endpoint = CONTACT_ENDPOINT, timeoutMs = 12000, honeypot = '' } = {}) {
  if (honeypot) return { ok: true, skipped: true };
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetchImpl(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(buildPayload(fields)),
      signal: ctrl.signal,
    });
    let data = {};
    try { data = await res.json(); } catch {}
    if (!res.ok) return { ok: false, reason: 'http', status: res.status, detail: data.message };
    if (String(data.success) === 'true') return { ok: true };
    const detail = String(data.message || '');
    return { ok: false, reason: /activat/i.test(detail) ? 'activation' : 'rejected', detail };
  } catch (err) {
    return { ok: false, reason: err?.name === 'AbortError' ? 'timeout' : 'network', detail: String(err?.message || err) };
  } finally {
    clearTimeout(timer);
  }
}
