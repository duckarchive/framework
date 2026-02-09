interface SelectLocaleProps {
    locales: string[];
    activeLocale?: string;
    onLocaleChange?: (locale: string) => void;
}
export declare const SelectLocale: React.FC<SelectLocaleProps>;
export {};
