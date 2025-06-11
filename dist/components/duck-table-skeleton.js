"use client";
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Skeleton } from "@heroui/skeleton";
const DuckTableSkeleton = ({ withFilters }) => (_jsxs("div", { className: "flex flex-col grow items-start gap-2", children: [_jsx("div", { className: "h-10 w-full flex items-center gap-2", children: withFilters && (_jsxs(_Fragment, { children: [_jsx(Skeleton, { className: "rounded-xl h-8 w-32" }), _jsx(Skeleton, { className: "rounded-xl h-8 w-32" }), _jsx(Skeleton, { className: "rounded-xl h-8 w-32" })] })) }), _jsx(Skeleton, { className: "rounded-lg h-96 flex-grow w-full" })] }));
export default DuckTableSkeleton;
