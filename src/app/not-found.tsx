import Header from "@/components/Header";
import Link from "next/link";

export default function NotFound() {
	return (
		<>
			<Header />
			<main className="flex-auto w-full max-w-3xl px-4 py-4 mx-auto sm:px-6 md:py-6">
				<div className="flex flex-col items-center justify-center p-6 mx-20">
					<div className="w-10 text-[30px]">😭</div>
					<h2 className="text-3xl mt-4">404 Not Found</h2>
					<Link
						href="/"
						className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
					>
						Go Top
					</Link>
				</div>
			</main>
		</>
	);
}
