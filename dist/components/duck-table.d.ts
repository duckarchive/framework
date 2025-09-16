import { ColDef, GridOptions } from "ag-grid-community";
interface DuckTableProps<T> extends GridOptions<T> {
    appTheme?: string;
    columns: ColDef<T>[];
    rows: T[];
    filters?: {
        id: string;
        title: string;
        value: any;
    }[];
    activeFilterId?: string;
    setActiveFilterId: (id: string | undefined) => void;
    isLoading?: boolean;
    loadingPage?: number;
}
declare const DuckTable: <T>({ appTheme, columns, rows, isLoading, loadingPage, filters, activeFilterId, setActiveFilterId, ...agGridProps }: DuckTableProps<T>) => import("react/jsx-runtime").JSX.Element;
export default DuckTable;
