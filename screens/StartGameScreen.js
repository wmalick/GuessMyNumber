import { useState } from "react";
import {
  TextInput,
  View,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Dimensions,
} from "react-native";
import PrimaryButton from "../components/ui/PrimaryButton";
import Title from "../components/ui/Title";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";
import Colors from "../utils/Colors";

function StartGameScreen({ setPickedNumber }) {
  const [enteredNumber, setEnteredNumber] = useState("");

  function enteredNumberHandler(enteredText) {
    setEnteredNumber(enteredText);
  }

  function resetHandler() {
    setEnteredNumber("");
  }

  function confirmHandler() {
    const choosenNumber = parseInt(enteredNumber);

    if (isNaN(choosenNumber) || choosenNumber <= 0 || choosenNumber > 99) {
      Alert.alert("Invalid Number", "Entered number must be between 0 and 99", [
        { text: "Okay", style: "destructive", onPress: resetHandler },
      ]);
      return;
    }
    setPickedNumber(choosenNumber);
  }

  return (
    <ScrollView style={styles.screen}>
      <KeyboardAvoidingView style={styles.screen} behavior="position">
        <View style={styles.rootContainer}>
          <Title>Guess My Number</Title>
          <Card>
            <InstructionText>Enter a Number</InstructionText>
            <TextInput
              style={styles.numberInput}
              maxLength={2}
              keyboardType="number-pad"
              autoCapitalize="none"
              autoCorrect={false}
              value={enteredNumber}
              onChangeText={enteredNumberHandler}
            />

            <View style={styles.buttonsContainer}>
              <View style={styles.buttonContainer}>
                <PrimaryButton onButtonPress={resetHandler}>
                  Reset
                </PrimaryButton>
              </View>
              <View style={styles.buttonContainer}>
                <PrimaryButton onButtonPress={confirmHandler}>
                  Confirm
                </PrimaryButton>
              </View>
            </View>
          </Card>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

export default StartGameScreen;

const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  rootContainer: {
    flex: 1,
    marginTop: screenWidth < 380 ? 50 : 100,
    alignItems: "center",
  },
  numberInput: {
    height: 50,
    fontSize: 32,
    borderBottomColor: Colors.accent500,
    borderBottomWidth: 2,
    color: Colors.accent500,
    marginVertical: 8,
    fontWeight: "bold",
    width: 50,
    textAlign: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  buttonContainer: {
    flex: 1,
  },
});
