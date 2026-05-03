"use client";

import "zenn-content-css";
import markdownToHtml from "zenn-markdown-html";

const MarkdownView = ({ markdown }: { markdown: string }) => {
	// markdownをhtmlに変換する
	const html = markdownToHtml(markdown);

	return (
		<div
			className="znc flex-1 w-full min-h-[300px] border-none bg-white px-0 py-2 outline-0 resize-none relative"
			// biome-ignore lint:
			dangerouslySetInnerHTML={{
				__html: html,
			}}
		/>
	);
};

export default MarkdownView;
