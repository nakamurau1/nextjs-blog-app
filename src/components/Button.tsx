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
						`bg-blue-400 text-white hover:bg-blue-500 text-sm font-bold py-2 px-4 rounded-full
            disabled:opacity-70 disabled:cursor-auto disabled:hover:bg-blue-400`,
					mode === "secondary" &&
						`bg-gray-50 text-black border-gray-300 hover:bg-gray-100 text-sm font-bold py-2 px-4 rounded-full border
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
