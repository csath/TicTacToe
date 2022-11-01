import { Platform } from "react-native";
import { CellOccupancy, GameStatus, PlayerKind, PlayerName } from "../types";

export const getRandomItemFromArray = (array: Array<any>): any => {
    if (array.length === 0) return null;
    return array[Math.floor(Math.random() * array.length)];
}

export const randomInteger = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const checkGameResult = (currentPlayer: CellOccupancy, cellState: CellOccupancy[], winningCombinations: Array<number[]>): GameStatus => {
    const win = isWin(currentPlayer, cellState, winningCombinations)
    const draw = isDraw(cellState);

    if (win) return GameStatus.WIN;
    if (draw) return GameStatus.DRAW;
    return GameStatus.ONGOING;
}

export const isDraw = (cellState: CellOccupancy[]): boolean => {
    return cellState.every(cell => cell === CellOccupancy.PLAYER_ONE || cell === CellOccupancy.PLAYER_TWO)
}

export const isWin = (currentPlayer: CellOccupancy, cellState: CellOccupancy[], winningCombinations: Array<number[]>): boolean => {
    const currentPlayerMoves = cellState.map((state, index) => (state === currentPlayer) ? index : null).filter((item: any) => item != null) as number[];
    return winningCombinations.some(combination => combination.every(index => currentPlayerMoves.includes(index)))
}

export const generateComputerPlayResult = (cellState: CellOccupancy[]): number => {
    const possibleIndexes = cellState.map((state, index) => (state === CellOccupancy.NONE) ? index : null).filter((item: any) => item != null) as number[];
    return getRandomItemFromArray(possibleIndexes);
}

