import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 100,
  },
  listEmptyContainer: {
    flexGrow: 1,
  },
  rowContainer: {
    flexDirection: "row",
    padding: 16,
    minHeight: 40,
  },
  rankContainer: {
    flex: 1,
  },
  nameContainer: {
    flex: 2,
  },
  resultContainer: {
    flex: 1,
  },
  itemSeperator: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.borderColor,
  },
  text: {
    color: Colors.btnTextSecondary,
    fontSize: 16,
  },
  highlightText: {
    color: Colors.iconColorLight,
  },
  dimText: {
    color: Colors.textDim,
  },
  headerText: {
    color: Colors.text,
    fontSize: 17,
  },
});

export default styles;
