import React from "react";
import { Pressable, PressableProps, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { CellOccupancy } from "../../types";
import Colors from "../../constants/Colors";
import styles from "./styles";

type CellProps = {
  player: CellOccupancy;
  wrapperStyle?: View["props"]["style"];
} & PressableProps;

const Cell = ({ player, wrapperStyle, ...props }: CellProps) => {
  const getIcon = (player: CellOccupancy) => {
    switch (player) {
      case CellOccupancy.PLAYER_ONE:
        return (
          <Ionicons
            name="md-radio-button-off"
            size={70}
            color={Colors.iconColorLight}
          />
        );
      case CellOccupancy.PLAYER_TWO:
        return <Ionicons name="close" size={76} color={Colors.iconColorDark} />;
      case CellOccupancy.NONE:
      default:
        return null;
    }
  };
  return (
    <Pressable {...props}>
      <View style={[styles.container, wrapperStyle]}>{getIcon(player)}</View>
    </Pressable>
  );
};

export default Cell;
