"use client";
import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { Select, SelectItem } from "@heroui/select";
// Convert locale code to flag emoji (e.g., 'en' -> '🇬🇧')
const getCountryFlag = (locale) => {
    const code = locale.split("-")[0].toUpperCase();
    if (code.length !== 2)
        return locale;
    return String.fromCodePoint(127397 + code.charCodeAt(0), 127397 + code.charCodeAt(1));
};
export const SelectLocale = ({ locales, activeLocale, onLocaleChange, }) => {
    return (_jsx(Select, { size: "sm", variant: "bordered", className: "w-24", selectedKeys: activeLocale ? [activeLocale] : [], onChange: (e) => onLocaleChange?.(e.target.value), "aria-label": "Select locale", children: locales.map((locale) => (_jsxs(SelectItem, { children: [getCountryFlag(locale), " ", locale.toUpperCase()] }, locale))) }));
};
