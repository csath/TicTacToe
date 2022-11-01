import {
  View,
  Animated,
  Platform,
} from "react-native";
import React, { useContext } from "react";
import styles from "./styles";
import { PlayerKind, RootStackScreenProps } from "../../types";
import useTimingAnimation from "../../hooks/useTimingAnimation";
import { AppContext } from "../../context/appContext";
import CustomTextInput from "../../components/TextInput";
import CustomButton from "../../components/Button";

const PlayerScreen = ({ navigation }: RootStackScreenProps<"Player">) => {
  const { timingAnim } = useTimingAnimation();
  const { singlePlayer, playerNames, useSinglePlayer, updatePlayerNames } =
    useContext(AppContext);

  const onPressPlay = () => {
    // set default names if names are not set
    if (!!playerNames.PLAYER_ONE) {
      updatePlayerNames(PlayerKind.PLAYER_ONE, "Alex");
    }
    if (!!playerNames.PLAYER_TWO) {
      updatePlayerNames(PlayerKind.PLAYER_TWO, "John");
    }
    navigation.navigate("GameBoard");
  };

  const renderTitle = () => {
    return (
      <View style={styles.headerContainer}>
        <Animated.Image
          source={require('../../assets/images/icon.png')}
          style={[
            styles.headerImage,
            {
              opacity: timingAnim,
              transform: [
                {
                  translateX: timingAnim.interpolate({
                    inputRange: [0, 0.25, 0.5, 0.75, 1],
                    outputRange: [0, -30, 0, 30, 0],
                  }),
                },
                {
                  translateY: timingAnim.interpolate({
                    inputRange: [0, 0.25, 0.5, 0.75, 1],
                    outputRange: [0, -30, -40, -30, 0],
                  }),
                },
              ],
            },
          ]}
        />
        <Animated.Text
          style={[
            styles.title,
            {opacity: timingAnim},
          ]}
        >
          Tic Tac Toe
        </Animated.Text>
      </View>
    );
  };

  const renderInputs = () => {
    return (
      <Animated.View style={[styles.inputContainer, { opacity: timingAnim }]}>
        <CustomTextInput
          title="Your name"
          placeholder="Type a name"
          style={{ color: "#81b0ff" }}
          value={playerNames.PLAYER_ONE}
          onChangeText={(text: string) =>
            updatePlayerNames(PlayerKind.PLAYER_ONE, text)
          }
        />
        {!singlePlayer && (
          <CustomTextInput
            title="Friend's name"
            style={{ color: "#f5dd4b" }}
            placeholder="Type a name"
            value={playerNames.PLAYER_TWO}
            onChangeText={(text: string) =>
              updatePlayerNames(PlayerKind.PLAYER_TWO, text)
            }
          />
        )}
      </Animated.View>
    );
  };

  const renderButtons = () => {
    return (
      <Animated.View style={[styles.buttonContainer, {opacity: timingAnim}]}>
        <CustomButton text="LET'S START" onPress={onPressPlay} />
        <CustomButton
          text={
            !singlePlayer
              ? `Play with ${Platform.OS === "android" ? "Google" : "Siri"}`
              : "Play with a friend"
          }
          variant="Link"
          onPress={() => useSinglePlayer(!singlePlayer)}
        />
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      {renderTitle()}
      {renderInputs()}
      {renderButtons()}
    </View>
  );
};

export default PlayerScreen;
