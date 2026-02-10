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
declare const SelectProject: React.FC<SelectProjectProps>;
export default SelectProject;
