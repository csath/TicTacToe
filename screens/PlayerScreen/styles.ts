import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";
import Layout from "../../constants/Layout";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.background,
  },
  title: {
    fontSize: 30,
    fontWeight: "600",
    color: Colors.text,
    top: Layout.window.height / 3.125,
    position: "absolute",
  },
  headerImage: {
    width: Layout.window.width / 2.5,
    height: Layout.window.width / 2.5,
    resizeMode: "contain",
    marginTop: 80,
  },
  headerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  inputContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  buttonContainer: {
    flex: 1,
  },
});

export default styles;
