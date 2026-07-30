import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import AuthButton from "../../components/duck-nav/auth-button";

const meta = {
  title: "Components/DuckNav/AuthButton",
  component: AuthButton,
  args: {
    activeLocale: "uk",
  },
} satisfies Meta<typeof AuthButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// Use the "Auth" toolbar control to switch between signed-in/out.
export const Default: Story = {};

export const Full: Story = {
  args: {
    isFull: true,
  },
};
