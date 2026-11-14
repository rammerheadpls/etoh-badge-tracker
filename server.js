// Eternal Towers of Hell badge tracker: zero-dependency Node server (Node 18+).
// Run: node server.js   then open http://localhost:3000
// It serves index.html and proxies Roblox's APIs (browsers can't call them directly).
const http = require("http");
const fs = require("fs");
const path = require("path");

const PLACE_ID = process.env.PLACE_ID || "8562822414"; // Eternal Towers of Hell
const PORT = process.env.PORT || 3000;
const BADGES = process.env.BADGES_HOST || "https://badges.roblox.com";
// Open Cloud key, used to read players’ badges. Taken from the ROBLOX_API_KEY environment variable,
// or from a file named api-key.txt next to this script (the file contains only the key).
function readKeyFile() {
  try { return fs.readFileSync(path.join(__dirname, "api-key.txt"), "utf8"); } catch { return ""; }
}
const clean = (k) => (k || "").trim().replace(/^["']|["']$/g, "").trim() || undefined;
const API_KEY = clean(process.env.ROBLOX_API_KEY) || clean(readKeyFile());
const GAME_CACHE_MS = 60 * 60 * 1000; // the game's badge list is cached for an hour
const USER_CACHE_MS = 5 * 60 * 1000; // repeat lookups of one username are cached for 5 minutes
const HEADERS = { "User-Agent": "etoh-badge-tracker/1.0 (personal project)", Accept: "application/json" };

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const chunk = (arr, n) =>
  Array.from({ length: Math.ceil(arr.length / n) }, (_, i) => arr.slice(i * n, i * n + n));
const fail = (status, message) => Object.assign(new Error(message), { status });

// Space out every Roblox request so we stay under their rate limits.
let nextSlot = 0;
async function throttle() {
  const now = Date.now();
  const start = Math.max(now, nextSlot);
  nextSlot = start + 300;
  if (start > now) await sleep(start - now);
}

// Fetch JSON from Roblox; on a 429, wait as long as Roblox asks and retry.
async function rbx(url, options = {}) {
  const where = new URL(url);
  for (let attempt = 1; ; attempt++) {
    await throttle();
    const res = await fetch(url, { ...options, headers: { ...HEADERS, ...options.headers } });
    if (res.ok) return res.json();
    if (res.status === 429 && attempt < 5) {
      const wait = Math.min(Number(res.headers.get("retry-after")) || attempt * 2, 15);
      console.warn(`429 from ${where.host}${where.pathname}; waiting ${wait}s (attempt ${attempt})`);
      await sleep(wait * 1000);
      continue;
    }
    const detail = (await res.text().catch(() => "")).slice(0, 200);
    console.error(`Roblox ${res.status} for ${where.host}${where.pathname} ${detail}`);
    if (res.status === 429) throw fail(429, "Roblox is limiting requests right now. Wait a minute, then try again.");
    throw Object.assign(fail(502, `Roblox responded ${res.status} for ${where.pathname}. Details are in the server console.`), { upstream: res.status });
  }
}

const CATEGORIES = require("./categories");
const PREFIX = { T: "Tower", S: "Steeple", C: "Citadel" };
// Ignore case, curly vs straight quotes, and extra spaces when matching names.
const norm = (t) => t.replace(/[’‘]/g, "'").replace(/[“”]/g, '"').replace(/\s+/g, " ").trim().toLowerCase();

function parseItem(item) {
  const m = /^([TSC]):(.+)$/.exec(item);
  if (m) {
    const name = `Beat The ${PREFIX[m[1]]} of ${m[2]}`;
    return { match: name, title: `${PREFIX[m[1]]} of ${m[2]}`, hasDesc: true };
  }
  const i = item.indexOf("|");
  if (i >= 0) return { title: item.slice(0, i), match: item.slice(i + 1), hasDesc: true };
  return { title: item, match: item, hasDesc: false };
}

// Put the game's badges into the categories from categories.js (in that order).
// Anything not listed there goes in "Other" at the end; the server log reports any mismatches.
function categorize(list) {
  const buckets = new Map();
  for (const b of list) {
    const k = norm(b.name);
    if (!buckets.has(k)) buckets.set(k, []);
    buckets.get(k).push(b);
  }
  const used = new Set(), out = [], missing = [];
  let listed = 0;
  for (const cat of CATEGORIES) {
    for (const item of cat.items) {
      listed++;
      const p = parseItem(item);
      const b = (buckets.get(norm(p.match)) || []).shift();
      if (!b) { missing.push(p.match); continue; }
      used.add(b.id);
      out.push({ id: b.id, title: p.title, description: p.hasDesc ? b.name : "", category: cat.name, icon: b.icon });
    }
  }
  const extra = list.filter((b) => !used.has(b.id));
  for (const b of extra) out.push({ id: b.id, title: b.name, description: "", category: "Other", icon: b.icon });
  console.log(`Badges: ${listed} listed, ${out.length - extra.length} matched, ${missing.length} not found on Roblox, ${extra.length} on Roblox but not listed.`);
  const show = (label, arr) => arr.length && console.warn(`${label}:\n  ` + arr.slice(0, 50).join("\n  ") + (arr.length > 50 ? `\n  …and ${arr.length - 50} more` : ""));
  show("Listed but not found on Roblox", missing);
  show("On Roblox but not listed (shown under Other)", extra.map((b) => b.name));
  return out;
}

let gameCache = null; // { at, badges }

async function loadBadges() {
  if (gameCache && Date.now() - gameCache.at < GAME_CACHE_MS) return gameCache.badges;

  const { universeId } = await rbx(
    `https://apis.roblox.com/universes/v1/places/${PLACE_ID}/universe`
  );

  const raw = [];
  let cursor = "";
  do {
    const page = await rbx(
      `${BADGES}/v1/universes/${universeId}/badges?limit=100&sortOrder=Asc` +
        (cursor ? `&cursor=${encodeURIComponent(cursor)}` : "")
    );
    raw.push(...page.data);
    cursor = page.nextPageCursor;
  } while (cursor);

  const icons = {};
  for (const ids of chunk(raw.map((b) => b.id), 100)) {
    const t = await rbx(
      `https://thumbnails.roblox.com/v1/badges/icons?badgeIds=${ids.join(",")}&size=150x150&format=Png`
    );
    for (const x of t.data) icons[x.targetId] = x.imageUrl;
  }

  const badges = categorize(raw.map((b) => ({ id: b.id, name: b.name, icon: icons[b.id] || null })));
  gameCache = { at: Date.now(), badges };
  return badges;
}

// Which of the game's badges does this player own? Uses Roblox's Open Cloud inventory API,
// which works for players whose inventory is visible to everyone. Returns Map(badgeId -> awarded time).
async function ownedBadges(userId, badgeIds) {
  if (!API_KEY) throw fail(500, "The server has no Roblox API key. Put it in api-key.txt next to server.js, then restart the server.");
  const owned = new Map();
  let size = 50; // badge IDs per request; halves if Roblox says a request is too big
  for (let i = 0; i < badgeIds.length; ) {
    const ids = badgeIds.slice(i, i + size);
    try {
      let pageToken = "";
      do {
        const page = await rbx(
          `https://apis.roblox.com/cloud/v2/users/${userId}/inventory-items?maxPageSize=100` +
            `&filter=${encodeURIComponent("badgeIds=" + ids.join(","))}` +
            (pageToken ? `&pageToken=${encodeURIComponent(pageToken)}` : ""),
          { headers: { "x-api-key": API_KEY } }
        );
        for (const item of page.inventoryItems || []) {
          if (item.badgeDetails) owned.set(Number(item.badgeDetails.badgeId), item.addTime || true);
        }
        pageToken = page.nextPageToken;
      } while (pageToken);
      i += ids.length;
    } catch (err) {
      if (err.upstream === 400 && size > 5) { size = Math.max(5, Math.floor(size / 2)); continue; }
      if (err.upstream === 401) throw fail(500, "Roblox rejected the server’s API key. Check ROBLOX_API_KEY.");
      if (err.upstream === 403) {
        throw fail(403, "Roblox wouldn’t return this player’s badges. Their inventory may be private, or the API key may be restricted.");
      }
      throw err;
    }
  }
  return owned;
}

const userCache = new Map();

async function check(username) {
  const key = username.toLowerCase();
  const hit = userCache.get(key);
  if (hit && Date.now() - hit.at < USER_CACHE_MS) return hit.result;

  const found = await rbx("https://users.roblox.com/v1/usernames/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ usernames: [username], excludeBannedUsers: false }),
  });
  const user = found.data[0];
  if (!user) throw fail(404, "No Roblox user has that username.");

  const badges = await loadBadges();
  const owned = await ownedBadges(user.id, badges.map((b) => b.id));
  const result = {
    user: { id: user.id, name: user.name, displayName: user.displayName },
    badges: badges.map((b) => ({ ...b, awarded: owned.get(b.id) || false })),
  };
  if (userCache.size > 500) userCache.clear();
  userCache.set(key, { at: Date.now(), result });
  return result;
}

http
  .createServer(async (req, res) => {
    const url = new URL(req.url, "http://localhost");
    const send = (status, body, type = "application/json") => {
      res.writeHead(status, { "Content-Type": type });
      res.end(typeof body === "string" ? body : JSON.stringify(body));
    };
    try {
      if (url.pathname === "/") {
        return send(200, fs.readFileSync(path.join(__dirname, "index.html"), "utf8"), "text/html; charset=utf-8");
      }
      if (url.pathname === "/api/check") {
        const username = (url.searchParams.get("username") || "").trim();
        if (!/^[A-Za-z0-9_]{3,20}$/.test(username)) {
          throw fail(400, "Usernames are 3 to 20 letters, numbers, or underscores.");
        }
        return send(200, await check(username));
      }
      send(404, { error: "Not found." });
    } catch (err) {
      console.error(err.message);
      send(err.status || 502, {
        error: err.status ? err.message : "Couldn’t reach Roblox right now. Try again in a moment.",
      });
    }
  })
  .listen(PORT, () => {
    console.log(`Badge tracker running at http://localhost:${PORT}`);
    if (!API_KEY) console.warn("Warning: no Roblox API key found (ROBLOX_API_KEY or api-key.txt), so player badges can’t be checked yet.");
  });
