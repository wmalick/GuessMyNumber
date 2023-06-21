import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { ImageBackground, StyleSheet, SafeAreaView } from "react-native";
import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "./utils/Colors";
import GameOverScreen from "./screens/GameOverScreen";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";

export default function App() {
  const [pickedNumber, setPickedNumber] = useState();
  const [isGameOver, setIsGameOver] = useState(true);
  const [guessRounds, setGuessRounds] = useState(0);

  const [fontsLoaded] = useFonts({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading>zl</AppLoading>;
  }

  function pickedNumberHandler(choosenNumber) {
    setPickedNumber(choosenNumber);
    setIsGameOver(false);
  }

  function setIsGameOverHandler(numberOfRounds) {
    setIsGameOver(true);
    setGuessRounds(numberOfRounds);
  }

  function startNewGameHandler() {
    setPickedNumber(null);
    setGuessRounds(0);
  }

  let screen = <StartGameScreen setPickedNumber={pickedNumberHandler} />;

  if (pickedNumber) {
    screen = (
      <GameScreen
        userEnteredNumber={pickedNumber}
        setGameOver={setIsGameOverHandler}
      />
    );
  }

  if (isGameOver && pickedNumber) {
    screen = (
      <GameOverScreen
        roundNumber={guessRounds}
        userNumber={pickedNumber}
        onStartNewGame={startNewGameHandler}
      ></GameOverScreen>
    );
  }

  return (
    <>
      <StatusBar style="light" />
      <LinearGradient
        colors={[Colors.primary700, Colors.accent500]}
        style={styles.rootScreen}
      >
        <ImageBackground
          source={require("./assets/images/background.png")}
          resizeMode="cover"
          style={styles.rootScreen}
          imageStyle={styles.backgroundIamge}
        >
          <SafeAreaView style={styles.rootScreen}>{screen}</SafeAreaView>
        </ImageBackground>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  backgroundIamge: {
    opacity: 0.15,
  },
});
