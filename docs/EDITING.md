# Website editing guide

This guide describes the current Markdown files and how the templates render them. All public text is in English. It covers content editing; design rules remain in CSS and templates.

## Markdown and YAML

The fields between the opening and closing `---` lines are YAML front matter. Use spaces for indentation and quote strings that contain punctuation such as a colon. Use lowercase, unquoted `true` and `false` for boolean settings.

Most entries display the Markdown body below the front matter:

```markdown
---
order: 1
title: "Entry title"
---

A short paragraph with **bold text**, *italic text*, or a [link](https://example.com).
```

Publications are the exception: the template displays named fields only. Adding text below their front matter will not add a visible paragraph.

Within education, experience, projects, publications and skills, a smaller `order` appears earlier. Filenames organise the repository but do not set the display order.

## Homepage and current studies

In `index.md`, edit:

| Field | Display |
| --- | --- |
| `heading` | Hero greeting |
| `profile_label` | Student and institution label |
| `subtitle` | Degree subject below the greeting |
| `projects_cta` | Explore-projects button label |
| `education_heading`, `experience_heading`, `projects_heading`, `publications_heading`, `skills_heading` | Section titles |
| `projects_intro`, `publications_intro`, `skills_intro` | Short section introductions |
| Markdown body | Hero introduction |

The About section has its own source, `content/_sections/about.md`: `title` supplies its heading, `facts` supplies the small fact list, and the body supplies the biography.

Current education is in `content/_education/00-helsinki.md`. `current: true` selects the highlighted card; `status: "In progress"` controls the green label. `credential`, `title` and `institution` supply its main text. The body holds the study track and programme link.

If the degree or study status changes, update the education entry, the hero text in `index.md`, the relevant About facts, and the site title/description in `_config.yml`. These are separate editorial summaries, not automatically copied from the education card.

Other education entries use `order`, `title`, `institution`, optional `credential`, and a body for details such as a thesis. Add only confirmed dates or qualifications.

## Navigation and section order

`index.md` has one `navigation` list that controls both menus and the order of the section templates. Keep these anchor names unchanged:

| Anchor | Section | Current menu behaviour |
| --- | --- | --- |
| `profile` | About | Hidden from menus |
| `education` | Education | Visible |
| `experience` | Experience | Visible |
| `projects` | Projects | Visible when projects exist |
| `publications` | Publications | Visible |
| `skills` | Skills | Hidden from menus |
| `cv` | Optional CV section | Section hidden; menu opens the PDF |

Move a complete list entry to reorder sections. Change `label` to rename its menu text. Each anchor must be unique.

```yaml
navigation:
  - label: "About"
    anchor: "profile"
    show_in_nav: false
  - label: "Education"
    anchor: "education"
  # Keep the other existing entries here.
  - label: "CV"
    anchor: "cv"
    show_section: false
```

This is an excerpt, not a replacement for the full list. Omitting an ordinary entry also removes that section from the page. To hide a section explicitly, use both `show_section: false` and `show_in_nav: false`; otherwise its menu could point to a missing section. CV is a special case because its menu opens the PDF directly.

The hero and footer sit outside this list. The CV section template remains available for optional future use, but the current website intentionally hides it. Its `cv_heading` and `cv_on_request` fields in `contact.md` have no visible effect while it is hidden.

## Availability and contact

`content/_sections/availability.md` controls the green status pill:

```markdown
---
key: availability
active: true
label: "Open to work"
---

MSc thesis, research, and data science opportunities.
```

Set `active: false` to hide the pill. Keep the description short; formatting is removed so it wraps as a single message.

Edit `social_links` in `content/_sections/contact.md` for LinkedIn, GitHub and ORCID. Each item uses `name`, `icon` and `url`. The available social icons include `linkedin`, `github` and `orcid`. A blank URL hides the button. Add a verified personal ORCID URL to show it.

The Email button uses `email` in `_config.yml`. The visible label remains Email; the address is present in the link. Contact buttons appear once, under the hero.

## Experience

One Markdown file represents each role in `content/_experience/`:

```markdown
---
order: 1
period: "2025 — present"
title: "Biostatistician"
organization: "University of Helsinki"
location: "Helsinki, Finland"
---

Statistical consultation for medical research, from study planning and model selection to interpretation and reporting. Teaching and practical support in R and SPSS.
```

`location` supplies the third line under the job title. Keep department names out of that location field. The body supplies the role description.

## Projects

Projects live in `content/_projects/`. Required fields are `order`, `title`, `organization` and `period`. The body describes the work and your contribution. `methods` adds tags; `link` and `link_label` add one optional resource link.

```markdown
---
order: 1
title: "Multimorbidity and future service needs"
organization: "THL"
period: "2023–2024"
methods:
  - "Multiple imputation"
  - "Cox regression"
  - "Illness-death models"
link: "https://www.laakarilehti.fi/tieteessa/alkuperaistutkimukset/monisairastavuus-kuormittaa-terveydenhuoltoa-yha-enemman/en"
link_label: "Related publication"
---

Studied how changes in non-communicable diseases and their risk factors affect future health service needs, using regional multimorbidity indicators.

**My contribution:** Applied imputation and disease-progression models, produced figures and summaries, and implemented reusable R functions with a user guide.
```

