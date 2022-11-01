import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: Colors.background,
  },
  flexContainer: {
    flex: 1,
  },
  boardContainer: {
    flex: 3,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderColor: Colors.borderColor,
  },
  borderRight: {
    borderRightWidth: 1,
    borderColor: Colors.borderColor,
  },
});

export default styles;
