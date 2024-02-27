import * as ReactSwitch from "@radix-ui/react-switch";
import clsx from "clsx";
import React from "react";
import { Control, Controller } from "react-hook-form";

const Switch = ({
	control,
	name,
	label,
}: {
	// biome-ignore lint:
	control: Control<any>;
	name: string;
	label: string;
}) => {
	return (
		<Controller
			name={name}
			control={control}
			render={({ field }) => {
				const { value, ...otherFields } = field;

				return (
					<>
						<ReactSwitch.Root
							className="w-[42px] h-[25px] bg-gray-400 rounded-full relative data-[state=checked]:bg-blue-400 outline-none cursor-pointer"
							{...otherFields}
							defaultChecked={value}
							checked={value}
							value={value.toString()}
							onCheckedChange={(checked) => {
								field.onChange(checked);
							}}
						>
							<ReactSwitch.Thumb className="block w-[21px] h-[21px] bg-white rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]" />
						</ReactSwitch.Root>
						<label
							className={clsx(
								"ml-1 font-bold text-[15px] leading-none",
								value ? "text-black" : "text-gray-500",
							)}
						>
							{label}
						</label>
					</>
				);
			}}
		/>
	);
};

export default Switch;
