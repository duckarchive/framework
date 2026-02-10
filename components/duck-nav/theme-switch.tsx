"use client";

import { Button } from "@heroui/button";
import { useTheme } from "next-themes";
import { useIsSSR } from "@react-aria/ssr";
import { MoonFilledIcon, SunFilledIcon } from "./icons";

export const ThemeSwitch: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const isSSR = useIsSSR();

  const handleThemeChange = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const isDark = theme === "dark" && !isSSR;

  return (
    <Button
      isIconOnly
      variant="light"
      size="sm"
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      onPress={handleThemeChange}
    >
      {isDark ? (
        <SunFilledIcon className="text-default-500 w-6 h-6" />
      ) : (
        <MoonFilledIcon className="text-default-500 w-6 h-6" />
      )}
    </Button>
  );
};
