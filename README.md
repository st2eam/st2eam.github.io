# Week-03 完成思路

## 目的

> 完成简化版的 `Dribbble` 首页，采用移动优先的方式，实现响应式设计。

- `task-375w.jpg`：此为页面宽度 `375px` 时的页面状态，顶部导航菜单折叠了起来，并且固定在顶部，内容区域采用单列布局。
- `task-menu-375w.jpg`：此为折叠菜单展开时的状态，出现一个遮罩遮住整个页面
- `task-768w.jpg`：此为页面宽度 `768px` 时的页面状态，导航菜单依旧是折叠的，下面的 banner 和内容区域变成了两列布局。
- `task-920w.jpg`：此为页面宽度 `920px` 时的页面状态，导航菜单平铺，并且不再固定在顶部，下方内容依然是两列布局
- `task-1366w.jpg`：此为页面宽度 `1366px` 时的页面状态，banner 和下方列表占据全部的水平空间，两侧留有固定的内边距。
- `task-1920w.jpg`：此为页面宽度 `1920px` 时的页面状态，banner 区域已经变成固定宽度，列表区域依然占据全部水平空间，两侧留有固定的内边距。
- `task-hover.jpg`：平铺的导航菜单鼠标悬停时有改变颜色。

## 代码设计

`html` 以及 `js` 部分比较简单，难的是 `css` 部分对每个元素在不同宽度下的细微调整

#### 始终移动优先设计

实现适配各客户端的响应式设计，从最小的视图开始，随着视口变得越来越大，增添布局内容

### 以 HTML 内容的顺序进行编写

参照 Dribbble 官网的布局，优先使用语义化标签，分为 header、main、footer 三个主要部分，减少标签的数量，使用 js 脚本生成重复的 html 代码。将多余的 CSS 代码进行整理，使代码整洁

#### header

在宽度为 `920px` 时,文字导航消失，最左边的汉堡菜单出现。

点击汉堡菜单，列表展开覆盖整个页面，使用`label`绑定`checkbox`可以实现切换的效果，将列表菜单高度设置为`100vh`可以覆盖整个界面，不需要使用`JavaScript` 脚本。

html 代码如下:

```html
<input type="checkbox" id="toggler"">
<!-- 汉堡菜单-->
<label class=" nav-menu-container" for="toggler">
  <div class="nav-menu"></div>
</label>
<!-- 菜单列表-->
<nav class="nav-page">...</nav>
```

css 代码如下:

```css
.nav-page {
  position: absolute;
  top: 60px; /* 与顶部导航栏的距离 */
  left: 0;
  height: 100vh; /*高度设置为整个页面大小 */
  width: 100%;
  z-index: 999; /*设置为整个窗口最上层 */
  background-color: #fff;
  transform: scaleY(0);
  transform-origin: 50% 0;
  opacity: 0;
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
}

#toggler:checked ~ .nav-page {
  opacity: 1;
  transform: scaleY(1);
}
```

#### main

1. 小于`1600px`时，使用响应式`grid`布局:

```css
grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
```

2.  简介中的元素

采用移动优先设计，使用 flex 布局，小于 920px 时，元素从上到下排列，当大于等于 920px 时，元素从右往左排列

3. 在 js 里面，经常需要使用 js 往页面中插入 html 内容。
   html 内容比较少的时候还好，但是当内容比较多时，会显得 js 比较复杂，十分的不方便。

​ 给`<script>`设置`type="text/template"`，标签里面的内容不会被执行，也不会显示在页面上，但是可以在另一个 script 里面通过获取插入到页面中。这样就把大段的 HTML 操作从 js 里面分离开了。

```html
<script type="text/template" id="temp">
  <div class="list-item">
    <img src="{{cover}}" class="cover">
    <div class="item-info">
      <div class="info-left">
        <img src="{{avatar}}" class="avatar">
        <span class="name">{{name}}</span>
        <span class="badge">{{badge}}</span>
      </div>
      <div class="info-right">
        <span class="likes-icon"></span>
        <span class="likes">{{likes}}</span>
        <span class="views-icon"></span>
        <span class="views">{{views}}</span>
      </div>
    </div>
  </div>
</script>
```

