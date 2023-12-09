import type { Metadata } from "next";
import { redirect } from "next/navigation";

export function generateMetadata({
  params: { board },
}: {
  params: { board: string };
}): Metadata {
  return {
    title: `Write new post to ${board}`,
  };
}

export default async function NewPost({
  params: { board },
}: {
  params: { board: string };
}) {
  return (
    <main>
      <h2>Write new post to {decodeURI(board)}</h2>
      <form action={postPost.bind(null, board)}>
        <input type="text" name="subject" />
        <textarea name="content" />
        <button type="submit">Submit</button>
      </form>
    </main>
  );
}

async function postPost(board: string, formData: FormData) {
  "use server";
  const post = {
    subject: formData.get("subject") as string,
    content: formData.get("content") as string,
  };
  const init = {
    method: "POST",
    body: JSON.stringify(post),
    headers: {
      "Content-Type": "application/json",
    },
  };
  const res = await fetch(`http://127.0.0.1:8000/board/${board}`, init);
  const { id } = (await res.json()) as { id: number };
  return redirect(`/board/${board}/${id}`);
}
