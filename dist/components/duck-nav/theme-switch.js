"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { Button, useIsHydrated } from "@heroui/react";
import { useTheme } from "next-themes";
import { MoonFilledIcon, SunFilledIcon } from "./icons";
export const ThemeSwitch = () => {
    const { theme, setTheme } = useTheme();
    // HeroUI v3 replaces @react-aria/ssr's useIsSSR with useIsHydrated
    // (inverted meaning), so the icon stays stable through hydration.
    const isHydrated = useIsHydrated();
    const handleThemeChange = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    };
    const isDark = theme === "dark" && isHydrated;
    return (_jsx(Button, { isIconOnly: true, variant: "ghost", size: "sm", "aria-label": `Switch to ${isDark ? "light" : "dark"} mode`, onPress: handleThemeChange, children: isDark ? (_jsx(SunFilledIcon, { className: "w-6 h-6" })) : (_jsx(MoonFilledIcon, { className: "w-6 h-6" })) }));
};
