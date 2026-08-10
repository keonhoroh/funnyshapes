# Knowledge graph — what I actually know

> **Living document.** Updated after every lesson. This is the file that decides
> what I get quizzed on.

**Last updated:** 2026-08-10

---

## How this works

### Status ladder

| Status | Means |
|---|---|
| **seed** | Not yet taught. Listed so I know it is coming. |
| **introduced** | Explained to me once. I have heard it; I have not used it. |
| **practicing** | I have used it in real code, with help or reference. |
| **understood** | I explained it in my own words *and* passed a quiz on it. |

### The rules

1. **Statuses only ever upgrade on evidence.** Evidence means something I
   actually said or did — a sentence I wrote in my own words, a commit, a
   working piece of code. "We covered it" is not evidence. "It seems like he got
   it" is not evidence.
2. **The evidence field is not optional** above `seed`. If nothing concrete can
   be written there, the status does not move.
3. **Under-claiming is safe. Over-claiming defeats the point.** This file exists
   so I know honestly what I do not know. A graph that flatters me is worthless.
4. **Downgrades are allowed.** If I fail a refresher quiz, the status drops back
   to `practicing`. That is information, not failure.
5. **No re-quizzing on understood + fresh.** A concept at `understood` reviewed
   within the last **30 days** is off the quiz list. Past 30 days it becomes
   eligible for one refresher; passing it resets the clock.
6. **Understood is not permanent.** It means I could explain it on a given day,
   which is exactly why the review date is tracked.

### Reading the table

`→ S3` in the evidence column means "not yet taught; first appears in Section 3
of the build plan." Dates are `YYYY-MM-DD`.

---

## Current state

Two concepts reached `understood` on 2026-08-10, via the Section 1 explain-back
question. The `introduced` entries are mostly things walked through during
project and technical planning on 2026-08-07.

| Status | Count |
|---|---|
| seed | 38 |
| introduced | 25 |
| practicing | 4 |
| understood | 2 |

---

## Level 1 — Low-level: the language itself

| Concept | Status | Introduced | Reviewed | Evidence |
|---|---|---|---|---|
| Variables, `const` vs `let`, scope | introduced | 2026-08-07 | 2026-08-07 | Explained `const` as a name that can't be reassigned, using the `canvasRef` line as the live example |
| Types and type annotations | introduced | 2026-08-07 | 2026-08-07 | Said TypeScript "is quick to point out errors in my code" |
| Type inference vs explicit types | seed | — | — | → S1 |
| Functions, parameters, return values | seed | — | — | → S1 |
| Loops and iteration | practicing | 2026-08-10 | 2026-08-10 | Correctly predicted 400/5 cell math, then wrote a nested-loop `x`/`y` computation combining Task 1.6's centering formula with a per-cell `col * CELL` / `row * CELL` offset, producing a working 5×5 grid |
| Conditionals and boolean logic | seed | — | — | → S1 |
| Arrays and `map` / `filter` / `reduce` | seed | — | — | → S2 |
| Objects, destructuring, spread | seed | — | — | → S3 |
| Pure functions vs side effects | seed | — | — | → S2 |
| Immutability and why it matters in React | seed | — | — | → S3 |
| `null` / `undefined` and optional values | seed | — | — | → S4 |
| Promises and `async` / `await` | seed | — | — | → S5 |
| `try` / `catch` and throwing errors | seed | — | — | → S6 |
| Trigonometry for motion: sine, cosine, radians | seed | — | — | → S2 |
| Normalization and mapping ranges | seed | — | — | → S2 |
| Linear interpolation (lerp) and easing | seed | — | — | → S2 |
| Periodicity — what makes a loop seamless | seed | — | — | → S2 |
| Deterministic randomness and seeds | seed | — | — | → S2 |

## Level 2 — Structural: how the pieces talk

### Code organisation

