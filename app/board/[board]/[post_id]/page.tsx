import { Post } from "@/types/responce";
import { notFound } from "next/navigation";

export default async function Board({
  params: { board, post_id },
}: {
  params: { board: string; post_id: number };
}) {
  const postRes = await fetch(
    `http://127.0.0.1:8000/board/${board}/${post_id}`
  );
  if (!postRes.ok) return notFound();
  const { subject, content } = (await postRes.json()) as Post;
  return (
    <div>
      <h2>{subject}</h2>
      <p>{content}</p>
    </div>
  );
}
