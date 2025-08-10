import { LitElement, html, css, PropertyValues } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
// 需要在 tsconfig.json 中配置 "resolveJsonModule": true
// 并确保 emojis.json 文件在同目录下
import emojisData from './emojis.json';

interface EmojiGroup {
  name: string;
  items: string[];
}

@customElement('emoji-panel')
export class EmojiPanel extends LitElement {
  @state() private activeIndex = 0;
  @state() private myEmojis: EmojiGroup[] = [];

  @query('.panel') private panelEl!: HTMLDivElement;

  override connectedCallback() {
    super.connectedCallback();
    // 处理 emojis 数据
    this.myEmojis = Object.keys(emojisData).map((name) => {
      const items = (emojisData as any)[name].split(' ');
      return { name, items };
    });
  }

  override firstUpdated() {
    // 监听滚动
    this.panelEl?.addEventListener('scroll', this.handleScroll.bind(this));
  }

  private handleTabClick(index: number) {
    const group = this.renderRoot.querySelector(`#emoji-group-${index}`) as HTMLElement;
    if (group && this.panelEl) {
      this.panelEl.scrollTo({
        left: 0,
        top: group.offsetTop,
        behavior: 'smooth',
      });
    }
  }

  private handleScroll() {
    if (!this.panelEl) return;
    const scrollTop = this.panelEl.scrollTop;
    let current = 0;
    for (let i = 0; i < this.myEmojis.length; i++) {
      const group = this.renderRoot.querySelector(`#emoji-group-${i}`) as HTMLElement;
      if (group && scrollTop >= group.offsetTop - 30) current = i;
    }
    this.activeIndex = current;
  }

  private handleEmojiClick(emoji: string) {
    this.dispatchEvent(new CustomEvent('selected', { detail: emoji }));
  }

  static override styles = css`
    .emoji-panel {
      .panel {
        width: 300px;
        height: 300px;
        overflow-y: scroll;
        overflow-x: hidden;
        scrollbar-width: thin;
        scroll-behavior: smooth;
        background: transparent;
        position: relative;
      }
      .panel:after {
        --back: radial-gradient(farthest-side at top, #000 80%, #0000);
        content: '';
        position: fixed;
        top: 0;
        right: 0;
        left: 0;
        height: 42px;
        -webkit-backdrop-filter: blur(2em);
        backdrop-filter: blur(2em);
        -webkit-mask: var(--back);
        mask: var(--back);
        pointer-events: none;
        z-index: 1;
      }
      .tabs {
        border-top: 1px solid rgba(255, 255, 255, 0.3);
        box-shadow: 0 -1px 0 hsl(212.37deg 30.89% 48.24% / 20%);
        margin: 1px 0 -8px;
        text-align: center;
      }
      .tabs button {
        --primary-color: #0070f5;
        padding: 10px 0;
        font-size: 17px;
        border: none;
        background: transparent;
        opacity: 0.6;
        border-radius: 0;
        transition: 0.35s;
        filter: grayscale(1);
        margin-top: -1px;
        position: relative;
        margin-left: 1px;
        margin-right: 1px;
      }
      .tabs button:hover {
        opacity: 1;
        filter: none;
      }
      .tabs button.active {
        opacity: 1;
        box-shadow: 0 2px var(--primary-color) inset;
        filter: none;
      }
      .tabs button.active::before {
        content: '';
        border-top: 4px solid var(--primary-color);
        border-left: 4px solid transparent;
        border-right: 4px solid transparent;
        display: block;
        width: 0px;
        height: 0px;
        position: absolute;
        top: 1px;
        left: calc(50% - 4px);
      }
      .title {
        padding: 3px;
        text-align: center;
        font-size: 14px;
        border: 1px solid rgba(255, 255, 255, 0.2);
        margin: 10px;
        border-radius: 0.35em;
        position: sticky;
        top: 10px;
        z-index: 2;
        background: var(--zinc-200, #e4e4e7);
        color: var(--zinc-600, #52525b);
      }
      @media (prefers-color-scheme: dark) {
        .title {
          background: var(--zinc-600, #52525b);
          color: var(--zinc-200, #e4e4e7);
        }
      }
      .grid {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        gap: 0.25rem;
      }
      .emoji {
        height: 38px;
        font-size: 22px;
        background: transparent;
        border-radius: 0.25em;
        cursor: pointer;
        border: 1px solid transparent;
        transition: 0.35s;
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        aspect-ratio: 1;
      }
      .emoji:hover {
        background: hsl(212.57deg 100% 48.04% / 10%) !important;
        border-color: hsl(212.57deg 100% 48.04% / 20%) !important;
        transition: 0s !important;
      }
    }
  `;

  override render() {
    return html`
      <div class="emoji-panel">
        <div class="panel" @scroll=${this.handleScroll}>
          ${this.myEmojis.map(
            (group, index) => html`
              <div id="emoji-group-${index}" class="relative">
                <div class="title">${group.name}</div>
                <div class="grid">
                  ${group.items.map(
                    (emoji) => html`
                      <button class="emoji" @click=${() => this.handleEmojiClick(emoji)}>
                        ${emoji}
                      </button>
                    `
                  )}
                </div>
              </div>
            `
          )}
        </div>
        <div class="tabs">
          ${this.myEmojis.map(
            (group, index) => html`
              <button
                data-tooltip="${group.name}"
                class=${this.activeIndex === index ? 'active' : ''}
                @click=${() => this.handleTabClick(index)}
              >
                <div class="tab">
                  <div class="show">${group.items[0]}</div>
                </div>
              </button>
            `
          )}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'emoji-panel': EmojiPanel;
  }
}
