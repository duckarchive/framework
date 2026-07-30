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
  parameters: {
    layout: "fullscreen",
  },
  args: {
    projects,
    currentProject: projects[0],
    activeLocale: "uk",
  },
  // The project list is `absolute top-14 -left-2`, so it needs a positioned
  // ancestor to anchor to. In the app that comes from DuckNav's NavbarBrand
  // (`h-full relative grow-0`); without an equivalent wrapper here the list
  // anchors to <body> instead and lands at left:-8px — clipped off the left
  // edge of the canvas and detached from the logo. The wrapper being a flex
  // row also keeps the logo link at its content width instead of stretching
  // across the canvas, and its width sets the shrink-to-fit width of the
  // absolute list (~14rem here reproduces the ~221px it gets in the navbar).
  decorators: [
    (Story) => (
      <div className="min-h-72 p-4">
        <div className="h-16 flex items-center">
          <div className="relative h-full w-56 flex items-center">
            <Story />
          </div>
        </div>
      </div>
    ),
  ],
} satisfies Meta<typeof SelectProject>;

export default meta;
type Story = StoryObj<typeof meta>;

// Hover the logo to reveal the other-projects list (pure CSS: `#logo:hover ~ #projects`).
export const Default: Story = {};

export const NoCurrentProject: Story = {
  args: {
    currentProject: undefined,
  },
};
