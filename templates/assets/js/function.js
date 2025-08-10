/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */
// Cookie读取
function getCookie(name) {
  let cookieArray = document.cookie.split("; ");
  for (let i = 0; i < cookieArray.length; i++) {
    let cookiePair = cookieArray[i].split("=");
    if (name === cookiePair[0]) {
      return cookiePair[1];
    }
  }
  return null;
}

// 加载提示
function VAPORloader(parent, loadingText = "加载中", errorText = "加载失败，点击重试") {
  const loader = document.createElement("vapor-loaed");
  loader.textContent = loadingText;
  parent.appendChild(loader);
  return {
    complete: () => {
      loader.classList.add("loaded");
      setTimeout(() => {
        loader.remove();
      }, 1000);
    },
    error: (retryCallback) => {
      loader.textContent = errorText;
      loader.classList.add("error");
      loader.style.cursor = "pointer";
      loader.addEventListener(
        "click",
        () => {
          loader.textContent = loadingText;
          loader.classList.remove("error");
          if (typeof retryCallback === "function") {
            retryCallback();
          }
        },
        { once: true }
      );
    },
  };
}

// 顶栏固定
let lastScrollTop = 0;
function VAPORHeadFixed() {
  const st = window.scrollY;
  const body = document.body;
  const fixed = st >= 85;
  body.classList.toggle("nav-fixed", fixed);
  body.classList.toggle("nav-hided", fixed && st > lastScrollTop);
  lastScrollTop = st;
}

// 返回顶部
function VAPORHeadPercent() {
  let a = document.documentElement.scrollTop || window.pageYOffset,
    b =
      Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.body.clientHeight,
        document.documentElement.clientHeight
      ) - document.documentElement.clientHeight,
    result = Math.round((a / b) * 100),
    up = document.querySelector(".go-top");
  up.innerHTML = `${result}%`;
  document.querySelector(".go-top-btn").addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// 日夜模式切换
function VAPORThemesSwitcher() {
  const root = document.documentElement;
  const themeToggle = document.getElementById("theme-toggle");
  let theme = root.getAttribute("theme") || "light";
  const switchTheme = () => {
    theme = theme === "dark" ? "light" : "dark";
    root.setAttribute("theme", theme);
    root.setAttribute("class", theme);
    const expires = new Date(Date.now() + 86400 * 1000).toUTCString();
    document.cookie = `vapor-theme=${theme}; expires=${expires}; path=/`;
  };
  if (themeToggle) {
    themeToggle.addEventListener("click", switchTheme);
  }
}

// 懒加载动画
function VAPORLazysLoad(selector, loadedClass) {
  document.querySelectorAll(selector).forEach((target) => {
    if (target.complete) {
      target.classList.add(loadedClass);
    } else {
      target.addEventListener("load", () => {
        target.classList.add(loadedClass);
      });
    }
  });
}

// 嵌入懒加载动画
function VAPOREmbedLoad(parentSelector, childSelector, loadedClass) {
  document.querySelectorAll(parentSelector).forEach((parent) => {
    const child = parent.querySelector(childSelector);
    if (!child) return;
    const loader = VAPORloader(parent, "媒体加载中", "媒体加载失败，点击重试");
    const loadHandler = () => {
      parent.classList.add(loadedClass);
      loader.complete();
      child.removeEventListener("load", loadHandler);
      child.removeEventListener("error", errorHandler);
    };
    const errorHandler = () => {
      loader.error(() => {
        child.addEventListener("load", loadHandler);
        child.addEventListener("error", errorHandler);
        if (child.tagName === "IMG" || child.tagName === "IFRAME") {
          child.src += "";
        }
      });
    };
    if (child.complete && child.tagName === "IMG") {
      loadHandler();
      return;
    }
    child.addEventListener("load", loadHandler);
    child.addEventListener("error", errorHandler);
  });
}

