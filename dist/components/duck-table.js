"use client";
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { AgGridReact } from "ag-grid-react";
import { themeQuartz, colorSchemeDark, } from "ag-grid-community";
import { AG_GRID_LOCALE_UK } from "../lib/ag-grid-locale-uk";
import Loader from "./duck-loader";
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { Button } from "@heroui/button";
const DuckTable = forwardRef(({ appTheme = "light", columns, rows, isLoading, loadingPage, filters, activeFilterId, setActiveFilterId, }, ref) => {
    const agGridRef = useRef(null);
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
    // Optional: expose internal agGridRef to parent
    useImperativeHandle(ref, () => agGridRef.current, []);
    const agGridTheme = appTheme === "dark" ? themeQuartz.withPart(colorSchemeDark) : themeQuartz;
    const handleFilterClick = (filterId) => () => {
        console.log("click filter", filterId);
        setActiveFilterId(activeFilterId === filterId ? undefined : filterId);
    };
    return (_jsxs(_Fragment, { children: [_jsx("div", { className: "flex justify-between items-center h-10", children: _jsx("div", { className: "flex gap-1", children: filters?.map((filter) => (_jsx(Button, { radius: "full", color: "primary", size: "sm", variant: activeFilterId === filter.id ? "solid" : "bordered", onPress: handleFilterClick(filter.id), children: filter.title }, filter.id))) }) }), _jsx("div", { className: "h-96 flex-grow", children: _jsx(AgGridReact, { ref: agGridRef, theme: agGridTheme, rowData: rows, suppressMovableColumns: true, loading: isLoading, loadingOverlayComponent: () => _jsx(Loader, { progress: loadingPage }), columnDefs: columns, suppressHorizontalScroll: true, colResizeDefault: "shift", localeText: AG_GRID_LOCALE_UK, pagination: true, enableCellTextSelection: true, paginationPageSize: 50, alwaysShowVerticalScroll: true, defaultColDef: {
                        resizable: true,
                        minWidth: 100,
                        filterParams: {
                            buttons: ["clear"],
                        },
                    } }) })] }));
});
export default DuckTable;
