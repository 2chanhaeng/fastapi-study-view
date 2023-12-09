import type { Metadata } from "next";

export function generateMetadata({
  params: { board },
}: {
  params: { board: string };
}): Metadata {
  return { title: decodeURI(board) };
}

export default function BoardLayout({
  children,
  params: { board },
}: {
  children: React.ReactNode;
  params: { board: string };
}) {
  return (
    <>
      <header>
        <a href="/board">Boards</a>
        <a href={`/board/${board}`}>
          <h1>{decodeURI(board)}</h1>
        </a>
      </header>
      {children}
    </>
  );
}
