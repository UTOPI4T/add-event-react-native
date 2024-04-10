// Navigator.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainPage from './MainPage';
import WSecondPage from './SecondPage';

const Stack = createStackNavigator();

const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainPage">
        <Stack.Screen name="MainPage" component={MainPage} options={{ title: 'Main Page' }} />
        <Stack.Screen name="SecondPage" component={SecondPage} options={{ title: 'Second Page' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
