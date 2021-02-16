import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

import { MEALS } from '../data/dummy-data';

const MealDetailsScreen = props => {
  const mealId = props.route.params.mealId;

  const selectedMeal = MEALS.find(meal => meal.id === mealId);

  return (
    <View style={styles.screen}>
      <Text>{selectedMeal.title}</Text>
      <Button title="Go Back to Categories" onPress={() => {
        props.navigation.popToTop();
      }} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default MealDetailsScreen;