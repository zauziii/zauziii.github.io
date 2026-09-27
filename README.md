# Zhi Zhou — Academic website

A personal academic and recruitment website for GitHub Pages. The design follows the supplied reference: a white background, navy serif headings, pale blue accents, outline buttons, and a round photograph frame.

Plain HTML, CSS, and JavaScript; no build or dependencies are needed.

## 添加自己的头像和 CV

1. 将照片放入 `assets/`，例如 `assets/portrait.jpg`。
2. 将自己的 PDF 简历放入 `assets/`，例如 `assets/cv.pdf`。
3. 编辑 `site-config.js`，将对应的空字符串改成文件路径：

```js
window.profileAssets = {
  portrait: './assets/portrait.jpg',
  portraitPosition: '50% 35%',
  cv: './assets/cv.pdf'
};
```

照片和 CV 可以分别添加。照片支持 JPG、PNG、WebP；图片保持原文件，通过网页样式显示为圆形。`portraitPosition` 可以调整取景位置。

**未配置照片时**显示姓名首字母 ZZ。**未配置 CV 时**，CV 按钮跳转到邮件索取区域，不会打开缺失文件。本网站不包含生成的 CV。

在 GitHub 仓库中打开 `assets/`，使用 **Add file → Upload files** 上传。然后打开 `site-config.js`，点击编辑按钮修改路径并提交即可。

## GitHub Pages

Repository: [zauziii/zauziii.github.io](https://github.com/zauziii/zauziii.github.io)

In **Settings → Pages**, select **Deploy from a branch**, then **main** and **/(root)**. Save. Once deployment succeeds, the site is served at `https://zauziii.github.io/`. Later commits publish automatically.

Keep `index.html` at the repository root. All asset paths are relative, so the same files also work under a project-site subdirectory. `.nojekyll` enables plain static hosting.

## Editing

| File | Purpose |
| --- | --- |
| `index.html` | Biography, research, publications, experience, and contact details |
| `styles.css` | Desktop, mobile, reduced-motion, and print layouts |
| `site-config.js` | Paths to your photograph and CV |
| `script.js` | Mobile menu, optional assets, and footer year |
| `assets/` | Your own photograph and PDF CV |

Open `index.html` directly for an offline preview. With Node installed, `npm run dev` also serves a local preview at `http://localhost:3000`. GitHub Pages serves the static files and does not use the development server.

The site uses system fonts and contains no analytics or advertisements. Publication links lead to the original publisher pages. Keep your public biography and your own CV consistent when updating them.
