# 项目说明

## 项目介绍

该项目是一个基于 Halo 博客系统的主题，主题名称为 Vapor-Gridfriend。
Halo 主题开发文档地址：https://docs.halo.run/category/%E4%B8%BB%E9%A2%98%E5%BC%80%E5%8F%91

## 项目需求

- 你需要根据用户要求，对主题进行优化和改造，最终生成一个基于 Vapor-Gridfriend 的新主题，用于 Halo 中。
- 要严格基于现有主题的样式、风格进行改造，保持风格的高度一致性；
- 要严格遵循 Halo 的主题开发文档进行开发，确保相关数据正确获取、渲染；

## 注意事项

- 善于使用`context7`工具来获取 Halo 最新的开发文档知识；
- CSS 加载机制 ：Halo 主题通过 `head.html` 加载样式，主要的样式文件是 /assets/dist/style.css
- 样式构建过程 ：主题使用 `main.less` 作为主样式文件，通过构建工具编译到 dist/style.css
- 内联样式问题 ：在 HTML 模板中直接写 <style> 标签确实可能不会被正确处理，因为 Halo 有自己的模板渲染机制
