import { StyleSheet } from 'react-native';
import Layout from '../../constants/Layout';

const styles = StyleSheet.create({
  container: {
    height: (Layout.window.width - 60) / 3,
    width: (Layout.window.width - 60) / 3,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default styles;
