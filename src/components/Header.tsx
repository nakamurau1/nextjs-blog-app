import NavBar from "@/components/Navbar";
import UserButton from "@/components/UserButton";
import { auth } from "@/auth";
import { Link } from "@/components/Link";
import { Suspense } from "react";
import { UserButtonSkeleton } from "@/app/_ui/skeltons";

export default async function Header() {
	const session = await auth();
	const isLoggedIn = !!session?.user;

	return (
		<header className="sticky top-0 z-40 flex justify-center border-b border-slate-200/80 bg-white/90 backdrop-blur">
			<div className="flex items-center justify-between w-full h-16 max-w-5xl px-4 mx-auto sm:px-6">
				<div className="flex-1">
					<NavBar path="/" />
				</div>
				<div className="flex items-center gap-3">
					<Suspense fallback={<UserButtonSkeleton />}>
						<UserButton />
					</Suspense>
					{/* ログイン済みの場合のみPostボタンを表示する */}
					{isLoggedIn && (
						<Link href="/posts/new" mode="primary">
							投稿する
						</Link>
					)}
				</div>
			</div>
		</header>
	);
}
