import { useMemo } from "react";
import { DuckIcon } from "./icons";
import { Link } from "@heroui/react";

const translations: Record<string, { otherProjects: string; docs: string }> = {
  uk: { otherProjects: "інші проєкти", docs: "Документація" },
  en: { otherProjects: "other projects", docs: "Documentation" },
  es: { otherProjects: "otros proyectos", docs: "Documentación" },
  it: { otherProjects: "altri progetti", docs: "Documentazione" },
  pl: { otherProjects: "inne projekty", docs: "Dokumentacja" },
  ro: { otherProjects: "alte proiecte", docs: "Documentație" },
  cz: { otherProjects: "ostatní projekty", docs: "Dokumentace" },
};

interface Project {
  url: string;
  label: string;
  description?: string;
  icon?: string;
  is_disabled?: boolean;
  is_authorized?: boolean;
}

interface SelectProjectProps {
  projects: Project[];
  currentProject?: Project;
  activeLocale: string;
}

const SelectProject: React.FC<SelectProjectProps> = ({
  projects,
  currentProject,
  activeLocale,
}) => {
  const filteredProjects = useMemo(
    () => projects.filter((p) => p.url !== currentProject?.url),
    [projects, currentProject],
  );

  if (!currentProject) {
    return null;
  }

  return (
    <>
      <style>
        {`
        #projects {
          opacity: 0;
          max-height: 0;
        }
        #logo:hover ~ #projects, #projects:hover {
          opacity: 1;
          max-height: 1000px;
        }
      `}
      </style>
      <Link
        id="logo"
        className="no-underline flex justify-start items-center gap-2 hover:text-transparent text-[#F97316]"
        href="/"
      >
        <DuckIcon
          name={currentProject?.icon}
          className="duration-200 stroke-foreground"
        />
        <p className="text-foreground text-2xl font-bold uppercase tracking-tight">
          {currentProject?.label}
        </p>
      </Link>
      <div
        id="projects"
        className="dropdown__popover absolute top-11 -left-2 w-64 hover:opacity-100 transition-all delay-200"
      >
        <ul className="dropdown__menu flex flex-col overflow-hidden">
          <li key="label" className="text-xs leading-none p-2">
            {translations[activeLocale]?.otherProjects}
          </li>
          {filteredProjects.map((project) => (
            <li key={project.url} className="menu-item menu-item--default">
              <Link
                className="no-underline flex justify-start items-center gap-1 text-transparent hover:text-[#F97316]"
                href={project.url}
                isDisabled={project.is_disabled}
              >
                {project.icon && (
                  <DuckIcon
                    name={project.icon}
                    className="duration-200 stroke-foreground"
                  />
                )}
                <div>
                  <p className="uppercase tracking-tight font-bold text-base leading-tight text-foreground">
                    {project.label}
                  </p>
                  <p className="text-sm font-thin leading-none text-foreground">
                    {project.description}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default SelectProject;
