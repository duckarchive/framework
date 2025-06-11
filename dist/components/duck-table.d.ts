import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
interface DuckTableProps<T> {
    appTheme?: string;
    columns: ColDef<T>[];
    rows: T[];
    filters?: {
        id: string;
        title: string;
        value: any;
    }[];
    activeFilterIds: string[];
    setActiveFilterIds: (ids: string[]) => void;
    isLoading?: boolean;
    loadingPage?: number;
}
declare const DuckTable: import("react").ForwardRefExoticComponent<DuckTableProps<{
    id: string;
}> & import("react").RefAttributes<AgGridReact<{
    id: string;
}>>>;
export default DuckTable;
