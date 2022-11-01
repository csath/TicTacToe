import * as React from "react";
import Game from "../../constants/Game";
import { CellOccupancy, GameStatus } from "../../types";
import {
  checkGameResult,
  generateComputerPlayResult,
  getGameBoardHeaderText,
  getRandomItemFromArray,
  isDraw,
  isWin,
  randomInteger,
} from "../game";

describe("Game utility", () => {
  it("getRandomItemFromArray function properly", () => {
    const arrary1 = [1, 2, 3];
    const arrary2 = [];
    const randomItem1 = getRandomItemFromArray(arrary1);
    const randomItem2 = getRandomItemFromArray(arrary2);

    expect(randomItem1).toBeTruthy();
    expect(arrary1).toContain(randomItem1);

    expect(randomItem2).toBeNull();
  });

  it("randomInteger function properly", () => {
    const randomInt1 = randomInteger(0, 10);
    const randomInt2 = randomInteger(1, 1);

    expect(randomInt1).not.toBeNull();
    expect(randomInt1).toBeGreaterThanOrEqual(0);
    expect(randomInt1).toBeLessThanOrEqual(10);

    expect(randomInt2).not.toBeNull();
    expect(randomInt2).toEqual(1);
  });

  it("checkGameResult function properly", () => {
    const cellStateWin = [
      CellOccupancy.PLAYER_ONE,
      CellOccupancy.PLAYER_ONE,
      CellOccupancy.PLAYER_ONE,
      CellOccupancy.PLAYER_TWO,
    ];
    const cellStateDraw = [
      CellOccupancy.PLAYER_ONE,
      CellOccupancy.PLAYER_TWO,
      CellOccupancy.PLAYER_TWO,
    ];
    const cellStateOngoing = [
      CellOccupancy.PLAYER_ONE,
      CellOccupancy.PLAYER_TWO,
      CellOccupancy.NONE,
    ];

    const gameWin = checkGameResult(
      CellOccupancy.PLAYER_ONE,
      cellStateWin,
      Game.winningCombinations
    );
    const gameDraw = checkGameResult(
      CellOccupancy.PLAYER_ONE,
      cellStateDraw,
      Game.winningCombinations
    );
    const gameOngoing = checkGameResult(
      CellOccupancy.PLAYER_ONE,
      cellStateOngoing,
      Game.winningCombinations
    );

    expect(gameWin).not.toBeNull();
    expect(gameWin).toMatch(GameStatus.WIN);

    expect(gameDraw).not.toBeNull();
    expect(gameDraw).toMatch(GameStatus.DRAW);

    expect(gameOngoing).not.toBeNull();
    expect(gameOngoing).toMatch(GameStatus.ONGOING);
  });

  it("isDraw function properly", () => {
    const cellStateWin = [
      CellOccupancy.PLAYER_ONE,
      CellOccupancy.PLAYER_TWO,
      CellOccupancy.PLAYER_ONE,
    ];
    const cellStateDraw = [
      CellOccupancy.PLAYER_ONE,
      CellOccupancy.PLAYER_TWO,
      CellOccupancy.NONE,
    ];

    const cellStateWinRes = isDraw(cellStateWin);
    const cellStateDrawRes = isDraw(cellStateDraw);

    expect(cellStateWinRes).toBeTruthy();
    expect(cellStateDrawRes).toBeFalsy();
  });

  it("isWin function properly", () => {
    const currentPlayer = CellOccupancy.PLAYER_ONE;
    const cellStateWin = [
      CellOccupancy.PLAYER_ONE,
      CellOccupancy.PLAYER_ONE,
      CellOccupancy.PLAYER_ONE,
      CellOccupancy.PLAYER_TWO,
    ];
    const cellStateLoss = [
      CellOccupancy.PLAYER_ONE,
      CellOccupancy.PLAYER_TWO,
      CellOccupancy.NONE,
    ];

    const winRes = isWin(currentPlayer, cellStateWin, Game.winningCombinations);
    const lostRes = isWin(
      currentPlayer,
      cellStateLoss,
      Game.winningCombinations
    );

    expect(winRes).toBeTruthy();
    expect(lostRes).toBeFalsy();
  });

  it("generateComputerPlayResult function properly", () => {
    const cellStatePossiblePred = [
      CellOccupancy.PLAYER_ONE,
      CellOccupancy.PLAYER_ONE,
      CellOccupancy.NONE,
      CellOccupancy.PLAYER_TWO,
    ];
    const cellStateImpossiblePred = [
      CellOccupancy.PLAYER_ONE,
      CellOccupancy.PLAYER_TWO,
      CellOccupancy.PLAYER_TWO,
    ];

    const possibleRes = generateComputerPlayResult(cellStatePossiblePred);
    const impossibleRes = generateComputerPlayResult(cellStateImpossiblePred);

    expect(possibleRes).not.toBeNull();
    expect(possibleRes).toEqual(2);
    expect(impossibleRes).toBeNull();
  });

  it("getGameBoardHeaderText function properly", () => {
    const playerNames = { PLAYER_ONE: "ABC", PLAYER_TWO: "DEF" };
    const gameStatus = [
      GameStatus.READY,
      GameStatus.ONGOING,
      GameStatus.WIN,
      GameStatus.DRAW,
    ];

    // ready status
    const readySinglePlayer1 = getGameBoardHeaderText(
      gameStatus[0],
      true,
      playerNames,
      CellOccupancy.PLAYER_ONE
    );
    const readySinglePlayer2 = getGameBoardHeaderText(
      gameStatus[0],
      true,
      playerNames,
      CellOccupancy.PLAYER_TWO
    );
    const readyMultiPlayer1 = getGameBoardHeaderText(
      gameStatus[0],
      false,
      playerNames,
      CellOccupancy.PLAYER_ONE
    );
    const readyMultiPlayer2 = getGameBoardHeaderText(
      gameStatus[0],
      false,
      playerNames,
      CellOccupancy.PLAYER_TWO
    );

    expect(readySinglePlayer1).not.toBeNull();
    expect(readySinglePlayer1).toMatch(
      `Start game\n${playerNames.PLAYER_ONE} get the first chance!`
    );

    expect(readySinglePlayer2).not.toBeNull();
    expect(readySinglePlayer2).toMatch(
      `Start game\nSiri get the first chance!`
    );

    expect(readyMultiPlayer1).not.toBeNull();
    expect(readyMultiPlayer1).toMatch(
      `Start game\n${playerNames.PLAYER_ONE} get the first chance!`
    );

    expect(readyMultiPlayer2).not.toBeNull();
    expect(readyMultiPlayer2).toMatch(
      `Start game\n${playerNames.PLAYER_TWO} get the first chance!`
    );

    // ongoing status
    const readySinglePlayer3 = getGameBoardHeaderText(
      gameStatus[1],
      true,
      playerNames,
      CellOccupancy.PLAYER_ONE
    );
    const readySinglePlayer4 = getGameBoardHeaderText(
      gameStatus[1],
      true,
      playerNames,
      CellOccupancy.PLAYER_TWO
    );
    const readyMultiPlayer3 = getGameBoardHeaderText(
      gameStatus[1],
      false,
      playerNames,
      CellOccupancy.PLAYER_ONE
    );
    const readyMultiPlayer4 = getGameBoardHeaderText(
      gameStatus[1],
      false,
      playerNames,
      CellOccupancy.PLAYER_TWO
    );

    expect(readySinglePlayer3).not.toBeNull();
    expect(readySinglePlayer3).toMatch(`It's ${playerNames.PLAYER_ONE}'s turn`);

    expect(readySinglePlayer4).not.toBeNull();
    expect(readySinglePlayer4).toMatch(`It's Siri's turn`);

    expect(readyMultiPlayer3).not.toBeNull();
    expect(readyMultiPlayer3).toMatch(`It's ${playerNames.PLAYER_ONE}'s turn`);

    expect(readyMultiPlayer4).not.toBeNull();
    expect(readyMultiPlayer4).toMatch(`It's ${playerNames.PLAYER_TWO}'s turn`);

    // win status
    const readySinglePlayer5 = getGameBoardHeaderText(
      gameStatus[2],
      true,
      playerNames,
      CellOccupancy.PLAYER_ONE
    );
    const readySinglePlayer6 = getGameBoardHeaderText(
      gameStatus[2],
      true,
      playerNames,
      CellOccupancy.PLAYER_TWO
    );
    const readyMultiPlayer5 = getGameBoardHeaderText(
      gameStatus[2],
      false,
      playerNames,
      CellOccupancy.PLAYER_ONE
    );
    const readyMultiPlayer6 = getGameBoardHeaderText(
      gameStatus[2],
      false,
      playerNames,
      CellOccupancy.PLAYER_TWO
    );

    expect(readySinglePlayer5).not.toBeNull();
    expect(readySinglePlayer5).toMatch(
      `${playerNames.PLAYER_ONE} won the game!`
    );

    expect(readySinglePlayer6).not.toBeNull();
    expect(readySinglePlayer6).toMatch(`You lost the game!`);

    expect(readyMultiPlayer5).not.toBeNull();
    expect(readyMultiPlayer5).toMatch(
      `${playerNames.PLAYER_ONE} won the game!`
    );

    expect(readyMultiPlayer6).not.toBeNull();
    expect(readyMultiPlayer6).toMatch(
      `${playerNames.PLAYER_TWO} won the game!`
    );

    // draw status
    const readySinglePlayer7 = getGameBoardHeaderText(
      gameStatus[3],
      true,
      playerNames,
      CellOccupancy.PLAYER_ONE
    );
    const readySinglePlayer8 = getGameBoardHeaderText(
      gameStatus[3],
      true,
      playerNames,
      CellOccupancy.PLAYER_TWO
    );
    const readyMultiPlayer7 = getGameBoardHeaderText(
      gameStatus[3],
      false,
      playerNames,
      CellOccupancy.PLAYER_ONE
    );
    const readyMultiPlayer8 = getGameBoardHeaderText(
      gameStatus[3],
      false,
      playerNames,
      CellOccupancy.PLAYER_TWO
    );

    expect(readySinglePlayer7).not.toBeNull();
    expect(readySinglePlayer7).toMatch(`It's a draw!`);

    expect(readySinglePlayer8).not.toBeNull();
    expect(readySinglePlayer8).toMatch(`It's a draw!`);

    expect(readyMultiPlayer7).not.toBeNull();
    expect(readyMultiPlayer7).toMatch(`It's a draw!`);

    expect(readyMultiPlayer8).not.toBeNull();
    expect(readyMultiPlayer8).toMatch(`It's a draw!`);
  });
});
