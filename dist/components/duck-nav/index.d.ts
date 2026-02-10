export interface DuckNavItem {
    label: string;
    path: string;
    is_authorized?: boolean;
}
interface DuckNavProps {
    siteUrl: string;
    locales?: string[];
    items: DuckNavItem[];
}
declare const DuckNav: React.FC<DuckNavProps>;
export default DuckNav;
