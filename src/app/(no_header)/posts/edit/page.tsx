import { fetchPostById } from "@/app/_lib/data";
import { PostEditPageSkeleton } from "@/app/_ui/skeltons";
import PostEditPage from "@/components/PostEditPage";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export default async function Page({
	searchParams,
}: {
	searchParams?: { postId?: string };
}) {
	const postId = searchParams?.postId;
	if (postId === undefined) {
		return (
			<Suspense fallback={<PostEditPageSkeleton />}>
				<PostEditPage />
			</Suspense>
		);
	}

	return (
		<Suspense fallback={<PostEditPageSkeleton />}>
			<PostEditPageWrapper postId={postId} />
		</Suspense>
	);
}

const PostEditPageWrapper = async ({ postId }: { postId: string }) => {
	const post = await fetchPostById(postId ?? "");

	if (!post) {
		notFound();
	}

	return <PostEditPage post={post} />;
};
