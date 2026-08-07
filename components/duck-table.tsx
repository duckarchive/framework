"use client";

import { AgGridReact } from "ag-grid-react";
import {
  ColDef,
  ITextFilterParams,
  themeQuartz,
  colorSchemeDark,
  colorSchemeLight,
  GridOptions,
  ColumnResizedEvent,
} from "ag-grid-community";
import { AG_GRID_LOCALE_UK } from "../lib/ag-grid-locale-uk";
import Loader from "./duck-loader";
import { useEffect, useRef } from "react";
import { Button } from "@heroui/react";

const BORDER_RADIUS = "var(--radius-lg, 16px)";

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

  const saveColumnWidths = (event: ColumnResizedEvent<T, any>) => {
    if (
      !persistColWidth ||
      !id ||
      !agGridRef.current?.api ||
      event.source === "flex"
    ) {
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
    setTimeout(() => {
      restoreColumnWidths();
    }, 100);
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

  const agGridTheme = themeQuartz
    .withPart(appTheme === "dark" ? colorSchemeDark : colorSchemeLight)
    .withParams({
      wrapperBorderRadius: BORDER_RADIUS,
      columnBorder: false,
      borderColor: "var(--default, #2c2c2e)",
      backgroundColor: "transparent",
      fontFamily: "var(--font-mono, ui-monospace, monospace)",
      fontSize: "var(--text-sm, 14px)",
      spacing: 10,
      
      headerBackgroundColor: { ref: "borderColor", mix: 0.5 },
      headerTextColor: { ref: "foregroundColor", mix: 0.7 },
      headerFontFamily: "var(--font-sans, ui-sans-serif, sans-serif)",
      headerFontWeight: "var(--font-weight-medium, 500)",
      headerVerticalPaddingScale: 0.5,

      rowHoverColor: { ref: "foregroundColor", mix: 0.1 },
      cellHorizontalPadding: "calc(var(--spacing, 0.25rem) * 2)",
    });

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
                // v3 Button has no `color`/`radius`: the accent fill comes from
                // variant="primary", the pill shape from a utility class.
                className="rounded-full"
                size="sm"
                variant={activeFilterId === filter.id ? "primary" : "outline"}
                onPress={handleFilterClick(filter.id)}
              >
                {filter.title}
              </Button>
            ))}
          </div>
        </div>
      )}
      <div className="h-96 flex-grow duck-table">
        <style>{`
          .duck-table .ag-root-wrapper {
            background-color: var(--ag-header-background-color);
          }
          .duck-table .ag-cell {
            display: flex;
            align-items: center;
          }
          .duck-table .ag-cell-wrapper > .ag-cell-value > *,
          .duck-table .ag-cell-wrapper > .ag-cell-value {
            font-size: var(--text-sm, 14px);
            line-height: 1.1;
          }
          .duck-table .ag-paging-panel {
            gap: calc(var(--ag-spacing) * 2);
            font-family: var(--font-sans, ui-sans-serif, sans-serif);
            color: var(--ag-header-text-color);
            font-size: var(--ag-header-font-size);
            font-weight: var(--ag-header-font-weight);
            height: var(--ag-header-height);
            background-color: var(--ag-header-background-color);
            box-shadow: none;
          }
          .duck-table .ag-paging-page-size .ag-picker-field-wrapper {
            height: auto;
            min-height: 0;
            padding: calc(var(--spacing, 0.25rem) * 1) calc(var(--spacing, 0.25rem) * 2);
          }
          .duck-table .ag-menu,
          .duck-table .ag-list,
          .duck-table .ag-select-list {
            font-family: var(--font-sans, ui-sans-serif, sans-serif);
            border: none;
            background-color: var(--overlay);
            border-radius: ${BORDER_RADIUS};
            overflow: hidden;
            box-shadow: var(--shadow-overlay);
          }
          @media (max-width: 767px) {
            .duck-table .ag-paging-panel {
              justify-content: center !important;
            }
            .duck-table .ag-paging-panel .ag-paging-page-size {
              display: none;
            }
            .duck-table .ag-paging-panel .ag-paging-row-summary-panel {
              display: none;
            }
          }
        `}</style>
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
