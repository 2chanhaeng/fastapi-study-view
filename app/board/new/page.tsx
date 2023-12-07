import type { Metadata } from "next";
import { redirect } from "next/navigation";

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
  const post = {
    subject: formData.get("subject") as string,
    description: formData.get("description") as string,
  };
  const init = {
    method: "POST",
    body: JSON.stringify(post),
    headers: {
      "Content-Type": "application/json",
    },
  };
  const res = await fetch(`http://127.0.0.1:8000/board/`, init);
  const { subject: board } = (await res.json()) as { subject: string };
  return redirect(`/board/${board}`);
}
