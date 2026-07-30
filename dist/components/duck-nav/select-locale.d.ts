import { Dropdown } from "@heroui/react";
import type { ComponentProps } from "react";
interface SelectLocaleProps extends Partial<ComponentProps<typeof Dropdown>> {
    locales: string[];
    activeLocale: string;
}
export declare const SelectLocale: React.FC<SelectLocaleProps>;
export {};
