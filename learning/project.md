# Loop Studio — project brief

> **Start every session by reading this file.** It is the durable record of who I
> am, what I am building, and what is deliberately out of scope. If a scope
> decision changes, update this file in the same session.

---

## Who I am

I work as a data engineer and I am deliberately pivoting toward software
engineering, specifically the space where design and engineering meet.

**Experience level: beginner, and I want to be treated as one.** I was a CS
major but most of that has faded. I have never built real software. Apart from
LeetCode problems I have not written code in about two years, and my current job
does not require any. I am comfortable with programming concepts in the
abstract; I am not comfortable with building, wiring together, or shipping a
real system, and I have never deployed anything.

**No drawing or illustration skill.** Everything visual in this project has to
come from code, math, and shapes — never from hand-drawn assets.

**Do not frame this project around data engineering.** The whole point is to
move toward design-adjacent software engineering, not to showcase the career I
am leaving. My background is useful as latent skill — I will pick up backend
ideas faster than a true beginner — but pipelines, file formats, and warehousing
should not supply the subject matter, the framing, or the selling point.

**Help me learn rather than handing me finished code.** Explain the reasoning
and the shape of a solution and let me do the typing where it is instructive.
Writing it all for me would defeat the reason I started.

**Push back when I try to sneak features into the MVP.** I know I will try.

## Budget

About two hours a day, with a target of roughly three months. No hard deadline.
That is on the order of 170 hours — enough to ship something genuinely good, so
size the work ambitiously rather than defensively.

## Why this project exists

A resume piece that demonstrates real interest in design-adjacent engineering,
the ability to work in a real codebase, and competence across frontend and
backend. The taste reference points are makingsoftware.com and danield.design —
sleek, smooth, colorful, motion-forward.

---

## The idea

**Loop Studio** — a browser studio for building seamless animated loops, which
exports them as real video files.

You drag sliders, a generative wave-tile pattern responds live on a canvas. When
you like what you see, you hit Export and the **server** renders your loop frame
by frame and encodes it into an MP4 you can download. Not a screen recording — a
real render pipeline.

The frontend is the design craft. The backend is an asynchronous render
pipeline, which is the part that makes this a real engineering project rather
than a pretty page.

### Architecture decision: shared animation module, headless Chromium

The backend is Node/TypeScript, and it renders frames by loading the **exact
same animation module** the browser uses into a headless Chromium (Playwright),
screenshotting frame by frame, and piping the frames to ffmpeg.

The alternative — reimplementing the animation math server-side — would mean the
preview and the export could silently drift apart. Sharing one module makes
determinism a property of the design instead of a class of bugs. It also keeps
the whole stack in one language.

*"Why headless Chromium instead of reimplementing the renderer server-side?" is
a question worth being able to answer well in an interview.*

### Stack

- **Frontend:** TypeScript + Vite, React, Canvas 2D, hand-written CSS. No
  component library. React was picked over no framework specifically as a
  resume priority (see `plan.md`'s locked decisions) — a deliberate tradeoff,
  not the default choice for a sliders-and-canvas app.
- **Backend:** Node + TypeScript (Fastify or Express), Playwright, ffmpeg.
- **Persistence:** none for configs — the config lives in the URL. Job state in
  SQLite or an in-process map. Rendered files on local disk with a TTL.
- **Deployment:** one Docker container (Chromium and ffmpeg require it) serving
  both the static frontend build and the API, on Fly.io or Railway. One deploy,
  one origin, no CORS.

---

## In the MVP

The smallest version that is genuinely useful end to end and live on the
internet.

### The generator — exactly one

- One pattern: **the wave tile**. A grid of shapes whose rotation and offset are
  driven by a sine field evolving over time.
- **Six parameters, no more:** grid density, wave frequency, amplitude, phase
  speed, shape size, palette.
- Palette is a picker over ~5 hand-tuned presets. Not a color editor.
- Fixed **3-second seamless loop**. Duration is not adjustable.

### The studio

- Live canvas preview that updates as you drag.
- **Full config encoded in the URL.** Reload restores it; paste the link and
  someone else sees your exact loop. This is the entire persistence story for
  configs — no database, no accounts.

### The export pipeline — this is the point, it stays in

- `POST /render` with a config returns a job id.
- Server launches headless Chromium, renders 180 frames at 1080×1080, pipes them
  to ffmpeg, produces an MP4.
- `GET /jobs/:id` returns status; the UI polls and shows progress.
- Download link on completion. Files expire after ~24h and are cleaned up.
- **One fixed output format and resolution:** 1080×1080 MP4.

### Operations

- Live behind HTTPS on a real URL.
- In-process job queue, **concurrency 1**, with a cap on queued jobs so a
  stranger cannot melt the box.
- A landing page above the studio showing 3–4 loops made with the tool.

**The MVP is done when** a stranger can land on the URL, make a loop they like,
download an MP4, and share a link that reproduces it.

---

## Parking lot (v2)

Everything below is real and worth doing eventually. None of it is in the MVP.
It is written down so it stops nagging.

**More generation**
- Additional generators: flow fields, truchet tiles, particle drift, orbiting shapes
- Custom color pickers and a full palette editor
- WebGL / shader rendering for heavier scenes
- Audio-reactive loops
- Keyframe timeline and easing editor

**More export**
- Adjustable duration and resolution; 4K export
- GIF and WebM export
- Transparent-background export
- SVG export
- Embeddable player

**More product**
- Saved presets and a user gallery
- Accounts and auth
- "Remix this loop" from a shared URL
- Public API with keys
- Undo/redo
- Mobile-optimized touch controls
- Light/dark theming of the studio itself

**More infrastructure**
- Redis/BullMQ queue with multiple workers
- S3/R2 object storage
- CDN in front of rendered outputs
- Rate limiting by account
- Analytics
- React rewrite of the studio UI

---

## Scope rulings already made

Do not reopen these without a new reason. The reasoning matters more than the
ruling.

- **One pattern type, not three.** The second generator teaches nothing the
  first did and triples the polish surface. Adding it in v2 is precisely when
  the right abstraction becomes visible — and that lesson is only available
  after shipping one.
- **Palette presets, not a color picker.** Five presets tuned by hand will look
  better than anything a user lands on by accident, and choosing good colors is
  a design skill worth practicing deliberately, five times, in advance.
- **One resolution, one duration.** Every option multiplies the test matrix and
  the worst-case render time. Widen only once the pipeline is boringly reliable.
- **No accounts.** URL-as-state delivers most of the benefit for a fraction of
  the work. Auth is a week spent not learning graphics.
- **No Redis.** An in-memory array with concurrency 1 is the correct
  architecture for one container and zero users. Reaching for Redis only when a
  real constraint demands it is also the only way to actually understand what it
  is for.

---

## Rough plan

Milestones, not deadlines. Ship and deploy early; the first deploy should happen
long before the project is good.

1. **Weeks 1–2 — pixels moving.** Shapes on a canvas, animated by hand-written
   math. No libraries, no backend. Ugly but alive.
2. **Weeks 3–5 — the studio.** Six parameters wired to real controls,
   URL-encoded state, the five palettes, and a UI worth looking at. Deploy the
   frontend now, even though export does not exist.
3. **Weeks 6–8 — the render pipeline.** Playwright frame capture, ffmpeg
   encoding, the job queue, status polling, download. The hardest and most
   rewarding stretch.
4. **Weeks 9–12 — make it real.** Containerize, deploy, harden, clean up files,
   handle failures, then polish motion and typography and build the landing page.

**Ship the MVP publicly before starting anything in the parking lot, even if it
is embarrassing.** Unshipped is unshipped.
