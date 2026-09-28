# Zhi Zhou — Academic website

A Markdown-based academic and recruitment website, published with **GitHub Pages and Jekyll**.

**Website:** https://zauziii.github.io/  
**Repository:** https://github.com/zauziii/zauziii.github.io

The layout is separate from the content. You can update your profile directly on GitHub without editing HTML, CSS, or JavaScript.

## Edit your website on GitHub

1. Open a Markdown file from the table below.
2. Select the pencil icon to edit it.
3. Update the text and select **Commit changes**.
4. GitHub Pages rebuilds and publishes the site automatically. You can check progress in the repository's **Actions** tab.

Keep the `---` lines at the top of each Markdown file. The fields between them control titles, dates, links, and display order. Write normal Markdown below the second `---` line. Use quotes around field values that contain a colon.

## Where to make changes

| Content | File or folder |
| --- | --- |
| Homepage introduction, headline, section labels, and shared navigation | [`index.md`](index.md) |
| Open-to-work status and opportunity types | [`content/_sections/availability.md`](content/_sections/availability.md) |
| Biography, current study status, and location | [`content/_sections/about.md`](content/_sections/about.md) |
| Statistics, programming, and tools | [`content/_skills/`](content/_skills/) |
| Publications | [`content/_publications/`](content/_publications/) |
| Employment history | [`content/_experience/`](content/_experience/) |
| Current degree and study track | [`content/_education/00-helsinki.md`](content/_education/00-helsinki.md) |
| Previous education | [`content/_education/`](content/_education/) |
| Social profile buttons, CV heading, and CV request message | [`content/_sections/contact.md`](content/_sections/contact.md) |
| Name, email, site description, photograph, and CV filenames | [`_config.yml`](_config.yml) |
| Photograph and your own CV | [`assets/`](assets/) |

## Add a publication

Create a new file under `content/_publications/`, for example `2026-new-paper.md`. Copy an existing entry or use this structure:

```markdown
---
order: 1
year: 2026
title: "Your publication title"
journal: "Journal name"
topic: "Research topic"
authors: "Author A, **Zhou Z**, Author B."
link: "https://doi.org/your-doi"
---

2026; volume(issue):pages. Add a short publication note if needed.
```

Entries appear in ascending `order`. Use a lower value to place an entry earlier, and keep the values unique. The filename is for organization; it does not determine the displayed title or order.

Skills, experience, and education use the same approach: one Markdown file per entry. Copy an existing file in the relevant folder, change its fields and text, and commit it.

The current Helsinki degree has `current: true` and `status: "In progress"`. This highlights it in the education section before skills, experience, and publications. Update those fields when your study status changes. Enrollment and graduation dates are omitted until you choose to add them.

## Availability, skills, and page order

The page follows this order: **Introduction → About → Education → Skills → Experience → Publications → CV**. The availability bar appears above the introduction, and contact buttons appear below it.

Edit `content/_sections/availability.md` to change the **Open to work** label or the types of opportunities you are seeking. Set `active: false` to hide the entire status bar. Write the opportunity description as normal Markdown below the front matter.

Skills are grouped into three Markdown files:

- `content/_skills/01-statistics.md`: statistical methods.
- `content/_skills/02-programming.md`: languages and libraries.
- `content/_skills/03-tools.md`: research and development tools.

Edit the bullet lists to update each category. The `order` field controls the order of the cards. The `icon` field selects a small interface icon (`chart`, `code`, or `tools`).

Both navigation menus use the same `navigation` list in `index.md`, including **Experience**. The `anchor` values must match the section IDs in `_layouts/home.html`. The CV navigation item leads to the compact CV download section. Section order is defined in that layout.

## Add your photograph and CV

Upload your files to `assets/` using **Add file → Upload files**:

- **Photograph:** `assets/portrait.jpg`
- **CV:** `assets/cv.pdf`

These exact filenames work automatically after the next build. The files are optional and can be added independently. Without a photograph, the site displays **ZZ**. Without a CV, visitors can request it by email. No generated CV is included.

To use another filename or a PNG/WebP photograph, update the corresponding path in `_config.yml`. Keep the leading `/`:

```yaml
portrait: "/assets/portrait.png"
portrait_position: "50% 35%"
cv: "/assets/cv.pdf"
```

The photograph is displayed in a circle without changing the original file. Adjust `portrait_position` to move the crop.

## Edit contact buttons

LinkedIn, GitHub, and ORCID links are stored under `social_links` in `content/_sections/contact.md`. Each entry has a `name`, `icon`, and full `url`. The links appear once, below the homepage introduction. There is no repeated contact section at the bottom.

The ORCID entry is ready for your own profile URL. Fill in its empty `url` value to show the button. A blank URL keeps that button hidden. Use your verified profile link rather than a search page or the ORCID homepage.

The **Email** button uses `email` in `_config.yml` and opens the visitor's email app. The address is not displayed as page text. It remains in the email link so visitors can contact you.

Your uploaded PDF is linked directly from **View CV** and **Download CV**. No extra description is displayed below the CV heading, and the site does not generate or rewrite the PDF.

## Markdown basics

```markdown
A normal paragraph, with **bold text** and *italic text*.

- A list item
- Another list item

[A link label](https://example.com)
```

Use a blank line between paragraphs. Page and card titles come from the fields at the top of each file, so you do not need to repeat them as Markdown headings.

## Typography and layout

The site retains the light reference style: white space, navy text, pale blue accents, rounded buttons, and a circular portrait frame. Section and skill-category headings use uppercase sans-serif lettering. The greeting, degree titles, job titles, and publication titles retain normal capitalization; the greeting and publication titles use a serif font.

Small academic icons, a subtle dot pattern around the portrait, and muted blue, sage, and lavender details add visual interest. Icons are embedded SVGs and require no external font or icon service. Hover effects respect reduced-motion preferences.

- Main body text: **17 px** on desktop and **16 px** on mobile at the browser's default font setting.
- Introduction: **17–18 px**.
- Publication titles: **22–24 px**.
- Uppercase section headings: **19–24 px**, with additional letter spacing.
- Supporting text: generally **14–16 px**.
- Headings scale to fit the screen. Font sizes use `rem` units and respect browser font preferences.

Optional design changes belong in `styles.css`. The page structure is in `_layouts/home.html`. Routine content updates only require Markdown.

## GitHub Pages settings

The repository uses **Settings → Pages → Deploy from a branch → main → /(root)**.

Jekyll converts the Markdown to HTML during deployment. Keep `_config.yml`, `_layouts/`, and `index.md` in the repository root. Do not add a `.nojekyll` file or a second root `index.html`, because these would bypass or conflict with the Markdown homepage.

The site uses relative asset URLs through Jekyll, so it can also run as a project site by changing `url` and `baseurl` in `_config.yml`.

## Optional local preview

You do not need a local development environment to edit on GitHub. To preview locally with Ruby and Bundler installed:

```sh
bundle install
bundle exec jekyll serve
```

Open `http://localhost:4000`. To create a static build, run `bundle exec jekyll build`; the generated files go into `_site/`. Do not commit that generated folder.

The optional Node preview server (`npm run dev`) serves an existing `_site/` build. It is used for supervised previews and does not build Markdown itself.

## References

- [GitHub Pages and Jekyll](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/about-github-pages-and-jekyll)
- [Adding content with Jekyll](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/adding-content-to-your-github-pages-site-using-jekyll)
- [Jekyll collections](https://jekyllrb.com/docs/collections/)
