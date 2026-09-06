# Madina Arabic — Project Checkpoint

## Current Git checkpoint

- Repository: `madina-arabic`
- Branch: `main`
- Verified baseline before Visual Vocabulary 03A documentation: `8219df2`
- Upstream: `origin/main`
- Remote: `https://github.com/Olimtoy83/madina-arabic.git`
- Latest accepted content stage: `MADINA ARABIC Visual Vocabulary 03A — Магазин и покупки / ДЎКОН ВА ХАРИДЛАР`

## Completed functionality

- Static lesson dashboard with 11 lessons and 52 Arabic learning units, including Lessons 8–11: “Еда и напитки”, “Семья”, “Одежда”, and “Места и город”.
- Russian and Uzbek interface and word translations.
- Word-builder exercise, learning progress, XP, streak, attempts, and correct-answer tracking.
- Browser-local persistence using `localStorage`.
- Pronunciation playback for all 52 learning units through verified local MP3 files. Every unit now exposes its local `audio.src` path; the localized “pronunciation soon” fallback is retained only for any future unit without a verified file.
- Telegram WebApp SDK initialization with optional display of the Telegram user's first name.
- Explicit lesson completion flow: completed lessons show a completion state, progress continues to the next incomplete lesson, and a final state is shown after all lessons are complete.
- Completed lessons remain available from the lesson list for review.
- Mobile reflow improvements for the dashboard, cards, buttons, and language controls; normal iPhone dashboard and lesson screens were visually verified in Russian and Uzbek.
- Compact Mobile Header Polish completed. The previous `max-width:480px` rule gave `.language-switcher` and its buttons `flex: 1 1 100%` / `flex: 1 1 8rem`, forcing the selector onto a full-width row. The selector, its buttons, brand, and stats now use content-sized flex bases on mobile; the header wraps naturally only when space is insufficient, without horizontal-overflow masking or zoom restrictions.
- Mobile Bottom Action Safe Spacing completed. On mobile up to 480px, .learning-actions now adds padding-bottom: calc(16px + env(safe-area-inset-bottom, 0px)). This supplements the existing 32px bottom padding on .app, giving 48px normal visual bottom spacing plus the device safe-area inset when present. No fixed positioning, transforms, overflow masking, zoom restrictions, JavaScript layout changes, header changes, or lesson logic changes were introduced.
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

- Current assets: `assets/audio/words/word-001.mp3` through `word-052.mp3` (52 files, one per learning-unit ID). The original 12 verified local MP3 assets (`word-001.mp3`–`word-012.mp3`) remain unchanged. `js/data.js` derives each source as `assets/audio/words/word-0NN.mp3`.
- Lessons 8–11 use IDs `33`–`52` and verified local assets `word-033.mp3`–`word-052.mp3`. Validation confirmed 11 lessons, 52 units, sequential unique IDs `1`–`52`, correct audio-path mapping, non-empty expected MP3 files, JavaScript syntax, and `git diff --check`.
- Header Polish validation confirmed JavaScript syntax, 11 lessons / 52 units, 52 non-empty local MP3 files, no forced full-width mobile language-switcher rule, no `overflow-x: hidden` / `clip`, no zoom restriction, and `git diff --check`.
- Mobile Bottom Action Safe Spacing validation confirmed a CSS-only change to css/style.css, git diff --check passed, and the accepted compact mobile header, curriculum, audio mapping, progress/completion logic, zoom behavior, and architecture were left unchanged. Real-device visual acceptance remains to be confirmed on iPhone / Telegram Mini App.
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

- No further curriculum stage is authorized automatically. Review and approve the next lesson set before adding more content. If a distinct extreme iOS system-text-size issue is reproduced later, collect fresh runtime measurements before changing layout CSS.
- For future vocabulary, generate and verify a matching local MP3 under the documented Google Cloud Text-to-Speech contract before setting its `audio.src` availability.

## Next authorized stage

**No next stage is authorized until the user explicitly approves it.** Any future curriculum expansion must be bounded, frontend only, use approved units with RU/UZ translations and verified local MP3 files, and preserve localStorage compatibility. Do not add backend, server, database, authentication, remote persistence, or deployment work. If a distinct extreme iOS system-text-size issue is reproduced, authorize a separate measurement-first investigation instead of speculative CSS changes.

## Visual Vocabulary Cards

### 03A — Магазин и покупки / ДЎКОН ВА ХАРИДЛАР

Status:

- `03A-RU v1.0` — **ACCEPTED**
- `03A-UZ v1.0` — **ACCEPTED**
- Final PDFs:
  - `docs/cards/03A/MADINA_ARABIC_03A_RU_v1.0.pdf`
  - `docs/cards/03A/MADINA_ARABIC_03A_UZ_v1.0.pdf`
- RU and UZ use the same Arabic vocabulary, illustrations, order, and visual system.
- Russian and Uzbek localization layers remain separate.
- Intermediate renders belong under `output/` or `tmp/` and are not repository artifacts.

### 03A vocabulary

