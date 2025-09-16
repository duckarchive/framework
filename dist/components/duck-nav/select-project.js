import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useMemo } from "react";
import { DuckIcon } from "./icons";
import NextLink from "next/link";
import { Link } from "@heroui/link";
const SelectProject = ({ projects, currentProject }) => {
    const filteredProjects = useMemo(() => projects.filter((p) => p.url !== currentProject?.url), [projects, currentProject]);
    return (_jsxs(_Fragment, { children: [_jsx("style", { children: `
        #projects {
          opacity: 0;
          max-height: 0;
        }
        #logo:hover ~ #projects, #projects:hover {
          opacity: 1;
          max-height: 1000px;
        }
      ` }), _jsxs(Link, { as: NextLink, id: "logo", className: "flex justify-start items-center gap-2 text-transparent hover:text-[#F97316]", href: "/", children: [_jsx(DuckIcon, { name: currentProject?.icon, className: "duration-200 stroke-foreground" }), _jsx("p", { className: "font-bold text-foreground", children: currentProject?.label })] }), _jsxs("ul", { id: "projects", className: "absolute top-14 -left-2 flex flex-col overflow-hidden bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg hover:opacity-100 transition-all delay-200", children: [_jsx("li", { className: "text-sm leading-none p-2", children: "\u0456\u043D\u0448\u0456 \u043F\u0440\u043E\u0454\u043A\u0442\u0438:" }), filteredProjects.map((project) => (_jsx("li", { children: _jsxs(Link, { as: NextLink, className: "flex justify-start items-center p-2 gap-2 text-transparent hover:text-[#F97316] hover:bg-gray-100 dark:hover:bg-gray-800 py-2 rounded-lg", href: project.url, isDisabled: project.is_disabled, children: [project.icon && _jsx(DuckIcon, { name: project.icon, className: "duration-200 stroke-foreground" }), _jsxs("div", { children: [_jsx("p", { className: "font-medium text-base leading-tight text-foreground", children: project.label }), _jsx("p", { className: "opacity-80 text-sm leading-none text-foreground", children: project.description })] })] }) }, project.url)))] })] }));
};
export default SelectProject;
