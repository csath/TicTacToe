/*
** This useGameState hook maintain the game state. All the event related to  
** game data and handling such is handled by this hook.
*/

import { useEffect, useState } from "react";
import Game from "../constants/Game";
import { CellOccupancy, GameStatus } from "../types";
import {
  checkGameResult,
  generateComputerPlayResult,
  getRandomItemFromArray,
  randomInteger,
} from "../utils/game";

export default function useGameState(singlePlayer: boolean = true): {
  cellState: CellOccupancy[];
  gameStatus: GameStatus;
  currentPlayer: CellOccupancy;
  onCellClick: (index: number) => void;
  startGame: () => void;
  resetGame: () => void;
} {
  const [cellState, setCellState] = useState<CellOccupancy[]>(
    Game.initialMatrix
  );
  const [gameStatus, setGameStatus] = useState(GameStatus.READY);
  const [currentPlayer, setCurrentPlayer] = useState(
    getRandomItemFromArray([CellOccupancy.PLAYER_ONE, CellOccupancy.PLAYER_TWO])
  );

  const startGame = () => {
    if (gameStatus === GameStatus.ONGOING) return;
    setGameStatus(GameStatus.ONGOING);
  };

  const resetGame = () => {
    setCellState(Game.initialMatrix);
    setCurrentPlayer(
      getRandomItemFromArray([
        CellOccupancy.PLAYER_ONE,
        CellOccupancy.PLAYER_TWO,
      ])
    );
    setGameStatus(GameStatus.READY);
  };

  const onCellClick = (index: number) => {
    setCellState([
      ...cellState.slice(0, index),
      currentPlayer,
      ...cellState.slice(index + 1, cellState.length),
    ]);
  };

  const swapPlayer = () => {
    setCurrentPlayer(
      currentPlayer === CellOccupancy.PLAYER_ONE
        ? CellOccupancy.PLAYER_TWO
        : CellOccupancy.PLAYER_ONE
    );
  };

  const initComputerPlay = () => {
    const computerClickedIndex = generateComputerPlayResult(cellState);
    setTimeout(
      () => onCellClick(computerClickedIndex),
      randomInteger(200, 700)
    );
  };

  useEffect(() => {
    if (gameStatus === GameStatus.ONGOING) {
      const gameStatusNew = checkGameResult(
        currentPlayer,
        cellState,
        Game.winningCombinations
      );
      if (gameStatusNew !== GameStatus.ONGOING) {
        setGameStatus(gameStatusNew);
        return;
      }

      swapPlayer();
    }
  }, [cellState]);

  useEffect(() => {
    if (
      singlePlayer &&
      gameStatus === GameStatus.ONGOING &&
      currentPlayer === CellOccupancy.PLAYER_TWO
    ) {
      initComputerPlay();
    }
  }, [currentPlayer, gameStatus]);

  return {
    cellState,
    gameStatus,
    currentPlayer,
    onCellClick,
    startGame,
    resetGame,
  };
}
