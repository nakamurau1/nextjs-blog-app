import {
	fetchPublishedPostByUserIdAndPostId,
	fetchUserById,
} from "@/app/_lib/data";
import { formatDate } from "@/app/_lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/Avatar";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import MarkdownView from "./_components/MarkdownView";

export default async function Page({
	params,
}: {
	params: { userId: string; postId: string };
}) {
	return (
		<main className="flex-auto w-full">
			<Suspense fallback={<div>Loading...</div>}>
				<ArticleView userId={params.userId} postId={params.postId} />
			</Suspense>
		</main>
	);
}

interface ArticleViewProps {
	userId: string;
	postId: string;
}

const ArticleView = async ({ userId, postId }: ArticleViewProps) => {
	const user = await fetchUserById(userId);
	const post = await fetchPublishedPostByUserIdAndPostId(userId, postId);

	if (!user || !post) {
		notFound();
	}

	return (
		<main className="flex-auto w-full">
			<article className="bg-slate-50">
				{/* Profile */}
				<aside className="sticky top-16 bg-white/90 border-b border-slate-200 z-10 backdrop-blur">
					<div className="flex items-center justify-between max-w-3xl px-4 mx-auto sm:px-6">
						<div className="flex items-center py-3">
							<Link
								href={`/${user?.id}`}
								className="flex h-9 w-9 items-center justify-center rounded-md text-slate-500 transition hover:bg-slate-100 hover:text-slate-950"
								aria-label="著者ページへ戻る"
							>
								<FaArrowLeftLong />
							</Link>
							<Link href={`/${user?.id}`} className="ml-3">
								<Avatar className="w-9 h-9 ring-1 ring-slate-200">
									<AvatarImage
										src={user?.profile_image ?? ""}
										alt={user?.name ?? ""}
									/>
									<AvatarFallback>{user?.email ?? ""}</AvatarFallback>
								</Avatar>
							</Link>
							<div className="flex-1 ml-3">
								<h1 className="text-sm font-semibold text-slate-950">
									{user?.name ?? ""}
								</h1>
							</div>
						</div>
					</div>
				</aside>
				{/* Post Title */}
				<div className="border-b border-slate-200 bg-white">
					<div className="max-w-3xl px-4 py-14 mx-auto sm:px-6">
						<h1 className="max-w-[780px] text-left text-3xl font-bold leading-tight text-slate-950 sm:text-5xl">
							{post?.title}
						</h1>
						<div className="mt-6 flex items-center text-sm text-left">
							<span className="font-medium text-slate-500">
								{formatDate(post?.created_at)}
							</span>
						</div>
					</div>
				</div>
				{/* Post Content */}
				<div className="flex items-center justify-center max-w-3xl px-4 mx-auto sm:px-6">
					<section className="w-full">
						<div className="py-10 bg-white sm:py-12">
							<MarkdownView markdown={post?.content ?? ""} />
						</div>
					</section>
				</div>
			</article>
		</main>
	);
};
