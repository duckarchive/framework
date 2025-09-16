"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { VisuallyHidden } from "@react-aria/visually-hidden";
import { useSwitch } from "@heroui/switch";
import { useTheme } from "next-themes";
import { useIsSSR } from "@react-aria/ssr";
import clsx from "clsx";
import { MoonFilledIcon, SunFilledIcon } from "./icons";
export const ThemeSwitch = ({ className, classNames, }) => {
    const { theme, setTheme } = useTheme();
    const isSSR = useIsSSR();
    const onChange = () => {
        setTheme((prevTheme) => prevTheme === "light" ? "dark" : "light");
    };
    const { Component, slots, isSelected, getBaseProps, getInputProps, getWrapperProps, } = useSwitch({
        isSelected: theme === "light" || isSSR,
        "aria-label": `Switch to ${theme === "light" || isSSR ? "dark" : "light"} mode`,
        onChange,
    });
    return (_jsxs(Component, { ...getBaseProps({
            className: clsx("px-px transition-opacity hover:opacity-80 cursor-pointer", className, classNames?.base),
        }), children: [_jsx(VisuallyHidden, { children: _jsx("input", { ...getInputProps() }) }), _jsx("div", { ...getWrapperProps(), className: slots.wrapper({
                    class: clsx([
                        "w-auto h-auto",
                        "bg-transparent",
                        "rounded-lg",
                        "flex items-center justify-center",
                        "group-data-[selected=true]:bg-transparent",
                        "!text-default-500",
                        "pt-px",
                        "px-0",
                        "mx-0",
                    ], classNames?.wrapper),
                }), children: !isSelected || isSSR ? (_jsx(SunFilledIcon, { size: 22 })) : (_jsx(MoonFilledIcon, { size: 22 })) })] }));
};
