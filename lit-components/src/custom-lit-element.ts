import { LitElement } from 'lit';
import { adoptStyles, unsafeCSS } from 'lit';

// 上述 样式文件
import style from './tailwind.global.css?inline';
import iconStyle from './utils/iconfont.css?inline';

// 转换为 Lit 可使用的 css 样式表
const stylesheet = unsafeCSS(style);
const iconSsh = unsafeCSS(iconStyle);

/**
 * tailwind css 注入
 * @param superClass
 * @constructor
 */
export function TW<T extends LitMixin>(superClass: T): T {
  return class extends superClass {
    override connectedCallback() {
      super.connectedCallback();
      adoptStyles(this.shadowRoot!, [stylesheet, iconSsh]);
    }
  };
}

// 更多的上层功能代码可以写到此处，与TW实现一致

/**
 * 自定义扩展了 Lit 原生的组件
 */
export const CustomLitElement = TW(LitElement);

declare global {
  export type LitMixin<T = unknown> = new (...args: any[]) => T & LitElement;
}
