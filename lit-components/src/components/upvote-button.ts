import { css, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { CustomLitElement } from '../custom-lit-element';

@customElement('upvote-button')
export class UpvoteButton extends CustomLitElement {
  @property({ type: String })
  name = '';

  @property({ type: String })
  group = '';

  @property({ type: String })
  kind = '';
  @property({ type: Boolean })
  isDark = true;

  @property({ type: Number, attribute: 'current-upvote-count' })
  currentUpvoteCount = 0;

  @state()
  upvotedNames: string[] = [];

  @state()
  upvoteCount = 0;
  private _observer?: MutationObserver;
  override connectedCallback(): void {
    super.connectedCallback();
    this.upvotedNames = JSON.parse(
      localStorage.getItem(`halo.upvoted.${this.kind.toLowerCase()}.names`) || '[]'
    );
    this.upvoteCount = this.currentUpvoteCount;

    this.updateIsDark();
    // 监听 html 标签的 class 变化
    this._observer = new MutationObserver(() => {
      this.updateIsDark();
    });
    this._observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });
  }

  override disconnectedCallback() {
    super.disconnectedCallback?.();
    this._observer?.disconnect();
  }

  updateIsDark() {
    this.isDark = document.documentElement.classList.contains('dark');
    this.requestUpdate?.(); // LitElement 需要
  }
  get isUpvoted() {
    return this.upvotedNames.includes(this.name);
  }

  async handleUpvote() {
    const { Message } = main.useMessage();
    if (this.isUpvoted) {
      Message.error('您已经点过赞了～');
      return;
    }
    const response = await fetch(`/apis/api.halo.run/v1alpha1/trackers/upvote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        group: this.group,
        plural: this.kind.toLocaleLowerCase() + 's',
        name: this.name,
      }),
    });

    if (!response.ok) {
      // const toast = new ToastManager();
      Message.error('点赞失败');
      return;
    }

    this.upvotedNames.push(this.name);
    this.upvoteCount++;

    localStorage.setItem(
      `halo.upvoted.${this.kind.toLowerCase()}.names`,
      JSON.stringify(Array.from(new Set(this.upvotedNames)))
    );
  }

  override render() {
    return html`
      <button class="relative aspect-square h-8" style="height: 24px;" @click=${this.handleUpvote}>
        ${this.isUpvoted
          ? html` <i class="iconfont icon-mliked text-lime-400"></i> `
          : html` <i class="iconfont icon-mlike"></i> `}
        <span
          class="format-num absolute -bottom-6 left-0 flex w-full items-center justify-center whitespace-nowrap text-[12px] font-semibold ${this
            .isDark
            ? 'text-zinc-200/25'
            : 'text-zinc-700/30'}"
          >${this.upvoteCount}</span
        >
      </button>
    `;
  }

  static override styles = [
    css`
      :host {
        display: inline-block;
      }
      @unocss-placeholder;
    `,
  ];
}

// customElements.get('upvote-button') || customElements.define('upvote-button', UpvoteButton);

declare global {
  interface HTMLElementTagNameMap {
    'upvote-button': UpvoteButton;
  }
}
