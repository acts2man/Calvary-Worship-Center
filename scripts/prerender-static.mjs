// Prerender every vinext route to static HTML for static hosting (Netlify).
//
// The Calvary site is fully static content: forms compose `mailto:` drafts and
// media are third-party embeds, so there is no per-request server work. This
// script boots the production server produced by `vinext build`, fetches every
// route, and writes each one as a standalone `index.html` alongside the hashed
// client assets from `dist/client`. The result is a plain static site any CDN
// (Netlify included) can serve, with native anchor links between pages.

import { spawn } from "node:child_process";
import { cp, mkdir, readdir, rm, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const projectRoot = fileURLToPath(new URL("..", import.meta.url));
const appDir = path.join(projectRoot, "app");
const clientDir = path.join(projectRoot, "dist", "client");
const outDir = path.join(projectRoot, "dist", "static");
const PORT = Number(process.env.PRERENDER_PORT ?? 3123);
const ORIGIN = `http://127.0.0.1:${PORT}`;

function fail(message) {
  console.error(`\n[prerender] ${message}`);
  process.exit(1);
}

// Discover routes by scanning the App Router tree for `page.tsx` files.
async function discoverRoutes(dir = appDir, base = "") {
  const routes = [];
  const entries = await readdir(dir, { withFileTypes: true });
  if (entries.some((e) => e.isFile() && e.name === "page.tsx")) {
    routes.push(base === "" ? "/" : base);
  }
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    // Skip route groups / private / parallel-slot folders — none used here,
    // but guard anyway so the crawl stays aligned with real URLs.
    if (/^[(_@]/.test(entry.name)) continue;
    routes.push(...(await discoverRoutes(path.join(dir, entry.name), `${base}/${entry.name}`)));
  }
  return routes;
}

async function waitForServer(timeoutMs = 60000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      const res = await fetch(ORIGIN + "/", { redirect: "manual" });
      if (res.status < 500) return;
    } catch {
      // not up yet
    }
    await new Promise((r) => setTimeout(r, 300));
  }
  throw new Error(`server did not become ready on ${ORIGIN} within ${timeoutMs}ms`);
}

async function saveRoute(route) {
  const res = await fetch(ORIGIN + route, { headers: { accept: "text/html" } });
  if (!res.ok) throw new Error(`GET ${route} -> HTTP ${res.status}`);
  const html = await res.text();
  const dest = route === "/" ? path.join(outDir, "index.html") : path.join(outDir, route, "index.html");
  await mkdir(path.dirname(dest), { recursive: true });
  await writeFile(dest, html, "utf8");
  return html.length;
}

async function save404() {
  // Netlify serves /404.html for unmatched paths. vinext returns 404 for
  // unknown routes with the app's not-found UI.
  const res = await fetch(ORIGIN + "/__vinext_not_found__" + Date.now(), {
    headers: { accept: "text/html" },
  });
  const html = await res.text();
  await writeFile(path.join(outDir, "404.html"), html, "utf8");
}

async function main() {
  if (!existsSync(clientDir)) fail("dist/client not found — run `vinext build` first.");
  if (!existsSync(path.join(projectRoot, "dist", "server", "index.js"))) {
    fail("dist/server/index.js not found — run `vinext build` first.");
  }

  const routes = await discoverRoutes();
  console.log(`[prerender] discovered ${routes.length} routes`);

  const server = spawn(process.execPath, [
    path.join(projectRoot, "node_modules", "vinext", "dist", "cli.js"),
    "start",
    "--port",
    String(PORT),
    "--hostname",
    "127.0.0.1",
  ], { cwd: projectRoot, stdio: ["ignore", "inherit", "inherit"], env: { ...process.env, PORT: String(PORT) } });

  let serverExited = false;
  server.on("exit", (code) => {
    serverExited = true;
    if (code && code !== 0 && !shuttingDown) fail(`production server exited early with code ${code}`);
  });
  let shuttingDown = false;

  try {
    await waitForServer();

    // Fresh output dir seeded with the hashed client assets.
    await rm(outDir, { recursive: true, force: true });
    await mkdir(outDir, { recursive: true });
    await cp(clientDir, outDir, { recursive: true });

    let total = 0;
    for (const route of routes) {
      const bytes = await saveRoute(route);
      total += bytes;
      console.log(`[prerender] ${route.padEnd(24)} ${bytes} bytes`);
    }
    await save404();
    console.log(`[prerender] wrote ${routes.length} pages + 404 (${total} bytes of HTML) to dist/static`);
  } finally {
    shuttingDown = true;
    if (!serverExited) server.kill("SIGTERM");
  }
}

main().catch((err) => fail(err?.stack || String(err)));
