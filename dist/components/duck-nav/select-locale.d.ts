import { DropdownProps } from "@heroui/dropdown";
interface SelectLocaleProps extends Partial<DropdownProps> {
    locales: string[];
    activeLocale: string;
}
export declare const SelectLocale: React.FC<SelectLocaleProps>;
export {};
