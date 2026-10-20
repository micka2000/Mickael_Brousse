// node --test tests/
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mergeProjects } from '../projects-data.js';

const catalog = {
  user: 'micka2000',
  hidden: ['micka2000.github.io'],
  projects: {
    portfolio: { order: 1, title: 'Portfolio', image: 'a.webp' },
    shiller: { order: 2, title: 'Shiller' },
    'life-dashboard': { order: 5, private: true, title: 'Life Dashboard', year: 2026 },
    'cv-optimizer-v2': { order: 6, private: true, title: 'CV Optimizer' },
  },
};
const pub = (name, extra = {}) => ({
  name, private: false, fork: false, archived: false, language: 'JS',
  created_at: '2025-01-01T00:00:00Z', pushed_at: '2026-01-01T00:00:00Z',
  html_url: `https://github.com/micka2000/${name}`, ...extra,
});
const names = list => list.map(p => p.name);
const publicNames = list => names(list.filter(p => !p.private));

test('a public repo deleted on GitHub disappears at once (live API wins over a stale snapshot)', () => {
  const snapshot = { private_included: true, repos: [pub('portfolio'), pub('shiller'), pub('fun')] };
  const live = [pub('portfolio'), pub('shiller')]; // "fun" deleted
  assert.deepEqual(names(mergeProjects({ catalog, snapshot, live })), ['portfolio', 'shiller']);
});

test('a new public repo appears on its own, with generated title and language tag', () => {
  const out = mergeProjects({ catalog, snapshot: null, live: [pub('portfolio'), pub('new-tool', { language: 'Go' })] });
  const p = out.find(x => x.name === 'new-tool');
  assert.equal(p.title, 'New Tool');
  assert.equal(p.abbr, 'NT');
  assert.deepEqual(p.tags, ['Go']);
});

test('hidden, forked and archived public repos never show', () => {
  const live = [pub('portfolio'), pub('micka2000.github.io'), pub('forked', { fork: true }), pub('old', { archived: true })];
  assert.deepEqual(publicNames(mergeProjects({ catalog, snapshot: null, live })), ['portfolio']);
});

test('a private repo deleted on GitHub disappears with the next token-built snapshot', () => {
  const snapshot = {
    private_included: true,
    repos: [pub('portfolio'), { name: 'life-dashboard', private: true, created_at: '2026-09-28T00:00:00Z' }],
  }; // cv-optimizer-v2 deleted
  const out = mergeProjects({ catalog, snapshot, live: [pub('portfolio')] });
  assert.deepEqual(names(out), ['portfolio', 'life-dashboard']);
  assert.equal(out[1].code, null);
});

test('private repos not in the catalog never leak, even if the snapshot lists them', () => {
  const snapshot = { private_included: true, repos: [{ name: 'mon-GPT', private: true }, { name: 'life-dashboard', private: true }] };
  assert.deepEqual(names(mergeProjects({ catalog, snapshot, live: [] })), ['life-dashboard']);
});

test('without a token-built snapshot, curated private cards stay (cannot be checked)', () => {
  const snapshot = { private_included: false, repos: [pub('portfolio')] };
  const out = mergeProjects({ catalog, snapshot, live: null });
  assert.deepEqual(names(out), ['portfolio', 'life-dashboard', 'cv-optimizer-v2']);
  assert.equal(out.find(p => p.name === 'life-dashboard').year, 2026);
});

test('when GitHub is unreachable, public repos come from the snapshot', () => {
  const snapshot = { private_included: true, repos: [pub('shiller', { live_url: 'https://x/' })] };
  const out = mergeProjects({ catalog, snapshot, live: null });
  assert.deepEqual(names(out), ['shiller']);
  assert.equal(out[0].live, 'https://x/');
});

test('"Live site" only for URLs the snapshot verified, never for the portfolio itself', () => {
  const snapshot = { private_included: true, repos: [pub('Mickael_Brousse', { live_url: 'https://self/' }), pub('shiller', { live_url: null })] };
  const out = mergeProjects({ catalog, snapshot, live: [pub('Mickael_Brousse'), pub('shiller'), pub('brand-new')] });
  assert.ok(out.every(p => p.live === null));
});

test('everything down: nothing crashes, curated private cards remain', () => {
  assert.deepEqual(names(mergeProjects({ catalog: undefined, snapshot: null, live: null })), []);
  assert.deepEqual(names(mergeProjects({ catalog, snapshot: null, live: null })), ['life-dashboard', 'cv-optimizer-v2']);
});
