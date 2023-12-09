import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { getPostInitFromForm } from "@/utils/form";
import { revalidateTag } from "next/cache";
import { Post as ReqPost } from "@/types/request";
import { Post as ResPost } from "@/types/response";

export const metadata: Metadata = {
  title: `Edit post`,
};

export default async function EditPost({
  params: { board, post_id },
  params,
}: {
  params: ReqPost;
}) {
  const prevRes = await fetch(
    `http://127.0.0.1:8000/board/${board}/${post_id}`,
    { next: { tags: ["post"] } }
  );
  if (!prevRes.ok) return notFound();
  const { subject, content } = (await prevRes.json()) as ResPost;
  return (
    <main>
      <h2>Write new post to {decodeURI(board)}</h2>
      <form action={updatePost.bind(null, params)}>
        <input type="text" name="subject" defaultValue={subject} />
        <textarea name="content" defaultValue={content} />
        <button type="submit">Submit</button>
      </form>
    </main>
  );
}

async function updatePost({ board, post_id }: ReqPost, formData: FormData) {
  "use server";
  const init = getPostInitFromForm(formData);
  init.method = "PUT";
  const res = await fetch(
    `http://127.0.0.1:8000/board/${board}/${post_id}`,
    init
  );
  const { id } = (await res.json()) as ResPost;
  revalidateTag("post");
  return redirect(`/board/${board}/${id}`);
}
