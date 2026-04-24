# ST2EAM 摄影作品集

基于 React + TypeScript + Material UI 构建的个人摄影作品集网站，采用 Dribbble 风格设计，部署于 GitHub Pages。

## 功能

- 瀑布流 / 时间轴双模式展示摄影作品
- 按标签筛选作品分类
- 灯箱查看大图 + 查看原图按钮
- EXIF 拍摄参数自动提取展示（相机、镜头、光圈、快门、ISO、日期）
- 图片自动压缩，预览加载缩略图
- 增量同步脚本，照片丢进目录即可管理
- 技术笔记（集成外部笔记站点）
- 个人介绍与联系方式
- 响应式设计，适配移动端

## 技术栈

| 分类 | 技术 | 说明 |
|------|------|------|
| 框架 | React 18 + TypeScript 4.9 | 函数组件 + Hooks |
| UI 库 | Material UI v5 + Emotion | 主题系统、响应式组件 |
| 样式 | Less + CSS Modules | 组件级隔离 + 全局设计变量 |
| 路由 | React Router v6 | `BrowserRouter` + `Routes` |
| 瀑布流 | react-masonry-css | 响应式瀑布流布局 |
| 图片处理 | sharp + exifr | 压缩（仅开发时）+ EXIF 提取 |
| 构建 | Create React App + CRACO | 自定义 Webpack/Less 配置 |
| 部署 | GitHub Actions → GitHub Pages | 自动 CI/CD |
| 字体 | Playfair Display + DM Sans + Space Mono | Google Fonts |

## 架构概览

```
┌─────────────────────────────────────────────────────────────┐
│                        GitHub Pages                         │
│                     (静态托管 docs/)                         │
└────────────────────────────┬────────────────────────────────┘
                             │ deploy
┌────────────────────────────┴────────────────────────────────┐
│                    GitHub Actions CI/CD                      │
│              .github/workflows/deploy.yml                   │
│         npm install → npm run build → upload docs/          │
└────────────────────────────┬────────────────────────────────┘
                             │ build (CRACO → docs/)
┌────────────────────────────┴────────────────────────────────┐
│                     React SPA 应用层                         │
│                                                             │
│  index.tsx ─── ThemeProvider + BrowserRouter                 │
│      └── App.tsx ─── Navbar + Routes + Footer               │
│              ├── /        → Home (画廊)                      │
│              ├── /notes   → Notes (iframe 嵌入)              │
│              └── /about   → About (个人介绍)                 │
│                                                             │
│  ┌─────────────┐  ┌──────────────┐  ┌────────────────┐     │
│  │MasonryGallery│  │TimelineGallery│  │ PhotoLightbox  │     │
│  │  瀑布流模式  │  │  时间轴模式   │  │   灯箱大图     │     │
│  └──────┬──────┘  └──────┬───────┘  └────────────────┘     │
│         │                │                                   │
│         └────────┬───────┘                                   │
│                  ▼                                           │
│          config/photos.ts (照片数据源)                        │
└─────────────────────────────────────────────────────────────┘
                             ▲ 自动生成
┌────────────────────────────┴────────────────────────────────┐
│                     照片处理管线                              │
│                                                             │
│  public/photos/*.jpg                                        │
│      │                                                      │
│      ├─ compress-photos.js ──→ public/photos/thumbnails/    │
│      │   (sharp: 长边 1200px, JPEG q82)                     │
│      │                                                      │
│      └─ sync-photos.js ─────→ src/config/photos.ts          │
│          (exifr: EXIF 提取, 增量合并 alt/tags)               │
└─────────────────────────────────────────────────────────────┘
```

## 项目结构

