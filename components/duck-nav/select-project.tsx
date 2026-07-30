import { useMemo } from "react";
import { DuckIcon } from "./icons";
import { Link } from "@heroui/react";

const translations: Record<string, { otherProjects: string }> = {
  uk: { otherProjects: "Інші проєкти" },
  en: { otherProjects: "Other projects" },
  es: { otherProjects: "Otros proyectos" },
  it: { otherProjects: "Altri progetti" },
  pl: { otherProjects: "Inne projekty" },
  ro: { otherProjects: "Alte proiecte" },
  cz: { otherProjects: "Ostatní projekty" },
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
        <p className="text-foreground text-2xl font-bold uppercase tracking-tight">{currentProject?.label}</p>
      </Link>
      <ul
        id="projects"
        className="absolute top-14 -left-2 flex flex-col overflow-hidden bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg hover:opacity-100 transition-all delay-200"
      >
        <li className="text-sm leading-none p-2">
          {translations[activeLocale]?.otherProjects}:
        </li>
        {filteredProjects.map((project) => (
          <li key={project.url} >
            <Link
              className="no-underline flex justify-start items-center p-2 gap-2 text-transparent hover:text-[#F97316] hover:bg-gray-100 dark:hover:bg-gray-800 py-2 rounded-none w-full"
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
                <p className="opacity-50 text-sm leading-none text-foreground">
                  {project.description}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default SelectProject;
