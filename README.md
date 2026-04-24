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

- **框架**: React 18 + TypeScript
- **UI 库**: Material UI v5
- **样式**: Less + CSS Modules
- **路由**: React Router v6
- **瀑布流**: react-masonry-css
- **图片处理**: sharp（压缩）+ exifr（EXIF 提取）
- **构建**: Create React App + CRACO
- **字体**: Playfair Display + DM Sans + Space Mono

## 项目结构

```
src/
├── components/
│   ├── Navbar/              # 毛玻璃悬浮导航
│   ├── Footer/              # 极简页脚
│   ├── MasonryGallery/      # 瀑布流画廊
│   ├── TimelineGallery/     # 时间轴画廊
│   ├── PhotoLightbox/       # 灯箱组件（共享）
│   └── ScrollReveal/        # 滚动渐入动画
├── config/
│   └── photos.ts            # 照片配置（自动生成）
├── pages/
│   ├── Home/                # 首页 - 作品展示
│   ├── Notes/               # 技术笔记
│   └── About/               # 关于页面
├── styles/
│   ├── global.less          # 设计系统变量
│   └── App.less             # 布局样式
└── App.tsx                  # 路由配置

scripts/
├── compress-photos.js       # 图片压缩脚本
└── sync-photos.js           # 配置增量同步脚本

public/
└── photos/                  # 原始照片目录
    └── thumbnails/          # 压缩缩略图（自动生成）
```

## 本地开发

```bash
npm install
npm start
```

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

### 标签自动推测

脚本会根据子目录名和文件名中的关键词自动推测标签：

- `photos/风景/001.jpg` → `tags: ['风景']`
- `城市_sunset.jpg` → `tags: ['城市']`

支持的关键词：城市、风景、人像、建筑、街头、自然、抽象、黑白

### 更新个人信息

在 `src/pages/About/index.tsx` 中修改个人介绍、技能和器材列表。

## 构建部署

```bash
npm run build:docs
```

构建产物输出到 `docs/` 目录，用于 GitHub Pages 部署。

## License

MIT
