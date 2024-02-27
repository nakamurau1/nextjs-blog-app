"use client";

import { deletePost } from "@/app/_lib/actions";
import { useFormState } from "react-dom";
import * as Dialog from "@radix-ui/react-dialog";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/DropDownMenu";
import { Button } from "@/components/Button";
import { IoIosArrowDown } from "react-icons/io";
import * as React from "react";

interface Props {
	postId: string;
}

const DeletionForm = ({ postId }: Props) => {
	const initialState = { message: "", errors: {} };
	const [state, dispatch] = useFormState(deletePost, initialState);
	const [isMounted, setIsMounted] = React.useState(false);
	// refを取得
	const triggerRef = React.useRef<HTMLButtonElement>(null);

	React.useEffect(() => {
		setIsMounted(true);
	}, []);

	// NOTE: Hydration failedの解決のため
	if (!isMounted) return null;

	return (
		<form>
			<div aria-live="polite" aria-atomic="true">
				{state.message && (
					<p className="mt-2 text-sm text-red-500">{state.message}</p>
				)}
			</div>
			<Dialog.Root>
				<Dialog.Trigger asChild ref={triggerRef}>
					<MenuButton ref={triggerRef} />
				</Dialog.Trigger>
				{/* NOTE: Hydration failedの解決のためcontainerを設定 https://github.com/radix-ui/primitives/issues/1386 */}
				<Dialog.Portal container={document.body}>
					<Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
					<Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
						<Dialog.Title className="m-0 text-xl font-bold">
							削除しますか？
						</Dialog.Title>
						<Dialog.Description className="mt-5 text-sm">
							投稿を削除しようとしています。一度削除すると元に戻すことはできません。
						</Dialog.Description>
						<div className="mt-5 flex justify-around">
							<Dialog.Close asChild>
								<Button mode="secondary">キャンセル</Button>
							</Dialog.Close>
							<Dialog.Close asChild>
								<Button
									type="submit"
									mode="secondary"
									className=" text-red-400 bg-white hover:bg-red-50 border-red-400"
									onClick={(event) => {
										// NOTE: なぜかformだとsubmitイベントが発火しないため、onClickで実行
										const formData = new FormData();
										formData.append("postId", postId);
										dispatch(formData);
									}}
								>
									削除する
								</Button>
							</Dialog.Close>
						</div>
					</Dialog.Content>
				</Dialog.Portal>
			</Dialog.Root>
		</form>
	);
};

export default DeletionForm;

const MenuButton = React.forwardRef<HTMLButtonElement>((props, ref) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button className="h-9 w-9 p-2 flex items-center justify-center z-10 rounded-full text-gray-400 hover:bg-gray-100">
					<IoIosArrowDown width={21} height={21} />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56 hover:bg-red-100" align="end">
				<DropdownMenuItem asChild className="w-full hover:bg-red-100">
					<Button {...props} ref={ref} className="text-red-600">
						削除する
					</Button>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
});
MenuButton.displayName = "MenuButton";
