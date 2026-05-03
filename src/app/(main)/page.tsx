import { SignIn } from "@/components/AuthComponents";
import { Link } from "@/components/Link";
import { auth } from "@/auth";
import { FaFeatherPointed, FaRegEye, FaShieldHalved } from "react-icons/fa6";

const features = [
	{
		title: "Markdownで軽く書く",
		description: "余計な設定に寄り道せず、本文づくりに集中できます。",
		icon: FaFeatherPointed,
	},
	{
		title: "公開前に確認する",
		description:
			"プレビューで読み味を見ながら、下書きと公開を切り替えられます。",
		icon: FaRegEye,
	},
	{
		title: "自分の場所として運用する",
		description: "Googleログインだけで、記事の管理画面と公開ページを持てます。",
		icon: FaShieldHalved,
	},
];

export default async function Home() {
	const session = await auth();

	return (
		<main className="flex-auto w-full">
			<section className="border-b border-slate-200 bg-white">
				<div className="grid max-w-5xl gap-10 px-4 py-14 mx-auto sm:px-6 lg:grid-cols-[1fr_360px] lg:items-center lg:py-20">
					<div>
						<p className="mb-4 text-sm font-semibold text-teal-700">
							octo blog
						</p>
						<h1 className="max-w-2xl text-4xl font-bold leading-tight tracking-normal text-slate-950 sm:text-5xl">
							書くことを、ちゃんと続けられるブログ。
						</h1>
						<p className="max-w-xl mt-5 text-base leading-8 text-slate-600">
							octoは、Markdownで記事を書いて公開できる小さなブログサービスです。下書き、プレビュー、公開ページまでをシンプルに扱えます。
						</p>
						<div className="flex flex-wrap items-center gap-3 mt-8">
							{session?.user ? (
								<>
									<Link href="/dashboard" mode="primary">
										記事を管理する
									</Link>
									<Link
										href="/posts/new"
										className="px-4 py-2.5 text-sm font-bold text-slate-700 transition border border-slate-200 rounded-md hover:bg-slate-50"
									>
										新しく書く
									</Link>
								</>
							) : (
								<SignIn />
							)}
						</div>
					</div>
					<div className="rounded-lg border border-slate-200 bg-slate-50 p-5 shadow-sm">
						<div className="mb-4 flex items-center gap-2 text-sm font-semibold text-slate-500">
							<span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
							<span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
							<span className="h-2.5 w-2.5 rounded-full bg-teal-500" />
						</div>
						<div className="space-y-4 rounded-md bg-white p-5 shadow-sm">
							<p className="text-xs font-semibold uppercase text-teal-700">
								Draft
							</p>
							<div>
								<div className="h-4 w-10/12 rounded bg-slate-900" />
								<div className="mt-3 h-3 w-7/12 rounded bg-slate-200" />
							</div>
							<div className="space-y-2">
								<div className="h-3 rounded bg-slate-100" />
								<div className="h-3 rounded bg-slate-100" />
								<div className="h-3 w-8/12 rounded bg-slate-100" />
							</div>
							<div className="flex items-center justify-between border-t border-slate-100 pt-4">
								<span className="text-xs font-medium text-slate-500">
									Preview ready
								</span>
								<span className="rounded-md bg-slate-950 px-3 py-1.5 text-xs font-bold text-white">
									公開する
								</span>
							</div>
						</div>
					</div>
				</div>
			</section>
			<section className="max-w-5xl px-4 py-10 mx-auto sm:px-6">
				<div className="grid gap-4 md:grid-cols-3">
					{features.map((feature) => {
						const Icon = feature.icon;
						return (
							<div
								className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
								key={feature.title}
							>
								<div className="mb-4 flex h-10 w-10 items-center justify-center rounded-md bg-teal-50 text-teal-700">
									<Icon />
								</div>
								<h2 className="text-base font-bold text-slate-950">
									{feature.title}
								</h2>
								<p className="mt-2 text-sm leading-6 text-slate-600">
									{feature.description}
								</p>
							</div>
						);
					})}
				</div>
			</section>
		</main>
	);
}
