import { CellOccupancy } from "../types";

export default {
    initialMatrix: Array.from(Array(9).keys()).map(() => CellOccupancy.NONE),
    winningCombinations: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]
}
