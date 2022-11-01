import { View, FlatList } from "react-native";
import React, { useContext, useEffect } from "react";
import styles from "./styles";
import { CellOccupancy, GameStatus, RootStackScreenProps } from "../../types";
import { AppContext } from "../../context/appContext";
import { SafeAreaView } from "react-native-safe-area-context";
import useGameState from "../../hooks/useGameState";
import CustomButton from "../../components/Button";
import Cell from "../../components/Cell";
import Header from "../../components/Header";
import { getGameBoardHeaderText } from "../../utils/game";

const GameBoard = ({ navigation }: RootStackScreenProps<"GameBoard">) => {
  const { singlePlayer, playerNames, saveGameResult } = useContext(AppContext);
  const {
    cellState,
    gameStatus,
    currentPlayer,
    onCellClick,
    startGame,
    resetGame,
  } = useGameState(singlePlayer);

  const renderCell = ({
    item,
    index,
  }: {
    item: CellOccupancy;
    index: number;
  }) => {
    const disabled =
      gameStatus !== GameStatus.ONGOING ||
      item !== CellOccupancy.NONE ||
      (singlePlayer && currentPlayer === CellOccupancy.PLAYER_TWO);
    return (
      <Cell
        player={item}
        disabled={disabled}
        onPress={() => onCellClick(index)}
        wrapperStyle={[
          [0, 1, 3, 4, 6, 7].includes(index) ? styles.borderRight : {},
        ]}
      />
    );
  };

  useEffect(() => {
    if (gameStatus === GameStatus.WIN || gameStatus === GameStatus.DRAW) {
      const isPlayerOne = currentPlayer === CellOccupancy.PLAYER_ONE;
      const hasWon = gameStatus === GameStatus.WIN ? true : false;

      // update match win for first player
      saveGameResult(
        isPlayerOne ? playerNames.PLAYER_ONE : playerNames.PLAYER_TWO,
        hasWon
      );

      // update match win for second player if dual player mode enabled
      if (!singlePlayer) {
        saveGameResult(
          !isPlayerOne ? playerNames.PLAYER_ONE : playerNames.PLAYER_TWO,
          !hasWon
        );
      }
    }
  }, [gameStatus]);

  return (
    <SafeAreaView style={styles.container}>
      <Header
        replayAnimation={gameStatus}
        text={getGameBoardHeaderText(
          gameStatus,
          singlePlayer,
          playerNames,
          currentPlayer
        )}
        wrapperStyle={styles.flexContainer}
      />

      <View style={styles.boardContainer}>
        <FlatList
          data={cellState}
          keyExtractor={(item, index) => `${index}`}
          renderItem={renderCell}
          numColumns={3}
          scrollEnabled={false}
          contentContainerStyle={styles.boardContainer}
          ItemSeparatorComponent={() => <View style={styles.borderBottom} />}
        />
      </View>

      <View style={styles.flexContainer}>
        {gameStatus === GameStatus.READY && (
          <CustomButton text="START GAME" onPress={startGame} />
        )}
        {gameStatus === GameStatus.ONGOING && (
          <CustomButton text="RESET GAME" onPress={resetGame} />
        )}
        {(gameStatus === GameStatus.DRAW || gameStatus === GameStatus.WIN) && (
          <CustomButton
            text="REPLAY"
            onPress={() => {
              resetGame();
              startGame();
            }}
          />
        )}
        {(gameStatus === GameStatus.READY ||
          gameStatus === GameStatus.DRAW ||
          gameStatus === GameStatus.WIN) && (
          <>
            <CustomButton
              variant="Link"
              text="Change game settings"
              onPress={() => navigation.goBack()}
            />
            <CustomButton
              variant="Link"
              text="View scores"
              onPress={() => navigation.navigate("Scores")}
            />
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default GameBoard;
