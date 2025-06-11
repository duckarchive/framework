"use client";

import { AgGridReact } from "ag-grid-react";
import { ColDef, ITextFilterParams, themeQuartz, colorSchemeDark } from "ag-grid-community";
import { AG_GRID_LOCALE_UK } from "../lib/ag-grid-locale-uk";
import Loader from "./duck-loader";

interface DuckTableProps<T> {
  appTheme?: string;
  columns: ColDef<T>[];
  rows: T[];
  isLoading?: boolean;
  loadingPage?: number;
}

const DuckTable = <T extends { id: string }>({
  appTheme = "light",
  columns,
  rows,
  isLoading,
  loadingPage,
}: DuckTableProps<T>) => {
  const agGridTheme = appTheme === "dark" ? themeQuartz.withPart(colorSchemeDark) : themeQuartz;

  return (
    <>
      <div className="flex justify-between items-center h-10">
      </div>
      <div className="h-96 flex-grow">
        <AgGridReact
          theme={agGridTheme}
          rowData={rows}
          suppressMovableColumns
          loading={isLoading}
          loadingOverlayComponent={() => <Loader progress={loadingPage} />}
          columnDefs={columns}
          suppressHorizontalScroll
          colResizeDefault="shift"
          localeText={AG_GRID_LOCALE_UK}
          pagination
          enableCellTextSelection
          paginationPageSize={50}
          alwaysShowVerticalScroll
          defaultColDef={{
            resizable: true,
            minWidth: 100,
            filterParams: {
              buttons: ["clear"],
            } as ITextFilterParams,
          }}
        />
      </div>
    </>
  );
};

export default DuckTable;
