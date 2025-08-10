import { LitElement } from 'lit';

/**
 * tailwind css 注入
 * @param superClass
 * @constructor
 */
export declare function TW<T extends LitMixin>(superClass: T): T;
/**
 * 自定义扩展了 Lit 原生的组件
 */
export declare const CustomLitElement: typeof LitElement;
declare global {
    export type LitMixin<T = unknown> = new (...args: any[]) => T & LitElement;
}
//# sourceMappingURL=custom-lit-element.d.ts.map