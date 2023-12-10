import { Post } from "@/types/response";
import type { Metadata } from "next";

export async function generateMetadata({
  params: { board, post_id },
}: {
  params: { board: string; post_id: number };
}): Promise<Metadata> {
  const postRes = await fetch(
    `${process.env.API_URL}/board/${board}/${post_id}`
  );
  const { subject } = (await postRes.json()) as Post;
  return { title: decodeURI(subject) };
}

export default async function PostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
