import ColorThief from "./color-thief.js";
import { PDColor } from "./pandaChromatology";
export const Storage = function (name, value?) {
  if (arguments.length === 1) {
    // 没有value，仅读取
    let result;
    try {
      const raw = window.localStorage.getItem(name);
      if (raw === null) return undefined;
      result = JSON.parse(raw).v;
    } catch (e) {
      result = window.localStorage.getItem(name);
    }
    return result;
  } else {
    // 有value，存储
    window.localStorage.setItem(name, JSON.stringify({ v: value }));
  }
};

export const get_img_color = function (url: string) {
  return new Promise((resolve, reject) => {
    // 尝试从localStorage里面读出已有的主色调
    let mainColors: any = Storage("mainColors");
    mainColors = mainColors || {};
    if (mainColors[url]) {
      resolve(mainColors[url]);
      return;
    }
    // 因为是从background-image里面提取的css，所以没有的时候是none，这个时候会onerror
    let img: any = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const colorThief = new ColorThief();
      let color = colorThief.getColor(img);
      // 看看颜色的亮度是否比较低，如果低，就重新取色彩盘
      const PDColorInstance = new PDColor(color);
      if (PDColorInstance.getL() < 5 || PDColorInstance.getS() < 5) {
        let result = null;
        // eslint-disable-next-line array-callback-return
        colorThief.getPalette(img, 5).map((el) => {
          const instance = new PDColor(el);
          if (instance.getL() >= 5 && instance.getS() >= 5 && result == null) result = el;
        });
        color = result || color;
      }
      resolve(color || [41, 34, 80]);
      img = null;
      // 将当前的URL对应的color保存起来
      mainColors = Storage("mainColors");
      mainColors = mainColors || {};
      mainColors[url] = color;
      Storage("mainColors", mainColors);
    };
    img.onerror = () => {
      reject(new Error(`图片地址不正确，无法获取主色调：${url}`));
      img = null;
    };
    img.src = url;
  });
};

export function isDarkColor(color) {
  // Convert color to RGB
  let r, g, b;
  if (color.startsWith("#")) {
    r = parseInt(color.slice(1, 3), 16);
    g = parseInt(color.slice(3, 5), 16);
    b = parseInt(color.slice(5, 7), 16);
  } else if (color.startsWith("rgb")) {
    const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    r = parseInt(match[1]);
    g = parseInt(match[2]);
    b = parseInt(match[3]);
  } else {
    return null;
  }

  // Calculate luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  // Return true if luminance is less than 0.5, indicating a dark color
  return luminance < 0.5;
}

/**
 * useImageColor.ts
 * 获取图片主色调及相关配色的工具方法
 * @param {string} img - 图片URL
 * @returns {Promise<Object>} 颜色相关变量
 */
async function getImgColor(img: string) {
  const data = await get_img_color(img);
  const imgColor = new PDColor(data);
  const currentColor = new PDColor("#758397");
  currentColor.setH(imgColor.getH()).setL(imgColor.getS()).mappingS([50, 90]).setL(imgColor.getL()).mappingL([25, 40]);
  imgColor.getS() < 15 && currentColor.setS(15);
  const currentShadow = new PDColor([0, 40, 80]).setH(imgColor.getH());
  const dark = imgColor.getL() < 65;
  return {
    "--rgb": `${imgColor.getR()},${imgColor.getG()},${imgColor.getB()}`,
    "--default": currentColor.getString("hex"),
    "--control-color": currentColor.mappingL([30, 50]).getString("hex"),
    "--bg": imgColor.getString("rgba"),
    "--bgTrans": imgColor.setA(0).getString("rgba"),
    "--textShadow": `-1px -1px rgba(255,255,255,.8),
.1053em .1053em ${currentShadow.setA(0.12).getString("rgba")},
.1842em .1842em .1316em ${currentShadow.setA(0.12).getString("rgba")}`,
    "--image-shadow": `0 1em 1em ${currentShadow.setA(0.3).getString("rgba")}`,
    qrlight:
      imgColor.getL() > 16
        ? imgColor
            .setA(1)
            .lighten(dark ? 2.8 : 1.1)
            .getString("hex")
        : "#fff",
    qrdark: dark ? imgColor.setA(1).darken(0.25).getString("hex") : currentColor.getString("hex"),
    sitename_bg: dark ? "rgba(0,0,0,.2)" : currentColor.setA(0.1).getString("rgba"),
    textClass: dark ? "is-dark" : "is-light",
    dark,
  };
}

window.getImgColor = getImgColor;
