"use client";

import { Button, useIsHydrated } from "@heroui/react";
import { useTheme } from "next-themes";
import { MoonFilledIcon, SunFilledIcon } from "./icons";

export const ThemeSwitch: React.FC = () => {
  const { theme, setTheme } = useTheme();
  // HeroUI v3 replaces @react-aria/ssr's useIsSSR with useIsHydrated
  // (inverted meaning), so the icon stays stable through hydration.
  const isHydrated = useIsHydrated();

  const handleThemeChange = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const isDark = theme === "dark" && isHydrated;

  return (
    <Button
      isIconOnly
      variant="ghost"
      size="sm"
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      onPress={handleThemeChange}
    >
      {isDark ? (
        <SunFilledIcon className="text-muted w-6 h-6" />
      ) : (
        <MoonFilledIcon className="text-muted w-6 h-6" />
      )}
    </Button>
  );
};
