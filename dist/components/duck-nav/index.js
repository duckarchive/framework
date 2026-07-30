"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link, Separator, Button, buttonVariants } from "@heroui/react";
import clsx from "clsx";
import { FaTelegram, FaWhatsapp, FaBars, FaTimes, FaHeart, } from "react-icons/fa";
import { ThemeSwitch } from "./theme-switch";
import { SelectLocale } from "./select-locale";
import { useState, useEffect, useMemo } from "react";
import config from "./config.json";
import { usePathname } from "next/navigation";
import SelectProject from "./select-project";
import AuthButton from "./auth-button";
import { useSession } from "next-auth/react";
const LINK_CLASS = "text-base text-foreground underline-offset-4 hover:underline hover:opacity-70";
const NavLink = ({ className, href, ...props }) => (_jsx(Link, { target: href.startsWith("https") ? "_blank" : undefined, href: href, className: clsx(LINK_CLASS, className), ...props }));
// v3's Button can't render as a link (no `as`/`href`), so the icon-only
// social links reuse Button's own class recipe on a real Link instead.
const ICON_LINK_CLASS = buttonVariants({
    variant: "ghost",
    size: "sm",
    isIconOnly: true,
});
const DuckNav = ({ siteUrl, locales, items }) => {
    const { status } = useSession();
    const originSiteUrl = siteUrl.endsWith("/") ? siteUrl.slice(0, -1) : siteUrl;
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isInIframe, setIsInIframe] = useState(false);
    const pathname = usePathname();
    useEffect(() => {
        // Check if running inside an iframe
        setIsInIframe(window !== window.top);
    }, []);
    // get active locale from pathname
    const activeLocale = useMemo(() => {
        const segments = pathname.split("/").filter(Boolean);
        if (segments.length > 0 && locales?.includes(segments[0])) {
            return segments[0];
        }
        return "uk"; // default locale
    }, [pathname, locales]);
    const currentProject = useMemo(() => config.projects.find((p) => p.url === originSiteUrl), [config.projects, originSiteUrl]);
    const visibleItems = useMemo(() => items?.filter((item) => {
        if (item.is_authorized) {
            return status === "authenticated";
        }
        return true;
    }) ?? [], [items, status]);
    // Return null if running inside an iframe
    if (isInIframe) {
        return null;
    }
    return (_jsxs("nav", { className: clsx("flex flex-col sticky top-0 z-40 w-full bg-background/70 backdrop-blur-lg backdrop-saturate-150", {
            "h-screen": isMenuOpen,
        }), children: [_jsxs("div", { className: "mx-auto w-full flex h-16 max-w-7xl items-center justify-between gap-4 px-4", children: [_jsxs("div", { className: "flex basis-1/5 items-center gap-4", children: [_jsx("div", { className: "relative h-full grow-0 flex items-center", children: _jsx(SelectProject, { activeLocale: activeLocale, projects: config.projects, currentProject: currentProject }) }), _jsx("ul", { className: "hidden gap-4 lg:flex", children: visibleItems.map((item) => (_jsx("li", { "aria-current": pathname.startsWith(item.path) ? "page" : undefined, children: _jsx(NavLink, { href: item.path, children: item.label }) }, item.path))) })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Link, { className: ICON_LINK_CLASS, "aria-label": "Support Project", href: config.links.sponsor, target: "_blank", rel: "noreferrer noopener", children: _jsx(FaHeart, { className: "text-danger w-6 h-6" }) }), locales && locales.length > 0 && (_jsx(SelectLocale, { locales: locales, activeLocale: activeLocale })), _jsxs("div", { className: "hidden lg:flex items-center gap-2", style: { colorScheme: "normal" }, children: [_jsx(ThemeSwitch, {}), _jsx(Link, { className: ICON_LINK_CLASS, "aria-label": "WhatsApp Channel", href: config.links.whatsapp, target: "_blank", rel: "noreferrer noopener", children: _jsx(FaWhatsapp, { className: "w-6 h-6" }) }), _jsx(Link, { className: ICON_LINK_CLASS, "aria-label": "Telegram Channel", href: config.links.telegram, target: "_blank", rel: "noreferrer noopener", children: _jsx(FaTelegram, { className: "w-6 h-6" }) }), _jsx(AuthButton, { activeLocale: activeLocale })] }), _jsx(Button, { isIconOnly: true, variant: "ghost", size: "sm", className: "lg:hidden", "aria-label": isMenuOpen ? "Close menu" : "Open menu", "aria-expanded": isMenuOpen, onPress: () => setIsMenuOpen((prev) => !prev), children: isMenuOpen ? (_jsx(FaTimes, { className: "w-6 h-6" })) : (_jsx(FaBars, { className: "w-6 h-6" })) })] })] }), isMenuOpen && (_jsxs("div", { className: "grow flex flex-col justify-between lg:hidden bg-background px-4 pb-4", children: [_jsxs("div", { children: [_jsx(Separator, { className: "mb-2" }), _jsx("ul", { className: "flex flex-col gap-2", children: visibleItems.map((item) => (_jsx("li", { "aria-current": pathname.startsWith(item.path) ? "page" : undefined, children: _jsx(NavLink, { href: item.path, onPress: () => setIsMenuOpen((prev) => !prev), children: item.label }) }, item.label))) })] }), _jsxs("div", { children: [_jsx("div", { style: { colorScheme: "normal" }, children: _jsx(AuthButton, { activeLocale: activeLocale }) }), _jsx(Separator, { className: "my-2" }), _jsxs("div", { className: "flex justify-between", children: [_jsxs("div", { className: "flex gap-2", children: [_jsx(Link, { className: ICON_LINK_CLASS, "aria-label": "WhatsApp Channel", href: config.links.whatsapp, target: "_blank", rel: "noreferrer noopener", children: _jsx(FaWhatsapp, { className: "w-6 h-6" }) }), _jsx(Link, { className: ICON_LINK_CLASS, "aria-label": "Telegram Channel", href: config.links.telegram, target: "_blank", rel: "noreferrer noopener", children: _jsx(FaTelegram, { className: "w-6 h-6" }) })] }), _jsx(ThemeSwitch, {})] })] })] }))] }));
};
export default DuckNav;