| Concept | Status | Introduced | Reviewed | Evidence |
|---|---|---|---|---|
| ES modules: `import` / `export` | introduced | 2026-08-07 | 2026-08-07 | Correctly predicted `main.tsx` needs no change when `App.tsx`'s content changes: "main.tsx references the file App.tsx based on the filename" |
| `package.json` and what it declares | introduced | 2026-08-07 | 2026-08-07 | Read my own `web/package.json`; saw that it names libraries rather than containing them |
| Dependencies vs devDependencies | introduced | 2026-08-07 | 2026-08-07 | Explained against my real file in 1.1; I have not restated it yet |
| Semantic versioning and lockfiles | seed | — | — | → 1.2 (deferred deliberately) |
| `node_modules` and module resolution | introduced | 2026-08-07 | 2026-08-07 | Predicted "9–20, maybe 1–2 folders per package"; actual was 24. Reasoning was sound |
| npm scripts as the project's verbs | introduced | 2026-08-07 | 2026-08-07 | Ran `npm run dev` before installing and saw `vite: command not found` — the script existed, the tool did not |
| `tsconfig.json` and compilation | seed | — | — | → S1 |
| What a build step actually produces | seed | — | — | → S4 |
| Vite dev server vs production build | seed | — | — | → S4 |
| Sharing one module across two runtimes | introduced | 2026-08-07 | 2026-08-07 | Said TypeScript is "supported on both platforms we will use to run animations" |
| Why the animation module must stay framework-free | introduced | 2026-08-07 | 2026-08-07 | Accepted the constraint when React was added to the stack |

### Frontend

| Concept | Status | Introduced | Reviewed | Evidence |
|---|---|---|---|---|
| The DOM as a tree of elements | introduced | 2026-08-10 | 2026-08-10 | Defined it, then correctly used it to contrast canvas: "A regular DOM element can be modified by adjusting its properties," canvas cannot |
| Canvas element vs its 2D drawing context | understood | 2026-08-10 | 2026-08-10 | Section 1 explain-back: "when we call fillRect, instead of creating an object representing a rectangle, it merely fills the pixels and trashes the involvement of any rectangle" — correct, own words |
| Canvas CSS size vs pixel size, devicePixelRatio | understood | 2026-08-10 | 2026-08-10 | Section 1 explain-back: unprompted, correctly gave the reason as accounting for different devices' devicePixelRatio |
| The event loop and `requestAnimationFrame` | seed | — | — | → S2 |
| Frame timing and delta time | seed | — | — | → S2 |
| React components and props | practicing | 2026-08-07 | 2026-08-07 | Edited and saved real JSX content in `App.tsx` (title + description) into a component I scaffolded; rendered correctly in the running dev server |
| React state with `useState` | seed | — | — | → S3 |
| Re-rendering and why React needs new objects | seed | — | — | → S3 |
| `useEffect` and its dependency array | practicing | 2026-08-07 | 2026-08-07 | Watched real console output confirm the empty-array behavior (runs once, after the real DOM exists); explained the render→build→effect order back correctly after a first explanation didn't land |
| `useRef` and the imperative escape hatch | practicing | 2026-08-07 | 2026-08-07 | Reported real console evidence: `.current` was `null` during render, the real `<canvas>` inside `useEffect`; correctly reasoned through what happens with two refs vs. one ref reused across two canvases |
| Bridging React state to an imperative canvas | introduced | 2026-08-07 | 2026-08-07 | Agreed the animation module stays outside React and takes params via a ref |
| Choosing a framework — or not | introduced | 2026-08-07 | 2026-08-07 | Said a framework felt "a bit overkill for my case"; later chose React for resume reasons |
| Event handlers and controlled inputs | seed | — | — | → S3 |
| CSS layout: flexbox and grid | seed | — | — | → S3 |
| CSS custom properties | seed | — | — | → S3 |
| Colour spaces and why palettes look muddy | seed | — | — | → S3 |
| URL and query params as application state | introduced | 2026-08-07 | 2026-08-07 | Accepted URL-as-state as the reason accounts stay out of the MVP |

### Backend and data

| Concept | Status | Introduced | Reviewed | Evidence |
|---|---|---|---|---|
| Client/server boundary | introduced | 2026-08-07 | 2026-08-07 | Said unprompted in 1.1 that "frontend can live on its own" — correct, and reached without being told |
| HTTP requests, methods, status codes | seed | — | — | → S4 |
| What a web server process actually does | introduced | 2026-08-07 | 2026-08-07 | Chose Express; heard its role explained with alternatives |
| Routing and middleware | seed | — | — | → S4 |
| Serving static files | seed | — | — | → S4 |
| JSON as a wire format | seed | — | — | → S6 |
| Designing an API endpoint | seed | — | — | → S6 |
| Long-running work outside the request | introduced | 2026-08-07 | 2026-08-07 | Named in the plan as why export needs a job; not yet explored |
| Job queues and concurrency limits | introduced | 2026-08-07 | 2026-08-07 | Agreed in-process, concurrency 1, over Redis |
| Polling for status | seed | — | — | → S6 |
| Why a database instead of memory | introduced | 2026-08-07 | 2026-08-07 | Chose SQLite; accepted "jobs vanish on restart" as the reason against a Map |
| SQL basics: tables, rows, queries | seed | — | — | → S6 |
| Schema design and migrations | seed | — | — | → S6 |
| Filesystem paths and reading/writing files | seed | — | — | → S5 |
| Child processes and piping | seed | — | — | → S5 |
| Headless browsers | introduced | 2026-08-07 | 2026-08-07 | Chose Playwright; understood it renders frames server-side |
| Video encoding, frames, codecs, ffmpeg | introduced | 2026-08-07 | 2026-08-07 | Chose ffmpeg called directly to learn the flags |

