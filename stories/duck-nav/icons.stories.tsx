import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DuckIcon } from "../../components/duck-nav/icons";

const ICON_NAMES = ["inspector", "map", "key", "egg", "lake", "foot", "spravna", "dev"];

// Several icons (key, inspector's outer circle, map's meridians) are drawn as
// unfilled outlines, so they are only visible when the caller supplies a stroke
// color — DuckNav does this via `stroke-foreground`. Without it those shapes
// compute to `fill: none; stroke: none` and disappear entirely, so every story
// here mirrors DuckNav's own class list.
const ICON_CLASS = "w-9 h-9 stroke-foreground";

const meta = {
  title: "Components/DuckNav/DuckIcon",
  component: DuckIcon,
  args: {
    name: "inspector",
    className: ICON_CLASS,
  },
} satisfies Meta<typeof DuckIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

// `text-primary` colors the `currentColor` fills separately from the
// `stroke-foreground` outlines, so overlapping fill and stroke details (e.g.
// map's meridians over its filled circle) stay distinguishable for review.
export const AllIcons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-6 text-primary">
      {ICON_NAMES.map((name) => (
        <div key={name} className="flex flex-col items-center gap-1">
          <DuckIcon name={name} className={ICON_CLASS} />
          <span className="text-xs text-foreground">{name}</span>
        </div>
      ))}
    </div>
  ),
};

// How the icons actually look inside DuckNav: the stroke follows the
// foreground color while the `currentColor` fills stay transparent until the
// surrounding link is hovered, at which point they turn brand orange.
export const NavbarHoverColors: Story = {
  render: () => (
    <div className="flex flex-wrap gap-6">
      {ICON_NAMES.map((name) => (
        <a
          key={name}
          href="#"
          className="flex flex-col items-center gap-1 text-transparent hover:text-[#F97316]"
        >
          <DuckIcon name={name} className={`${ICON_CLASS} duration-200`} />
          <span className="text-xs text-foreground">{name}</span>
        </a>
      ))}
    </div>
  ),
};
