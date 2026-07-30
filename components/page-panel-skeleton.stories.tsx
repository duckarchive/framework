import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import PagePanelSkeleton from "./page-panel-skeleton";

const meta = {
  title: "Components/PagePanelSkeleton",
  component: PagePanelSkeleton,
} satisfies Meta<typeof PagePanelSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
