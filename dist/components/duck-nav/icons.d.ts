import { SVGProps } from "react";
interface IconSvgProps extends SVGProps<SVGSVGElement> {
    size?: number;
}
export declare const HeartFilledIcon: ({ size, width, height, ...props }: IconSvgProps) => import("react/jsx-runtime").JSX.Element;
export declare const MoonFilledIcon: ({ size, width, height, ...props }: IconSvgProps) => import("react/jsx-runtime").JSX.Element;
export declare const SunFilledIcon: ({ size, width, height, ...props }: IconSvgProps) => import("react/jsx-runtime").JSX.Element;
export declare const DuckIcon: React.FC<{
    name?: string;
} & IconSvgProps>;
export {};
