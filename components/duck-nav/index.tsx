"use client";

import { Link, Separator, Button, buttonVariants } from "@heroui/react";
import clsx from "clsx";
import {
  FaTelegram,
  FaWhatsapp,
  FaBars,
  FaTimes,
  FaHeart,
} from "react-icons/fa";

import { ThemeSwitch } from "./theme-switch";
import { SelectLocale } from "./select-locale";
import { useState, useEffect, useMemo } from "react";
import config from "./config.json";
import { usePathname } from "next/navigation";
import SelectProject from "./select-project";
import AuthButton from "./auth-button";
import { useSession } from "next-auth/react";

const LINK_CLASS =
  "text-base text-foreground underline-offset-4 hover:underline hover:opacity-70";

// HeroUI v3's Link has no polymorphic `as` prop (react-aria-components' Link
// always renders its own <a>). For Next.js client-side navigation, the
// consuming app must wrap its root in react-aria-components'
// `<RouterProvider navigate={router.push}>` — see README.md.
interface NavLinkProps extends React.ComponentProps<typeof Link> {
  href: string;
}

const NavLink: React.FC<NavLinkProps> = ({ className, href, ...props }) => (
  <Link
    target={href.startsWith("https") ? "_blank" : undefined}
    href={href}
    className={clsx(LINK_CLASS, className)}
    {...props}
  />
);

// v3's Button can't render as a link (no `as`/`href`), so the icon-only
// social links reuse Button's own class recipe on a real Link instead.
const ICON_LINK_CLASS = buttonVariants({
  variant: "ghost",
  size: "sm",
  isIconOnly: true,
});

export interface DuckNavItem {
  label: string;
  path: string;
  is_authorized?: boolean;
}

interface DuckNavProps {
  siteUrl: string;
  locales?: string[];
  items: DuckNavItem[];
}

const DuckNav: React.FC<DuckNavProps> = ({ siteUrl, locales, items }) => {
  const { status } = useSession();
  const originSiteUrl = siteUrl.endsWith("/") ? siteUrl.slice(0, -1) : siteUrl;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isInIframe, setIsInIframe] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Check if running inside an iframe
    setIsInIframe(window !== window.top);
  }, []);

  // get active locale from pathname
  const activeLocale = useMemo(() => {
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length > 0 && locales?.includes(segments[0])) {
      return segments[0];
    }
    return "uk"; // default locale
  }, [pathname, locales]);

  const currentProject = useMemo(
    () => config.projects.find((p) => p.url === originSiteUrl),
    [config.projects, originSiteUrl],
  );

  const visibleItems = useMemo(
    () =>
      items?.filter((item) => {
        if (item.is_authorized) {
          return status === "authenticated";
        }
        return true;
      }) ?? [],
    [items, status],
  );

  // Return null if running inside an iframe
  if (isInIframe) {
    return null;
  }

  return (
    <nav
      className={clsx(
        "flex flex-col sticky top-0 z-40 w-full bg-background/70 backdrop-blur-lg backdrop-saturate-150",
        {
          "h-screen": isMenuOpen,
        },
      )}
    >
      <div className="mx-auto w-full flex h-16 max-w-7xl items-center justify-between gap-4 px-4">
        <div className="flex basis-1/5 items-center gap-4">
          <div className="relative h-full grow-0 flex items-center">
            <SelectProject
              activeLocale={activeLocale}
              projects={config.projects}
              currentProject={currentProject}
            />
          </div>
          <ul className="hidden gap-4 lg:flex">
            {visibleItems.map((item) => (
              <li
                key={item.path}
                aria-current={
                  pathname.startsWith(item.path) ? "page" : undefined
                }
              >
                <NavLink href={item.path}>{item.label}</NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-2">
          <Link
            className={ICON_LINK_CLASS}
            aria-label="Support Project"
            href={config.links.sponsor}
            target="_blank"
            rel="noreferrer noopener"
          >
            <FaHeart className="text-danger w-6 h-6" />
          </Link>
          {locales && locales.length > 0 && (
            <SelectLocale locales={locales} activeLocale={activeLocale} />
          )}
          <div
            className="hidden lg:flex items-center gap-2"
            style={{ colorScheme: "normal" }}
          >
            <ThemeSwitch />
            <Link
              className={ICON_LINK_CLASS}
              aria-label="WhatsApp Channel"
              href={config.links.whatsapp}
              target="_blank"
              rel="noreferrer noopener"
            >
              <FaWhatsapp className="w-6 h-6" />
            </Link>
            <Link
              className={ICON_LINK_CLASS}
              aria-label="Telegram Channel"
              href={config.links.telegram}
              target="_blank"
              rel="noreferrer noopener"
            >
              <FaTelegram className="w-6 h-6" />
            </Link>
            <AuthButton activeLocale={activeLocale} />
          </div>
          <Button
            isIconOnly
            variant="ghost"
            size="sm"
            className="lg:hidden"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            onPress={() => setIsMenuOpen((prev) => !prev)}
          >
            {isMenuOpen ? (
              <FaTimes className="w-6 h-6" />
            ) : (
              <FaBars className="w-6 h-6" />
            )}
          </Button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="grow flex flex-col justify-between lg:hidden bg-background px-4 pb-4">
          <div>
            <Separator className="mb-2" />
            <ul className="flex flex-col gap-2">
              {visibleItems.map((item) => (
                <li
                  key={item.label}
                  aria-current={
                    pathname.startsWith(item.path) ? "page" : undefined
                  }
                >
                  <NavLink
                    href={item.path}
                    onPress={() => setIsMenuOpen((prev) => !prev)}
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div style={{ colorScheme: "normal" }}>
              <AuthButton activeLocale={activeLocale} />
            </div>
            <Separator className="my-2" />
            <div className="flex justify-between">
              <div className="flex gap-2">
                <Link
                  className={ICON_LINK_CLASS}
                  aria-label="WhatsApp Channel"
                  href={config.links.whatsapp}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <FaWhatsapp className="w-6 h-6" />
                </Link>
                <Link
                  className={ICON_LINK_CLASS}
                  aria-label="Telegram Channel"
                  href={config.links.telegram}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <FaTelegram className="w-6 h-6" />
                </Link>
              </div>
              <ThemeSwitch />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default DuckNav;
