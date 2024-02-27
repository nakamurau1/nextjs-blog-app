import Header from "@/components/Header";
import type { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
	return (
		<>
			<Header />
			<main>{children}</main>
		</>
	);
}
