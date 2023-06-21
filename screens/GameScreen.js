import { useState, useEffect } from "react";
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import Title from "../components/ui/Title";
import GuessedNumberContainer from "../components/game/GuessedNumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";
import { Ionicons } from "@expo/vector-icons";
import GuessLogItem from "../components/game/GuessLogItem";

function generateRandomNumberBetween(min, max, exclude) {
  const ranNum = Math.floor(Math.random() * (max - min)) + min;
  if (ranNum === exclude) {
    return generateRandomNumberBetween(min, max, exclude);
  } else {
    return ranNum;
  }
}

let minBoundary = 1,
  maxBoundary = 100;

function GameScreen({ userEnteredNumber, setGameOver }) {
  const initialGuess = generateRandomNumberBetween(1, 100, userEnteredNumber);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [guessRounds, setGuessRounds] = useState([initialGuess]);

  useEffect(() => {
    if (currentGuess === userEnteredNumber) {
      setGameOver(guessRounds.length);
    }
  }, [currentGuess, userEnteredNumber, setGameOver]);

  useEffect(() => {
    minBoundary = 1;
    maxBoundary = 100;
  }, []);

  function nextGuessHandler(direction) {
    //direction => 'lower', 'higher'
    if (
      (direction === "lower" && currentGuess < userEnteredNumber) ||
      (direction === "greater" && currentGuess > userEnteredNumber)
    ) {
      Alert.alert("Don't lie!", "You know this is wrong information... ", [
        { text: "Sorry!", style: "cancel" },
      ]);
      return;
    }
    if (direction === "lower") {
      maxBoundary = currentGuess;
    } else {
      minBoundary = currentGuess + 1;
    }

    const newRanNum = generateRandomNumberBetween(
      minBoundary,
      maxBoundary,
      currentGuess
    );
    setCurrentGuess(newRanNum);
    setGuessRounds((previousGuessRounds) => [
      newRanNum,
      ...previousGuessRounds,
    ]);
  }

  const guessRoundsListLength = guessRounds.length;

  const { width, height } = useWindowDimensions();

  let content = (
    <>
      <GuessedNumberContainer>{currentGuess}</GuessedNumberContainer>
      <Card>
        <InstructionText style={styles.instructionText}>
          Lower or Higher?
        </InstructionText>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onButtonPress={nextGuessHandler.bind(this, "lower")}>
              <Ionicons name="md-remove" color={"white"} size={24} />
            </PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton
              onButtonPress={nextGuessHandler.bind(this, "greater")}
            >
              <Ionicons name="md-add" color={"white"} size={24} />
            </PrimaryButton>
          </View>
        </View>
      </Card>
    </>
  );

  if (width > 500) {
    content = (
      <>
        <View style={styles.buttonContainerLandscape}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onButtonPress={nextGuessHandler.bind(this, "lower")}>
              <Ionicons name="md-remove" color={"white"} size={24} />
            </PrimaryButton>
          </View>

          <GuessedNumberContainer>{currentGuess}</GuessedNumberContainer>

          <View style={styles.buttonContainer}>
            <PrimaryButton
              onButtonPress={nextGuessHandler.bind(this, "greater")}
            >
              <Ionicons name="md-add" color={"white"} size={24} />
            </PrimaryButton>
          </View>
        </View>
      </>
    );
  }

  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>
      {content}
      <View style={styles.listContainer}>
        {/* {guessRounds.map((guessRound) => (
          <Text key={guessRound}>{guessRound}</Text>
        ))} */}

        <FlatList
          data={guessRounds}
          renderItem={(itemData) => (
            <GuessLogItem
              roundNumber={guessRoundsListLength - itemData.index + 1}
              guess={itemData.item}
            />
          )}
          keyExtractor={(item) => {
            item;
          }}
        ></FlatList>
      </View>
    </View>
  );
}

export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
  },
  instructionText: {
    marginBottom: 12,
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  buttonContainer: {
    flex: 1,
  },
  buttonContainerLandscape: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  listContainer: {
    flex: 1,
    padding: 16,
  },
});
