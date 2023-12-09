import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

interface DeletePostProps {
  board: string;
  post_id: number;
}

export function DeletePost(props: DeletePostProps) {
  return (
    <form action={destroy.bind(null, props)}>
      <button type="submit">Delete</button>
    </form>
  );
}

async function destroy({ board, post_id }: DeletePostProps) {
  "use server";
  try {
    const init = { method: "DELETE" };
    await fetch(`http://127.0.0.1:8000/board/${board}/${post_id}`, init);
    revalidateTag("post");
  } finally {
    redirect(`/board/${board}`);
  }
}
