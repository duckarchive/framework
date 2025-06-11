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
    activeFilterId?: string;
    setActiveFilterId: (id: string | undefined) => void;
    isLoading?: boolean;
    loadingPage?: number;
}
declare const DuckTable: import("react").ForwardRefExoticComponent<DuckTableProps<unknown> & import("react").RefAttributes<AgGridReact<unknown>>>;
export default DuckTable;
