import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailScreen from '../screens/MealDetailScreen';

const Stack = createStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Categories"
          component={CategoriesScreen}
        />
        <Stack.Screen
          name="CategoryMeals"
          component={CategoryMealsScreen}
        />
        <Stack.Screen
          name="MealDetail"
          component={MealDetailScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyStack;