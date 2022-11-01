import { NativeStackScreenProps } from '@react-navigation/native-stack';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Player: undefined;
  GameBoard: undefined;
  Scores: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

export type AppState = {
  singlePlayer: boolean;
  playerNames: PlayerName;
  winHistory: { [key: string]: Record }
}

export enum AppStateActionKind {
  USE_SINGLE_PLAYER = 'USE_SINGLE_PLAYER',
  UPDATE_PLAYER_NAMES = 'UPDATE_PLAYER_NAMES',
  SAVE_GAME_RESULTS = 'SAVE_GAME_RESULTS',
}

export enum PlayerKind {
  PLAYER_ONE = 'PLAYER_ONE',
  PLAYER_TWO = 'PLAYER_TWO',
}

export interface AppStateAction {
  type: AppStateActionKind;
  payload: PlayerNamePayload | boolean | GameResult;
}

export type PlayerName = {
  [key in PlayerKind]: string;
};

export type Record = {
  winCount: number;
  lostCount: number;
}

export type GameResult = {
  hasWon: boolean;
  playerName: string;
}

export type PlayerNamePayload = {
  [key: string]: string
}

export enum CellOccupancy {
  NONE = 'NONE',
  PLAYER_ONE = 'PLAYER_ONE',
  PLAYER_TWO = 'PLAYER_TWO',
}

export enum GameStatus {
  DRAW = 'DRAW',
  WIN = 'WIN',
  ONGOING = 'ONGOING',
  READY = 'READY',
}