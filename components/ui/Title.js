import { Text, StyleSheet, Dimensions, Platform } from "react-native";

function Title({ children }) {
  return <Text style={styles.title}>{children}</Text>;
}

export default Title;

const dimentionWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  title: {
    fontFamily: "open-sans-bold",
    fontSize: dimentionWidth < 380 ? 12 : 24,
    //fontWeight: "bold",
    color: "white",
    textAlign: "center",
    //borderWidth: 2,
    //borderWidth: Platform.OS === "ios" ? 0 : 2,
    borderWidth: Platform.select({ ios: 0, android: 2 }),
    borderColor: "white",
    padding: 12,
  },
});
