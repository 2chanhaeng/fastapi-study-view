export default async function Boards() {
  const boardRes = await fetch(`${process.env.API_URL}/board`, {
    next: { tags: ["board"] },
  });
  console.log(boardRes);
  const boards: string[] = await boardRes.json();
  return (
    <main>
      <h1>Boards</h1>
      <ul>
        {boards.map((board) => (
          <Board board={board} key={board} />
        ))}
        <Board board={"new"} />
      </ul>
    </main>
  );
}

function Board({ board }: { board: string }) {
  return (
    <li>
      <a href={"/board/" + board}>{board === "new" ? "+" : board}</a>
    </li>
  );
}
