import CryptoJS from "crypto-js";
import "./color/index";
// 自动获取头像
window.vapor_format_avatar = (email: string, suffix = "", size = 128) => {
  const avatarServer = "weavatar.com";
  const hashHex = CryptoJS.SHA256(email);
  return `https://${avatarServer}/avatar/${hashHex}?s=${size}&d=mm&r=g ${suffix}`;
};
