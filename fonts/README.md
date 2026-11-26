# Local typography

Persian headings use **Changa**, selected as a geometric, squared display
companion to the existing **Barlow Condensed** Latin headings. The resemblance
is an editorial pairing, not an exact Persian version of Barlow Condensed.
Paragraphs, navigation, captions, and controls continue to use **Vazirmatn**
from `src/assets/vazirmatn/`.

`changa-arabic-600-800.woff2` is the unmodified Arabic-script variable webfont
served by the Google Fonts CSS API for Changa weights 600–800. It includes
Persian letters such as پ، چ، ژ، گ، ک، ی and Persian digits. Only Arabic-script
ranges are declared in CSS, so Latin glyphs retain the existing Latin families.
No CSS scaling or synthetic stretching is applied to the lettering.

- Upstream: https://github.com/googlefonts/changa-vf
- Google Fonts metadata: https://github.com/google/fonts/tree/main/ofl/changa
- Font file: https://fonts.gstatic.com/s/changa/v29/2-cm9JNi2YuVOUckY5y-au8.woff2
- License: SIL Open Font License 1.1, retained in `changa-OFL.txt`.
- Copyright: 2018 The Changa Project Authors.

All fonts are served locally; no Google Fonts network request is needed by
visitors. The Changa webfont is approximately 23 KB and uses `font-display:
swap` so its download does not hide the title text.
