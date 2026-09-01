# Madina Arabic — Project Checkpoint

## Current Git checkpoint

- Repository: `madina-arabic`
- Branch: `main`
- HEAD: `84fa4cf9b2d2d0db7ffad4043487ff02249c463d`
- Upstream: `origin/main`
- Remote: `https://github.com/Olimtoy83/madina-arabic.git`
- Latest completed stage: `chore(arabic): remove temporary layout diagnostics` (real iPhone layout investigation completed)

## Completed functionality

- Static lesson dashboard with 7 lessons and 32 Arabic learning units, including Lesson 7, “Дом и комнаты”.
- Russian and Uzbek interface and word translations.
- Word-builder exercise, learning progress, XP, streak, attempts, and correct-answer tracking.
- Browser-local persistence using `localStorage`.
- Audio Stage completed: pronunciation playback for all 32 learning units through verified local MP3 files. Every unit now exposes its local `audio.src` path; the localized “pronunciation soon” fallback is retained only for any future unit without a verified file.
- Telegram WebApp SDK initialization with optional display of the Telegram user's first name.
- Explicit lesson completion flow: completed lessons show a completion state, progress continues to the next incomplete lesson, and a final state is shown after all lessons are complete.
- Completed lessons remain available from the lesson list for review.
- Mobile reflow improvements for the dashboard, cards, buttons, and language controls; normal iPhone dashboard and lesson screens were visually verified in Russian and Uzbek.
- Real iPhone Telegram WebView investigation completed. In the normal state, `documentElement.clientWidth`, document `scrollWidth`, and body `scrollWidth` were all `430px`, with `visualViewport.width=430` and `scale=1`. In the problem-looking state, document and body widths remained `430px`, while `visualViewport.width` became approximately `301px` at `scale≈1.4264`.

## Architecture

- Static browser frontend: `index.html`, plain JavaScript in `js/`, and CSS in `css/style.css`.
- Lesson and word data are local in `js/data.js`.
- UI flow and progress updates are implemented in `js/app.js`.
- Persistence is implemented in `js/storage.js` with one versioned localStorage record.
- Localization is implemented in `js/i18n.js` for Russian and Uzbek.
- Audio playback is implemented in `js/audio.js`; audio assets are local under `assets/audio/words/`.
- Telegram WebApp access is isolated in `js/telegram.js`.

## Pronunciation generation contract

- Current assets: `assets/audio/words/word-001.mp3` through `word-032.mp3` (32 files, one per learning-unit ID). The original 12 verified local MP3 assets (`word-001.mp3`–`word-012.mp3`) remain unchanged. `js/data.js` derives each source as `assets/audio/words/word-0NN.mp3`.
- Confirmed source: Google Cloud Text-to-Speech via Google Cloud Console, project `project-fd21fcf5-9053-4777-94c`, API `texttospeech.googleapis.com`.
- Use language `ar-XA`, voice `ar-XA-Wavenet-B`, and MP3 output. Send the exact Arabic text stored in `js/data.js`, including its diacritics; do not change spelling or punctuation for synthesis.
- In every new Cloud Shell session, initialise a fresh project and token before calling the REST API:

  ```sh
  PROJECT_ID="$(gcloud config get-value project)"
  TOKEN="$(gcloud auth print-access-token)"
  gcloud services enable texttospeech.googleapis.com --project="$PROJECT_ID"
  ```

- Use the REST endpoint `https://texttospeech.googleapis.com/v1/text:synthesize` with headers `Authorization: Bearer $TOKEN`, `X-Goog-User-Project: $PROJECT_ID`, and `Content-Type: application/json; charset=utf-8`. The request JSON uses `input.text`, `voice.languageCode: "ar-XA"`, `voice.name: "ar-XA-Wavenet-B"`, and `audioConfig.audioEncoding: "MP3"`; decode the base64 `audioContent` response into `word-0NN.mp3`.
- Do not record, commit, or share access tokens. A stale or missing fresh token previously caused `403 PERMISSION_DENIED` (“Method doesn't allow unregistered callers”).
- `gcloud text-to-speech synthesize` is unavailable in Cloud Shell for this workflow; use the REST endpoint above. The batch used `words.txt` records in `NNN|Arabic text` form and a shell loop. A fresh token was used for the successful `word-014`–`word-032` batch; `word-013` was verified with a separate REST request.

## Known limitations

- No package manifest, build system, or repository-provided automated test command is present.
- No verified backend, API, database, server-side authentication, remote progress synchronization, or account model is present.
- Telegram use is client-side only; bot configuration and server-side validation of Telegram `initData` need verification.
- No deployment, hosting, monitoring, production-operation, or formal acceptance evidence is present in this repository.
- **NOT A CSS LAYOUT BUG / RESOLVED BY DIAGNOSIS:** the reproduced apparent horizontal-overflow hypothesis was caused by user/browser pinch zoom. `scrollWidth` remained equal to the `430px` layout viewport, so document-level CSS horizontal overflow was not demonstrated. No `overflow-x` concealment or accessibility-hostile zoom restriction was added.
- This diagnosis does **not** independently verify a separate extreme iOS system text-size / Dynamic Type scenario. Reopen investigation only if that distinct state is reproduced with fresh runtime measurements.
- `text-size-adjust:100%` was tested and removed because it did not solve the real-device case.

## Development rules

- Preserve the static HTML/CSS/plain-JS architecture unless a separately authorized stage changes it.
- Keep the existing localStorage progress format compatible with previously stored learner data.
- Keep Russian and Uzbek interface strings aligned for any new learner-facing UI.
- Preserve local audio paths and the current Telegram WebApp-aware behavior.
- Before committing, run JavaScript syntax checks for all `js/*.js` files and `git diff --check`.
- Do not infer backend, deployment, authentication, or production readiness without repository evidence.

## Next tasks

- Review and approve Lesson 8 “Еда и напитки” before adding more curriculum content. If a distinct extreme iOS system-text-size issue is reproduced later, collect fresh runtime measurements before changing layout CSS.
- For future vocabulary, generate and verify a matching local MP3 under the documented Google Cloud Text-to-Speech contract before setting its `audio.src` availability.

## Next authorized stage

**One bounded curriculum expansion, frontend only, after separate approval: Lesson 8 “Еда и напитки”.** Add only approved units with RU/UZ translations and verified local MP3 files, preserving localStorage compatibility. Do not add backend, server, database, authentication, remote persistence, or deployment work. If a distinct extreme iOS system-text-size issue is reproduced, authorize a separate measurement-first investigation instead of speculative CSS changes.
