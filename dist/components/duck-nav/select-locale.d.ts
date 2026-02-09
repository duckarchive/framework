import { SelectProps } from "@heroui/select";
interface SelectLocaleProps extends Partial<SelectProps> {
    locales: string[];
    activeLocale?: string;
}
export declare const SelectLocale: React.FC<SelectLocaleProps>;
export {};
