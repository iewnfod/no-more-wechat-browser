<h1 align="center">No More WeChat Browser</h1>
<p align="center">A lightweight page to prevent you website load in WeChat browser</p>
<p align="center">
<a href="./README.md">中文</a> | English
</p>

> **Warning: This project is still on early stage. It does not have many tests. Please be careful before using it.**

## Show

Deploy this webpage before you send your service to users, or use Cloudflare Redirect Rules to display this page automatically. 

It will prevent users to open your website directly in WeChat browser and show following page instead. But on other browser, it will redirect to target link automatically.

![show](img/show_en.png)

## Deploy to Cloudflare Pages

1. Fork this project to your Github account
2. Login to [Cloudflare Dashboard](https://dash.cloudflare.com/)
3. Select **Compute & AI** - **Workers & Pages** in the left sidebar
4. Click **Create an application** - **Pages** on the top right corner
5. Select your Github repository and deploy
6. Fill in **Build command** with `pnpm run build`
7. Fill in **Build output directory** with `dist`
8. Add environment variables in **Environment variables (advanced)** as needed
9. Bind custom domain as needed

## Environment Variables

| Environment Variable | Description                                                                 | Default |
|----------------------|-----------------------------------------------------------------------------|---------|
| BG_URL               | Background image URL (recommend length-width ratio 69 : 28)                 |         |
| CHECK_HTTPS          | Check if target link is using https                                         | false   |
| ALLOW_DOMAINS        | Allowed domains for link (empty for all, use ',' to split multiple domains) | all     |
| SHOW_GITHUB          | Show project link at bottom                                                 | true    |
| FAVICON_URL          | Website favicon URL                                                         |         |

## Cloudflare Redirect Rules Example
Match Expression:

```
(http.user_agent contains "MicroMessenger") or (http.user_agent contains "XWEB") or (http.user_agent contains "XWEB")
```

Dynamic HTTP302 Redirect to:

```
concat("https://PAGES_DOMAIN/?link=", http.request.full_uri)
```

## URL Params

| Param | Description                                                   | Default         |
|-------|---------------------------------------------------------------|-----------------|
| link  | Target link                                                   |                 |
| lang  | Display language                                              | Browser default |
| force | Stay on this page and does not redirect on non WeChat browser | false           |

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
