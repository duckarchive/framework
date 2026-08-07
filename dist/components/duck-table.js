"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { AgGridReact } from "ag-grid-react";
import { themeQuartz, colorSchemeDark, colorSchemeLight, } from "ag-grid-community";
import { AG_GRID_LOCALE_UK } from "../lib/ag-grid-locale-uk";
import Loader from "./duck-loader";
import { useEffect, useRef } from "react";
import { Button } from "@heroui/react";
const DuckTable = ({ appTheme = "light", columns, rows, isLoading, loadingPage, filters, activeFilterId, setActiveFilterId, id, persistColWidth = true, ...agGridProps }) => {
    const agGridRef = useRef(null);
    const getStorageKey = () => `duck-table-col-widths-${id}`;
    const saveColumnWidths = (event) => {
        if (!persistColWidth ||
            !id ||
            !agGridRef.current?.api ||
            event.source === "flex") {
            return;
        }
        const columnWidths = {};
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
                const widthUpdates = Object.entries(columnWidths).map(([key, newWidth]) => ({
                    key,
                    newWidth: newWidth,
                }));
                agGridRef.current?.api.setColumnWidths(widthUpdates);
            }
            catch {
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
                .setColumnFilterModel("code", filters?.find(({ id }) => id === activeFilterId)?.value)
                .then(() => {
                agGridRef.current?.api.onFilterChanged();
            });
        }
        else {
            agGridRef.current.api.setColumnFilterModel("code", null).then(() => {
                agGridRef.current?.api.onFilterChanged();
            });
        }
    }, [activeFilterId]);
    const agGridTheme = themeQuartz
        .withPart(appTheme === "dark" ? colorSchemeDark : colorSchemeLight)
        .withParams({
        wrapperBorderRadius: "var(--radius-lg, 16px)",
        columnBorder: false,
        borderColor: "var(--default, #2c2c2e)",
        backgroundColor: "transparent",
        headerColumnBorder: false,
        headerBackgroundColor: { ref: "borderColor", mix: 0.7 },
        headerTextColor: { ref: "foregroundColor", mix: 0.7 },
        headerFontFamily: "var(--font-sans, ui-sans-serif, sans-serif)",
        headerFontWeight: "var(--font-weight-medium, 500)",
        headerVerticalPaddingScale: 0.5,
        rowHoverColor: { ref: "foregroundColor", mix: 0.1 },
        menuBackgroundColor: appTheme === "dark"
            ? "var(--color-neutral-900, #1f2123)"
            : "var(--color-white, #ffffff)",
        chromeBackgroundColor: appTheme === "dark"
            ? "var(--color-neutral-900, #1f2123)"
            : "var(--color-white, #ffffff)",
        fontFamily: "var(--font-mono, ui-monospace, monospace)",
        fontSize: "var(--text-sm, 14px)",
        spacing: 10,
        cellHorizontalPadding: "calc(var(--spacing, 0.25rem) * 2)",
    });
    const handleFilterClick = (filterId) => () => {
        console.log("click filter", filterId);
        setActiveFilterId(activeFilterId === filterId ? undefined : filterId);
    };
    return (_jsxs(_Fragment, { children: [filters && filters.length > 0 && (_jsx("div", { className: "flex justify-between items-center h-10", children: _jsx("div", { className: "flex gap-1", children: filters.map((filter) => (_jsx(Button, { 
                        // v3 Button has no `color`/`radius`: the accent fill comes from
                        // variant="primary", the pill shape from a utility class.
                        className: "rounded-full", size: "sm", variant: activeFilterId === filter.id ? "primary" : "outline", onPress: handleFilterClick(filter.id), children: filter.title }, filter.id))) }) })), _jsxs("div", { className: "h-96 flex-grow duck-table", children: [_jsx("style", { children: `
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
            border: 1px solid var(--ag-border-color);
            border-radius: var(--radius-2xl, 16px);
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
        ` }), _jsx(AgGridReact, { ref: agGridRef, theme: agGridTheme, rowData: rows, suppressMovableColumns: true, loading: isLoading, loadingOverlayComponent: () => _jsx(Loader, { progress: loadingPage }), columnDefs: columns, suppressHorizontalScroll: true, colResizeDefault: "shift", localeText: AG_GRID_LOCALE_UK, pagination: true, enableCellTextSelection: true, paginationPageSize: 50, alwaysShowVerticalScroll: true, onColumnResized: saveColumnWidths, defaultColDef: {
                            resizable: true,
                            minWidth: 100,
                            filterParams: {
                                buttons: ["reset"],
                            },
                        }, ...agGridProps })] })] }));
};
export default DuckTable;
