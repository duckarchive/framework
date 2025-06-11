"use client";
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { AgGridReact } from "ag-grid-react";
import { themeQuartz, colorSchemeDark, } from "ag-grid-community";
import { AG_GRID_LOCALE_UK } from "../lib/ag-grid-locale-uk";
import Loader from "./duck-loader";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { Button } from "@heroui/button";
const DuckTable = forwardRef(({ appTheme = "light", columns, rows, isLoading, loadingPage, filters, activeFilterIds, setActiveFilterIds, }, ref) => {
    const agGridRef = useRef(null);
    // Optional: expose internal agGridRef to parent
    useImperativeHandle(ref, () => agGridRef.current, []);
    const agGridTheme = appTheme === "dark" ? themeQuartz.withPart(colorSchemeDark) : themeQuartz;
    const handleFilterClick = (filterId) => () => {
        const newActiveFilterIds = activeFilterIds.includes(filterId)
            ? activeFilterIds.filter((id) => id !== filterId)
            : [...activeFilterIds, filterId];
        setActiveFilterIds(newActiveFilterIds);
    };
    return (_jsxs(_Fragment, { children: [_jsx("div", { className: "flex justify-between items-center h-10", children: _jsx("div", { className: "flex gap-1", children: filters?.map((filter) => (_jsx(Button, { radius: "full", color: "primary", size: "sm", variant: activeFilterIds.includes(filter.id) ? "solid" : "bordered", onPress: handleFilterClick(filter.id), children: filter.title }, filter.id))) }) }), _jsx("div", { className: "h-96 flex-grow", children: _jsx(AgGridReact, { ref: agGridRef, theme: agGridTheme, rowData: rows, suppressMovableColumns: true, loading: isLoading, loadingOverlayComponent: () => _jsx(Loader, { progress: loadingPage }), columnDefs: columns, suppressHorizontalScroll: true, colResizeDefault: "shift", localeText: AG_GRID_LOCALE_UK, pagination: true, enableCellTextSelection: true, paginationPageSize: 50, alwaysShowVerticalScroll: true, defaultColDef: {
                        resizable: true,
                        minWidth: 100,
                        filterParams: {
                            buttons: ["clear"],
                        },
                    } }) })] }));
});
export default DuckTable;
