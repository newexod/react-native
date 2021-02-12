import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import MainButton from '../components/MainButton';
import BodyText from '../components/BodyText';
import DefaultStyles from '../constants/default-styles';

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
};

// Для ScrollView
// const renderListItem = (value, numOfRound) => (
//   <View
//     key={value}
//     style={styles.listItem}
//   >
//     <BodyText>#{numOfRound}</BodyText>
//     <BodyText>{value}</BodyText>
//   </View>
// );

// Для FlatList
const renderListItem = (listLength, itemData) => (
  <View style={styles.listItem}>
    <BodyText>#{listLength - itemData.index}</BodyText>
    <BodyText>{itemData.item}</BodyText>
  </View>
);

const GameScreen = props => {
  const { userChoise, onGameOver } = props;

  const initialGuess = generateRandomBetween(1, 100, userChoise);

  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  // const [pastGuesses, setPastGuesses] = useState([initialGuess]); // Для ScrollView
  const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]); // Для FlatList

  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  useEffect(() => {
    if (currentGuess === userChoise) {
      onGameOver(pastGuesses.length);
    }
  }, [currentGuess, userChoise, onGameOver]);

  const nextGuessHandler = direction => {
    if ((direction === 'lower' && currentGuess < userChoise) || (direction === 'greater' && currentGuess > userChoise)) {
      Alert.alert(
        'Don\'t lie!',
        'You know that this is wrong...',
        [{
          text: 'Sorry!',
          style: 'cancel'
        }]
      );
      return;
    }

    if (direction === 'lower') {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess + 1;
    }

    const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
    setCurrentGuess(nextNumber);
    // setPastGuesses(curPastGuesses => [nextNumber, ...curPastGuesses]); // Для ScrollView
    setPastGuesses(curPastGuesses => [nextNumber.toString(), ...curPastGuesses]); // Для FlatList
  };

  return (
    <View style={styles.screen}>
      <Text style={DefaultStyles.title}>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <MainButton onPress={() => nextGuessHandler('lower')}>
          <Ionicons
            name="md-remove"
            size={24}
            color="white"
          />
        </MainButton>
        <MainButton onPress={() => nextGuessHandler('greater')}>
          <Ionicons
            name="md-add"
            size={24}
            color="white"
          />
        </MainButton>
      </Card>
      <View style={styles.listContainer}>
        <FlatList
          keyExtractor={item => item}
          data={pastGuesses}
          renderItem={renderListItem.bind(this, pastGuesses.length)}
          contentContainerStyle={styles.list}
        />
        {/* <ScrollView contentContainerStyle={styles.list}>
          {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
        </ScrollView> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    width: 400,
    maxWidth: '90%'
  },
  listContainer: {
    flex: 1,
    // width: '80%', // Для <ScrollView />
    width: '60%' // Для <FlatList />
  },
  list: {
    flexGrow: 1, // обязательно для <ScrollView />
    // alignItems: 'center', // для <ScrollView />
    justifyContent: 'flex-end'
  },
  listItem: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 15,
    marginVertical: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // width: '60%' // Для <ScrollView />
    width: '100%' // Для <FlatList />
  }
});

export default GameScreen;