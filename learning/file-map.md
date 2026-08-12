# File map — nothing in this repo is a mystery box

> **Living document.** Every file and folder gets a line here, added the moment
> it appears. If I cannot say what something is and why it exists, it does not
> get to sit in my repo unexplained.

**Last updated:** 2026-08-10 (Task 3.1)

---

## Marks

| Mark | Means |
|---|---|
| **known** | I can explain what this is and why it exists, in my own words. |
| **parked** | Honest one-liner for now, real understanding deferred. A deep dive is scheduled. |
| **generated** | Machine-made. Never hand-edit. I should still know what makes it and why. |

**Rule:** `parked` is allowed and normal. What is *not* allowed is a file with no
line at all, or a `known` mark I could not actually defend if asked right now.
Every `parked` entry names when it gets resolved.

---

## Current repository

```
funnyshapes/
├── .claude/
│   └── settings.local.json
├── claude_test
├── learning/
│   ├── project.md
│   ├── plan.md
│   ├── knowledge-graph.md
│   └── file-map.md
├── shared/
│   └── animation.ts
└── web/
    ├── node_modules/          (generated)
    ├── public/
    ├── src/
    ├── .gitignore
    ├── .oxlintrc.json
    ├── README.md
    ├── index.html
    ├── package.json
    ├── package-lock.json      (generated)
    ├── tsconfig.json
    ├── tsconfig.app.json
    ├── tsconfig.node.json
    └── vite.config.ts
```

| Path | Mark | What it is and why it exists |
|---|---|---|
| `learning/` | known | Documentation about *me and the process*, not about the code. Every session starts by reading it. |
| `learning/project.md` | known | Who I am, my experience level, the project idea, and the MVP / parking-lot split. The scope contract. |
| `learning/plan.md` | known | The seven locked technical decisions with their reasoning, and the nine build sections. The *how* contract. |
| `learning/knowledge-graph.md` | known | Every concept this project teaches, with an honest status. Decides what I get quizzed on. |
| `learning/file-map.md` | known | This file. The rule that no file in the repo goes unexplained. |
| `.claude/` | known | Config for the Claude Code CLI I am learning with. Belongs to my tooling, not to the app — the app would run identically without it. |
| `.claude/settings.local.json` | known | A permissions allowlist so the assistant can run specific commands without asking every time. Currently allows exactly one: `npm --version`. |
| `claude_test` | known | My personal motivation file. Nothing to do with the app — leave it alone. Currently empty. |
| `shared/` | known | The framework-free animation module. Plain TypeScript, zero React — has to run standalone in Playwright's Chromium during export in Section 5, not just in the browser. |
| `shared/animation.ts` | known | Exports `SIZE` and `startLoop(ctx, paramsRef)` — a `requestAnimationFrame` loop. `paramsRef` is a ref to a `Params`-shaped object (`amplitude`, `gridSize`, `waveFrequency`, `phaseSpeed`, `shapeSize`) — a named TypeScript type alias, so the shape only has to be spelled out once instead of inline at every use. Every frame recomputes `cell` (`SIZE / paramsRef.current.gridSize`) and `angle` fresh, then redraws a `gridSize`×`gridSize` grid, each cell offset vertically by `Math.sin(angle + row*phaseSpeed + col*phaseSpeed) * amplitude` and drawn at `shapeSize`. `LOOP_FRAMES` (120) is the one constant that stays fixed on purpose — it is not a live parameter, it is what keeps frame 0 and the wrap frame landing on the same angle (Task 2.5's seamless-loop guarantee), and briefly got swapped for `phaseSpeed` by mistake during Task 3.2 before being caught and reverted. As of Task 3.2, all five numeric parameters (not just amplitude, as in Task 3.1) are read live from `paramsRef.current` every frame; the old fixed constants (`SHAPE_SIZE`, `GRID_SIZE`, `PHASE_STEP`, `CYCLES`, `CELL`) were deleted as dead code once nothing referenced them. `drawGrid` (Task 2.1's static version) was removed once nothing called it anymore. Imported into `App.tsx` via a relative path; Vite serves it because it auto-detects the git repo root as the allowed file-serving boundary, not just `web/`. |

| `.git/` | generated | Created by `git init`. Stores the full commit history. Hidden — invisible to plain `ls`, visible with `ls -a`. Never hand-edit its contents. |

**First commit:** `5b15850` — "Initial commit: project scaffold and learning docs", 25 files.

### `web/` — created by the Vite generator in Task 1.1

**Almost all of this is `parked` on purpose.** It arrived from a generator and I
have not examined it yet. Task 1.2 is the tour that converts the important ones
to `known`; the rest stay parked with honest one-liners.

