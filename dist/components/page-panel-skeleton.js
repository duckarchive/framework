"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Skeleton } from "@heroui/skeleton";
const PagePanelSkeleton = () => (_jsx("div", { className: "flex-col md:flex-row flex justify-between gap-4", children: _jsxs("div", { className: "flex flex-col grow items-start gap-2 py-1", children: [_jsx(Skeleton, { className: "rounded-lg h-5 w-1/4" }), _jsx(Skeleton, { className: "rounded-lg h-4 w-1/3" })] }) }));
export default PagePanelSkeleton;
