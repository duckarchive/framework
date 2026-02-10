"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { Button } from "@heroui/button";
import { useTheme } from "next-themes";
import { useIsSSR } from "@react-aria/ssr";
import { MoonFilledIcon, SunFilledIcon } from "./icons";
export const ThemeSwitch = () => {
    const { theme, setTheme } = useTheme();
    const isSSR = useIsSSR();
    const handleThemeChange = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    };
    const isDark = theme === "dark" && !isSSR;
    return (_jsx(Button, { isIconOnly: true, variant: "light", size: "sm", "aria-label": `Switch to ${isDark ? "light" : "dark"} mode`, onPress: handleThemeChange, children: isDark ? (_jsx(SunFilledIcon, { className: "text-default-500 w-6 h-6" })) : (_jsx(MoonFilledIcon, { className: "text-default-500 w-6 h-6" })) }));
};