```
st2eam.github.io/
├── .github/workflows/
│   └── deploy.yml               # CI/CD：push master → build → deploy Pages
├── scripts/
│   ├── compress-photos.js       # 图片压缩（sharp，增量跳过已有缩略图）
│   └── sync-photos.js           # 照片配置同步（EXIF + 标签推测 + 增量合并）
├── public/
│   ├── index.html               # HTML 入口（Google Fonts CDN）
│   ├── manifest.json            # PWA 清单
│   └── photos/                  # 原始照片目录（未纳入 Git）
│       └── thumbnails/          # 压缩缩略图（自动生成）
├── src/
│   ├── index.tsx                # 应用入口：MUI 主题 + BrowserRouter
│   ├── App.tsx                  # 布局骨架：Navbar + Routes + Footer
│   ├── react-app-env.d.ts       # CRA 类型声明 + Less/masonry 模块声明
│   ├── config/
│   │   └── photos.ts            # 照片数据（sync-photos.js 自动生成）
│   ├── components/
│   │   ├── Navbar/              # 毛玻璃悬浮导航（滚动变色 + 移动端 Drawer）
│   │   ├── Footer/              # 极简页脚（品牌 + 快捷链接 + 社交）
│   │   ├── MasonryGallery/      # 瀑布流画廊（懒加载 + Skeleton + 灯箱）
│   │   ├── TimelineGallery/     # 时间轴画廊（按拍摄日期分组 + ScrollReveal）
│   │   ├── PhotoLightbox/       # 灯箱组件（MUI Dialog + EXIF 参数展示）
│   │   └── ScrollReveal/        # 滚动渐入动画（IntersectionObserver）
│   ├── pages/
│   │   ├── Home/                # 首页：Hero + 分类筛选 + 瀑布流/时间轴切换
│   │   ├── Notes/               # 技术笔记：iframe 嵌入外部笔记站
│   │   ├── About/               # 关于：技能/器材/理念 + ScrollReveal
│   │   └── Projects/            # 项目展示（已实现，未挂载路由）
│   ├── styles/
│   │   ├── global.less          # 设计系统：色板/阴影/圆角/字体/响应式断点/Glass Mixin
│   │   └── App.less             # 布局样式
│   └── types/
│       └── global.d.ts          # 全局类型（预留）
├── craco.config.js              # CRACO：Less 插件 + Webpack 别名 + 输出到 docs/
├── tsconfig.json                # TS 配置：strict + 路径别名
├── package.json                 # 依赖 + 脚本
└── README.md
```

## 组件关系

### 渲染树

```
index.tsx
└── ThemeProvider (MUI 主题)
    └── BrowserRouter
        └── App
            ├── Navbar                    # 固定顶部，导航链接
            ├── main.main-content
            │   └── Routes
            │       ├── / → Home
            │       │   ├── Hero 区域（动态光球背景）
            │       │   ├── 分类筛选 Chips
            │       │   ├── 视图切换按钮（瀑布流 / 时间轴）
            │       │   ├── MasonryGallery ──→ PhotoLightbox
            │       │   └── TimelineGallery
            │       │       ├── ScrollReveal (每个日期分组)
            │       │       └── PhotoLightbox
            │       ├── /notes → Notes (iframe)
            │       └── /about → About
            │           └── ScrollReveal (各内容区块)
            └── Footer
```

### 数据流

```
photos.ts (数据源)
    │
    ▼
Home (筛选 category → 过滤 photos[])
    │
    ├──→ MasonryGallery (photos[], onImageClick)
    │        └── PhotoLightbox (selectedPhoto, exif)
    │
    └──→ TimelineGallery (photos[], grouped by exif.date)
             └── PhotoLightbox (selectedPhoto, exif)
```

- 照片无数据时，`Home` 自动使用 Picsum 占位图
- 组件间通过 props 传递数据，无全局状态管理
- `PhotoLightbox` 由父组件控制打开/关闭状态

## 设计系统

### 调色板

| 变量 | 色值 | 用途 |
|------|------|------|
| `@bg` | `#f8f6f2` | 页面背景（暖灰） |
| `@bg-hero` | `#1a1a2e` | Hero 深色背景 |
| `@accent` | `#b09472` | 主强调色（哑金） |
| `@accent-light` | `#c8ae8e` | 浅强调色 |
| `@accent-dark` | `#8a7458` | 深强调色 |
| `@surface` | `rgba(255,255,255,0.55)` | 毛玻璃表面 |
| `@text` | `#1a1a1a` | 主文本 |
| `@text-secondary` | `#6e6e73` | 次要文本 |

