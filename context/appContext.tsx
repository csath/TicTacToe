import { createContext, useReducer } from "react";
import {
  AppState,
  AppStateAction,
  AppStateActionKind,
  PlayerKind,
  GameResult,
  PlayerNamePayload,
  Record,
} from "../types";

const initialState: AppState = {
  singlePlayer: true,
  playerNames: {
    [PlayerKind.PLAYER_ONE]: "",
    [PlayerKind.PLAYER_TWO]: "",
  },
  winHistory: {},
};

export const AppContext = createContext({
  ...initialState,
  useSinglePlayer: (payload: boolean): void => {},
  updatePlayerNames: (key: string, value: string): void => {},
  saveGameResult: (playerName: string, hasWon: boolean): void => {},
});

export const AppReducer = (state: AppState, action: AppStateAction) => {
  const { payload, type } = action;

  switch (type) {
    case AppStateActionKind.USE_SINGLE_PLAYER:
      return {
        ...state,
        singlePlayer: payload as boolean,
      };
    case AppStateActionKind.UPDATE_PLAYER_NAMES:
      return {
        ...state,
        playerNames: {
          ...state.playerNames,
          ...(payload as PlayerNamePayload),
        },
      };
    case AppStateActionKind.SAVE_GAME_RESULTS: {
      const result = payload as GameResult;
      let winHistoryForPlayer: Record = { winCount: 0, lostCount: 0 };

      if (state.winHistory[result.playerName] !== undefined) {
        winHistoryForPlayer = { ...state.winHistory[result.playerName] };
      }
      result.hasWon
        ? winHistoryForPlayer.winCount++
        : winHistoryForPlayer.lostCount++;

      return {
        ...state,
        winHistory: {
          ...state.winHistory,
          [result.playerName]: winHistoryForPlayer,
        },
      };
    }
    default:
      return state;
  }
};

export const AppStateWrapper = (props: any) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  const useSinglePlayer = (payload: boolean) =>
    dispatch({ type: AppStateActionKind.USE_SINGLE_PLAYER, payload });
  const updatePlayerNames = (key: string, value: string) =>
    dispatch({
      type: AppStateActionKind.UPDATE_PLAYER_NAMES,
      payload: { [key]: value },
    });
  const saveGameResult = (playerName: string, hasWon: boolean) =>
    dispatch({
      type: AppStateActionKind.SAVE_GAME_RESULTS,
      payload: { playerName, hasWon },
    });

  return (
    <AppContext.Provider
      value={{
        ...state,
        useSinglePlayer,
        updatePlayerNames,
        saveGameResult,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

/*
TODO: persist winHistory in local storage and load it to state when the app opens
*/