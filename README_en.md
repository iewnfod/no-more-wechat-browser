<h1 align="center">No More Wechat Browser</h1>
<p align="center">A lightweight page to prevent you website load in Wechat browser</p>
<p align="center">
<a href="./README.md">中文</a> | English
</p>

> **Warning: This project is still on early stage. It does not have many tests. Please be careful before using it.**

## Show
Deploy this webpage before you send your service to users, or use Cloudflare Redirect Rules to display this page automatically. 
It will prevent users to open your website directly in Wechat browser and show following page instead. But on other browser, it will redirect to target link automatically.
![show](img/show_en.png)

## Environment Vairables
| Environment Vairable | Description                                                                 | Default |
|----------------------|-----------------------------------------------------------------------------|---------|
| BG_URL               | Background image URL (recommend length-width ratio 69 : 28)                 |         |
| CHECK_HTTPS          | Check if target link is using https                                         | false   |
| ALLOW_DOMAINS        | Allowed domains for link (empty for all, use ',' to split multiple domains) | all     |
| SHOW_GITHUB          | Show project link at bottom                                                 | true    |
| FAVICON_URL          | Website favicon URL                                                         |         |

## URL Params
| Param | Description                                                   | Default         |
|-------|---------------------------------------------------------------|-----------------|
| link  | Target link                                                   |                 |
| lang  | Display language                                              | Browser default |
| force | Stay on this page and does not redirect on non Wechat browser | false           |

> Tips: param `force` should only be used in develop environment.

## Development
1. pnpm install
2. pnpm run dev

## Technologies Used
* [Node.js](https://nodejs.org/)
* [React](https://react.dev)
* [Vite](https://cn.vite.dev/)
* [Typescript](https://www.typescriptlang.org/)
* [MUI](https://mui.com/)
* [pnpm](https://pnpm.io/)

## License
**[MPL-2.0](./LICENSE)**
