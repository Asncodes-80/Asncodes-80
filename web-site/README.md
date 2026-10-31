# Alirezacodes — personal website

A bilingual React / TypeScript portfolio with a Dracula palette, print-inspired layouts, and a personal collection of games, films, series, and books.

## Development

```sh
npm install
npm run dev
npm run build
npm run preview
```

The default URL is `http://localhost:5173/Asncodes-80/`. The existing GitHub Pages base path is preserved. To host at the root of another domain, run `VITE_BASE_PATH=/ npm run build` (or use the same variable with `npm run dev`). Production builds include `404.html` so GitHub Pages can render direct links to the client-side routes.

## Content

- `src/data/resume.ts`: profile, contact details, six work experiences, three qualifications, skills, and open projects. English and Persian text live together for factual consistency.
- `src/data/interests.ts`: the owner's 15 games, eight films/series, and six books. Each item has an explicit `kind`, `status`, local artwork, alternative text, source credit, and optional creator or official link.
- `src/data/medlife.ts`: five bilingual project chapters, with the seven original project photographs in `public/images/projects/medlife/`. Both home and work open the same animated mini page; each photograph links to its locally hosted full-size original.
- `src/i18n/locales/{en,fa}.json`: interface labels and editorial copy. The language button also switches text direction and remembers the selection in the browser.
- `public/documents/alireza-soltani-neshan-resume.pdf`: the supplied résumé, unchanged, linked from the header.
- `public/images/interests/`: locally served WebP cover artwork. Sources are available in each title's details dialog. Artwork belongs to its respective rights holder.
- `public/fonts/`: locally served English fonts with their OFL licenses. Vazirmatn and its license are retained in `src/assets/vazirmatn/`.

The shared media states are `completed`, `in-progress`, and `planned`. The UI translates these into played/playing/to play, watched/watching/to watch, and read/reading/to read. Visitors can search and filter the collection; editing the owner's selections happens in the data file, not in a visitor's browser.

## Pages

- `/`: introduction, selected projects, experience, education, skills, and contact.
- `/gallery`: the MedLife case study and mini page, Sandogh gold-market decision assistant, software tools, and research archive. `/work` also renders this page. Sandogh uses a native SVG illustration, with its current API constraint and subscription development plan documented alongside the stack and live project link.
- `/interests`: separate game, screen, and book shelves, with status filters, search, and keyboard-accessible title dialogs.

Reduced-motion preferences are respected. The layout supports mobile and desktop, both left-to-right and right-to-left.

## Motion

Console-inspired motion is shared across page transitions, the navigation indicator, card focus frames, buttons, section reveals, dialogs, and experience accordions. Pages use a 150 ms exit and a 440 ms settling entrance; navigation remains available during transitions, including rapid clicks and browser back/forward. The transition direction follows both page order and text direction.

Motion uses native Web Animations and CSS, with no additional runtime package. The shared hooks live in `src/motion/`. System reduced-motion changes take effect immediately; content stays accessible without animation support. Scroll reveals run once per element, and observers release removed cards and pages.

The interests spotlight is configured on its data entry. GTA VI uses official Rockstar portrait, square, and landscape artwork for its shelf, desktop spotlight, and mobile spotlight respectively.
