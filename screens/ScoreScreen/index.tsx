import { useContext } from "react";
import { FlatList, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { AppContext } from "../../context/appContext";
import styles from "./styles";
import Colors from "../../constants/Colors";

const Scores = () => {
  const { winHistory } = useContext(AppContext);

  const renderItem = ({ item, index }: any) => {
    return (
      <View style={styles.rowContainer}>
        <View style={styles.rankContainer}>
          <Text style={[styles.text, styles.dimText]}>{index + 1}</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.text}>{item.name}</Text>
        </View>
        <View style={styles.resultContainer}>
          <Text style={[styles.text, styles.highlightText]}>
            {item.winCount}
          </Text>
        </View>
        <View style={styles.resultContainer}>
          <Text style={styles.text}>{item.lostCount}</Text>
        </View>
      </View>
    );
  };

  const renderHeader = () => {
    return (
      <View style={[styles.rowContainer, styles.itemSeperator]}>
        <View style={styles.rankContainer}>
          <Text style={styles.headerText}>Rank</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.headerText}>Name</Text>
        </View>
        <View style={styles.resultContainer}>
          <Text style={styles.headerText}>Win(s)</Text>
        </View>
        <View style={styles.resultContainer}>
          <Text style={styles.headerText}>Loss(es)</Text>
        </View>
      </View>
    );
  };

  const renderEmptyPlaceholder = () => (
    <View style={styles.placeholderContainer}>
      <Ionicons
        name="md-game-controller"
        size={60}
        color={Colors.borderColor}
      />
      <Text style={styles.headerText}>No games played yet!</Text>
    </View>
  );

  // convert data into an array to feed for Flatlist
  const listData = Object.keys(winHistory).map((e) => ({
    name: e,
    ...winHistory[e],
  }));

  // sort data according to the winRate
  listData.sort((a, b) => {
    const aWinRate = a.winCount / (a.lostCount + a.winCount);
    const bWinRate = b.winCount / (b.lostCount + b.winCount);
    return bWinRate - aWinRate;
  });

  return (
    <View style={styles.container}>
      <FlatList
        data={listData}
        contentContainerStyle={
          !listData.length ? styles.listEmptyContainer : undefined
        }
        keyExtractor={(item) => `${item.name}`}
        renderItem={renderItem}
        ListHeaderComponent={listData.length ? renderHeader : undefined}
        ItemSeparatorComponent={() => <View style={styles.itemSeperator} />}
        ListEmptyComponent={renderEmptyPlaceholder}
      />
    </View>
  );
};

export default Scores;
