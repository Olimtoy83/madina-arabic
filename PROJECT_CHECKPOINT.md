# Madina Arabic — Project Checkpoint

## Current Git checkpoint

- Repository: `madina-arabic`
- Branch: `main`
- HEAD: `aac2489a0751955521841b5ea3afc3c758eb9341`
- Upstream: `origin/main`
- Remote: `https://github.com/Olimtoy83/madina-arabic.git`
- Latest completed stage: `feat(arabic): add home lesson and improve mobile reflow`

## Completed functionality

- Static lesson dashboard with 7 lessons and 32 Arabic learning units, including Lesson 7, “Дом и комнаты”.
- Russian and Uzbek interface and word translations.
- Word-builder exercise, learning progress, XP, streak, attempts, and correct-answer tracking.
- Browser-local persistence using `localStorage`.
- Pronunciation playback for 12 verified local MP3 files; the 20 units in Lessons 4–7 intentionally show the localized “pronunciation soon” state until matching recordings are available.
- Telegram WebApp SDK initialization with optional display of the Telegram user's first name.
- Explicit lesson completion flow: completed lessons show a completion state, progress continues to the next incomplete lesson, and a final state is shown after all lessons are complete.
- Completed lessons remain available from the lesson list for review.
- Mobile reflow improvements for the dashboard, cards, buttons, and language controls; normal iPhone dashboard and lesson screens were visually verified in Russian and Uzbek.

## Architecture

- Static browser frontend: `index.html`, plain JavaScript in `js/`, and CSS in `css/style.css`.
- Lesson and word data are local in `js/data.js`.
- UI flow and progress updates are implemented in `js/app.js`.
- Persistence is implemented in `js/storage.js` with one versioned localStorage record.
- Localization is implemented in `js/i18n.js` for Russian and Uzbek.
- Audio playback is implemented in `js/audio.js`; audio assets are local under `assets/audio/words/`.
- Telegram WebApp access is isolated in `js/telegram.js`.

## Known limitations

- No package manifest, build system, or repository-provided automated test command is present.
- No verified backend, API, database, server-side authentication, remote progress synchronization, or account model is present.
- Telegram use is client-side only; bot configuration and server-side validation of Telegram `initData` need verification.
- No deployment, hosting, monitoring, production-operation, or formal acceptance evidence is present in this repository.
- **Known issue / pending verification:** extreme iOS system text size in the Telegram WebView can still cause horizontal overflow. The exact runtime offender has not been identified; do not claim this is resolved. A future investigation should use real WebView measurements such as `getBoundingClientRect()` and `scrollWidth` when tooling is available.
- `text-size-adjust:100%` was tested and removed because it did not solve the real-device case.

## Development rules

- Preserve the static HTML/CSS/plain-JS architecture unless a separately authorized stage changes it.
- Keep the existing localStorage progress format compatible with previously stored learner data.
- Keep Russian and Uzbek interface strings aligned for any new learner-facing UI.
- Preserve local audio paths and the current Telegram WebApp-aware behavior.
- Before committing, run JavaScript syntax checks for all `js/*.js` files and `git diff --check`.
- Do not infer backend, deployment, authentication, or production readiness without repository evidence.

## Next tasks

- Review and approve the Lesson 8 “Еда и напитки” learning units before adding more curriculum content, unless the user chooses to revisit the unresolved iOS overflow first.
- Future pronunciation source is confirmed as Google Cloud Text-to-Speech via Google Cloud Console; source or verify matching local MP3 recordings before enabling pronunciation for words 13–32.

## Next authorized stage

**One bounded curriculum expansion, frontend only, after approval: Lesson 8 “Еда и напитки”.** Add exactly one practical food-and-drinks lesson that follows the existing `js/data.js` structure, preserves Russian and Uzbek translations and localStorage compatibility, and does not invent audio assets. The user may instead authorize a bounded investigation of the unresolved extreme-iOS-text overflow using real WebView runtime measurements. Do not add backend, server, database, authentication, remote persistence, or deployment work without a separate authorization.
