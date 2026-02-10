"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, } from "@heroui/dropdown";
import { Button } from "@heroui/button";
import { Avatar } from "@heroui/avatar";
import { useRouter, usePathname } from "next/navigation";
// Strict locale to flag emoji map
const LOCALE_TO_COUNTRY = {
    uk: "ua",
    en: "gb",
    es: "es",
    it: "it",
    pl: "pl",
    ro: "ro",
    cz: "cz",
};
// Strict locale to flag emoji map
const LOCALE_TO_NAME = {
    uk: "Українська",
    en: "English",
    es: "Español",
    it: "Italiano",
    pl: "Polski",
    ro: "Română",
    cz: "Čeština",
};
export const SelectLocale = ({ locales, activeLocale, ...dropdownProps }) => {
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
    return (_jsxs(Dropdown, { ...dropdownProps, children: [_jsx(DropdownTrigger, { children: _jsx(Button, { isIconOnly: true, variant: "light", size: "sm", "aria-label": "DuckNav select locale", children: _jsx(Avatar, { alt: activeLocale, className: "w-6 h-6", src: `https://flagcdn.com/${LOCALE_TO_COUNTRY[activeLocale]}.svg` }) }) }), _jsx(DropdownMenu, { "aria-label": "Locale selection", onAction: (key) => handleLocaleChange(key), children: locales.map((locale) => (_jsx(DropdownItem, { startContent: _jsx(Avatar, { alt: locale, className: "w-6 h-6", src: `https://flagcdn.com/${LOCALE_TO_COUNTRY[locale]}.svg` }), children: LOCALE_TO_NAME[locale] }, locale))) })] }));
};
