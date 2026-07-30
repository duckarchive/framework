"use client";

import { Dropdown, buttonVariants } from "@heroui/react";
import type { ComponentProps } from "react";
import { useRouter, usePathname } from "next/navigation";
import NextImage from "next/image";

interface SelectLocaleProps extends Partial<ComponentProps<typeof Dropdown>> {
  locales: string[];
  activeLocale: string;
}

// Strict locale to flag emoji map
const LOCALE_TO_COUNTRY: Record<string, string> = {
  uk: "ua",
  en: "gb",
  es: "es",
  it: "it",
  pl: "pl",
  ro: "ro",
  cz: "cz",
};

// Strict locale to flag emoji map
const LOCALE_TO_NAME: Record<string, string> = {
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

const LocaleFlag: React.FC<{ locale: string }> = ({ locale }) => (
  <NextImage
    alt={locale}
    width={24}
    height={24}
    className="w-6 h-6 rounded-full object-cover"
    src={`https://flagcdn.com/${LOCALE_TO_COUNTRY[locale]}.svg`}
  />
);

export const SelectLocale: React.FC<SelectLocaleProps> = ({
  locales,
  activeLocale,
  ...dropdownProps
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleLocaleChange = (newLocale: string) => {
    // Extract locale from pathname (assuming format: /[locale]/...)
    const segments = pathname.split("/").filter(Boolean);

    if (segments.length > 0 && locales.includes(segments[0])) {
      // Replace first segment (current locale) with new locale
      segments[0] = newLocale;
      const newPathname = "/" + segments.join("/");
      router.push(newPathname);
    } else {
      // If no locale in path, prepend the new locale
      const newPathname = `/${newLocale}${pathname}`;
      router.push(newPathname);
    }
  };

  return (
    <Dropdown {...dropdownProps}>
      <Dropdown.Trigger
        className={TRIGGER_CLASS}
        aria-label="DuckNav select locale"
      >
        <LocaleFlag locale={activeLocale} />
      </Dropdown.Trigger>
      <Dropdown.Popover>
        <Dropdown.Menu
          aria-label="Locale selection"
          onAction={(key) => handleLocaleChange(key as string)}
        >
          {locales.map((locale) => (
            <Dropdown.Item
              key={locale}
              id={locale}
              textValue={LOCALE_TO_NAME[locale]}
              className="flex items-center gap-2"
            >
              <LocaleFlag locale={locale} />
              {LOCALE_TO_NAME[locale]}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );
};
