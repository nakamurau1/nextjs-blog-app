import { cn } from "@/app/_lib/utils";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children?: React.ReactNode;
	mode?: "primary" | "secondary";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ children, mode, className, ...rest }, ref) => {
		return (
			<button
				type="button"
				ref={ref}
				{...rest}
				className={cn(
					mode === "primary" &&
						`bg-slate-950 text-white hover:bg-slate-800 text-sm font-bold py-2.5 px-4 rounded-md shadow-sm transition
            disabled:opacity-70 disabled:cursor-auto disabled:hover:bg-slate-950`,
					mode === "secondary" &&
						`bg-white text-slate-900 border-slate-200 hover:bg-slate-50 text-sm font-bold py-2.5 px-4 rounded-md border shadow-sm transition
            disabled:opacity-70 disabled:cursor-auto`,
					className,
				)}
			>
				{children}
			</button>
		);
	},
);
Button.displayName = "Button";
