<div align="center">
    <h1 align="center">Halo Theme Vapor-Gridfriend</h1>
    <p align="center" style="text-align: center;">
        <a href="https://www.halo.run/store/apps/app-ot0zaok6?tab=readme"><img alt="Halo App Store" src="https://img.shields.io/badge/Halo-%E5%BA%94%E7%94%A8%E5%B8%82%E5%9C%BA-%230A81F5?style=flat-square&logo=appstore&logoColor=%23fff" /></a>
        <a href="https://github.com/iscottt/halo-theme-vapor/releases"><img alt="GitHub Release" src="https://img.shields.io/github/v/release/iscottt/halo-theme-vapor?style=flat-square&logo=github" /></a>
        <a href="./LICENSE"><img alt="GitHub License" src="https://img.shields.io/github/license/iscottt/halo-theme-vapor?style=flat-square" /></a>
    </p>
    <a href="https://halo.scott-studio.cn" target="_blank" rel="noopener noreferrer">
        <img src="https://github.com/user-attachments/assets/3844b1fe-0967-4dc6-862a-99d0dbaac9df" alt="icon"/>
    </a>
    <br />
</div>

## 🎊 声明

Vapor-Gridfriend 是一个简约风格的博客主题

- 主题移植于： <a href="https://cali.so">Cali 的个人博客网站</a>
- 代码仓库：[Cali 的 Github](https://github.com/CaliCastle/cali.so)

## 🔥 预览

| 站点名称 | 站点地址                     |
| :------: | :--------------------------- |
| 三禾木木 | https://halo.scott-studio.cn |

## 📖 主题使用文档

- [木木笔记](http://localhost:3000/docs/vapor/guide/)

## 🔌 插件依赖

- THYUU 区块 [plugin-thyuu-embed](https://www.halo.run/store/apps/app-lKYuv)
- 友链自助提交 [link-submit](https://www.halo.run/store/apps/app-glejqzwk)
- 链接管理 [plugin-links](https://www.halo.run/store/apps/app-hfbQg)

> 更多插件请参见：https://github.com/halo-sigs/awesome-halo

## 💬 讨论

如果你对主题有什么建议或者意见，欢迎提 PR & issue。

- QQ: 2406177615 (添加请备注来意)

### 🏭 贡献

> 如果你想帮助完善 `stack` 主题，请：

- 点 `star`
- 提 `issue`
- 修 `bugs`
- 推 `pr`

## 💰 赞助

**如果 Halo-theme-vapor-gridfriend 主题对你有帮助，欢迎赞助相关开发者**

- 三禾木木 [爱发电赞助](https://afdian.com/a/scottstudio)

## 🛠️ 构建说明

### 构建命令

```bash
# 安装依赖
pnpm install

# 开发模式（监听文件变化）
pnpm dev

# 生产构建
pnpm build
```

### 构建输出

- 构建完成后会在 `dist` 目录生成主题包：`halo-theme-vapor-1.0.9.zip`
- 主题包大小约：2.20 MB
- 包含压缩后的 CSS 和 JS 文件，优化加载性能

## 📝 更新日志

### v1.0.9-gridfriend (最新)

- 🎨 **样式优化**：修复 header 中后台入口图标样式不统一问题
- 🔧 **图标更新**：将后台入口从用户头像改为设置图标（icon-setting）
- 💄 **界面统一**：后台入口按钮样式与搜索、主题切换按钮保持一致
- ♿ **可访问性**：添加 aria-label 属性，提升无障碍访问体验
- 🎨 主题更名：将原 "Vapor" 主题更名为 "Vapor-Gridfriend"
- 📝 更新所有配置文件中的主题名称和描述信息
- 🔧 保持原有功能和样式不变，仅进行名称区分
- 🎬 **新增视频模板**：添加专门的视频内容自定义模板
  - 去除封面图片展示，更适合视频内容
  - 移除右侧文章目录区域，提供更宽的内容展示空间
  - 主内容区域宽度撑满页面，优化视频观看体验
  - 在文章编辑时可选择"视频"模板类型
- 新增视频分类模板功能：
  - 创建专用的 video-card 组件
  - 实现图片+标题+标签+日期的卡片布局
  - 鼠标悬停显示半透明播放按钮
  - 优化视频内容的视觉展示效果
