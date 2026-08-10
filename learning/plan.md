# Loop Studio — locked decisions & build plan

> Read `learning/project.md` first for who I am and what is in scope. This file
> covers *how* it gets built.
>
> **Primary objective: understanding, not delivery speed.** The measure of
> success is that by the end I can explain how this app works end to end, out
> loud, without notes.

---

## Locked decisions

Each was chosen for the biggest community and the most beginner documentation,
except where noted. Don't reopen these without a new reason.

| # | Decision | Choice | Why |
|---|---|---|---|
| 1 | Language | **TypeScript on Node** | One language everywhere. The *same animation file* runs in the browser and inside Playwright's Chromium, so preview and export cannot drift. Types catch my mistakes at edit time, before I run anything. |
| 2 | Frontend | **React + TypeScript + Vite**, hand-written CSS | Vite is zero-config with instant hot reload. React is a deliberate resume choice — see the constraint below. Plain CSS because developing taste in spacing, type, and color is a goal, not an obstacle. |
| 3 | Backend | **Express** | The most documented Node framework in existence; my 11pm error messages will have answers. Tiny mental model. Routing speed is irrelevant when the bottleneck is a 30-second render. |
| 4 | Database | **SQLite** via `better-sqlite3` | A file on disk, no service to run. Stores exactly one thing: job records. |
| 5 | Capture & encode | **Playwright + ffmpeg** | Playwright ships official Docker images with Chromium preinstalled, which defuses the riskiest deployment problem in the project. ffmpeg called directly via `child_process` so I learn what the flags do. |
| 6 | Testing | **Vitest**, plus one Playwright end-to-end test | The boring choice *inside* a Vite project — same config, same transforms, nothing extra to wire up. |
| 7 | Hosting | **Fly.io**, one Docker container serving frontend + API | Handles TLS, offers persistent volumes for SQLite, and writing my own Dockerfile means I learn what is actually in my container. |

**Housekeeping:** npm. A plain repo with `web/`, `server/`, and `shared/`. No
monorepo tooling — it is overhead at this size.

### The one constraint that holds the architecture together

**The animation module in `shared/` is plain TypeScript with zero React in it.**

React owns the UI chrome — sliders, panels, layout. A framework-free module owns
the canvas and the `requestAnimationFrame` loop. React hands it parameters
imperatively through a ref.

This is forced, not stylistic: the export path loads that module standalone
inside Playwright's Chromium, where React does not exist. Keeping the boundary
clean is also the honest answer to *"how do you integrate React with an
imperative canvas API?"* — a question I will have actually lived through.

### Alternatives considered, and what they would have cost

- **Plain JavaScript** — less setup, but I lose the editor catching exactly the
  mistakes a beginner makes.
- **Python backend** — friendlier to write, but two languages to maintain and
  the shared animation module becomes impossible.
- **No framework on the frontend** — genuinely simpler for a canvas app and
  teaches more, but React is a deliberate resume priority. Tradeoff accepted
  knowingly.
- **Fastify / Hono** — better designed than Express, far fewer tutorials.
- **Postgres** — what production uses, but a second service to run and learn for
  a single table.
- **In-memory `Map` instead of SQLite** — simplest, but jobs vanish on restart
  and I would skip the database layer of my learning entirely.
- **Client-side `MediaRecorder`** — needs no backend at all, and therefore
  deletes the entire engineering half of the project.
- **Railway / Render / bare VPS** — easier, slower, or weeks spent on nginx and
  certificates instead of on my app.

---

## Build plan — 9 sections

Sections only. No task breakdown yet; that happens at the start of each section.

Each section ends in something I can **see working**, and carries a question I
should be able to answer out loud before moving on. Those questions are the real
deliverable — they accumulate into the end-to-end explanation.

---

### Section 1 — A page that renders

Scaffold the Vite + React + TypeScript project, get a `<canvas>` on screen, and
draw a static grid of shapes onto it with the Canvas 2D API. No animation, no
interactivity, no server. Just proof that I can put pixels where I intend to.

**Deliverable:** a grid of shapes rendering at `localhost:5173`.

**Should be able to explain:** what a canvas actually is, how a drawing context
differs from DOM elements, and why the canvas has both a CSS size and a pixel
size.

**Tasks**

- [x] **1.1 — Scaffold the app and watch it run.** Use Vite's project generator
      to create a React + TypeScript app, install its dependencies, start the dev
      server. *See: the default Vite welcome page in my browser.*
- [x] **1.2 — Account for every file, then put it under git.** Tour the handful
      of scaffold files that matter, park the rest honestly in the file map,
      initialise the repository, make the first commit. *See: `git log` showing
      one commit, and a file map with a line for everything on disk.*
- [x] **1.3 — Strip it back to my own page.** Delete the demo content and write
      the smallest component and stylesheet that are actually mine. *See: a page
      with my words on it and nothing I did not choose.*
- [x] **1.4 — Get a canvas on screen and paint it.** Add a `<canvas>`, reach for
      its 2D drawing context, fill it with a colour. *See: a rectangle of colour
      I chose.*
