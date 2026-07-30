import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import DuckLoader from "../components/duck-loader";

const meta = {
  title: "Components/DuckLoader",
  component: DuckLoader,
  parameters: {
    layout: "fullscreen",
  },
  render: (args) => (
    <div style={{ height: 400 }}>
      <DuckLoader {...args} />
    </div>
  ),
} satisfies Meta<typeof DuckLoader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithProgress: Story = {
  args: {
    progress: 3,
  },
};
