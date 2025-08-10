import { LitElement } from 'lit';

export declare class EmojiPanel extends LitElement {
    private activeIndex;
    private myEmojis;
    private panelEl;
    connectedCallback(): void;
    firstUpdated(): void;
    private handleTabClick;
    private handleScroll;
    private handleEmojiClick;
    static styles: import('lit').CSSResult;
    render(): import('lit').TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'emoji-panel': EmojiPanel;
    }
}
//# sourceMappingURL=emoji.d.ts.map