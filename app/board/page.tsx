export default async function Boards() {
  const boardRes = await fetch("http://127.0.0.1:8000/board");
  const boards: string[] = await boardRes.json();
  return (
    <main>
      <h1>Boards</h1>
      <ul>
        {boards.map((board) => (
          <Board board={board} key={board} />
        ))}
      </ul>
    </main>
  );
}

function Board({ board }: { board: string }) {
  return (
    <li>
      <a href={"/board/" + board}>{board}</a>
    </li>
  );
}
