"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Navbar, NavbarContent, NavbarMenu, NavbarMenuToggle, NavbarBrand, NavbarItem, NavbarMenuItem, } from "@heroui/navbar";
import { Link } from "@heroui/link";
import NextLink from "next/link";
import clsx from "clsx";
import { FaTelegram } from "react-icons/fa";
import { ThemeSwitch } from "./theme-switch";
import { HeartFilledIcon } from "./icons";
import { SelectLocale } from "./select-locale";
import { useState, useEffect, useMemo } from "react";
import config from "./config.json";
import { usePathname } from "next/navigation";
import SelectProject from "./select-project";
import { Divider } from "@heroui/divider";
import AuthButton from "./auth-button";
import { useSession } from "next-auth/react";
import { Button } from "@heroui/button";
const LINK_CLASS = "text-base underline-offset-4 hover:underline hover:opacity-70";
const NavLink = (props) => (_jsx(Link, { as: NextLink, color: "foreground", target: props.href?.startsWith("https") ? "_blank" : undefined, href: props.href, className: clsx(LINK_CLASS, props.className), ...props, children: props.children }));
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
    // Return null if running inside an iframe
    if (isInIframe) {
        return null;
    }
    // get active locale from pathname
    const activeLocale = useMemo(() => {
        const segments = pathname.split("/").filter(Boolean);
        if (segments.length > 0 && locales?.includes(segments[0])) {
            return segments[0];
        }
        return "uk"; // default locale
    }, [pathname, locales]);
    const currentProject = useMemo(() => config.projects.find((p) => p.url === originSiteUrl), [config.projects, originSiteUrl]);
    return (_jsxs(Navbar, { maxWidth: "xl", position: "sticky", isMenuOpen: isMenuOpen, onMenuOpenChange: setIsMenuOpen, children: [_jsxs(NavbarContent, { className: "basis-1/5", justify: "start", children: [_jsx(NavbarBrand, { as: "li", className: "h-full relative grow-0", children: _jsx(SelectProject, { activeLocale: activeLocale, projects: config.projects, currentProject: currentProject }) }), _jsx(NavbarItem, { className: "hidden lg:flex ml-2", children: _jsx("ul", { className: "flex gap-4 justify-start", children: items
                                ?.filter((el) => {
                                if (el.is_authorized) {
                                    return status === "authenticated";
                                }
                                return true;
                            })
                                .map((item) => (_jsx(NavbarItem, { isActive: pathname.startsWith(item.path), className: "px-0", children: _jsx(NavLink, { href: item.path, children: item.label }) }, item.path))) }) })] }), _jsxs(NavbarContent, { className: "basis-1 pl-4 gap-2", justify: "end", children: [_jsx(Button, { as: Link, isIconOnly: true, variant: "light", size: "sm", isExternal: true, "aria-label": "Support Project", href: config.links.sponsor, children: _jsx(HeartFilledIcon, { className: "text-danger w-6 h-6" }) }), _jsx(Button, { as: Link, isIconOnly: true, variant: "light", size: "sm", isExternal: true, "aria-label": "Telegram Chat", href: config.links.telegram, children: _jsx(FaTelegram, { className: "text-default-500 w-6 h-6" }) }), _jsx(ThemeSwitch, {}), locales && locales.length > 0 && (_jsx(SelectLocale, { locales: locales, activeLocale: activeLocale })), _jsx(NavbarItem, { className: "hidden lg:flex", style: {
                            colorScheme: "normal",
                        }, children: _jsx(AuthButton, { activeLocale: activeLocale }) }), _jsx(NavbarMenuToggle, { className: "lg:hidden" })] }), _jsx(NavbarMenu, { children: _jsxs("ul", { className: "mx-4 mt-2 flex flex-col gap-2", children: [_jsx(NavbarItem, { style: {
                                colorScheme: "normal",
                            }, children: _jsx(AuthButton, { isFull: true, activeLocale: activeLocale }) }), _jsx(Divider, { className: "my-4" }), items
                            ?.filter((el) => {
                            if (el.is_authorized) {
                                return status === "authenticated";
                            }
                            return true;
                        })
                            .map((item) => (_jsx(NavbarMenuItem, { isActive: pathname.startsWith(item.path), children: _jsx(NavLink, { href: item.path, onPress: () => setIsMenuOpen((prev) => !prev), children: item.label }) }, `${item.label}`)))] }) })] }));
};
export default DuckNav;
