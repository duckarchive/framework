"use client";

import {
  Navbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Link, LinkProps } from "@heroui/link";
import NextLink from "next/link";
import clsx from "clsx";
import { FaTelegram } from "react-icons/fa";

import { ThemeSwitch } from "./theme-switch";
import { HeartFilledIcon } from "./icons";
import { SelectLocale } from "./select-locale";
import { useState, useEffect, useMemo } from "react";
import config from "./config.json";
import { usePathname } from "next/navigation";
import SelectProject from "./select-project";
import { Divider } from "@heroui/divider";
import AuthButton from "./auth-button";
import { useSession } from "next-auth/react";

const LINK_CLASS =
  "text-base underline-offset-4 hover:underline hover:opacity-70";

const NavLink: React.FC<LinkProps> = (props) => (
  <Link
    as={NextLink}
    color="foreground"
    target={props.href?.startsWith("https") ? "_blank" : undefined}
    href={props.href}
    className={clsx(LINK_CLASS, props.className)}
    {...props}
  >
    {props.children}
  </Link>
);

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

  // Return null if running inside an iframe
  if (isInIframe) {
    return null;
  }

  const currentProject = useMemo(
    () => config.projects.find((p) => p.url === originSiteUrl),
    [config.projects, originSiteUrl],
  );

  return (
    <Navbar
      maxWidth="xl"
      position="sticky"
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent className="basis-1/5" justify="start">
        <NavbarBrand as="li" className="h-full relative grow-0">
          <SelectProject
            projects={config.projects}
            currentProject={currentProject}
          />
        </NavbarBrand>
        <NavbarItem className="hidden lg:flex ml-2">
          <ul className="flex gap-4 justify-start">
            {items
              ?.filter((el: DuckNavItem) => {
                if (el.is_authorized) {
                  return status === "authenticated";
                }
                return true;
              })
              .map((item) => (
                <NavbarItem
                  key={item.path}
                  isActive={pathname.startsWith(item.path)}
                  className="px-0"
                >
                  <NavLink href={item.path}>{item.label}</NavLink>
                </NavbarItem>
              ))}
          </ul>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="basis-1 pl-4" justify="end">
        <Link
          isExternal
          aria-label="Support Project"
          className="text-default-500"
          href={config.links.sponsor}
        >
          <HeartFilledIcon className="text-danger" />
        </Link>
        <Link
          isExternal
          aria-label="Telegram Chat"
          className="text-default-500"
          href={config.links.telegram}
        >
          <FaTelegram size={20} />
        </Link>
        <ThemeSwitch />
        {locales && locales.length > 0 && (
          <SelectLocale className="w-24 hidden lg:flex" locales={locales} />
        )}
        <NavbarItem
          className="hidden lg:flex"
          style={{
            colorScheme: "normal",
          }}
        >
          <AuthButton />
        </NavbarItem>
        <NavbarMenuToggle className="lg:hidden" />
      </NavbarContent>

      <NavbarMenu>
        <ul className="mx-4 mt-2 flex flex-col gap-2">
          <NavbarItem
            style={{
              colorScheme: "normal",
            }}
          >
            <AuthButton isFull />
          </NavbarItem>
          <Divider className="my-4" />
          {items
            ?.filter((el: DuckNavItem) => {
              if (el.is_authorized) {
                return status === "authenticated";
              }
              return true;
            })
            .map((item) => (
              <NavbarMenuItem
                key={`${item.label}`}
                isActive={pathname.startsWith(item.path)}
              >
                <NavLink
                  href={item.path}
                  onPress={() => setIsMenuOpen((prev) => !prev)}
                >
                  {item.label}
                </NavLink>
              </NavbarMenuItem>
            ))}
          {locales && locales.length > 0 && (
            <SelectLocale locales={locales} className="w-full" />
          )}
        </ul>
      </NavbarMenu>
    </Navbar>
  );
};

export default DuckNav;