### 排版

- **Display 字体**: Playfair Display（标题 h1–h3）
- **Body 字体**: DM Sans（正文 + h4–h6）
- **Mono 字体**: Space Mono（代码/元信息）
- **中文回退**: PingFang SC / Microsoft YaHei / Songti SC

### 设计模式

- **Glassmorphism**: `.glass()` / `.glass-strong()` mixin，应用于 Navbar、卡片
- **圆角体系**: 20px / 12px / 8px / 9999px 四级
- **阴影体系**: xs → sm → default → lg → glow 五级
- **动画曲线**: `ease-out-expo` / `ease-out-quart`
- **响应式断点**: mobile ≤768px / tablet ≤1024px / desktop >1024px

## 路由配置

| 路径 | 页面 | 导航显示 | 说明 |
|------|------|----------|------|
| `/` | Home | 作品 | 画廊主页，瀑布流/时间轴切换 |
| `/notes` | Notes | 笔记 | iframe 嵌入 `st2eam.github.io/notes/Web/` |
| `/about` | About | 关于 | 个人介绍、技能、器材 |
| — | Projects | 未挂载 | 已实现但未注册路由和导航 |

## 构建与部署

### 构建流程

```
npm run build
    └── craco build
        ├── TypeScript 编译
        ├── Less → CSS（CSS Modules）
        ├── Webpack 打包
        └── 输出到 docs/ 目录
```

### CI/CD 流程

```
push master / workflow_dispatch
    └── GitHub Actions (ubuntu-latest, Node 20)
        ├── npm install --registry=https://registry.npmjs.org
        ├── npm run build (CI=false 跳过警告)
        └── deploy-pages → GitHub Pages
```

### 路径别名

在 `tsconfig.json` 和 `craco.config.js` 中同步配置：

| 别名 | 映射目录 |
|------|----------|
| `@/*` | `src/*` |
| `@/components/*` | `src/components/*` |
| `@/pages/*` | `src/pages/*` |
| `@/styles/*` | `src/styles/*` |
| `@/utils/*` | `src/utils/*` |
| `@/hooks/*` | `src/hooks/*` |
| `@/types/*` | `src/types/*` |

> 注：`src/utils/` 和 `src/hooks/` 目录目前不存在，别名已预留。

## 照片管理

### 添加照片

1. 将照片放入 `public/photos/` 目录（支持子目录分类）
2. 运行一键命令：

```bash
npm run photos
```

脚本会自动完成：
- 压缩图片生成缩略图（长边 1200px，JPEG 质量 82，体积减少 95%+）
- 读取 EXIF 元信息（相机型号、镜头、光圈、快门、ISO、拍摄日期）
- 增量更新 `src/config/photos.ts` 配置文件

3. 编辑 `src/config/photos.ts` 自定义照片的 `alt`（标题）和 `tags`（标签）
4. 再次运行 `npm run photos` 不会覆盖你的手动编辑

### 单独执行

```bash
npm run photos:compress  # 仅压缩图片
npm run photos:sync      # 仅同步配置
```

### 照片处理管线

```
public/photos/风景/001.jpg (原图)
    │
    ├─ compress-photos.js
    │   ├── 检查 thumbnails/ 是否已有且更新
    │   ├── sharp: resize 长边 1200px, JPEG quality 82
    │   └── 输出 → public/photos/thumbnails/风景/001.jpg
    │
    └─ sync-photos.js
        ├── 扫描所有图片文件
        ├── exifr 提取 EXIF 元信息
        ├── 根据目录名/文件名推测标签
        ├── 与已有 photos.ts 增量合并（保留手动编辑）
        └── 输出 → src/config/photos.ts
```

### 标签自动推测

脚本会根据子目录名和文件名中的关键词自动推测标签：

- `photos/风景/001.jpg` → `tags: ['风景']`
- `城市_sunset.jpg` → `tags: ['城市']`

支持的关键词：城市、风景、人像、建筑、街头、自然、抽象、黑白

### 更新个人信息

在 `src/pages/About/index.tsx` 中修改个人介绍、技能和器材列表。

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

## License

MIT
