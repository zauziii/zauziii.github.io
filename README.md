# Zhi Zhou — Academic website

An English academic and recruitment website built with **Jekyll and GitHub Pages**. The profile highlights current studies in **Life Science Informatics at the University of Helsinki**, on the **Bioinformatics and Systems Medicine** track.

[Website](https://zauziii.github.io/) · [Repository](https://github.com/zauziii/zauziii.github.io) · [Editing guide](docs/EDITING.md)

## Edit the content

Open the relevant file on GitHub, select **Edit**, make your changes, and commit them to `main`. The existing GitHub Pages workflow rebuilds the website automatically. Check the repository's **Actions** tab if an update has not appeared.

Each content file starts with YAML fields between two `---` lines. Keep those delimiters and the indentation. Most sections also display the Markdown written below the fields; publications use their named fields only. See the [editing guide](docs/EDITING.md) for complete examples.

| What to change | Source |
| --- | --- |
| Hero introduction, degree subtitle, section headings and ordering | [index.md](index.md) |
| Open-to-work label and opportunity description | [availability.md](content/_sections/availability.md) |
| About text and profile facts | [about.md](content/_sections/about.md) |
| Current programme and study track | [00-helsinki.md](content/_education/00-helsinki.md) |
| Previous degrees | [Education files](content/_education/) |
| Employment dates, roles, organisations and locations | [Experience files](content/_experience/) |
| Project descriptions, contributions, methods and links | [Project files](content/_projects/) |
| Publication details, years, topics, status and links | [Publication files](content/_publications/) |
| Statistics, programming and tools cards | [Skills files](content/_skills/) |
| LinkedIn, GitHub and ORCID buttons | [contact.md](content/_sections/contact.md) |
| Name, email, metadata, image crop and asset paths | [_config.yml](_config.yml) |
| Personal photograph, uploaded PDF and favicon | [Asset guide](assets/README.md) |

## Current page and navigation

The page order is **Hero → About → Education → Experience → Projects → Publications → Skills → Footer**. The availability pill sits above the hero, and contact buttons sit below its introduction.

Both desktop and mobile navigation show **Education / Experience / Projects / Publications / CV**. About and Skills remain on the page without menu entries. The CV navigation button and the hero's **View CV** button open the uploaded PDF directly. There is no standalone CV or repeated contact section.

The `navigation` list in `index.md` controls section ordering and both menus:

- `show_in_nav: false` hides a menu entry while retaining the section.
- `show_section: false` omits the section. The CV entry uses this setting and remains a direct PDF link.
- For an ordinary section that should disappear entirely, set both options to `false`.

The [navigation instructions](docs/EDITING.md#navigation-and-section-order) explain the supported anchors and examples.

## Publications

Each paper is one Markdown file in `content/_publications/`. Edit `order`, `year`, `topic`, `title`, `authors`, `journal`, `status` and `link`; use `language_note` when needed.

- Every paper retains its own year and research topic on the left, including papers from the same year. On mobile these appear above the title.
- The right side contains the title, authors, journal name, status and **View paper ↗** link. The journal line does not repeat the year.
- `**Zhou Z**` highlights the author's name. Preserve the actual author order.
- The title is plain text. **View paper** is the only paper link in each entry.
- `citation_note` retains detailed bibliographic information for editing reference; it is not displayed on the homepage. Publication body text is not rendered.
- Entries follow ascending `order`, not the filename. Adjust the values to keep the list newest first.

See the [publication example and field reference](docs/EDITING.md#publications).

## Photograph, CV and contact

The current files are `assets/portrait.jpg` and `assets/cv.pdf`. Replace those files to update the photograph or CV. Both PDF links use the `cv` path in `_config.yml`; keep a PDF at that path. The site does not generate or rewrite a CV. A missing photograph falls back to the initials **ZZ**.

The Email button reads `email` from `_config.yml`. Its address is hidden from visible page text, but remains in the `mailto:` link. LinkedIn and GitHub use the URLs in `contact.md`. ORCID stays hidden while its URL is empty.

## Appearance and interaction

- **Fonts:** Inter for interface and body text; Playfair Display for selected headings and titles.
- **Themes:** the moon/sun button follows the system initially and remembers a manual choice. Both status pills use coordinated green colours.
- **Navigation:** sticky header, current-section underline, a divider after scrolling, and an outlined CV button. The menu changes to its compact version at `56rem`.
- **Alignment:** above `48rem`, project and publication metadata align with the corresponding text baselines, including wrapped titles. Narrow screens use a stacked layout.
- **Entrance animation:** below-the-fold sections fade in and rise slightly once per page load. Reduced-motion settings disable movement.
- **Hover:** education and skills cards lift slightly; project and experience rows rise slightly. Publication rows change background colour and do not rise on hover. Keyboard focus also highlights the publication row.

Content changes belong in Markdown. Layout and colours are in `styles.css`; section markup is in `_includes/sections/`; the page shell is in `_layouts/home.html`; interaction behaviour is in `script.js`.

## Local preview

With Ruby and Bundler installed, run:

```sh
bundle install
bundle exec jekyll serve
```

Open `http://localhost:4000`. For a static build, use `bundle exec jekyll build`. The optional `npm run dev` server serves an existing `_site/` build and does not rebuild Markdown.

Do not commit `_site/`, add a root `index.html`, or add `.nojekyll`; this site relies on Jekyll to render `index.md` and its collections. Documentation under `docs/`, this README and `assets/README.md` are excluded from the generated website.

## Before committing an edit

1. Check YAML indentation and quote text containing a colon.
2. Use unique `order` values within each collection.
3. Check the affected section and its links after the Pages deployment completes.
4. When changing a template or interaction, update these instructions alongside the code.
