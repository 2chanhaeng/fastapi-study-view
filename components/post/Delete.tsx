import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { Post } from "@/types/request";

export function DeletePost(props: Post) {
  return (
    <form action={destroy.bind(null, props)}>
      <button type="submit">Delete</button>
    </form>
  );
}

async function destroy({ board, post_id }: Post) {
  "use server";
  try {
    const init = { method: "DELETE" };
    await fetch(`${process.env.API_URL}/board/${board}/${post_id}`, init);
    revalidateTag("post");
  } finally {
    redirect(`/board/${board}`);
  }
}
