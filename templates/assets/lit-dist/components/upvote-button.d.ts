import { CustomLitElement } from '../custom-lit-element';

export declare class UpvoteButton extends CustomLitElement {
    name: string;
    group: string;
    kind: string;
    isDark: boolean;
    currentUpvoteCount: number;
    upvotedNames: string[];
    upvoteCount: number;
    private _observer?;
    connectedCallback(): void;
    disconnectedCallback(): void;
    updateIsDark(): void;
    get isUpvoted(): boolean;
    handleUpvote(): Promise<void>;
    render(): import('lit').TemplateResult<1>;
    static styles: import('lit').CSSResult[];
}
declare global {
    interface HTMLElementTagNameMap {
        'upvote-button': UpvoteButton;
    }
}
//# sourceMappingURL=upvote-button.d.ts.map