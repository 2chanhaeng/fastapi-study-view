import { Board, Post } from "@/types/response";
import { notFound } from "next/navigation";

interface NewPost {
  id: "new";
  subject: "+";
}

export default async function Board({
  params: { board },
}: {
  params: { board: string };
}) {
  const boardRes = await fetch(`http://127.0.0.1:8000/board/${board}/`, {
    next: { tags: ["post"] },
  });
  if (!boardRes.ok) return notFound();
  const { posts } = (await boardRes.json()) as Board;
  return (
    <ul>
      {posts.map((post) => (
        <Post board={board} post={post} key={post.id} />
      ))}
      <Post board={board} post={{ id: "new", subject: "+" }} key="new" />
    </ul>
  );
}

function Post({
  board,
  post: { id, subject },
}: {
  board: string;
  post: Post | NewPost;
}) {
  return (
    <li>
      <a href={`/board/${board}/${id}`}>{subject}</a>
    </li>
  );
}
