import Alpine from "alpinejs";
import "./styles/main.less";
import "./styles/tailwind.css";
import "./utils/index";

window.Alpine = Alpine;
Alpine.start();

export * from "./functions/links";
export * from "./functions/message";
export * from "./functions/nums";
export * from "./functions/theme";
export * from "./functions/toc";
