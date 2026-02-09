"use client";

import { Select, SelectItem } from "@heroui/select";

interface SelectLocaleProps {
  locales: string[];
  activeLocale?: string;
  onLocaleChange?: (locale: string) => void;
}

// Convert locale code to flag emoji (e.g., 'en' -> '🇬🇧')
const getCountryFlag = (locale: string): string => {
  const code = locale.split("-")[0].toUpperCase();
  if (code.length !== 2) return locale;
  return String.fromCodePoint(
    127397 + code.charCodeAt(0),
    127397 + code.charCodeAt(1)
  );
};

export const SelectLocale: React.FC<SelectLocaleProps> = ({
  locales,
  activeLocale,
  onLocaleChange,
}) => {
  return (
    <Select
      size="sm"
      variant="bordered"
      className="w-24"
      selectedKeys={activeLocale ? [activeLocale] : []}
      onChange={(e: any) => onLocaleChange?.(e.target.value)}
      aria-label="Select locale"
    >
      {locales.map((locale) => (
        <SelectItem key={locale}>
          {getCountryFlag(locale)} {locale.toUpperCase()}
        </SelectItem>
      ))}
    </Select>
  );
};
