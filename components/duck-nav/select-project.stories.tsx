import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import SelectProject from "./select-project";

const projects = [
  {
    label: "Інспектор",
    icon: "inspector",
    url: "https://inspector.duckarchive.com",
    description: "Міжархівний пошук справ",
  },
  {
    label: "Мапа",
    icon: "map",
    url: "https://map.duckarchive.com",
    description: "Історичні кордони",
  },
  {
    label: "Лапка",
    icon: "foot",
    url: "https://foot.duckarchive.com",
    description: "Допоміжні інструменти",
  },
  {
    label: "Моя качка",
    icon: "egg",
    url: "https://duckarchive.com",
    description: "Персональний кабінет",
  },
];

const meta = {
  title: "Components/DuckNav/SelectProject",
  component: SelectProject,
  args: {
    projects,
    currentProject: projects[0],
    activeLocale: "uk",
  },
} satisfies Meta<typeof SelectProject>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const NoCurrentProject: Story = {
  args: {
    currentProject: undefined,
  },
};
