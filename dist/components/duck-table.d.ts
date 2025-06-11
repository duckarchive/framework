import { ColDef } from "ag-grid-community";
interface DuckTableProps<T> {
    appTheme?: "dark" | "light";
    columns: ColDef<T>[];
    rows: T[];
    isLoading?: boolean;
    loadingPage?: number;
}
declare const DuckTable: <T extends {
    id: string;
}>({ appTheme, columns, rows, isLoading, loadingPage, }: DuckTableProps<T>) => import("react/jsx-runtime").JSX.Element;
export default DuckTable;
