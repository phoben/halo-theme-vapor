/* eslint-disable @typescript-eslint/no-explicit-any */
/* global document, window */

const messageTypes = ["info", "success", "error", "warning"] as const;
type MessageType = (typeof messageTypes)[number];

const messageClassMap: Record<MessageType, string> = {
  info: "iconfont icon-info1",
  success: "iconfont icon-success",
  error: "iconfont icon-close1 mr-[2px]",
  warning: "iconfont icon-warning",
};

interface MessageOptions {
  type: MessageType;
  content: string | string[];
  duration?: number;
  closeable?: boolean;
}

interface MessageInstance {
  type: MessageType;
  content: string | string[];
  closeable: boolean;
  close: () => void;
  el: HTMLDivElement;
}

const messages: MessageInstance[] = [];

function createMessage({ type, content, duration = 5000, closeable = false }: MessageOptions) {
  // 创建消息元素
  const el = document.createElement("div");
  el.className = `message-toast ${type} ${closeable ? "closeable" : ""}`;
  el.innerHTML = `
    <div class="icon"><i class="${messageClassMap[type]}"></i></div>
    <div class="content">${Array.isArray(content) ? content.map((c) => `<div>${c}</div>`).join("") : content}</div>
    ${closeable ? `<div class="close-btn iconfont icon-close"></div>` : ""}
  `;

  // 关闭逻辑
  const instance: MessageInstance = {
    type,
    content,
    closeable,
    close: () => removeMessage(instance),
    el,
  };

  if (closeable) {
    el.querySelector(".close-btn")?.addEventListener("click", instance.close);
  }

  // 渲染到容器
  getContainer().appendChild(el);
  messages.push(instance);

  // 强制触发动画
  requestAnimationFrame(() => {
    el.classList.add("show");
  });

  // 自动关闭
  if (duration > 0) {
    setTimeout(() => instance.close(), duration);
  }

  return instance;
}

function removeMessage(instance: MessageInstance) {
  const idx = messages.indexOf(instance);
  if (idx !== -1) {
    messages.splice(idx, 1);
    // 添加消失动画
    instance.el.classList.remove("show");
    instance.el.classList.add("hide");
    instance.el.addEventListener(
      "animationend",
      () => {
        instance.el.remove();
      },
      { once: true }
    );
  }
}

function getContainer() {
  let container = document.querySelector(".vapor-messages");
  if (!container) {
    container = document.createElement("div");
    container.className = "vapor-messages";
    const containerDiv = container as HTMLDivElement;
    Object.assign(containerDiv.style, {
      position: "fixed",
      top: "2rem",
      left: "0",
      right: "0",
      zIndex: "9999",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-end",
      pointerEvents: "none",
      justifyContent: "flex-end",
    });
    document.body.appendChild(containerDiv);
    injectMessageStyles();
  }
  return container as HTMLDivElement;
}

// 注入CSS动画
function injectMessageStyles() {
  if (document.getElementById("vapor-message-style")) return;
  const style = document.createElement("style");
  style.id = "vapor-message-style";
  style.textContent = `
.vapor-messages {}
.message-toast {
  opacity: 0;
  transform: translateX(100%) scale(0); 
  transform-origin: left;
  transition: transform cubic-bezier(0.4, 1.5, 0.5, 1) 0.5s, opacity 0.35s;
  animation: vapor-fadein 0.35s forwards;
}
.message-toast.closeable { padding-right: 2.5rem; }
.message-toast .close-btn {
  position:absolute;
  right:1em;
  cursor: pointer;
  color: #888;
  font-size: 0.9em;
  border: none;
  background: none;
}
.message-toast.show {
  opacity: 1;
  transform: translateX(0);
}
.message-toast.hide {
  animation: vapor-fadeout 0.35s forwards;
}
@keyframes vapor-fadein {
  from { opacity: 0; transform: translateX(100%) scale(0); }
  to { opacity: 1; transform: translateX(0) scale(1); }
}
@keyframes vapor-fadeout {
  from { opacity: 1; transform: translateX(0) scale(1); }
  to { opacity: 0; transform: translateX(100%) scale(0); }
}
`;
  document.head.appendChild(style);
}

// 主API对象
const Message: any = (options: MessageOptions) => createMessage(options);

messageTypes.forEach((type) => {
  Message[type] = (content: string | string[], duration?: number) =>
    createMessage({ type, content, duration, closeable: false });
});

// 允许手动传 closeable
Message.show = (content: string | string[], type: MessageType = "info", duration?: number, closeable = false) =>
  createMessage({ type, content, duration, closeable });

// 组件渲染函数（可选，返回所有消息的DOM节点）
function MessageComponent() {
  return document.querySelector(".vapor-messages");
}

// 导出 useMessage
export function useMessage() {
  return { Message, MessageComponent };
}

// 可选：自动挂载到 window.main
if (typeof window !== "undefined") {
  const _window = window as any;
  _window.main = _window.main || {};
  _window.main.Message = Message;
}
