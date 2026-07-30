import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import DuckNav, { DuckNavItem } from "./index";

const items: DuckNavItem[] = [
  { label: "Пошук", path: "/search" },
  { label: "Реєстр", path: "/registry" },
  { label: "Запити", path: "/requests", is_authorized: true },
];

const meta = {
  title: "Components/DuckNav",
  component: DuckNav,
  parameters: {
    layout: "fullscreen",
    nextjs: {
      appDirectory: true,
      navigation: { pathname: "/search" },
    },
  },
  args: {
    siteUrl: "https://inspector.duckarchive.com",
    locales: ["uk", "en", "pl"],
    items,
  },
} satisfies Meta<typeof DuckNav>;

export default meta;
type Story = StoryObj<typeof meta>;

// Use the "Auth" and "Theme" toolbar controls to switch between signed-in/out
// and light/dark — this story doesn't hardcode either state.
export const Default: Story = {};
