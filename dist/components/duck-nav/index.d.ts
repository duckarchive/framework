interface DuckNavProps {
    siteUrl: string;
    locales?: string[];
    activeLocale?: string;
    onLocaleChange?: (locale: string) => void;
}
declare const DuckNav: React.FC<DuckNavProps>;
export default DuckNav;
