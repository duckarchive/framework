"use client";

import { Select, SelectItem, SelectProps } from "@heroui/select";
import { Avatar } from "@heroui/avatar";
import { useRouter, usePathname } from "next/navigation";
import { useMemo } from "react";

interface SelectLocaleProps extends Partial<SelectProps> {
  locales: string[];
  activeLocale?: string;
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

export const SelectLocale: React.FC<SelectLocaleProps> = ({
  locales,
  ...selectProps
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

  // get active locale from pathname
  const activeLocale = useMemo(() => {
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length > 0 && locales.includes(segments[0])) {
      return segments[0];
    }
    return "uk"; // default locale
  }, [pathname, locales]);

  return (
    <Select
      variant="bordered"
      className="w-24"
      defaultSelectedKeys={activeLocale ? [activeLocale] : []}
      onChange={(e: any) => handleLocaleChange(e.target.value)}
      aria-label="DuckNav select locale"
      {...selectProps}
    >
      {locales.map((locale) => (
        <SelectItem
          key={locale}
          startContent={
            <Avatar
              alt={locale}
              className="w-6 h-6"
              src={`https://flagcdn.com/${LOCALE_TO_COUNTRY[locale]}.svg`}
            />
          }
        >
          {locale.toUpperCase()}
        </SelectItem>
      ))}
    </Select>
  );
};
