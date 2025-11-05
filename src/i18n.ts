interface Dictionary<T> {
    [Key: string]: T;
}

const translation: Dictionary<Dictionary<string>> = {
    'zh-cn': {
        'Please open in browser': "请从浏览器打开",
        "Currently not support view in Wechat. Please click more on top right corner and select `open in default browser`.": "微信内暂不支持直接访问，请点击右上角更多，选择\"在默认浏览器中打开\"",
        "powered by front": "由",
        "powered by end": "强力驱动",
        "Copied to clipboard": "复制成功",
        "Could not copy clipboard": "复制失败",
        "Not allowed protocol": "不允许的链接协议",
        "Target link must use HTTPS": "目标链接必须使用 HTTPS",
        "Copy Link": "复制链接",
        "Not allowed target domain": "不允许的目标域名",
        "Only allow redirecting to managed domains and subdomains": "仅允许重定向到受管理的域名及其子域",
        "Missing redirect parameter": "缺少重定向参数",
        "Cannot find target link": "找不到目标地址",
        "You are in force stay mode now, which means that it will never redirect to target link and you can make test on it.": "你现在处于强制停留状态，这表示你将不会被从这个页面重定向到目标地址，你可以在此处进行调试"
    },
    'en-us': {
        'Please open in browser': "Please open in browser",
        "Currently not support view in Wechat. Please click more on top right corner and select `open in default browser`.": "Currently not support view in Wechat. Please click more on top right corner and select `open in default browser`.",
        "powered by front": "Powered by",
        "powered by end": "",
        "Copied to clipboard": "Copied to clipboard",
        "Could not copy clipboard": "Could not copy clipboard",
        "Not allowed protocol": "Not allowed protocol",
        "Target link must use HTTPS": "Target link must use HTTPS",
        "Copy Link": "Copy Link",
        "Not allowed target domain": "Not allowed target domain",
        "Only allow redirecting to managed domains and subdomains": "Only allow redirecting to managed domains and subdomains",
        "Missing redirect parameter": "Missing redirect parameter",
        "Cannot find target link": "Cannot find target link",
        "You are in force stay mode now, which means that it will never redirect to target link and you can make test on it.": "You are in force stay mode now, which means that it will never redirect to target link and you can make test on it."
    }
}

const emptyTranslation: Dictionary<string> = translation['en-us'];

export function useTranslation(language?: string) {
    let lang = navigator.language.toLowerCase();

    if (language) {
        lang = language.toLowerCase();
    }

    if (translation[lang]) {
        return translation[lang];
    } else {
        return emptyTranslation;
    }
}
