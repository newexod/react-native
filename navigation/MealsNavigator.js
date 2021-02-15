import React from 'react';
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import Colors from '../constants/Colors';

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
            headerStyle: {
              backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : 'white'
            },
            headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor // цвет headerTitle
          }}
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