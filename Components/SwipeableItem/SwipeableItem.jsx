import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Swipeable } from "react-native-gesture-handler";

const SwipeableItem = () => {
  const deleteButtonWidth = 100;

  const renderRightActions = () => {
    return (
      <View style={styles.rightActionsContainer}>
        <TouchableOpacity
          style={[styles.deleteButton, { width: deleteButtonWidth }]}
          onPress={() => alert("Item deleted")}
        >
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {Array.from({ length: 10 }, (_, index) => (
        <Swipeable
          key={index}
          renderRightActions={renderRightActions}
          rightThreshold={deleteButtonWidth}
          renderLeftActions={renderRightActions}
          leftThreshold={deleteButtonWidth}
        >
          <View style={styles.item}>
            <Text>Item {index + 1}</Text>
          </View>
        </Swipeable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  item: {
    padding: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  rightActionsContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  deleteButton: {
    backgroundColor: "#ff4d4d",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  deleteText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default SwipeableItem;
