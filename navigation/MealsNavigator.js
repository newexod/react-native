import React from 'react';
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import Colors from '../constants/Colors';
import { CATEGORIES, MEALS } from '../data/dummy-data';

const Stack = createStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Categories"
          component={CategoriesScreen}
          options={{
            headerTitle: "Meal Categories",
            ...navigationOptions,
          }}
        />
        <Stack.Screen
          name="CategoryMeals"
          component={CategoryMealsScreen}
          options={(navigationData) => {
            const catId = navigationData.route.params.categoryId;

            const selectedCategory = CATEGORIES.find(cat => cat.id === catId);

            return {
              headerTitle: selectedCategory.title,
              ...navigationOptions
            };
          }}
        />
        <Stack.Screen
          name="MealDetail"
          component={MealDetailScreen}
          options={(navigationData) => {
            const mealId = navigationData.route.params.mealId;

            const selectedMeal = MEALS.find(meal => meal.id === mealId);

            return {
              headerTitle: selectedMeal.title
            };
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const navigationOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : 'white'
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor, // цвет headerTitle
};

export default MyStack;