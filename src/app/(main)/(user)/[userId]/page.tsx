import { fetchPublishedPostsByUserId, fetchUserById } from "@/app/_lib/data";
import { timeAgo } from "@/app/_lib/utils";
import { ProfileSkeleton } from "@/app/_ui/skeltons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/Avatar";
import NextLink from "next/link";
import { notFound } from "next/navigation";
import { HTMLAttributes, Suspense } from "react";
import { FaArrowRightLong } from "react-icons/fa6";

export default async function Page({ params }: { params: { userId: string } }) {
	return (
		<main className="flex-auto w-full">
			<div className="border-b border-slate-200 bg-white">
				<div className="max-w-5xl px-4 mx-auto sm:px-6">
					<Suspense fallback={<ProfileSkeleton />}>
						<Profile userId={params.userId} />
					</Suspense>
				</div>
			</div>
			<div className="min-h-screen max-w-5xl mx-auto px-4 sm:px-6">
				<Suspense fallback={<div>Loading...</div>}>
					<PostList userId={params.userId} className="py-8" />
				</Suspense>
			</div>
		</main>
	);
}

const Profile = async (props: { userId: string }) => {
	const user = await fetchUserById(props.userId);

	if (!user) {
		notFound();
	}

	return (
		<>
			<div className="flex flex-col gap-6 py-12 sm:flex-row sm:items-center">
				<Avatar className="w-28 h-28 border-4 border-white shadow-md ring-1 ring-slate-200">
					<AvatarImage src={user?.profile_image ?? ""} alt={user?.name ?? ""} />
					<AvatarFallback>{user?.email ?? ""}</AvatarFallback>
				</Avatar>
				<div className="flex-1">
					<p className="mb-2 text-sm font-semibold text-teal-700">Author</p>
					<h1 className="text-3xl font-bold text-slate-950 sm:text-4xl">
						{user?.name ?? ""}
					</h1>
					<p className="mt-3 max-w-xl text-sm leading-7 text-slate-600">
						公開された記事を新しい順に表示しています。
					</p>
				</div>
			</div>
		</>
	);
};

type PostListProps = HTMLAttributes<HTMLDivElement> & {
	userId: string;
};

const PostList = async ({ userId, ...props }: PostListProps) => {
	const posts = await fetchPublishedPostsByUserId(userId);

	return (
		<div {...props}>
			<div className="mb-4 flex items-end justify-between">
				<h2 className="text-lg font-bold text-slate-950">Articles</h2>
				<p className="text-sm text-slate-500">{posts.length} posts</p>
			</div>
			<div className="grid gap-3">
				{posts.map((post) => {
					return (
						<NextLink
							href={`/${userId}/posts/${post.id}`}
							className="group rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
							key={post.id}
						>
							<article className="flex items-start justify-between gap-4">
								<div className="min-w-0 flex-1">
									<h3 className="truncate text-xl font-bold text-slate-950 group-hover:text-teal-700">
										{post.title}
									</h3>
									<div className="mt-3 flex items-center">
										<time className="text-xs font-medium text-slate-500">
											{timeAgo(post.updated_at)}
										</time>
									</div>
								</div>
								<FaArrowRightLong className="mt-1 shrink-0 text-slate-300 transition group-hover:translate-x-1 group-hover:text-teal-700" />
							</article>
						</NextLink>
					);
				})}
				{posts.length === 0 && (
					<div className="rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-500">
						まだ公開記事はありません。
					</div>
				)}
			</div>
		</div>
	);
};
