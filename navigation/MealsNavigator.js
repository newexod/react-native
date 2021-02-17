import React from 'react';
import { Platform, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import FiltersScreen from '../screens/FiltersScreen';
import Colors from '../constants/Colors';
import CustomHeaderButton from '../components/CustomHeaderButton';
import { CATEGORIES, MEALS } from '../data/dummy-data';

const Stack = createStackNavigator();
const Tab = Platform.OS === 'android' ? createMaterialBottomTabNavigator() : createBottomTabNavigator();
const Drawer = createDrawerNavigator();

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
        options={(navigationData) => {
          return {
            headerTitle: "Meal Categories",
            ...navigationOptions,
            headerLeft: () => (
              <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                  title="Menu"
                  iconName="ios-menu"
                  onPress={() => {
                    navigationData.navigation.toggleDrawer();
                  }}
                />
              </HeaderButtons>
            )
          }
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
        options={(navigationData) => {
          return {
            headerTitle: "Your Favorites",
            ...navigationOptions,
            headerLeft: () => (
              <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                  title="Menu"
                  iconName="ios-menu"
                  onPress={() => {
                    navigationData.navigation.toggleDrawer();
                  }}
                />
              </HeaderButtons>
            )
          }
        }}
      />
      {MealDetail()}
    </Stack.Navigator>
  );
};

const FiltersNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Favorite"
        component={FiltersScreen}
        options={(navigationData) => {
          return {
            headerTitle: "Filtes",
            ...navigationOptions,
            headerLeft: () => (
              <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                  title="Menu"
                  iconName="ios-menu"
                  onPress={() => {
                    navigationData.navigation.toggleDrawer();
                  }}
                />
              </HeaderButtons>
            ),
            headerRight: () => (
              <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                  title="Save"
                  iconName="ios-save"
                  onPress={navigationData.route.params.save()}
                />
              </HeaderButtons>
            )
          }
        }}
      />
    </Stack.Navigator>
  );
};

const iosTabs = () => {
  return (
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
        tabBarLabel: ({ focused, color, size }) => {
          return <Text style={{ fontFamily: 'open-sans-bold' }}>{route.name}</Text>
        }
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
    </Tab.Navigator >
  );
};

const androidTabs = () => {
  return (
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
  );
};

const MyTabs = Platform.OS === 'android' ? androidTabs : iosTabs;

const DrawerNavigator = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContentOptions={{
          activeTintColor: Colors.accentColor,
          labelStyle: {
            fontFamily: 'open-sans-bold'
          }
        }}
      >
        <Drawer.Screen name="Meals" component={MyTabs} />
        <Drawer.Screen name="Filters" component={FiltersNavigator} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

const navigationOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : 'white'
  },
  headerTitleStyle: {
    fontFamily: 'open-sans-bold'
  },
  headerBackTitleStyle: {
    fontFamily: 'open-sans'
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
  labelStyle: {
    fontFamily: 'open-sans-bold'
  },
  activeTintColor: Colors.accentColor,
};

export default DrawerNavigator;