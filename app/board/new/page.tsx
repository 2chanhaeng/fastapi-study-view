import type { Metadata } from "next";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { Board } from "@/types/response";
import { getPostInitFromForm } from "@/utils/form";

export const metadata: Metadata = {
  title: "Create new board",
};

export default async function NewBoard() {
  return (
    <main>
      <header>
        <h1>Create new board</h1>
      </header>
      <form action={postBoard}>
        <input type="text" name="subject" />
        <textarea name="description" />
        <button type="submit">Submit</button>
      </form>
    </main>
  );
}

async function postBoard(formData: FormData) {
  "use server";
  const init = getPostInitFromForm(formData);
  const res = await fetch(`http://127.0.0.1:8000/board/`, init);
  const { subject } = (await res.json()) as Board;
  revalidateTag("board");
  return redirect(`/board/${encodeURI(subject)}`);
}
