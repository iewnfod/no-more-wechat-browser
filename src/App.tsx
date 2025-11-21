import {Fragment, useEffect, useState} from "react";
import {Card, CardMedia, Stack} from "@mui/material";
import {ToastContainer} from "react-toastify";
import {useTranslation} from "./i18n.ts";
import OnlyHttpsCard from "./cards/OnlyHttpsCard.tsx";
import MainCard from "./cards/MainCard.tsx";
import NotAllowDomainsCard from "./cards/NotAllowDomainsCard.tsx";
import NothingCard from "./cards/NothingCard.tsx";
import BottomGithub from "./components/BottomGithub.tsx";
import TopForceStay from "./components/TopForceStay.tsx";
import InvalidUrlCard from "./cards/InvalidUrlCard.tsx";

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
    const [bgUrl, setBgUrl] = useState<string>("https://picsum.photos/345/140?random=1");
    const [invalidUrl, setInvalidUrl] = useState<boolean>(false);
    const [autoHttpsUpgrade, setAutoHttpsUpgrade] = useState<boolean>(false);

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const url = searchParams.get("link");
        if (url) {
            let u = url;
            if (!/^https?:\/\//i.test(url)) {
                u = "https://" + url;
            }
            try {
                const l = new URL(decodeURIComponent(u));
                if (l.hostname) {
                    setLink(l);
                } else {
                    setInvalidUrl(true);
                }
            } catch (err) {
                setInvalidUrl(true);
                console.log("Invalid URL:", err);
            }
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
        if (import.meta.env.HTTPS_AUTO_UPGRADE) {
            setAutoHttpsUpgrade(import.meta.env.HTTPS_AUTO_UPGRADE === "true");
        }
        if (import.meta.env.FAVICON_URL) {
            const favicon = import.meta.env.FAVICON_URL;
            const faviconElement = document.getElementById('favicon-link');
            if (faviconElement) {
                // @ts-expect-error favicon has href
                faviconElement.href = favicon;
            }
        }
        if (import.meta.env.BG_URL) {
            setBgUrl(import.meta.env.BG_URL);
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
        if (autoHttpsUpgrade) {
            if (link?.protocol === "http:") {
                setLink(prevL => {
                    if (prevL) {
                        const newL = new URL(prevL);
                        newL.protocol = "https:";
                        return newL;
                    } else {
                        return null;
                    }
                });
            }
        }
    }, [autoHttpsUpgrade, link]);

    useEffect(() => {
        if (!link) {
            setTitle(t['Missing redirect parameter']);
        } else if (invalidUrl) {
            setTitle(t['Invalid URL']);
        } else if (checkHttps && !isHttps) {
            setTitle(t['Target link is not secure']);
        } else if (!inAllowDomain) {
            setTitle(t['Target is not allowed']);
        } else {
            setTitle(t['Redirecting...']);
        }
    }, [checkHttps, inAllowDomain, isHttps, t, link, invalidUrl]);

    function setTitle(title: string) {
        const titleEle = document.getElementById('title');
        if (titleEle) {
            titleEle.innerText = title;
        }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    function redirect(url: URL) {
        if ((checkHttps && isHttps || !checkHttps) && inAllowDomain && !invalidUrl) {
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
                    image={bgUrl}
                    sx={{userSelect: 'none'}}
                />
                {
                    link ? (
                        checkHttps && !isHttps ? (
                            <Fragment>
                                {/* 仅允许 https */}
                                <OnlyHttpsCard lang={lang}/>
                            </Fragment>
                        ) : (
                            inAllowDomain ? (
                                <Fragment>
                                    {/* main */}
                                    <MainCard lang={lang} link={link}/>
                                </Fragment>
                            ) : (
                                <Fragment>
                                    {/* 喜欢域控 */}
                                    <NotAllowDomainsCard lang={lang}/>
                                </Fragment>
                            )
                        )
                    ) : (
                        invalidUrl ? (
                            <Fragment>
                                {/* 不合理的 URl */}
                                <InvalidUrlCard lang={lang}/>
                            </Fragment>
                        ) : (
                            <Fragment>
                                {/* 嘛也没有 */}
                                <NothingCard lang={lang}/>
                            </Fragment>
                        )
                    )
                }
            </Card>
            {
                showGithub ? (
                    <BottomGithub lang={lang}/>
                ) : null
            }
            {
                forceStay ? (
                    <TopForceStay lang={lang}/>
                ) : null
            }
            <ToastContainer/>
        </Stack>
    );
}

export default App;
