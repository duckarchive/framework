"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Navbar, NavbarContent, NavbarMenu, NavbarMenuToggle, NavbarBrand, NavbarItem, NavbarMenuItem, } from "@heroui/navbar";
import { Link } from "@heroui/link";
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
const LINK_CLASS = "text-base underline-offset-4 hover:underline hover:opacity-70";
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
const NavLink = (props) => (_jsx(Link, { as: NextLink, color: "foreground", target: props.href?.startsWith("https") ? "_blank" : undefined, href: props.href, className: clsx(LINK_CLASS, props.className), ...props, children: props.children }));
const DuckNav = ({ siteUrl, locales, activeLocale, }) => {
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
    const currentProject = useMemo(() => config.projects.find((p) => p.url === originSiteUrl), [config.projects, originSiteUrl]);
    return (_jsxs(Navbar, { maxWidth: "xl", position: "sticky", isMenuOpen: isMenuOpen, onMenuOpenChange: setIsMenuOpen, children: [_jsxs(NavbarContent, { className: "basis-1/5", justify: "start", children: [_jsx(NavbarBrand, { as: "li", className: "h-full relative grow-0", children: _jsx(SelectProject, { projects: config.projects, currentProject: currentProject }) }), _jsx(NavbarItem, { className: "hidden lg:flex ml-2", children: _jsx("ul", { className: "flex gap-4 justify-start", children: currentProject?.children
                                ?.filter((el) => {
                                if (el.is_authorized) {
                                    return status === "authenticated";
                                }
                                return true;
                            })
                                .map((item) => (_jsx(NavbarItem, { isActive: pathname.startsWith(item.path), className: "px-0", children: _jsx(NavLink, { href: item.path, children: item.label }) }, item.path))) }) })] }), _jsxs(NavbarContent, { className: "basis-1 pl-4", justify: "end", children: [_jsx(Link, { isExternal: true, "aria-label": "Support Project", className: "text-default-500", href: config.links.sponsor, children: _jsx(HeartFilledIcon, { className: "text-danger" }) }), _jsx(Link, { isExternal: true, "aria-label": "Telegram Chat", className: "text-default-500", href: config.links.telegram, children: _jsx(FaTelegram, { size: 20 }) }), _jsx(ThemeSwitch, {}), locales && locales.length > 0 && (_jsx(SelectLocale, { className: "w-24 hidden lg:flex", locales: locales, activeLocale: activeLocale })), _jsx(NavbarItem, { className: "hidden lg:flex", style: {
                            colorScheme: "normal",
                        }, children: _jsx(AuthButton, {}) }), _jsx(NavbarMenuToggle, { className: "lg:hidden" })] }), _jsx(NavbarMenu, { children: _jsxs("ul", { className: "mx-4 mt-2 flex flex-col gap-2", children: [_jsx(NavbarItem, { style: {
                                colorScheme: "normal",
                            }, children: _jsx(AuthButton, { isFull: true }) }), _jsx(Divider, { className: "my-4" }), currentProject?.children
                            ?.filter((el) => {
                            if (el.is_authorized) {
                                return status === "authenticated";
                            }
                            return true;
                        })
                            .map((item) => (_jsx(NavbarMenuItem, { isActive: pathname.startsWith(item.path), children: _jsx(NavLink, { href: item.path, onPress: () => setIsMenuOpen((prev) => !prev), children: item.label }) }, `${item.label}`))), locales && locales.length > 0 && (_jsx(SelectLocale, { locales: locales, activeLocale: activeLocale, className: "w-full" }))] }) })] }));
};
export default DuckNav;
