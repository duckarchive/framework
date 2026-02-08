"use client";
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { AgGridReact } from "ag-grid-react";
import { themeQuartz, colorSchemeDark, } from "ag-grid-community";
import { AG_GRID_LOCALE_UK } from "../lib/ag-grid-locale-uk";
import Loader from "./duck-loader";
import { useEffect, useRef } from "react";
import { Button } from "@heroui/button";
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
    const agGridTheme = appTheme === "dark" ? themeQuartz.withPart(colorSchemeDark) : themeQuartz;
    const handleFilterClick = (filterId) => () => {
        console.log("click filter", filterId);
        setActiveFilterId(activeFilterId === filterId ? undefined : filterId);
    };
    return (_jsxs(_Fragment, { children: [filters && filters.length > 0 && (_jsx("div", { className: "flex justify-between items-center h-10", children: _jsx("div", { className: "flex gap-1", children: filters.map((filter) => (_jsx(Button, { radius: "full", color: "primary", size: "sm", variant: activeFilterId === filter.id ? "solid" : "bordered", onPress: handleFilterClick(filter.id), children: filter.title }, filter.id))) }) })), _jsx("div", { className: "h-96 flex-grow", children: _jsx(AgGridReact, { ref: agGridRef, theme: agGridTheme, rowData: rows, suppressMovableColumns: true, loading: isLoading, loadingOverlayComponent: () => _jsx(Loader, { progress: loadingPage }), columnDefs: columns, suppressHorizontalScroll: true, colResizeDefault: "shift", localeText: AG_GRID_LOCALE_UK, pagination: true, enableCellTextSelection: true, paginationPageSize: 50, alwaysShowVerticalScroll: true, onColumnResized: saveColumnWidths, defaultColDef: {
                        resizable: true,
                        minWidth: 100,
                        filterParams: {
                            buttons: ["reset"],
                        },
                    }, ...agGridProps }) })] }));
};
export default DuckTable;
