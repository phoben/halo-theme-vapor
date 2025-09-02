/* eslint-disable @typescript-eslint/no-explicit-any */
type themeType = "system" | "dark" | "light";

// 从cookie中获取已保存的主题方案
function getSavedTheme(): themeType | null {
  const match = document.cookie.match(/(?:^|;\s*)vapor-theme=([^;]*)/);
  if (match && (match[1] === "system" || match[1] === "dark" || match[1] === "light")) {
    return match[1] as themeType;
  }
  return null;
}

// 应用主题到document
function updateDocumentTheme(theme: themeType) {
  const html = document.documentElement;
  if (theme === "system") {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      html.setAttribute("theme", "dark");
      html.classList.add("dark");
      html.classList.remove("light");
    } else {
      html.setAttribute("theme", "light");
      html.classList.add("light");
      html.classList.remove("dark");
    }
  } else {
    html.setAttribute("theme", theme);
    html.classList.add(theme);
    html.classList.remove(theme === "dark" ? "light" : "dark");
  }
  // TODO:记录当前主题
  // 记录当前主题到 window 变量，便于全局访问
  (window as any).__CURRENT_THEME__ = theme;
}
/**
 * 初始化颜色方案
 * @param {string} defaultScheme - 默认颜色方案
 * @param {boolean} useSavedScheme - 是否使用本地存储中保存的方案
 */
export function initializeColorScheme(defaultScheme: themeType, useSavedScheme = true) {
  console.log("123123123123");
  let schemeToApply: themeType = defaultScheme;

  // 优先使用本地存储中保存的方案
  if (useSavedScheme) {
    // document.cookie = `thyuu-theme=${theme}; expires=${expires}; path=/`;

    // 初始化时获取已保存的主题
    const savedTheme = getSavedTheme();
    if (savedTheme) {
      schemeToApply = savedTheme;
    }
    updateDocumentTheme(schemeToApply);
  }
}

// 监听系统主题变化
const systemThemeChangeHandler = () => {
  const _window = window as any;
  // 仅当当前使用系统主题时才响应变化
  if (_window.__CURRENT_THEME__ === "system") {
    updateDocumentTheme("system");
  }
};

// 注册系统主题变化监听器
window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", systemThemeChangeHandler);
