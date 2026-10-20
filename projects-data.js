// Pure merge logic for the project catalog (no DOM, no network), shared by
// script.js and tests/projects-data.test.mjs.
//
// catalog   data/catalog.json   { user, hidden[], projects{ name: curated } }
// snapshot  data/projects.json  { private_included, repos[] } or null
// live      GitHub API /users/:user/repos result, or null if unreachable
//
// Rules
// - Public repos: the live API decides; if it is down, the snapshot decides.
//   Forks, archived and hidden repos never show.
// - Private repos: only curated ones. With a token-built snapshot they show
//   only while the snapshot still lists them; without one they cannot be
//   checked, so curated private cards stay.
// - "Live site" link: only a URL the snapshot verified, never the site itself.

export const SELF_REPO = 'Mickael_Brousse';

function abbrFromName(name) {
  const words = name.replace(/[-_.]+/g, ' ').trim().split(/\s+/);
  return (words.length > 1 ? words[0][0] + words[1][0] : name.slice(0, 2)).toUpperCase();
}
function titleFromName(name) {
  return name.replace(/[-_]+/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

export function mergeProjects({ catalog, snapshot, live }) {
  const user = catalog?.user || 'micka2000';
  const curated = catalog?.projects || {};
  const hidden = new Set(catalog?.hidden || []);
  const snapRepos = snapshot?.repos || [];
  const snap = new Map(snapRepos.map(r => [r.name, r]));

  const publicRepos = (live || snapRepos.filter(r => !r.private))
    .filter(r => !r.private && !r.fork && !r.archived && !hidden.has(r.name));

  const privateNames = snapshot?.private_included
    ? snapRepos.filter(r => r.private && curated[r.name]).map(r => r.name)
    : Object.keys(curated).filter(n => curated[n].private);

  const build = (name, repo, isPrivate) => {
    const c = curated[name] || {};
    const s = snap.get(name) || {};
    const created = repo?.created_at || s.created_at;
    const lang = repo?.language || s.language;
    return {
      name,
      private: isPrivate,
      order: c.order ?? 100,
      abbr: c.abbr || abbrFromName(name),
      title: c.title || titleFromName(name),
      type: c.type || 'lab',
      image: c.image || null,
      tags: c.tags || (lang ? [lang] : []),
      summary: c.summary || repo?.description || s.description || '',
      year: created ? new Date(created).getFullYear() : (c.year ?? null),
      pushed: repo?.pushed_at || s.pushed_at || '',
      code: isPrivate ? null : (repo?.html_url || s.html_url || `https://github.com/${user}/${name}`),
      live: isPrivate || name === SELF_REPO ? null : (s.live_url || null),
    };
  };

  return [
    ...publicRepos.map(r => build(r.name, r, false)),
    ...privateNames.map(n => build(n, null, true)),
  ].sort((a, b) => (a.order - b.order) || String(b.pushed).localeCompare(String(a.pushed)));
}
