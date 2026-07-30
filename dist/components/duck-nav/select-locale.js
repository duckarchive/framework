"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Dropdown, buttonVariants } from "@heroui/react";
import { useRouter, usePathname } from "next/navigation";
import NextImage from "next/image";
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
// v3's Dropdown.Trigger renders the actual trigger button itself (no wrapping
// <Button>), so it needs Button's own class recipe applied directly.
const TRIGGER_CLASS = buttonVariants({
    variant: "ghost",
    size: "sm",
    isIconOnly: true,
    className: "flex items-center justify-center",
});
const LocaleFlag = ({ locale }) => (_jsx(NextImage, { alt: locale, width: 24, height: 24, className: "w-6 h-6 rounded-full object-cover", src: `https://flagcdn.com/${LOCALE_TO_COUNTRY[locale]}.svg` }));
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
    return (_jsxs(Dropdown, { ...dropdownProps, children: [_jsx(Dropdown.Trigger, { className: TRIGGER_CLASS, "aria-label": "DuckNav select locale", children: _jsx(LocaleFlag, { locale: activeLocale }) }), _jsx(Dropdown.Popover, { children: _jsx(Dropdown.Menu, { "aria-label": "Locale selection", onAction: (key) => handleLocaleChange(key), children: locales.map((locale) => (_jsxs(Dropdown.Item, { id: locale, textValue: LOCALE_TO_NAME[locale], className: "flex items-center gap-2", children: [_jsx(LocaleFlag, { locale: locale }), LOCALE_TO_NAME[locale]] }, locale))) }) })] }));
};
