// Writes data/projects.json: the list of repositories the site may show.
//
// - Public repos: all of them, minus catalog.hidden, forks and archived ones.
// - Private repos: only those listed in data/catalog.json, and only their name
//   and dates. Other private repos never reach this public file.
// - live_url is set only when the GitHub Pages / homepage URL answers 200.
//
// Private repos are visible only with CATALOG_TOKEN (a read-only token).
// Without it, private_included is false and the site keeps its curated
// private cards as they are.
//
// Usage: node scripts/build-projects.mjs   (Node 20+)

import { readFile, writeFile } from 'node:fs/promises';

const root = new URL('..', import.meta.url);
const catalog = JSON.parse(await readFile(new URL('data/catalog.json', root), 'utf8'));
const token = process.env.CATALOG_TOKEN || '';
const hidden = new Set(catalog.hidden || []);

const headers = { Accept: 'application/vnd.github+json', 'User-Agent': 'portfolio-catalog' };
if (token) headers.Authorization = `Bearer ${token}`;

async function listRepos() {
  const base = token
    ? 'https://api.github.com/user/repos?affiliation=owner&visibility=all&per_page=100'
    : `https://api.github.com/users/${catalog.user}/repos?type=owner&per_page=100`;
  const repos = [];
  for (let page = 1; ; page++) {
    const res = await fetch(`${base}&page=${page}`, { headers });
    if (!res.ok) throw new Error(`GitHub API ${res.status}: ${await res.text()}`);
    const batch = await res.json();
    repos.push(...batch);
    if (batch.length < 100) return repos;
  }
}

async function answers(url) {
  try {
    const res = await fetch(url, { method: 'GET', redirect: 'follow' });
    return res.ok;
  } catch {
    return false;
  }
}

const all = await listRepos();
const out = [];
for (const r of all) {
  if (r.owner.login !== catalog.user || r.fork || r.archived || hidden.has(r.name)) continue;
  if (r.private && !catalog.projects[r.name]) continue;

  const entry = {
    name: r.name,
    private: r.private,
    language: r.language,
    created_at: r.created_at,
    // no pushed_at: it changes on every push (including this workflow's own
    // commit) and would make the snapshot churn; the live API provides it
  };
  if (!r.private) {
    entry.description = r.description;
    entry.html_url = r.html_url;
    const candidate = r.homepage || (r.has_pages ? `https://${catalog.user}.github.io/${r.name}/` : null);
    entry.live_url = candidate && (await answers(candidate)) ? candidate : null;
  }
  out.push(entry);
}
out.sort((a, b) => a.name.localeCompare(b.name));

const snapshot = { private_included: Boolean(token), repos: out };
await writeFile(new URL('data/projects.json', root), JSON.stringify(snapshot, null, 2) + '\n');
console.log(`projects.json: ${out.length} repos (${out.filter(r => r.private).length} private, token: ${token ? 'yes' : 'no'})`);
