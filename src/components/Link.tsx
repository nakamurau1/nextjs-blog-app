import NextLink from "next/link";
import React from "react";
import { cn } from "@/app/_lib/utils";

interface Props extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
	children?: React.ReactNode;
	href: string;
	mode?: "primary";
}

export const Link = React.forwardRef<HTMLAnchorElement, Props>(
	({ children, href, mode, className, ...rest }, ref) => {
		return (
			<NextLink
				href={href}
				ref={ref}
				className={cn(
					mode === "primary" &&
						"bg-slate-950 hover:bg-slate-800 text-white text-sm font-bold py-2.5 px-4 rounded-md shadow-sm transition",
					className,
				)}
				{...rest}
			>
				{children}
			</NextLink>
		);
	},
);

Link.displayName = "Link";
