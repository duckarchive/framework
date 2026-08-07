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
      wrapperBorder: false,
      headerRowBorder: false,
      columnBorder: false,
      headerColumnBorder: false,
      rowBorder: { style: "solid", width: 1, color: { ref: "borderColor" } },
      borderColor: { ref: "foregroundColor", mix: 0.1 },
      backgroundColor: "transparent",
      headerBackgroundColor: { ref: "foregroundColor", mix: 0.07 },
      headerTextColor: { ref: "foregroundColor", mix: 0.7 },
      rowHoverColor: { ref: "foregroundColor", mix: 0.1 },
      menuBackgroundColor:
        appTheme === "dark"
          ? "var(--color-neutral-900, #1f2123)"
          : "var(--color-white, #ffffff)",
      chromeBackgroundColor:
        appTheme === "dark"
          ? "var(--color-neutral-900, #1f2123)"
          : "var(--color-white, #ffffff)",
      fontFamily: "var(--font-mono, ui-monospace, monospace)",
      headerFontFamily: "var(--font-sans, ui-sans-serif, sans-serif)",
      fontSize: "var(--text-sm, 14px)",
      headerFontSize: "var(--text-xs, 13px)",
      headerFontWeight: "var(--font-weight-medium, 500)",
      headerVerticalPaddingScale: 0.5,
      spacing: 10,
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
          .duck-table .ag-cell {
            display: flex;
            align-items: center;
          }
          .duck-table .ag-cell-wrapper > .ag-cell-value > *,
          .duck-table .ag-cell-wrapper > .ag-cell-value {
            font-size: var(--text-sm, 14px);
            line-height: 1.1;
          }
          .duck-table .ag-header {
            border-radius: min(32px, var(--radius-3xl, 32px));
          }
          .duck-table .ag-paging-panel {
            font-family: var(--font-sans, ui-sans-serif, sans-serif);
            color: var(--ag-header-text-color);
            font-size: var(--ag-header-font-size);
            font-weight: var(--ag-header-font-weight);
            border-radius: min(32px, var(--radius-3xl, 32px));
            height: var(--ag-header-height);
            background-color: var(--ag-header-background-color);
            border-top: none;
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
            border: 1px solid var(--ag-border-color);
            border-radius: min(16px, var(--radius-2xl, 16px));
            background-color: var(--ag-menu-background-color);
            overflow: hidden;
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
