import { StyleSheet } from "react-native";
import Layout from "../../constants/Layout";

const styles = StyleSheet.create({
  container: {
    height: (Layout.window.width - Math.max(60, Layout.window.width / 6)) / 3,
    width: (Layout.window.width - Math.max(60, Layout.window.width / 6)) / 3,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default styles;
