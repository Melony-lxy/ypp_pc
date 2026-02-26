# ypp-computer-vue3

电脑端 UniApp 项目，使用 Vue 3 和 Vite 构建，面向 yipinpin.com 在线商城。

**线上站点**：<https://www.yipinpin.com>

## 核心技术

- **框架**：Vue 3 + Composition API
- **构建**：Vite + UniApp 多端打包
- **状态管理**：Pinia
- **路由与页面**：基于 UniApp 的 pages.json 配置
- **开发语言**：JavaScript (ES6+) + SCSS

### IndexedDB (idb) 使用

项目通过 `api/db.js` 在浏览器中创建 `searchDB` 数据库，并维护一个 `item` 对象仓库，用于缓存搜索历史、商品浏览记录等。利用 `idb` 提供的 Promise 接口，可以在页面请求前后异步写入/读取，提高响应速度并支持离线访问，示例：

```js
import dbPromise from '@/api/db.js';
// 添加历史
const db = await dbPromise;
const tx = db.transaction('item', 'readwrite');
const store = tx.objectStore('item');
store.put({ id: keyword, data: ... });
await tx.done;
```

该机制使得搜索结果能在断网时也可读取，且减少服务器的重复请求。

### ECharts 图表集成

页面和组件中使用了 `echarts.min.js` 及 `echarts-gl.min.js`，并封装在 `components/uc-charts/uc-charts.vue` 内：

- 组件在 H5/APP 环境动态加载脚本，并通过 `<view>` 将 canvas 渲染在页面中。  
- 可接收 `option` 属性，支持实时更新并通过 `echarts.updateEcharts` 触发。  
- 内部监听触摸/鼠标事件以实现长按显示十字刻度线、数据索引转换（`convertFromPixel`）并向父组件广播。  
- 在销毁时销毁 ECharts 实例以防内存泄漏。

该抽象允许开发者在各页中快速引入图表并控制交互，无需每次手写初始化逻辑。


## 主要第三方库与服务

| 功能 | 技术/库 | 用途 |
|------|--------|------|
| 实时聊天 | @tencentcloud/lite-chat | 腾讯云轻聊 IM SDK，实现会话、消息、群组等功能 |
| 本地缓存 | idb | IndexedDB 封装，用于搜索历史等离线缓存 |
| 安装渠道 | OpenInstall | 统计渠道数据，支持一键安装 |
| 二维码 | qrcode-generator | 动态生成二维码 |
| 图片查看 | viewerjs | 放大/旋转/全屏等图片浏览 |

其它依赖还包括 `pinia`、`qrcode-generator`、`viewerjs` 等，模块化组织在 `uni_modules/` 目录。

## 项目结构概览

```
components/     # 可重用 Vue 组件
pages/          # 各功能页面
api/            # 封装接口、DB、支付等
utils/          # 工具函数，如 chat、common
store/          # Pinia 状态管理
uni_modules/    # UniApp 第三方模块
static/         # 静态资源
```

## 难点与亮点

1. **多端兼容性**：UniApp 统一 Web、App、微信小程序差异，配合 Vite 构建减少配置成本。
2. **实时通讯**：集成腾讯云轻聊 SDK，在 UniApp 环境中保持消息稳定、列表更新和自定义消息展示。
3. **离线与缓存**：利用 IndexedDB (idb) 做搜索历史缓存，提升页面响应并支持断网读取。
4. **渠道追踪**：大量页面通过 OpenInstall 脚本解析 URL 参数，实现广告/推广来源统计。
5. **状态同步**：Pinia 全局状态与本地缓存(uni.setStorageSync)配合，保证登录信息在页面间一致。
6. **组件化与页面复用**：大量细粒度组件（弹窗、列表、选择器等）提高开发效率，降低维护难度。
7. **首页轮播动画** — `components/IndexBanner` 使用两个并列的 `.banner-list` 容器，并定义 `seamlessUp`/`seamlessDown` 关键帧动画，分别向上和向下循环平移 50%+36rpx 的垂直距离（`translateY`）。左侧和右侧通过 14s 的线性无限循环实现无缝滚动，右侧还带有 -7s 的延迟以产生交错效果。该技巧让多组横幅内容持续滚动而不会出现空白间隙。
8. **关于页滚动动画** — `pages/about/about.vue` 头部图片列表利用 CSS Scroll Timeline（`animation-timeline: scroll()`）驱动：
   - `.imglist` 整体在滚动过程中渐变高度（`listHeight`）并呈现充满动画。
   - 每个 image 项目根据索引应用不同关键帧（`item-one-five`、`item-two-four`、`item-three` 等），实现上下位移与缩放变化，增强视觉层次。
   - 居中的文字通过 `opac` 动画在特定滚动范围（550–600rpx）内渐显。
   - 大屏（>1920px）环境下用更大位移的 `item1/2/3` 系列关键帧平滑适配。
   这种基于滚动位置触发的平移和缩放效果，使页面在用户向下滚动时呈现动态 3D 视差感。

## 启动与开发

1. 安装依赖：
   ```bash
   npm install
   ```
2. 运行开发：
   ```bash
   npm run dev
   ```

## 贡献

Pull requests 欢迎，遵循现有代码风格。

---

感谢使用，欢迎访问线上站点继续探索！
