<h1 align="center">No More WeChat Browser</h1>
<p align="center">一个轻量级的网页来避免你的网站在微信浏览器中加载</p>
<p align="center">
中文 | <a href="./README_en.md">English</a>
</p>

> **注意：此项目处于早期开发阶段，没有未经大量测试，请谨慎使用**

## 展示

将此网站部署在你发送给用户的网页服务前，或使用 Cloudflare Redirect Rules 来自动转发。

它会阻止用户直接在微信浏览器中打开它而是显示以下页面，而在普通浏览器中打开此页面会自动转跳到目标地址。

![show](img/show_zh.png)

## 部署至Cloudflare Pages

1. Fork 此项目至你的 Github 账号
2. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
3. 选择左侧栏的 **Compute & AI** - **Workers & Pages**
4. 点击右上角的 **Create an application** - **Pages**
5. 选择你的 Github 仓库并部署
6. **Build command** 填写 `pnpm run build`
7. **Build output directory** 填写 `dist`
8. 在 **Environment variables (advanced)** 中按需添加环境变量
9. 按需绑定自定义域

## 环境变量

| 环境变量          | 描述                             | 默认值   |
|---------------|--------------------------------|-------|
| BG_URL        | 背景图片网址 (推荐长宽比 69 : 28)         |       |
| CHECK_HTTPS   | 是否检查目标地址使用 https 协议            | false |
| ALLOW_DOMAINS | 受允许的目标域名，留空为允许所有，使用 ',' 分割多个域名 | 允许所有  |
| SHOW_GITHUB   | 展示底部的项目 Github 链接              | true  |
| FAVICON_URL   | 网页图标地址                         |       |

## Cloudflare Redirect Rules 示例

匹配自定义表达式：

```
(http.user_agent contains "MicroMessenger") or (http.user_agent contains "XWEB") or (http.user_agent contains "MMWEBSDK")
```
动态 HTTP302 转发到：

```
concat("https://PAGES_DOMAIN/?link=", http.request.full_uri)
```

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
