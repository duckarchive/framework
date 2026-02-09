"use client";
import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { Select, SelectItem } from "@heroui/select";
import { useRouter, usePathname } from "next/navigation";
import { useMemo } from "react";
// Strict locale to flag emoji map
const LOCALE_FLAG_MAP = {
    uk: "🇺🇦",
    en: "🇬🇧",
    es: "🇪🇸",
    it: "🇮🇹",
    pl: "🇵🇱",
    ro: "🇷🇴",
    cz: "🇨🇿",
};
// Convert locale code to flag emoji with fallback to charCodeAt
const getCountryFlag = (locale) => {
    if (LOCALE_FLAG_MAP[locale]) {
        return LOCALE_FLAG_MAP[locale];
    }
    // Fallback to charCodeAt method
    const code = locale.split("-")[0].toUpperCase();
    if (code.length !== 2)
        return locale;
    return String.fromCodePoint(127397 + code.charCodeAt(0), 127397 + code.charCodeAt(1));
};
export const SelectLocale = ({ locales, ...selectProps }) => {
    const router = useRouter();
    const pathname = usePathname();
    const handleLocaleChange = (newLocale) => {
        // Extract locale from pathname (assuming format: /[locale]/...)
        const segments = pathname.split("/").filter(Boolean);
        if (segments.length > 0 && locales.includes(segments[0])) {
            // Replace first segment (current locale) with new locale
            segments[0] = newLocale;
            const newPathname = "/" + segments.join("/");
            router.push(newPathname);
        }
        else {
            // If no locale in path, prepend the new locale
            const newPathname = `/${newLocale}${pathname}`;
            router.push(newPathname);
        }
    };
    // get active locale from pathname
    const activeLocale = useMemo(() => {
        const segments = pathname.split("/").filter(Boolean);
        if (segments.length > 0 && locales.includes(segments[0])) {
            return segments[0];
        }
        return undefined;
    }, [pathname, locales]);
    return (_jsx(Select, { variant: "bordered", className: "w-24", selectedKeys: activeLocale ? [activeLocale] : [], onChange: (e) => handleLocaleChange(e.target.value), "aria-label": "DuckNav select locale", ...selectProps, children: locales.map((locale) => (_jsxs(SelectItem, { children: [getCountryFlag(locale), " ", locale.toUpperCase()] }, locale))) }));
};