Leave out the link fields if there is no public resource. An empty project collection hides both the section and its navigation/hero links. Above the mobile breakpoint, the organisation aligns with the title and the period aligns with the description's first line.

## Publications

Use one file per paper in `content/_publications/`. The following example matches an existing record:

```markdown
---
order: 2
year: 2025
title: "Work ability trends 2000–2020 and birth-cohort projections until 2040 in Finland"
journal: "Scandinavian Journal of Public Health"
topic: "Work ability"
status: "Published"
authors: "Lahti J, Reinikainen J, Kontto J, **Zhou Z**, et al."
link: "https://doi.org/10.1177/14034948241228155"
citation_note: "Journal issue 2025 · First published online in 2024."
---
```

| Field | Purpose |
| --- | --- |
| `order` | Position in the list; use unique values and keep newer papers first |
| `year` | Year displayed on the left for every entry, even when repeated |
| `topic` | Short research topic below the year |
| `title` | Plain-text paper heading |
| `authors` | Author list; Markdown bold highlights `**Zhou Z**` |
| `journal` | Journal name only, without a year, volume or page range |
| `status` | Accurate publication status, such as Published, Accepted or Preprint |
| `link` | Destination of the sole View paper link; prefer the DOI when available |
| `language_note` | Optional visible language note beside the link |
| `citation_note` | Optional reference information stored in the source, not displayed |

The journal line on the right does not repeat the year. Keep dates out of `journal`; change `year` when the displayed publication year needs updating. For the current published records, the list uses the journal-issue year, with online-first dates retained in `citation_note` where relevant.

Use topics of the same kind: Multimorbidity, Work ability, Health behaviours and Population health are the current labels. Preserve author order and use the actual publication's spelling and title. The Finnish-language paper uses `language_note: "In Finnish · English summary"`.

The title is not clickable. View paper opens the supplied URL in a new tab. Each row has a gentle hover/focus background highlight, with no hover lift. On larger screens the year aligns with the title's first baseline and the topic aligns with the authors. Mobile stacks the metadata above the title.

## Skills

The current section has three cards:

| File | Category | Icon |
| --- | --- | --- |
| `content/_skills/01-statistics.md` | Statistics | `chart` |
| `content/_skills/02-programming.md` | Programming | `code` |
| `content/_skills/03-tools.md` | Tools | `tools` |

Each file uses `order`, `title` and `icon`. Edit its Markdown bullet list to change the visible skills. A bold phrase becomes a skill heading; an indented continuation becomes its explanation:

```markdown
- **R · Advanced**
  tidyverse and lme4 for data preparation, analysis, and modelling.
```

The deployed content uses detailed lists and proficiency/coursework labels. Update those source files to change the website; a separate design preview does not change the live lists.

## Photograph, CV and favicon

See [assets/README.md](../assets/README.md). Replace the existing personal files or change their paths in `_config.yml`. The hero's View CV and the navigation CV button both open the same PDF. No standalone CV section is currently rendered.

The `portrait_position` setting adjusts the circular crop without changing the original image. A missing image shows initials. A missing PDF does not trigger an email fallback for the current direct links, so keep the configured PDF available.

## Layout and interaction files

| File | Responsibility |
| --- | --- |
| `_layouts/home.html` | Document metadata, fonts, header, hero, section loop and footer |
| `_includes/navigation.html` | Shared desktop/mobile links and direct CV link |
| `_includes/sections/` | How each collection's fields become HTML |
| `_includes/social-links.html` | Contact buttons and empty-URL handling |
| `_includes/icon.html` | Inline SVG icons |
| `styles.css` | Typography, themes, responsive layout, baselines, hover and entrance styles |
| `script.js` | Theme persistence, menu, active-section tracking and entrance animation |

The compact navigation breakpoint is `56rem` in both CSS and JavaScript. Content switches to its mobile layout at `48rem`. Keep related breakpoint changes in sync.

Below-the-fold sections enter once per load with a 0.55-second fade and a 16px rise. Content already visible at load is shown immediately. Education and skills cards lift 3px on hover; projects and experience rows lift 2px. Publications use background highlighting only. Reduced-motion preferences disable movement and transitions; content remains readable without animation or JavaScript.

The theme follows the system until a manual choice is saved. Printing uses the light palette. The green availability and study-status labels share colour variables.

## Publish and check

Commit changes to `main` and wait for the existing GitHub Pages workflow to complete. Documentation files are visible in the repository but excluded from the generated website.

For local checks:

```sh
bundle exec jekyll build
bundle exec jekyll serve
```

Check the edited section on a wide and a narrow screen when changing layout. Verify the relevant PDF or paper link when changing a URL. If a content edit is not visible, confirm that the template actually reads that field and that the latest deployment succeeded. Keep this guide and the README aligned with future template changes.
