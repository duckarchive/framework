"use client";

import { AgGridReact } from "ag-grid-react";
import {
  ColDef,
  ITextFilterParams,
  themeQuartz,
  colorSchemeDark,
  GridOptions,
} from "ag-grid-community";
import { AG_GRID_LOCALE_UK } from "../lib/ag-grid-locale-uk";
import Loader from "./duck-loader";
import { useEffect, useRef } from "react";
import { Button } from "@heroui/button";

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
  id?: string;
  persistColWidth?: boolean;
}

const DuckTable = <T,>({
  appTheme = "light",
  columns,
  rows,
  isLoading,
  loadingPage,
  filters,
  activeFilterId,
  setActiveFilterId,
  id,
  persistColWidth = true,
  ...agGridProps
}: DuckTableProps<T>) => {
  const agGridRef = useRef<AgGridReact<T>>(null);

  const getStorageKey = () => `duck-table-col-widths-${id}`;

  const saveColumnWidths = () => {
    if (!persistColWidth || !id || !agGridRef.current?.api) {
      return;
    }
    const columnWidths: Record<string, number> = {};
    agGridRef.current.api.getColumns()?.forEach((col) => {
      const columnId = col.getColId();
      const width = col.getActualWidth();
      columnWidths[columnId] = width;
    });
    localStorage.setItem(getStorageKey(), JSON.stringify(columnWidths));
  };

  const restoreColumnWidths = () => {
    if (!persistColWidth || !id || !agGridRef.current?.api) {
      return;
    }
    const stored = localStorage.getItem(getStorageKey());
    if (stored) {
      try {
        const columnWidths = JSON.parse(stored);
        const widthUpdates = Object.entries(columnWidths).map(
          ([key, newWidth]) => ({
            key,
            newWidth: newWidth as number,
          }),
        );
        agGridRef.current?.api.setColumnWidths(widthUpdates);
      } catch {
        // If parsing fails, silently skip restoration
      }
    }
  };

  useEffect(() => {
    restoreColumnWidths();
  }, [id, persistColWidth]);

  useEffect(() => {
    if (!agGridRef.current?.api) {
      return;
    }
    if (activeFilterId) {
      agGridRef.current.api
        .setColumnFilterModel(
          "code",
          filters?.find(({ id }) => id === activeFilterId)?.value,
        )
        .then(() => {
          agGridRef.current?.api.onFilterChanged();
        });
    } else {
      agGridRef.current.api.setColumnFilterModel("code", null).then(() => {
        agGridRef.current?.api.onFilterChanged();
      });
    }
  }, [activeFilterId]);

  const agGridTheme =
    appTheme === "dark" ? themeQuartz.withPart(colorSchemeDark) : themeQuartz;

  const handleFilterClick = (filterId: string) => () => {
    console.log("click filter", filterId);
    setActiveFilterId(activeFilterId === filterId ? undefined : filterId);
  };

  return (
    <>
      {filters && filters.length > 0 && (
        <div className="flex justify-between items-center h-10">
          <div className="flex gap-1">
            {filters.map((filter) => (
              <Button
                key={filter.id}
                radius="full"
                color="primary"
                size="sm"
                variant={activeFilterId === filter.id ? "solid" : "bordered"}
                onPress={handleFilterClick(filter.id)}
              >
                {filter.title}
              </Button>
            ))}
          </div>
        </div>
      )}
      <div className="h-96 flex-grow">
        <AgGridReact
          ref={agGridRef}
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
          onColumnResized={saveColumnWidths}
          defaultColDef={{
            resizable: true,
            minWidth: 100,
            filterParams: {
              buttons: ["reset"],
            } as ITextFilterParams,
          }}
          {...agGridProps}
        />
      </div>
    </>
  );
};
export default DuckTable;
