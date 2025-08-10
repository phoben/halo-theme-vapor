/* eslint-disable @typescript-eslint/no-explicit-any */
import "./style.less";

import * as tocbot from "tocbot";

export function generateToc() {
  const content = document.getElementById("content");
  const titles = content?.querySelectorAll("h1, h2, h3, h4");

  const tocContainer = document.getElementById("toc-container");

  if (!tocContainer) {
    return;
  }

  if (!titles?.length) {
    tocContainer.textContent = "当前文章没有目录";
    tocContainer.style.height = "auto";
    return;
  }

  (tocbot as any).init({
    tocSelector: ".toc",
    contentSelector: "#content",
    headingSelector: "h1, h2, h3, h4",
    collapseDepth: 6,
    headingsOffset: 100,
    scrollSmooth: false,
    scrollSmoothOffset: -100,
    tocScrollOffset: 50,
  });
  window.animateDelayed("#toc-container .toc-list", ".toc-list-item", 0, 0.1);
}
