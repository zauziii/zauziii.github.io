# Personal assets

The website uses these existing files:

| File | Use |
| --- | --- |
| `portrait.jpg` | Personal photograph in the circular hero frame |
| `cv.pdf` | User-uploaded CV opened by both the hero and navigation buttons |
| `favicon.svg` | Blue tile with geometric ZZ initials |

## Replace the photograph or CV

Upload the replacement with the same filename and commit it. GitHub Pages will publish it in the next build. The site does not generate or rewrite the photograph or PDF.

To change a filename or image format, update the matching path in the repository's `_config.yml`:

```yaml
portrait: "/assets/portrait.jpg"
portrait_position: "50% 35%"
cv: "/assets/cv.pdf"
```

`portrait_position` controls the crop inside the circular frame without modifying the original image. A missing photograph shows the configured initials.

The current CV buttons open the configured PDF directly. Keep that file available: there is no automatic email-request fallback for these buttons and no visible standalone CV section.

## Favicon

Edit `favicon.svg` to change the icon. If a browser continues to display an old version, change the icon URL's version suffix in `_layouts/home.html` when publishing the replacement.

See the [main README](../README.md) and [editing guide](../docs/EDITING.md) for the rest of the site. This file is excluded from the generated website.
