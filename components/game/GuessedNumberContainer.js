import { StyleSheet, Text, View, Dimensions } from "react-native";
import Colors from "../../utils/Colors";

function GuessedNumberContainer({ children }) {
  return (
    <View style={styles.container}>
      <Text style={styles.numberText}>{children}</Text>
    </View>
  );
}

export default GuessedNumberContainer;

const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    borderWidth: 4,
    borderColor: Colors.accent500,
    padding: screenWidth < 380 ? 12 : 24,
    margin: 24,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  numberText: {
    fontFamily: "open-sans-bold",
    color: Colors.accent500,
    fontSize: 36,
    //fontWeight: "bold",
  },
});
