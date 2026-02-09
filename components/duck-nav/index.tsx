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

// interface NavItem {
//   label: string;
//   href: string;
//   isActive?: boolean;
// }

// interface NavWithChildren extends Omit<NavItem, "href"> {
//   isActive?: boolean;
//   children: NavItem[];
// }

// const ExpandableNav: React.FC<NavWithChildren> = ({
//   label,
//   children,
//   isActive,
// }) => {
//   const [selectedKeys, setSelectedKeys] =
//     useState<AccordionProps["selectedKeys"]>();
//   return (
//     <Accordion
//       isCompact
//       selectionMode="single"
//       className="p-0"
//       variant="light"
//       defaultSelectedKeys={isActive ? [label] : undefined}
//       selectedKeys={selectedKeys}
//       onSelectionChange={setSelectedKeys}
//     >
//       <AccordionItem
//         key={label}
//         aria-label={label}
//         title={label}
//         classNames={{
//           trigger: `p-0 gap-1 w-auto`,
//           titleWrapper: `grow-0`,
//         }}
//         disableIndicatorAnimation
//         indicator={({ isOpen }) => (
//           <IoChevronDown
//             className={`${
//               isOpen ? "rotate-180" : ""
//             } transition-transform inline`}
//           />
//         )}
//       >
//         <ul className="mx-4 mt-2 flex flex-col gap-2">
//           {children.map((child) => (
//             <li key={child.href}>
//               <NavLink
//                 href={child.href}
//                 className={clsx({
//                   "underline underline-offset-4": child.isActive,
//                 })}
//               >
//                 {child.label}
//               </NavLink>
//             </li>
//           ))}
//         </ul>
//       </AccordionItem>
//     </Accordion>
//   );
// };

// const DropdownNav: React.FC<NavWithChildren> = ({
//   label,
//   children,
//   isActive,
// }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   return (
//     <Dropdown
//       key={label}
//       isOpen={isOpen}
//       onOpenChange={setIsOpen}
//       placement="bottom-start"
//       radius="sm"
//       triggerScaleOnOpen={false}
//     >
//       <DropdownTrigger className="cursor-pointer select-none">
//         <div
//           className={clsx("flex items-center gap-1", LINK_CLASS, {
//             "underline underline-offset-4": isActive,
//           })}
//         >
//           {label}
//           <IoChevronDown
//             className={`${
//               isOpen ? "rotate-180" : ""
//             } transition-transform inline`}
//           />
//         </div>
//       </DropdownTrigger>
//       <DropdownMenu aria-label={label} variant="light" color="default">
//         {children.map((child) => (
//           <DropdownItem
//             key={child.href}
//             as={NextLink}
//             href={child.href}
//             color="default"
//             className={clsx({ "underline underline-offset-4": child.isActive })}
//             classNames={{ title: LINK_CLASS }}
//           >
//             {child.label}
//           </DropdownItem>
//         ))}
//       </DropdownMenu>
//     </Dropdown>
//   );
// };

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

interface DuckNavProps {
  siteUrl: string;
  locales?: string[];
  activeLocale?: string;
}

const DuckNav: React.FC<DuckNavProps> = ({
  siteUrl,
  locales,
  activeLocale,
}) => {
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
            {currentProject?.children
              ?.filter((el: any) => {
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
          <SelectLocale
            className="hidden lg:flex"
            locales={locales}
            activeLocale={activeLocale}
          />
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
          <Divider />
          {currentProject?.children
            ?.filter((el: any) => {
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
            <SelectLocale
              locales={locales}
              activeLocale={activeLocale}
              className="w-full"
            />
          )}
        </ul>
      </NavbarMenu>
    </Navbar>
  );
};

export default DuckNav;
