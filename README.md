# ST2EAM 摄影作品集

基于 React + TypeScript + Material UI 构建的个人摄影作品集网站，部署于 GitHub Pages。

## 功能

- 瀑布流布局展示摄影作品
- 按分类筛选作品
- 点击查看大图
- 技术笔记（集成外部笔记站点）
- 个人介绍与联系方式
- 响应式设计，适配移动端

## 技术栈

- **框架**: React 18 + TypeScript
- **UI 库**: Material UI v5
- **样式**: Less + CSS Modules
- **路由**: React Router v6
- **瀑布流**: react-masonry-css
- **构建**: Create React App + Craco
- **字体**: Outfit + Noto Sans SC + JetBrains Mono

## 项目结构

```
src/
├── components/
│   ├── Navbar/              # 导航栏
│   ├── Footer/              # 页脚
│   └── MasonryGallery/      # 瀑布流画廊
├── pages/
│   ├── Home/                # 首页 - 摄影作品展示
│   ├── Notes/               # 技术笔记
│   └── About/               # 关于页面
├── styles/
│   ├── global.less          # 全局变量和样式
│   └── App.less             # App 布局样式
└── App.tsx                  # 路由配置
```

## 本地开发

```bash
npm install
npm start
```

## 构建部署

```bash
npm run build:docs
```

构建产物输出到 `docs/` 目录，用于 GitHub Pages 部署。

## 自定义

### 更新摄影作品

在 `src/pages/Home/index.tsx` 中替换 `generateRandomPhotos` 为你的真实摄影作品数据。

### 更新个人信息

在 `src/pages/About/index.tsx` 中修改个人介绍、技能和器材列表。

## License

MIT
