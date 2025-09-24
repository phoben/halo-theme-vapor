export function replaceLinksInElement(container: HTMLElement | null) {
  if (!container) {
    console.warn("replaceLinksInElement: container is null or undefined");
    return;
  }

  // 转义HTML函数，防止XSS攻击
  const escapeHtml = (unsafe: string) => {
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  };

  /**
   * 检测链接协议类型并返回相应的图标HTML
   * @param href 链接地址
   * @returns 图标HTML字符串
   */
  const getIconForLink = (href: string): string => {
    try {
      const url = new URL(href);
      const protocol = url.protocol.toLowerCase();
      
      // HTTP/HTTPS 协议使用favicon
      if (protocol === 'http:' || protocol === 'https:') {
        const domain = url.hostname;
        return `<img alt="" aria-hidden="true" loading="lazy" width="16" height="16"
                     decoding="async" data-nimg="1" class="inline h-4 w-4 rounded"
                     src="https://cali.so/api/favicon?url=${escapeHtml(domain)}"
                     style="color: transparent">`;
      }
      
      // 邮箱协议使用邮箱图标
      if (protocol === 'mailto:') {
        return `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="inline h-4 w-4" aria-hidden="true">
                  <path d="M4 7L10.94 11.3375C11.5885 11.7428 12.4115 11.7428 13.06 11.3375L20 7M5 18H19C20.1046 18 21 17.1046 21 16V8C21 6.89543 20.1046 6 19 6H5C3.89543 6 3 6.89543 3 8V16C3 17.1046 3.89543 18 5 18Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>`;
      }
      
      // 电话协议使用电话图标
      if (protocol === 'tel:') {
        return `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="inline h-4 w-4" aria-hidden="true">
                  <path d="M22 16.92V19.92C22.0011 20.1985 21.9441 20.4742 21.8325 20.7293C21.7209 20.9845 21.5573 21.2136 21.3521 21.4019C21.1468 21.5901 20.9046 21.7335 20.6407 21.8227C20.3769 21.9119 20.0974 21.9451 19.82 21.92C16.7428 21.5856 13.787 20.5341 11.19 18.85C8.77382 17.3147 6.72533 15.2662 5.18999 12.85C3.49997 10.2412 2.44824 7.27099 2.11999 4.18C2.095 3.90347 2.12787 3.62476 2.21649 3.36162C2.30512 3.09849 2.44756 2.85669 2.63476 2.65162C2.82196 2.44655 3.0498 2.28271 3.30379 2.17052C3.55777 2.05833 3.83233 2.00026 4.10999 2H7.10999C7.59531 1.99522 8.06579 2.16708 8.43376 2.48353C8.80173 2.79999 9.04207 3.23945 9.10999 3.72C9.23662 4.68007 9.47144 5.62273 9.80999 6.53C9.94454 6.88792 9.97366 7.27691 9.8939 7.65088C9.81415 8.02485 9.62886 8.36811 9.35999 8.64L8.08999 9.91C9.51355 12.4135 11.5865 14.4864 14.09 15.91L15.36 14.64C15.6319 14.3711 15.9751 14.1858 16.3491 14.1061C16.7231 14.0263 17.1121 14.0555 17.47 14.19C18.3773 14.5286 19.3199 14.7634 20.28 14.89C20.7658 14.9585 21.2094 15.2032 21.5265 15.5775C21.8437 15.9518 22.0122 16.4296 22 16.92Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>`;
      }
      
      // 其他协议使用通用链接图标
      return `<span class="inline h-4 w-4 text-base leading-none" aria-hidden="true">🔗</span>`;
      
    } catch (error) {
      // 如果URL解析失败，使用通用链接图标
      return `<span class="inline h-4 w-4 text-base leading-none" aria-hidden="true">🔗</span>`;
    }
  };

  // 获取容器内所有a标签
  const links = container.querySelectorAll("a");
  if (!links || links.length === 0) {
    return;
  }
  
  links.forEach((link) => {
    try {
      const href = link.href;
      const target = link.getAttribute("target") || "";
      const text = link.textContent?.trim() || "";
      const className = link.getAttribute("class") || "";
      
      // 跳过标记为不替换的链接
      if (className.includes("dont-replace")) return;
      
      // 跳过空链接或无效链接
      if (!href || href === "#" || href === "javascript:void(0)") {
        return;
      }

      // 获取适合的图标
      const iconHTML = getIconForLink(href);

      // 创建新链接的HTML结构
      const newLinkHTML = `
<a class="inline-flex place-items-baseline items-baseline gap-0.5 px-0.5 text-[0.95em] leading-none font-semibold hover:underline"
   rel="noopener noreferrer" 
   target="${target}" 
   href="${escapeHtml(href)}">
  <span class="inline-flex translate-y-0.5">
    ${iconHTML}
  </span>
  ${escapeHtml(text)}
  <svg width="0.95em" height="0.95em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="inline-block translate-y-0.5" aria-hidden="true"><path d="M20 13.5001C20 14.8946 20 15.5919 19.8618 16.1673C19.4229 17.9956 17.9955 19.423 16.1672 19.8619C15.5918 20.0001 14.8945 20.0001 13.5 20.0001H12C9.19974 20.0001 7.79961 20.0001 6.73005 19.4551C5.78924 18.9758 5.02433 18.2109 4.54497 17.2701C4 16.2005 4 14.8004 4 12.0001V11.5001C4 9.17035 4 8.0055 4.3806 7.08664C4.88807 5.8615 5.86144 4.88813 7.08658 4.38066C7.86344 4.05888 8.81614 4.00915 10.5 4.00146M19.7597 9.45455C20.0221 7.8217 20.0697 6.16984 19.9019 4.54138C19.8898 4.42328 19.838 4.31854 19.7597 4.24027M19.7597 4.24027C19.6815 4.16201 19.5767 4.11023 19.4586 4.09806C17.8302 3.93025 16.1783 3.97792 14.5455 4.24027M19.7597 4.24027L10 14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
</a>`;

      // 创建临时容器并插入新元素
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = newLinkHTML;
      const newLink = tempDiv.firstElementChild;

      if (newLink && link.parentNode) {
        // 替换原始链接
        link.parentNode.replaceChild(newLink, link);
      }
    } catch (error) {
      // 出错时保留原始链接
      console.warn("Error processing link:", error);
    }
  });
}
