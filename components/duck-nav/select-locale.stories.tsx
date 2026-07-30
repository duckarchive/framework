import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SelectLocale } from "./select-locale";

const meta = {
  title: "Components/DuckNav/SelectLocale",
  component: SelectLocale,
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: { pathname: "/uk/search" },
    },
  },
  args: {
    locales: ["uk", "en", "pl", "cz", "ro", "es", "it"],
    activeLocale: "uk",
  },
} satisfies Meta<typeof SelectLocale>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const English: Story = {
  args: {
    activeLocale: "en",
  },
};
