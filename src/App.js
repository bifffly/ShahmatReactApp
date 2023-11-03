import {useEffect, useState} from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";

export default function App() {
  const [game, setGame] = useState(new Chess());

  function move(currMove) {
    const gameCopy = new Chess(game.fen());
    const result = gameCopy.move(currMove);
    setGame(gameCopy);
    return result;
  }

  function moveRandomly() {
    const possibleMoves = game.moves();
    const numPossibleMoves = possibleMoves.length;
    if (game.isGameOver() || game.isDraw() || numPossibleMoves === 0) {
      return;
    }
    const randomIdx = Math.floor(Math.random() * numPossibleMoves);
    const randomMove = possibleMoves[randomIdx];
    move(randomMove);
  }

  function onDrop(src, trg) {
    const currMove = move({
      from: src,
      to: trg,
      promotion: "q",
    });
    return currMove !== null;
  }

  useEffect(() => {
    if (game.turn() === 'b') {
      setTimeout(moveRandomly, 1000);
    }
  })

  return <Chessboard boardWidth={400} position={game.fen()} onPieceDrop={onDrop} />;
}