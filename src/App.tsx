import {Fragment, useEffect, useState} from "react";
import {Button, Card, CardActions, CardContent, CardMedia, Stack, Typography} from "@mui/material";
import {toast, ToastContainer} from "react-toastify";
import {useTranslation} from "./i18n.ts";

function App() {
    const [lang, setLang] = useState<string | undefined>();
    const t = useTranslation(lang);

    const [link, setLink] = useState<URL | null>(null);
    const [isHttps, setIsHttps] = useState<boolean>(false);
    const [checkHttps, setCheckHttps] = useState<boolean>(false);
    const [allowDomains, setAllowDomains] = useState<string[]>([]);
    const [inAllowDomain, setInAllowDomain] = useState<boolean>(false);
    const [showGithub, setShowGithub] = useState<boolean>(true);
    const [forceStay, setForceStay] = useState<boolean>(false);

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const url = searchParams.get("link");
        if (url) {
            setLink(new URL(decodeURIComponent(url)));
        }
        const lang = searchParams.get("lang");
        if (lang) {
            setLang(lang);
        }
        const force = searchParams.get("force");
        if (force) {
            setForceStay(force === "true");
        }

        if (import.meta.env.CHECK_HTTPS) {
            setCheckHttps(import.meta.env.CHECK_HTTPS === "true");
        }
        if (import.meta.env.SHOW_GITHUB) {
            setShowGithub(import.meta.env.SHOW_GITHUB !== "false");
        }
        if (import.meta.env.ALLOW_DOMAINS) {
            setAllowDomains(import.meta.env.ALLOW_DOMAINS.trim().split(','));
        } else {
            setAllowDomains([]);
        }
        if (import.meta.env.FAVICON_URL) {
            const favicon = import.meta.env.FAVICON_URL;
            const faviconElement = document.getElementById('favicon-link');
            if (faviconElement) {
                // @ts-expect-error favicon has href
                faviconElement.href = favicon;
            }
        }

        setTitle(t['Redirecting...']);
    }, [t]);

    useEffect(() => {
        if (allowDomains.length === 0) {
            setInAllowDomain(true);
        } else {
            if (link) {
                for (let i = 0; i < allowDomains.length; i ++) {
                    if (link.hostname.toLowerCase().endsWith('.' + allowDomains[i].toLowerCase()) || link.hostname.toLowerCase() === allowDomains[i].toLowerCase()) {
                        setInAllowDomain(true);
                        break;
                    } else {
                        setInAllowDomain(false);
                    }
                }
            }
        }
    }, [allowDomains, setAllowDomains, link, setLink]);

    useEffect(() => {
        setIsHttps(link?.protocol === "https:");
    }, [link, setLink]);

    useEffect(() => {
        if (!isWechatBrowser() && link && !forceStay) {
            redirect(link);
        }
    }, [forceStay, setForceStay, link, setLink, redirect]);

    useEffect(() => {
        if (!link) {
            setTitle(t['Missing redirect parameter']);
        } else if (checkHttps && !isHttps) {
            setTitle(t['Target link is not secure']);
        } else if (!inAllowDomain) {
            setTitle(t['Target is not allowed']);
        } else {
            setTitle(t['Redirecting...']);
        }
    }, [checkHttps, inAllowDomain, isHttps, t, link]);

    function setTitle(title: string) {
        const titleEle = document.getElementById('title');
        if (titleEle) {
            titleEle.innerText = title;
        }
    }

    function handleCopyLink() {
        if (link) {
            navigator.clipboard.writeText(link.toString()).then(() => {
                toast.success(t["Copied to clipboard"], {toastId: 'ctc'});
            }).catch(() => {
                toast.error(t["Could not copy clipboard"], {toastId: 'cncc'});
            });
        }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    function redirect(url: URL) {
        if ((checkHttps && isHttps || !checkHttps) && inAllowDomain) {
            window.location.replace(url);
        }
    }

    function isWechatBrowser() {
        const ua = navigator.userAgent || '';
        return /MicroMessenger/i.test(ua) || /XWEB/i.test(ua) || /MMWEBSDK/i.test(ua);
    }

    return (
        <Stack sx={{width: '100%', height: '100%'}} justifyContent="center" alignItems="center">
            <Card sx={{ width: "90%", maxWidth: 345 }}>
                <CardMedia
                    component="img"
                    alt=""
                    height="140"
                    image={import.meta.env.BG_URL}
                    sx={{userSelect: 'none'}}
                />
                {
                    link ? (
                        checkHttps && !isHttps ? (
                            <Fragment>
                                {/* 仅允许 https */}
                                <CardContent>
                                    <Stack sx={{width: '100%', p: 2, gap: 1.5, textAlign: 'start'}} justifyContent="center" alignItems="start">
                                        <Typography gutterBottom variant="h5" component="div">
                                            {t['Not allowed protocol']}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: 'text.secondary', pr: 4 }}>
                                            {t['Target link must use HTTPS']}
                                        </Typography>
                                    </Stack>
                                </CardContent>
                            </Fragment>
                        ) : (
                            inAllowDomain ? (
                                <Fragment>
                                    {/* main */}
                                    <CardContent>
                                        <Stack sx={{width: '100%', p: 2, pb: 0, gap: 1.5, textAlign: 'start'}} justifyContent="center" alignItems="start">
                                            <Typography gutterBottom variant="h5" component="div">
                                                {t['Please open in browser']}
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: 'text.secondary', pr: 4 }}>
                                                {t['Currently not support view in Wechat. Please click more on top right corner and select `open in default browser`.']}
                                            </Typography>
                                            <Typography variant="subtitle1" sx={{
                                                color: 'text.secondary', textOverflow: 'ellipsis', overflow: 'hidden',
                                                width: '90%', whiteSpace: 'nowrap'
                                            }}>
                                                <a href={link.toString()}>
                                                    {link.toString()}
                                                </a>
                                            </Typography>
                                        </Stack>
                                    </CardContent>
                                    <CardActions>
                                        <Stack direction="row-reverse" sx={{width: '100%', p: 2}}>
                                            <Button size="medium" onClick={handleCopyLink} variant="outlined">{t['Copy Link']}</Button>
                                        </Stack>
                                    </CardActions>
                                </Fragment>
                            ) : (
                                <Fragment>
                                    {/* 喜欢域控 */}
                                    <CardContent>
                                        <Stack sx={{width: '100%', p: 2, gap: 1.5, textAlign: 'start'}} justifyContent="center" alignItems="start">
                                            <Typography gutterBottom variant="h5" component="div">
                                                {t['Not allowed target domain']}
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: 'text.secondary', pr: 4 }}>
                                                {t['Only allow redirecting to managed domains and subdomains']}
                                            </Typography>
                                        </Stack>
                                    </CardContent>
                                </Fragment>
                            )
                        )
                    ) : (
                        <Fragment>
                            {/* 嘛也没有 */}
                            <CardContent>
                                <Stack sx={{width: '100%', p: 2, gap: 1.5, textAlign: 'start'}} justifyContent="center" alignItems="start">
                                    <Typography gutterBottom variant="h5" component="div">
                                        {t['Missing redirect parameter']}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: 'text.secondary', pr: 4 }}>
                                        {t['Cannot find target link']}
                                    </Typography>
                                </Stack>
                            </CardContent>
                        </Fragment>
                    )
                }
            </Card>
            {
                showGithub ? (
                    <Stack sx={{position: 'absolute', bottom: 15}}>
                        <Typography variant="body2" component="p" color="textSecondary">
                            {t['powered by front']} <a href="https://github.com/iewnfod/no-more-wechat-browser" target="_blank">no-more-wechat-browser</a> {t['powered by end']}
                        </Typography>
                    </Stack>
                ) : null
            }
            {
                forceStay ? (
                    <Stack sx={{position: 'absolute', top: 15}}>
                        <Typography variant="body2" component="p" color="error">
                            {t['You are in force stay mode now, which means that it will never redirect to target link and you can make test on it.']}
                        </Typography>
                    </Stack>
                ) : null
            }
            <ToastContainer/>
        </Stack>
    );
}

export default App;