// 通用复制按钮
function VAPORCopyButton(textSelector, copyTip) {
  document.querySelectorAll(textSelector).forEach((textElement) => {
    let button = textElement.nextElementSibling;
    if (!button || !button.classList.contains("copy-btn")) {
      button = document.createElement("button");
      button.textContent = copyTip;
      button.className = "copy-btn iconfont icon-copy text-sm flex items-center gap-1";
      textElement.insertAdjacentElement("afterend", button);
    }
    button.addEventListener("click", function () {
      let textToCopy = "";
      if (textElement.tagName.toLowerCase() === "table") {
        textToCopy = Array.from(textElement.querySelectorAll("tr"))
          .map((row) => {
            return Array.from(row.querySelectorAll("td, th"))
              .map((cell) => cell.textContent)
              .join("\t");
          })
          .join("\n");
      } else {
        textToCopy = textElement.textContent || textElement.innerText;
      }
      navigator.clipboard.writeText(textToCopy).then(
        function () {
          button.textContent = "复制成功";
          setTimeout(function () {
            button.textContent = copyTip;
          }, 1500);
        },
        function (err) {
          console.error("复制失败", err);
        }
      );
    });
  });
}

// 视差效果
function VAPORParallaxEffect(back, main, speed) {
  const backImg = document.querySelector(back);
  const mainImg = document.querySelector(main);
  const parallax = (e, img, factor) => {
    const mouseX = (e.clientX - window.innerWidth / 2) / window.innerWidth;
    const mouseY = (e.clientY - window.innerHeight / 2) / window.innerHeight;
    const scale = 1 + speed * 0.01;
    img.style.transform = `translate(${-(mouseX * factor)}%, ${-(mouseY * factor)}%) scale(${scale})`;
  };
  if (backImg) {
    document.addEventListener("mousemove", (e) => parallax(e, backImg, speed * 0.5));
  }
  if (mainImg) {
    document.addEventListener("mousemove", (e) => parallax(e, mainImg, speed));
  }
}

// 动画效果处理
function FadeAnimate() {
  const items = document.querySelectorAll(".fade-before");
  const animateOnScroll = (elements, delay) => {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("fade-after");
            }, index * delay);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.2,
      }
    );
    elements.forEach((element) => {
      observer.observe(element);
    });
  };
  animateOnScroll(items, 150);
}

// 动画延迟处理
function animateDelayed(parentSelector, childSelector, delayFirstTime, delayChildTime) {
  const parents = document.querySelectorAll(parentSelector);
  parents.forEach((parent, index) => {
    const children = parent.querySelectorAll(childSelector);
    children.forEach((child, childIndex) => {
      child.style.animationDelay = `${delayFirstTime + childIndex * delayChildTime}s`;
    });
  });
}

// 文章 相册激活 Carousel
function postGalleryCarousel(gallerySelector, imageSelector) {
  document.querySelectorAll(gallerySelector).forEach((gallery) => {
    const loader = VAPORloader(gallery, "图库加载中");
    Promise.all(
      [...gallery.querySelectorAll(imageSelector)].flatMap((slide) =>
        (slide.tagName === "IMG" ? [slide] : [...slide.querySelectorAll("img")]).map((img) =>
          img.complete
            ? Promise.resolve()
            : Promise.race([
                new Promise((r) => img.addEventListener("load", r)),
                new Promise((r) => img.addEventListener("error", r)),
              ])
        )
      )
    )
      .then(() => {
        loader.complete();
        setTimeout(() => {
          gallery.classList.add("loaded");
        }, 1000);
        [...gallery.querySelectorAll(imageSelector)].forEach((slide) => slide.classList.add("f-carousel__slide"));
        new Carousel(gallery, { Dots: { minCount: 2, dynamicFrom: 11 } });
      })
      .catch(() => {
        loader.error(() => {
          postGalleryCarousel(gallerySelector, imageSelector);
        });
      });
  });
}

// 文章 代码高亮
function postCodeHighlight() {
  document.querySelectorAll("pre code").forEach((el) => {
    // hljs.lineNumbersBlock(el);
    hljs.highlightElement(el);
  });
}

// 通用 初始化
VAPORCopyButton("pre code", "复制代码");
VAPORCopyButton("#copy em", null);
animateDelayed(".page-aside", "li", 0, 0.1);

document.addEventListener("DOMContentLoaded", () => {
  VAPORThemesSwitcher();
  VAPORLazysLoad("img", "loaded");
  postCodeHighlight();
  postGalleryCarousel(".wp-block-gallery", ".wp-block-image");
  FadeAnimate();
  VAPORHeadFixed();
  // 兼容thyuu区块插件
  VAPOREmbedLoad("thyuu-embed", "iframe", "loaded");
});

document.addEventListener("scroll", () => {
  VAPORHeadFixed();
});