## Level 3 — Engineering practice

| Concept | Status | Introduced | Reviewed | Evidence |
|---|---|---|---|---|
| Git: repository, staging, commits | introduced | 2026-08-07 | 2026-08-07 | Predicted `git init` creates one hidden folder — correct on count, learned it's hidden from plain `ls`. Ran `git add`, predicted staged file counts twice, both close, made first commit `5b15850` |
| Writing a useful commit message | introduced | 2026-08-07 | 2026-08-07 | Saw a real commit message with subject + body; have not written one myself yet |
| Branches and when they help | seed | — | — | → S3 |
| `.gitignore` and what never gets committed | introduced | 2026-08-07 | 2026-08-07 | Correctly reasoned `node_modules` is excluded because it's regenerable; I supplied the wrong mechanism (version mismatch) at first, corrected to "commit what can't be regenerated" |
| Reading a stack trace | seed | — | — | → S2 |
| Browser devtools and breakpoints | seed | — | — | → S2 |
| Debugging as a method, not guessing | seed | — | — | → S2 |
| Reading official documentation | seed | — | — | → S1 |
| Unit tests and assertions | seed | — | — | → S7 |
| Deciding what is worth testing | seed | — | — | → S7 |
| Testing a property rather than an example | seed | — | — | → S7 |
| End-to-end tests | seed | — | — | → S7 |
| Environment variables and configuration | seed | — | — | → S8 |
| Secrets and what must never reach git | seed | — | — | → S8 |
| Logging that is useful at 3am | seed | — | — | → S8 |
| Failure modes and graceful degradation | seed | — | — | → S8 |
| Resource guards: TTLs, queue caps, limits | introduced | 2026-08-07 | 2026-08-07 | Agreed to cap the queue "so a stranger cannot melt the box" |
| Containers and Dockerfiles | seed | — | — | → S8 |
| Deploying, and deploying often | introduced | 2026-08-07 | 2026-08-07 | Accepted moving the first deploy to Section 3 |
| De-risking with a throwaway spike | seed | — | — | → pre-S5 |
| Writing a README someone else can use | seed | — | — | → S9 |

## Level 4 — AI-era practice

| Concept | Status | Introduced | Reviewed | Evidence |
|---|---|---|---|---|
| Writing a plan before writing code | introduced | 2026-08-07 | 2026-08-07 | Directed the planning session that produced plan.md |
| Scoping an MVP and holding the line | introduced | 2026-08-07 | 2026-08-07 | Asked to be pushed back on, and accepted every scope ruling |
| Evaluating a technical tradeoff out loud | introduced | 2026-08-07 | 2026-08-07 | Worked through seven decisions with alternatives; overrode one on resume grounds |
| Choosing boring technology deliberately | seed | — | — | → S1 |
| Asking for explanation instead of code | seed | — | — | → S1 |
| Reviewing a diff you did not write | seed | — | — | → S3 |
| Verifying AI output against real docs | seed | — | — | → S2 |
| Knowing when *not* to delegate to AI | seed | — | — | → S2 |
| Agent memory and instruction files | seed | — | — | → S3 |
| Keeping living docs honest and current | seed | — | — | → S3 |
| Prompting for a quiz, not an answer | seed | — | — | → S1 |

---

## Quiz queue

Concepts eligible for quizzing, highest value first. Regenerated as statuses
change.

1. Sharing one module across two runtimes — *the core architectural idea; I have
   said it once, loosely*
2. Why the animation module must stay framework-free
3. Why a database instead of memory
4. Long-running work outside the request
5. Headless browsers — what Playwright is actually doing during an export

Everything else is `seed` and gets taught before it gets tested.
