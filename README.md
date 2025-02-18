# DeepSeekRender 🚀

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yanghao/deepseekrender)

**DeepSeekRender** 是一个基于 Next.js 的现代化渲染引擎，专注于高效、可扩展的 Web 应用开发。通过结合 Cloudflare 的全球 CDN 和 Vercel 的无服务器部署，提供极致的性能和用户体验。

## 功能特性 ✨

- **多种渲染模式**：支持静态生成（SSG）、服务器端渲染（SSR）和增量静态再生（ISR）。
- **高性能**：通过 Cloudflare CDN 加速全球访问。
- **无缝部署**：使用 Vercel 实现自动化部署和 CI/CD。
- **现代化技术栈**：基于 Next.js、React 和 Tailwind CSS。
- **SEO 友好**：自动生成优化的元标签和结构化数据。

## 快速开始 🚀

### 1. 环境要求

- Node.js 18.0 或更高版本
- npm 或 yarn 包管理器

### 2. 克隆仓库

```bash
git clone https://github.com/yahao333/deepseekrender.git
cd deepseekrender
```

### 3. 安装依赖

```bash
npm install
# 或者使用 yarn
yarn install
```

### 4. 开发环境运行

```bash
npm run dev
# 或者使用 yarn
yarn dev
```

### 5. 构建生产版本

```bash
npm run build
npm run start
# 或者使用 yarn
yarn build
yarn start
```

## 项目结构 📁

```
deepseekrender/
├── app/                 # Next.js 14 应用目录
│   ├── layout.tsx      # 根布局组件
│   ├── page.tsx        # 首页组件
│   └── ...
├── components/         # 可复用组件
├── public/            # 静态资源
├── styles/           # 全局样式
└── types/            # TypeScript 类型定义
```

## 开发指南 📖

1. **页面创建**：
   - 在 `app` 目录下创建新的目录即可自动生成路由
   - 使用 `page.tsx` 作为页面入口文件

2. **组件开发**：
   - 默认使用服务器组件（Server Components）
   - 需要客户端交互时，添加 'use client' 指令

3. **样式编写**：
   - 使用 Tailwind CSS 进行样式开发
   - 可在 `styles` 目录下扩展全局样式

## 部署说明 🌐

1. **Vercel 部署**：
   - fork 本仓库
   - 在 Vercel 中导入项目
   - 自动完成部署

2. **自定义部署**：
   - 构建项目：`npm run build`
   - 启动服务：`npm run start`

## 贡献指南 🤝

欢迎提交 Pull Request 或创建 Issue！

## 许可证 📄

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件

## 主页功能

- 首页
- 文档

首页，实现渲染markdown文档，并实现图片导出
文档，介绍当前网站功能