import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DuckIcon } from "./icons";

const ICON_NAMES = ["inspector", "map", "key", "egg", "lake", "foot", "spravna", "dev"];

const meta = {
  title: "Components/DuckNav/DuckIcon",
  component: DuckIcon,
  args: {
    name: "inspector",
    className: "w-9 h-9",
  },
} satisfies Meta<typeof DuckIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AllIcons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-6">
      {ICON_NAMES.map((name) => (
        <div key={name} className="flex flex-col items-center gap-1">
          <DuckIcon name={name} className="w-9 h-9" />
          <span className="text-xs">{name}</span>
        </div>
      ))}
    </div>
  ),
};
