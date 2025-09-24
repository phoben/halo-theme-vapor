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
- 朋友圈插件 [plugin-friends](https://docs.kunkunyu.com/docs/plugin-friends/finder-api) - 用于新闻咨询功能

> 更多插件请参见：https://github.com/halo-sigs/awesome-halo

## 朋友圈插件

### 插件依赖

- [朋友圈插件](https://www.halo.run/store/apps/app-yISsV) - 用于获取和管理朋友圈数据

### 功能特性

- **新闻咨询展示**：基于朋友圈插件的 Finder API 实现新闻资讯的展示
- **暗黑/明亮模式支持**：完美适配主题的暗黑和明亮模式切换
- **响应式设计**：支持桌面端和移动端的自适应布局
- **分页功能**：每页显示10条记录，支持完整的分页导航
- **优化的用户体验**：
  - 自然的列表间距和视觉分隔
  - 适中的LOGO尺寸
  - 文字截断处理，避免内容溢出
  - 悬停效果和过渡动画
  - 加载状态和空状态处理

### 使用方法

1. 安装并启用朋友圈插件
2. 访问 `/friends` 路径查看新闻咨询页面
3. 支持通过 URL 参数进行分页浏览：`/friends?page=2`
4. 支持按链接名称筛选（如果插件支持）

### 模板文件

- 模板路径：`/templates/friends.html`
- 访问路径：`/friends`

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

### 开发环境设置

### 前置要求

- Node.js 16+
- pnpm 包管理器

### 安装依赖

```bash
pnpm install
```

### 开发脚本

```bash
# 代码格式化
pnpm run format

# 检查代码格式
pnpm run format:check

# 代码检查和修复
pnpm run lint:fix

# 构建样式
pnpm run build
```

## 📋 开发流程

### 1. 代码规范

项目使用 Prettier 进行代码格式化，配置文件为 `.prettierrc`：

```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 80
}
```

### 2. 提交规范

项目使用 Conventional Commits 规范：

- `feat:` 新功能
- `fix:` 修复问题
- `docs:` 文档更新
- `style:` 样式调整
- `refactor:` 代码重构
- `test:` 测试相关
- `chore:` 构建过程或辅助工具的变动

### 3. 开发工作流

1. **创建功能分支**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **开发和测试**
   ```bash
   # 格式化代码
   pnpm run format
   
   # 构建样式
   pnpm run build
   ```

3. **提交代码**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

4. **推送和合并**
   ```bash
   git push origin feature/your-feature-name
   ```

## 🎨 样式开发

### 样式结构

- 主样式文件：`src/main.less`
- 构建输出：`assets/dist/style.css`
- 样式加载：通过 `templates/layout.html` 中的 `head.html` 加载

### 构建命令

```bash
# 开发模式构建
pnpm run dev

# 生产模式构建
pnpm run build

# 监听模式
pnpm run watch
```

## 📄 模板开发

### 模板结构

```
templates/
├── layout.html          # 主布局模板
├── index.html           # 首页模板
├── post.html            # 文章页模板
├── post_video.html      # 视频文章模板
├── category_*.html      # 分类页面模板
└── modules/             # 组件模块
    ├── case-card.html
    ├── list-card.html
    ├── notes-card.html
    └── video-card.html
```

### 模板开发指南

1. **遵循 Halo 模板规范**
   - 使用 Thymeleaf 模板引擎
   - 正确使用 Halo 提供的数据模型

2. **保持样式一致性**
   - 使用现有的 CSS 类名
   - 遵循响应式设计原则

3. **组件化开发**
   - 将可复用的部分提取为组件
   - 使用 `th:replace` 引入组件

## 🚀 部署说明

1. **构建主题**
   ```bash
   pnpm run build
   ```

2. **打包主题**
   ```bash
   zip -r vapor-gridfriend.zip . -x "node_modules/*" "src/*" ".git/*"
   ```

3. **上传到 Halo**
   - 登录 Halo 管理后台
   - 进入主题管理
   - 上传主题包
   - 启用主题

## 🤝 贡献指南

1. Fork 本仓库
2. 创建功能分支
3. 提交更改
4. 推送到分支
5. 创建 Pull Request

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
