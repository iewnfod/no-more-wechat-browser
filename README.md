<h1 align="center">No More Wechat Browser</h1>
<p align="center">一个轻量级的网页来避免你的网站在微信浏览器中加载</p>
<p align="center">
中文 | <a href="./README_en.md">English</a>
</p>

> **注意：此项目处于早期开发阶段，没有未经大量测试，请谨慎使用**

## 展示
将此网站部署在你发送给用户的网页服务前，或使用 Cloudflare Redirect Rules 来自动转发。
它会阻止用户直接在微信浏览器中打开它而是显示以下页面，而在普通浏览器中打开此页面会自动转跳到目标地址。
![show](img/show_zh.png)

## 环境变量
| 环境变量          | 描述                             | 默认值   |
|---------------|--------------------------------|-------|
| BG_URL        | 背景图片网址 (推荐长宽比 69 : 28)         |       |
| CHECK_HTTPS   | 是否检查目标地址使用 https 协议            | false |
| ALLOW_DOMAINS | 受允许的目标域名，留空为允许所有，使用 ',' 分割多个域名 | 允许所有  |
| SHOW_GITHUB   | 展示底部的项目 Github 链接              | true  |
| FAVICON_URL   | 网页图标地址                         |       |

## URL 参数
| 参数     | 描述 | 默认值 |
|--------| --- | ----- |
| link   | 目标地址 | |
| lang   | 显示语言 | 浏览器默认语言 |
| force | 强制在非微信浏览器中不转跳 | false |

> 注意：参数 `force` 理论上只应该在开发环境中使。

## 开发
1. pnpm install
2. pnpm run dev

## 使用的技术
* [Node.js](https://nodejs.org/)
* [React](https://react.dev)
* [Vite](https://cn.vite.dev/)
* [Typescript](https://www.typescriptlang.org/)
* [MUI](https://mui.com/)
* [pnpm](https://pnpm.io/)

## License
**[MPL-2.0](./LICENSE)**