| Path | Mark | What it is and why it exists |
|---|---|---|
| `web/` | known | The React frontend. Separate from `server/` and `shared/` because the plan splits the project three ways. |
| `web/package.json` | **parked** | Records which libraries the frontend needs, and names the commands (`dev`, `build`, `lint`, `preview`). Partly toured in 1.1 — scripts, and dependencies vs devDependencies. Rest in 1.2. |
| `web/package-lock.json` | generated | npm's exact record of every package version it installed, so the same install is reproducible. Never hand-edit. |
| `web/node_modules/` | generated | The downloaded library code — 24 folders, 30 packages, 673 files. Created by `npm install`, never edited, never committed. |
| `web/index.html` | known | The page the browser loads. Contains an empty `<div id="root"></div>` and one script tag pointing at `main.tsx` — the whole app is built by that script, not written in this HTML. |
| `web/src/` | known | My application source code. Everything here I will eventually write or delete. |
| `web/src/main.tsx` | known | Finds the empty `#root` div and tells React to render `<App />` into it. `StrictMode` runs code twice in development only, to surface bugs — worth remembering when Section 2's animation seems to double-start. Confirmed in 1.3: it only cares about the file path `./App.tsx`, never what's inside it. |
| `web/src/App.tsx` | known | My component. Renders a title, a description, a correctly-sized `<canvas>` (buffer at `SIZE * devicePixelRatio`, CSS size pinned at `SIZE`, `ctx.scale` keeps drawing code in `SIZE`-unit coordinates), and five range sliders. Drawing logic lives in `shared/animation.ts`; this file handles the ref, effect timing, sizing, and calls `startLoop(ctx, paramsRef)`. As of Task 3.1: one parameter (`amplitude`) was `useState`, mirrored into a ref by a `useEffect` so the running animation loop (which only reads its own copy once, at start) can see live updates without restarting — the bridge pattern for getting React state into code React doesn't control. As of Task 3.2: `params` grew into one object holding all five numeric parameters (`amplitude`, `gridSize`, `waveFrequency`, `phaseSpeed`, `shapeSize`), still one `useState`/`useRef`/`useEffect` trio, now bridging the whole object at once. Each slider's `onChange` updates just its own field with `setParams({ ...params, field: value })` — the spread copies the other four fields forward unchanged. `phaseSpeed`'s slider needed `min={0.5}` and `step={0.1}` specifically, since its default (`0.5`, the value hand-tuned in Section 2) is fractional and below where a plain `min={1}` would have cut it off. |
| `web/src/index.css` | **parked** | Rewrote as a 9-line reset (`color-scheme`, `margin: 0`, a default font) to replace 111 lines of demo styling. Written by me, not yet by you — real styling decisions are Section 3's job. |
| `web/public/` | known | Files served exactly as-is, no processing. Contains only `favicon.svg` now — `icons.svg` was deleted in 1.3 after confirming nothing referenced it. |
| `web/vite.config.ts` | known | 7 lines. Tells Vite to load the React plugin so it knows how to handle `.tsx` files. That's the whole file. |
| `web/tsconfig.json` | known | Contains no settings itself — just points to `tsconfig.app.json` and `tsconfig.node.json`. |
| `web/tsconfig.app.json` | known | TypeScript rules for app code, which runs in the browser (has `window`, `document`). |
| `web/tsconfig.node.json` | known | TypeScript rules for build tooling, which runs in Node (has filesystem access). Split from the app config because the two environments support different features. |
| `web/.gitignore` | known | Tells git which files in `web/` to never track — `node_modules` and `dist`, both fully regenerable, so tracking them would waste space for zero unique information. |
| `web/.oxlintrc.json` | **parked** | Configuration for oxlint, the linter listed in devDependencies. Not yet examined. |
| `web/README.md` | **parked** | The generator's default readme. Describes Vite templates, not my project. Replaced in Section 9. |

---

## Planned structure

Not yet created. Listed so the shape of the project is visible in advance —
**each entry gets a real line above, with a real mark, on the day it actually
appears.** Nothing here counts as documented until then.

```
funnyshapes/
├── learning/          # this directory
├── shared/            # arrived in Task 2.1 — see the table above
├── web/               # React + Vite studio UI
├── server/            # Express API, job queue, render pipeline
├── package.json       # project verbs and dependencies
└── Dockerfile         # what actually ships to Fly.io
```

Expected to arrive by section:

- **Section 1** — `web/` scaffold, `package.json`, `tsconfig.json`, `.gitignore`,
  `node_modules/` (generated), `web/dist/` (generated)
- **Section 3** — CSS, palette definitions, URL state encoding
- **Section 4** — `server/` and the Express entry point
- **Section 5** — the render script, a frames scratch directory (generated)
- **Section 6** — the SQLite database file (generated), schema, API routes
- **Section 7** — test files, Vitest config, Playwright config
- **Section 8** — `Dockerfile`, `fly.toml`, `.dockerignore`, `.env` (never committed)

---

## Standing questions to ask of every new file

1. What is it? One sentence.
2. Why does it exist — what breaks without it?
3. Did I write it, or did a tool generate it?
4. If generated: what generated it, and what would I change instead of editing it?

A file that cannot survive question 2 probably should not be in the repo.
