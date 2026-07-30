import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ThemeSwitch } from "../../components/duck-nav/theme-switch";

const meta = {
  title: "Components/DuckNav/ThemeSwitch",
  component: ThemeSwitch,
} satisfies Meta<typeof ThemeSwitch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
