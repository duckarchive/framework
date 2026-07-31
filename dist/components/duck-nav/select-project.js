import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useMemo } from "react";
import { DuckIcon } from "./icons";
import { Link } from "@heroui/react";
const translations = {
    uk: { otherProjects: "інші проєкти", docs: "Документація" },
    en: { otherProjects: "other projects", docs: "Documentation" },
    es: { otherProjects: "otros proyectos", docs: "Documentación" },
    it: { otherProjects: "altri progetti", docs: "Documentazione" },
    pl: { otherProjects: "inne projekty", docs: "Dokumentacja" },
    ro: { otherProjects: "alte proiecte", docs: "Documentație" },
    cz: { otherProjects: "ostatní projekty", docs: "Dokumentace" },
};
const SelectProject = ({ projects, currentProject, activeLocale, }) => {
    const filteredProjects = useMemo(() => projects.filter((p) => p.url !== currentProject?.url), [projects, currentProject]);
    if (!currentProject) {
        return null;
    }
    return (_jsxs(_Fragment, { children: [_jsx("style", { children: `
        #projects {
          opacity: 0;
          max-height: 0;
        }
        #logo:hover ~ #projects, #projects:hover {
          opacity: 1;
          max-height: 1000px;
        }
      ` }), _jsxs(Link, { id: "logo", className: "no-underline flex justify-start items-center gap-2 hover:text-transparent text-[#F97316]", href: "/", children: [_jsx(DuckIcon, { name: currentProject?.icon, className: "duration-200 stroke-foreground" }), _jsx("p", { className: "text-foreground text-2xl font-bold uppercase tracking-tighter", children: currentProject?.label })] }), _jsx("div", { id: "projects", className: "dropdown__popover absolute top-11 -left-2 w-64 hover:opacity-100 transition-all delay-200", children: _jsxs("ul", { className: "dropdown__menu flex flex-col overflow-hidden", children: [_jsx("li", { className: "text-xs leading-none p-2", children: translations[activeLocale]?.otherProjects }, "label"), filteredProjects.map((project) => (_jsx("li", { className: "menu-item menu-item--default", children: _jsxs(Link, { className: "no-underline flex justify-start items-center gap-1 text-transparent hover:text-[#F97316]", href: project.url, isDisabled: project.is_disabled, children: [project.icon && (_jsx(DuckIcon, { name: project.icon, className: "duration-200 stroke-foreground" })), _jsxs("div", { children: [_jsx("p", { className: "uppercase tracking-tighter font-bold text-base leading-tighter text-foreground", children: project.label }), _jsx("p", { className: "text-sm font-thin leading-none text-foreground", children: project.description })] })] }) }, project.url)))] }) })] }));
};
export default SelectProject;