js 代码：

```js
window.onload = function () {
  var url = "data/task.json";
  var request = new XMLHttpRequest();
  request.open("get", url);
  request.send(null);
  request.onload = function () {
    if (request.status == 200) {
      var json = JSON.parse(request.responseText);
      console.log(json);
      let temp = document.getElementById("temp").innerHTML;
      let html = json
        .map((data) => {
          let result = temp
            .replace("{{cover}}", data.cover)
            .replace("{{avatar}}", data.avatar)
            .replace("{{name}}", data.name)
            .replace("{{badge}}", data.badge)
            .replace("{{likes}}", data.likes)
            .replace("{{views}}", data.views);
          return result;
        })
        .join("");
      document.querySelector(".main-list").innerHTML = html;
    }
  };
};
```

#### 媒体查询元素的变化对比

根据官网和给出的效果图列出大概的元素变化如下：

|   元素何时变化   |                                    宽度<`768px`                                     |                           宽度>`768px`                            |                      宽度>`920px`                       |              宽度>`1366px`              |                          宽度>`1600px`                          |
| :--------------: | :---------------------------------------------------------------------------------: | :---------------------------------------------------------------: | :-----------------------------------------------------: | :-------------------------------------: | :-------------------------------------------------------------: |
|      header      |                         ` position: fixed;``height:60px; `                          |                                                                   |           ` position: static;``height:80px; `           |                                         |                                                                 |
|     汉堡菜单     |                                                                                     |                                                                   |                    `display: none;`                     |                                         |                                                                 |
|   sign up 按钮   |                                                                                     |                                                                   |                   `display: inline;`                    |                                         |                                                                 |
|       main       |                                    `top: 60px;`                                     |                                                                   |                        `top: 0;`                        |                                         |                                                                 |
|    导航栏左部    |                ` flex-direction: column;`` justify-content: center;`                |                                                                   | ` flex-direction: row;`` justify-content: flex-start; ` |                                         |                                                                 |
|    导航栏右部    |                              `flex-direction: column;`                              |                                                                   |                 `flex-direction: row;`                  |                                         |                                                                 |
|     导航列表     |                                                                                     |                                                                   |                    `display: none;`                     |                                         |                                                                 |
|    简介的背景    |                                `padding: 40px 20px;`                                |                        `padding: 0 32px;`                         |                                                         |           `padding: 0 72px;`            |                                                                 |
|   简介内容盒子   |                ` flex-direction: column;``justify-content: center; `                | ` flex-direction: row-reverse;``justify-content: space-between; ` |                                                         |                                         |                       `margin: 0 120px;`                        |
|   简介中的文字   |      ` align-items: center;` `justify-content: center;` ` text-align: center;`      |                       `text-align: start;`                        |                                                         |                                         |                                                                 |
| 简介中的标题部分 |                       ` font-size: 24px;``line-height: 28px;`                       |              ` font-size: 32px;``line-height: 38px;`              |                                                         | ` font-size: 48px;``line-height: 56px;` |                                                                 |
|   简介中的图片   |                                   `width: 300px;`                                   |                          `width: 400px;`                          |                                                         |    ` height: auto;`` width: 510px;`     |                                                                 |
|   主要内容表格   | ` padding: 0 20px;``grid-template-columns: repeat(auto-fill, minmax(270px, 1fr)); ` |                        `padding: 0 36px;`                         |                                                         |           `padding: 0 72px;`            | `grid-template-columns: repeat(auto-fill, minmax(336px, 1fr));` |
|   footer 内容    |                                ` margin: 40px 60px;`                                |                                                                   |                                                         |                                         |                      `margin: 40px 80px;`                       |

### 测试和调试页面

在`Five Server`打开观察显示效果，改变浏览器窗口大小或从浏览器更改机型尺寸，如没达到效果则进行相应调整和修改。没有具体设计稿，效果图也没有给很多的数据，具体的数据只能从官网获取和自己通过不断调试判断修改。

### 遇到的问题

没啥问题
