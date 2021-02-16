import React from 'react';
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import Colors from '../constants/Colors';
import CustomHeaderButton from '../components/CustomHeaderButton';
import { CATEGORIES, MEALS } from '../data/dummy-data';

const Stack = createStackNavigator();
const Tab = Platform.OS === 'android' ? createMaterialBottomTabNavigator() : createBottomTabNavigator();

const MealDetail = () => {
  return (
    <Stack.Screen
      name="MealDetail"
      component={MealDetailScreen}
      options={(navigationData) => {
        const mealId = navigationData.route.params.mealId;

        const selectedMeal = MEALS.find(meal => meal.id === mealId);

        return {
          headerTitle: selectedMeal.title,
          ...navigationOptions,
          headerRight: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
              <Item
                title="Favorite"
                iconName="ios-star"
                onPress={() => {
                  console.log('Mark')
                }}
              />
            </HeaderButtons>
          )
        };
      }}
    />
  );
};

const MealsStack = () => {
  return (
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
      {MealDetail()}
    </Stack.Navigator>
  );
};

const FavNavigatorStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Favorite"
        component={FavoritesScreen}
        options={{
          headerTitle: "Your Favorites",
          ...navigationOptions,
        }}
      />
      {MealDetail()}
    </Stack.Navigator>
  );
};

const iosTabs = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBarOptions={iosTabBarOptions}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            switch (route.name) {
              case 'Meals':
                iconName = 'ios-restaurant';
                break;
              case 'Favorites':
                iconName = 'ios-star';
                break;
              default: break;
            }

            return <Ionicons name={iconName} size={25} color={color} />;
          },
        })}
      >
        <Tab.Screen
          name="Meals"
          component={MealsStack}
        />
        <Tab.Screen
          name="Favorites"
          component={FavNavigatorStack}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const androidTabs = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        {...androidTabBarOptions}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            switch (route.name) {
              case 'Meals':
                iconName = 'ios-restaurant';
                break;
              case 'Favorites':
                iconName = 'ios-star';
                break;
              default: break;
            }

            return <Ionicons name={iconName} size={25} color={color} />;
          },
          tabBarColor: route.name === 'Meals' ? Colors.primaryColor : Colors.accentColor
        })}
      >
        <Tab.Screen
          name="Meals"
          component={MealsStack}
        />
        <Tab.Screen
          name="Favorites"
          component={FavNavigatorStack}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const navigationOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : 'white'
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor, // цвет headerTitle
};

const androidTabBarOptions = {
  activeColor: 'white',
  shifting: true,
  barStyle: {
    backgroundColor: Colors.primaryColor
  }
};

const iosTabBarOptions = {
  activeTintColor: Colors.accentColor,
};

const MyTabs = Platform.OS === 'android' ? androidTabs : iosTabs;

export default MyTabs;