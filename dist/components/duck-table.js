"use client";
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { AgGridReact } from "ag-grid-react";
import { themeQuartz, colorSchemeDark } from "ag-grid-community";
import { AG_GRID_LOCALE_UK } from "../lib/ag-grid-locale-uk";
import Loader from "./duck-loader";
const DuckTable = ({ appTheme = "light", columns, rows, isLoading, loadingPage, }) => {
    const agGridTheme = appTheme === "dark" ? themeQuartz.withPart(colorSchemeDark) : themeQuartz;
    return (_jsxs(_Fragment, { children: [_jsx("div", { className: "flex justify-between items-center h-10" }), _jsx("div", { className: "h-96 flex-grow", children: _jsx(AgGridReact, { theme: agGridTheme, rowData: rows, suppressMovableColumns: true, loading: isLoading, loadingOverlayComponent: () => _jsx(Loader, { progress: loadingPage }), columnDefs: columns, suppressHorizontalScroll: true, colResizeDefault: "shift", localeText: AG_GRID_LOCALE_UK, pagination: true, enableCellTextSelection: true, paginationPageSize: 50, alwaysShowVerticalScroll: true, defaultColDef: {
                        resizable: true,
                        minWidth: 100,
                        filterParams: {
                            buttons: ["clear"],
                        },
                    } }) })] }));
};
export default DuckTable;
