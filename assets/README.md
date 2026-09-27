# Your photograph and CV

这个目录用于存放你自己的文件。当前没有提供或生成照片、CV。

1. 上传个人照片，建议命名为 `portrait.jpg`（也支持 PNG、WebP）。
2. 上传自己的 PDF 简历，建议命名为 `cv.pdf`。
3. 编辑根目录的 `site-config.js`，填入相应路径：

```js
window.profileAssets = {
  portrait: './assets/portrait.jpg',
  portraitPosition: '50% 35%',
  cv: './assets/cv.pdf'
};
```

两项可以单独设置。没有照片时显示姓名首字母；没有 CV 时显示邮件索取入口。
照片以圆形显示，原文件不裁剪。可以调整 `portraitPosition` 的第二个百分比来上下移动取景位置。

All files committed to this public repository are public. Upload only the version you intend to share.
