# Madina Arabic — Project Checkpoint

## Current Git checkpoint

- Repository: `madina-arabic`
- Branch: `main`
- HEAD: `4e0b2066f0486529406a11d25f9ceda0d9ff9c35`
- Upstream: `origin/main`
- Remote: `https://github.com/Olimtoy83/madina-arabic.git`
- Latest completed stage: `feat(arabic): add polite words lesson`

## Completed functionality

- Static lesson dashboard with 4 lessons and 16 Arabic vocabulary words.
- Russian and Uzbek interface and word translations.
- Word-builder exercise, learning progress, XP, streak, attempts, and correct-answer tracking.
- Browser-local persistence using `localStorage`.
- Pronunciation playback for 12 verified local MP3 files; the 4 polite-word entries intentionally show the localized “pronunciation soon” state until matching recordings are available.
- Telegram WebApp SDK initialization with optional display of the Telegram user's first name.
- Explicit lesson completion flow: completed lessons show a completion state, progress continues to the next incomplete lesson, and a final state is shown after all lessons are complete.
- Completed lessons remain available from the lesson list for review.

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

## Development rules

- Preserve the static HTML/CSS/plain-JS architecture unless a separately authorized stage changes it.
- Keep the existing localStorage progress format compatible with previously stored learner data.
- Keep Russian and Uzbek interface strings aligned for any new learner-facing UI.
- Preserve local audio paths and the current Telegram WebApp-aware behavior.
- Before committing, run JavaScript syntax checks for all `js/*.js` files and `git diff --check`.
- Do not infer backend, deployment, authentication, or production readiness without repository evidence.

## Next tasks

- Review and approve the proposed next vocabulary lesson before adding more curriculum content.
- Source or verify matching local MP3 recordings before enabling pronunciation for words 13–16.

## Next authorized stage

**One bounded curriculum expansion, frontend only, after approval.** Add exactly one practical vocabulary lesson that follows the existing `js/data.js` structure, preserves Russian and Uzbek translations and localStorage compatibility, and does not invent audio assets. Do not add backend, server, database, authentication, remote persistence, or deployment work without a separate authorization.
