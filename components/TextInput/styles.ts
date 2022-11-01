import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    width: "70%",
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingVertical: 16,
    borderBottomColor: Colors.borderColor,
  },
  title: {
    color: Colors.text,
    fontSize: 15,
    paddingVertical: 12,
  },
  textInput: {
    fontSize: 18,
    color: Colors.text,
  },
});

export default styles;
