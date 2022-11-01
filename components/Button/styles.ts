import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.btnBackground,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 30,
    marginBottom: 15,
  },
  linkContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 15,
  },
  title: {
    color: Colors.btnText,
    fontSize: 18,
  },
  linkTitle: {
    color: Colors.btnTextSecondary,
    fontSize: 18,
  },
});

export default styles;