1. `مَتْجَر` — store / shop
2. `سُوق` — market
3. `مُنْتَج` — product
4. `سِعْر` — price
5. `خَصْم` — discount
6. `عَرْض` — promotion / offer
7. `فَاتُورَة` — bill / receipt
8. `كَاشِير` — cashier
9. `عَرَبَة تَسَوُّق` — shopping cart
10. `سَلَّة` — basket
11. `كِيس` — bag
12. `مِيزَان` — scale
13. `كِيلُو` — kilogram / kilo
14. `حَبَّة` — one piece / unit
15. `مَقَاس` — size
16. `نَقْد` — cash
17. `بِطَاقَة` — card
18. `دَفْع` — payment
19. `رِيَال` — riyal
20. `بَاقِي` — change / remaining amount in shopping context

### Language standard

- Cards use practical isolated / pausal Arabic pronunciation for beginner learning.
- Do not add artificial full MSA case endings or tanwin to isolated vocabulary cards.
- Final `ة` is taught in practical isolated pronunciation as `-a`.
- In connected constructions the hidden `t` of `ة` may surface; `عَرَبَة تَسَوُّق` therefore uses `ʿarabat`.
- `تَسَوُّق` is pronounced `tasawwuq`; Uzbek learner transliteration uses `ТАСА́ВВУҚ`.
- Uzbek localization uses Cyrillic.
- Practical Uzbek mapping includes `ح → Ҳ`, `خ → Х`, `ق → Қ`, `ع → Ъ`.
- Confirmed Uzbek forms include `حَبَّة → ҲА́ББА`, `مَقَاس → МАҚА́С`, `بِطَاقَة → БИТА́ҚА`.
- Russian and Uzbek transliterations are independent localization layers.

### Illustration and layout standard

- Accepted baseline: **MADINA ARABIC Illustration Standard v1**.
- Format: A3 landscape.
- Grid: 5 columns × 4 rows = 20 cards.
- Card image ratio: 4:3.
- Visual direction: premium semi-realistic / soft 3D realism with warm neutral lighting.
- Brand palette: deep green, warm cream, soft gold, white.
- One primary visual meaning per card.
- No visible human faces.
- No brands, random generated text, fake official documents, fake banknotes, or uncontrolled official symbols.
- Exact Arabic, transliteration, translations, numbering, currency labels, and branding are controlled separately from illustrations.
- Arabic PDF text must use correct RTL shaping; naive ReportLab Arabic rendering is not acceptable.
- Reusing one temporary image filename for multiple ReportLab cards is prohibited because image caching previously duplicated card images.

### QA and acceptance contract

- Educational accuracy has priority over visual attractiveness.
- Required sequence: topic → vocabulary → language QA → visual concept → generation → layout → render → visual inspection → acceptance.
- Export success, Git commit, or attractive appearance alone is not acceptance evidence.
- Future topics should normally use 20 words per sheet; split into A/B instead of padding with weak vocabulary.
- The shared Arabic / image / future-audio vocabulary unit remains reusable across RU and UZ localization layers.

## 03A Mini App Audio and Review

Status: **QA PASS**

- Lesson `shop-and-shopping` uses word IDs `53`–`72`.
- Verified local audio files:
  - `assets/audio/words/word-053.mp3`
  - through `assets/audio/words/word-072.mp3`
- All 20 files were generated with the established Google Cloud Text-to-Speech contract:
  - language: `ar-XA`
  - voice: `ar-XA-Wavenet-B`
  - encoding: MP3
  - source text: exact Arabic vocabulary text from `js/data.js`
- Auditory QA for words `53`–`72` — **PASS**.
- `js/data.js` audio availability for IDs `53`–`72` is enabled only after the matching local MP3 files were generated and verified.

### Completed lesson review

- A completed lesson can be opened again with `Пройти ещё раз` / `Qayta o‘tish`.
- Review starts from word 1 while saved lesson mastery remains `20 / 20`.
- Review navigation advances through all lesson words even when the lesson is already mastered.
- Using `Я знаю` / `Bilaman` in review mode does not award duplicate XP.
- After the final word, review returns to the lesson-complete screen.
- RU and UZ review localization was visually verified.
- 03A review flow was functionally verified with saved progress remaining `20 / 20` and XP remaining unchanged.
- `openLesson()` explicitly resets transient `reviewMode` so review state does not carry into another explicitly opened lesson.

### 03A Mini App QA evidence

- 20 verified illustrations remain mapped to `assets/images/03A/01.jpg` through `20.jpg`.
- 20 verified audio files remain mapped to `assets/audio/words/word-053.mp3` through `word-072.mp3`.
- RU and UZ word-card localization — **PASS**.
- Audio playback availability for 03A — **PASS**.
- Completed-lesson review flow — **PASS**.
- Duplicate-XP protection during normal review navigation — **PASS**.
- JavaScript syntax checks for `js/data.js`, `js/i18n.js`, and `js/app.js` — **PASS**.
- `git diff --check` reports no whitespace errors; LF-to-CRLF messages are Git line-ending warnings only.