- [x] **1.5 — Size the canvas honestly.** Handle the difference between the
      canvas's CSS size and its pixel buffer, including devicePixelRatio. *See: a
      crisp, correctly sized canvas instead of a blurry stretched one.*
- [x] **1.6 — Draw one shape at a position I compute.** A single square, placed
      by arithmetic rather than by hardcoded coordinates. *See: one shape exactly
      where I decided it goes.*
- [x] **1.7 — Turn one shape into a grid.** Nested loops over rows and columns.
      *See: the Section 1 deliverable — a grid of shapes rendering at
      `localhost:5173`.*

---

### Section 2 — Make it move, and make it loop

Build the real animation module in `shared/` — plain TypeScript, no React. A
sine field drives rotation and offset across the grid, evolving over time, in a
`requestAnimationFrame` loop. The hard and interesting part is **seamlessness**:
frame 180 must be indistinguishable from frame 0, which constrains the math.

**Deliverable:** a wave tile animating smoothly and looping with no visible seam.

**Should be able to explain:** why the loop is seamless (what makes the math come
back to where it started), and why the animation module has to be framework-free.

---

### Section 3 — The studio

Wire the six parameters to real React controls, add the five hand-tuned palettes,
and write the CSS that makes it look like something I would show someone. Encode
the full config into the URL so reload restores it and the link is shareable.

**Deploy the static frontend at the end of this section**, even with no backend.
The first deploy should happen while motivation is high, not in week nine when
Docker is also on fire.

**Deliverable:** drag sliders and watch it change; copy the URL, open it in
another tab, get an identical loop. Live on the internet.

**Should be able to explain:** how React state reaches a canvas that React does
not control, and why the URL is a legitimate place to store state.

---

### Section 4 — A server that exists

Introduce Express. It serves the built frontend and answers one health endpoint.
That is all. The point is to feel the shift from "Vite's dev server hands me
files" to "a program I wrote is answering HTTP requests."

**Deliverable:** one `npm start`, one process, my studio served from
`localhost:3000` — no Vite in the loop.

**Should be able to explain:** what changed between the dev server and this, what
a build actually produces, and what Express is doing when a request arrives.

---

### Section 5 — The render pipeline, crudely and synchronously

The heart of the project, built as a **command-line script first — not an
endpoint.** Playwright opens a page that loads the shared animation module,
steps it frame by frame, screenshots each frame, and pipes them into ffmpeg,
which writes an MP4.

Doing this as a script keeps one hard thing hard at a time. HTTP, queueing, and
progress reporting are separate problems and come later.

**Deliverable:** run one command, get an MP4 on disk whose motion matches the
browser preview exactly.

**Should be able to explain:** why the server drives the animation frame by frame
instead of recording it in real time, and what ffmpeg is doing to turn images
into video.

---

### Section 6 — APIs and the database

Wrap the pipeline in HTTP. `POST /render` accepts a config and returns a job id;
an in-process queue with concurrency 1 runs jobs; SQLite records their state and
progress; `GET /jobs/:id` reports status; the finished file is downloadable. The
studio grows an Export button, a progress bar, and a download link.

**Deliverable:** click Export in the browser, watch real progress, download the
file.

**Should be able to explain:** why this work cannot happen inside the request that
started it, what the database is actually for here, and what happens to a job if
the server restarts mid-render.

---

### Section 7 — Tests

Not coverage theater — tests that would catch something real. The pure math is
the natural target: config encoding round-trips, palette resolution, and above
all **loop seamlessness**, which is a property that can be asserted rather than
eyeballed. Then one Playwright end-to-end test that drives a real export.

**Deliverable:** `npm test` green, including at least one test that fails if I
break the seam.

**Should be able to explain:** why the animation math is easy to test and the
render pipeline is hard to, and what each test would actually catch.

---

### Section 8 — Ship it

A Dockerfile built on Playwright's base image. Deploy to Fly.io with a persistent
volume for SQLite. Then the unglamorous work that separates a demo from a
product: expiring old files, capping the queue so a stranger cannot melt the box,
and handling the render that fails halfway.

**Deliverable:** a public HTTPS URL where a stranger can make a loop and download
an MP4.

**Should be able to explain:** what is inside my container and why, and every
failure mode a request can hit between the browser and the returned file.

---

### Section 9 — Make it worth showing

The design pass. Easing and timing on the UI itself, typography, spacing, color.
Build the landing page with three or four showcase loops made with the tool. Write
a README that explains the architecture, including the headless-Chromium decision.

**Deliverable:** something I am willing to put at the top of my resume.

**Should be able to explain:** the whole thing, end to end, in five minutes, to
someone who has never seen it.

---

## Standing rules

- **Deploy early and often.** First deploy in Section 3, not Section 8.
- **De-risk the scary part early.** Before Section 5, spend one evening proving a
  container can boot Chromium, screenshot one frame, and hand it to ffmpeg. A
  throwaway spike. If it works, the rest is assembly; if it does not, I want to
  know in week 2, not week 6.
- **One hard thing at a time.** Script before endpoint, endpoint before queue,
  queue before deployment.
- **Ship the MVP before touching the parking lot**, even if it is embarrassing.
- **Finish each section's explanation question before starting the next.** If I
  cannot answer it out loud, the section is not done — that is the whole point.
