# ST2EAM WEBSITE

一个使用 React + TypeScript + Material UI + Less 构建的个人摄影作品集网站。

## 特性

- 🎨 现代化的响应式设计
- 📱 移动端友好的界面
- 🖼️ 瀑布流布局展示摄影作品
- 🎯 Material UI 组件库
- 💫 流畅的动画效果
- 📝 笔记分享功能
- 👤 个人介绍页面

## 技术栈

- **前端框架**: React 18
- **类型系统**: TypeScript
- **样式方案**: Less + Material UI
- **路由管理**: React Router
- **瀑布流**: react-masonry-css
- **构建工具**: Create React App + Craco

## 项目结构

```
src/
├── components/           # 公共组件
│   ├── Navbar/          # 导航栏组件
│   └── MasonryGallery/  # 瀑布流画廊组件
├── pages/               # 页面组件
│   ├── Home/           # 主页
│   ├── Notes/          # 笔记页面
│   └── About/          # 关于页面
├── styles/             # 全局样式
│   ├── global.less     # 全局变量和通用样式
│   └── App.less        # App 组件样式
└── App.tsx             # 根组件
```

## 快速开始

1. 安装依赖
```bash
npm install
```

2. 启动开发服务器
```bash
npm start
```

3. 构建生产版本
```bash
npm run build
```

## 自定义配置

### 更新摄影作品

在 `src/pages/Home/Home.tsx` 中更新 `mockPhotos` 数组，添加你的摄影作品：

```typescript
const mockPhotos = [
  {
    id: '1',
    src: '你的图片URL',
    alt: '图片描述',
    width: 400,
    height: 600,
    category: '分类名称',
  },
  // ... 更多作品
];
```

### 自定义主题

在 `src/index.tsx` 中修改 Material UI 主题配置：

```typescript
const theme = createTheme({
  palette: {
    primary: {
      main: '#你的主色调',
    },
    // ... 其他配置
  },
});
```

### 更新个人信息

在 `src/pages/About/About.tsx` 中更新个人信息、技能和设备列表。

## 响应式设计

项目采用移动优先的响应式设计：

- **手机端**: < 768px
- **平板端**: 768px - 1024px  
- **桌面端**: > 1024px

瀑布流在不同屏幕尺寸下会自动调整列数：
- 桌面端：4列
- 大屏平板：3列
- 小屏平板：2列
- 手机端：1列

## 部署

这个项目可以部署到任何静态托管服务，如 GitHub Pages、Netlify、Vercel 等。

```bash
npm run build
```

将 `build` 文件夹的内容上传到你的托管服务即可。

## License

MIT
