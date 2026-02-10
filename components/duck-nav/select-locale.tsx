"use client";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownProps,
} from "@heroui/dropdown";
import { Button } from "@heroui/button";
import { Avatar } from "@heroui/avatar";
import { useRouter, usePathname } from "next/navigation";

interface SelectLocaleProps extends Partial<DropdownProps> {
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
      <DropdownTrigger>
        <Button
          isIconOnly
          variant="light"
          size="sm"
          aria-label="DuckNav select locale"
        >
          <Avatar
            alt={activeLocale}
            className="w-6 h-6"
            src={`https://flagcdn.com/${LOCALE_TO_COUNTRY[activeLocale]}.svg`}
          />
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Locale selection"
        onAction={(key) => handleLocaleChange(key as string)}
      >
        {locales.map((locale) => (
          <DropdownItem
            key={locale}
            startContent={
              <Avatar
                alt={locale}
                className="w-6 h-6"
                src={`https://flagcdn.com/${LOCALE_TO_COUNTRY[locale]}.svg`}
              />
            }
          >
            {LOCALE_TO_NAME[locale]}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};
