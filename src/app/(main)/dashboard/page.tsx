import { FaPenFancy } from "react-icons/fa6";
import { fetchSessionUserPosts } from "@/app/_lib/data";
import { timeAgo } from "@/app/_lib/utils";
import NextLink from "next/link";
import { Suspense, HTMLAttributes } from "react";
import DeletionForm from "./_components/DeletionForm";
import { PostsSkeleton } from "@/app/_ui/skeltons";

export default async function Page() {
	return (
		<main className="flex-auto w-full">
			<div className="border-b border-slate-200 bg-white">
				<div className="max-w-5xl px-4 py-10 mx-auto sm:px-6">
					<p className="mb-2 text-sm font-semibold text-teal-700">Dashboard</p>
					<h1 className="text-3xl font-bold text-slate-950">記事の一覧</h1>
					<p className="mt-3 text-sm text-slate-600">
						公開状態を確認しながら、記事を編集・削除できます。
					</p>
				</div>
			</div>
			<div className="max-w-5xl px-4 py-8 mx-auto sm:px-6">
				<Suspense fallback={<PostsSkeleton />}>
					<PostList />
				</Suspense>
			</div>
		</main>
	);
}

const PostList = async (props: HTMLAttributes<HTMLDivElement>) => {
	const posts = await fetchSessionUserPosts();

	return (
		<div {...props}>
			<div className="grid gap-3">
				{posts.map((post) => {
					return (
						<article
							className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
							key={post.id}
						>
							<div className="flex items-start gap-4">
								<div className="min-w-0 flex-1">
									<NextLink
										href={`/posts/edit?postId=${post.id}`}
										className="block truncate text-xl font-bold text-slate-950 transition hover:text-teal-700"
									>
										{post.title}
									</NextLink>
									<div className="mt-3 flex flex-wrap items-center gap-2">
										{post.published ? (
											<span className="inline-flex rounded-md border border-teal-200 bg-teal-50 px-2 py-1 text-xs font-bold text-teal-700">
												公開中
											</span>
										) : (
											<span className="inline-flex rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-xs font-bold text-slate-500">
												下書き
											</span>
										)}
										<time className="text-xs font-medium text-slate-500">
											{timeAgo(post.updated_at)}最終更新・
											{post.content.length}文字
										</time>
									</div>
								</div>
								<div className="flex items-center gap-2">
									<NextLink
										aria-label="編集する"
										className="h-9 w-9 p-2 flex items-center justify-center z-10 rounded-md text-slate-500 bg-slate-100 hover:bg-teal-50 hover:text-teal-700 transition"
										href={`/posts/edit?postId=${post.id}`}
									>
										<FaPenFancy width={21} height={21} />
									</NextLink>
									<DeletionForm postId={post.id} />
								</div>
							</div>
						</article>
					);
				})}
				{posts.length === 0 && (
					<div className="rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-500">
						まだ記事はありません。右上の「投稿する」から新しく書けます。
					</div>
				)}
			</div>
		</div>
	);
};
