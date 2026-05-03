import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "octo",
	description: "Markdownで書けるシンプルなブログサービス",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ja">
			<body
				className={`${inter.className} bg-slate-50 text-slate-950 antialiased`}
			>
				<div className="flex flex-col justify-between w-full h-full min-h-screen">
					{children}
				</div>
			</body>
		</html>
	);
}
