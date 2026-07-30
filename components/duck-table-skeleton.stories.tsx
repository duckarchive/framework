import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import DuckTableSkeleton from "./duck-table-skeleton";

const meta = {
  title: "Components/DuckTableSkeleton",
  component: DuckTableSkeleton,
  parameters: {
    layout: "fullscreen",
  },
  render: (args) => (
    <div style={{ height: 400 }} className="flex">
      <DuckTableSkeleton {...args} />
    </div>
  ),
} satisfies Meta<typeof DuckTableSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithFilters: Story = {
  args: {
    withFilters: true,
  },
};
