import type { Metadata } from "next";

export function generateMetadata({
  params: { board },
}: {
  params: { board: string };
}): Metadata {
  return {
    title: board,
  };
}

export default async function BoardLayout({
  children,
  params: { board },
}: {
  children: React.ReactNode;
  params: { board: string };
}) {
  return (
    <>
      <header>
        <a href="../">{"<"}</a>
        <h1>{board}</h1>
      </header>
      {children}
    </>
  );
}
