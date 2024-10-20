import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import UserHomeScreen from './screens/user/UserHome';

type Team = {
  name: string;
  logo: string;
  players: string[];
  stats: {
    wins: number;
    losses: number;
    ties: number;
  };
};

type RootStackParamList = {
  'screens/UserHomeScreen': undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function RootLayout() {
  return (
    <Stack.Navigator initialRouteName="screens/UserHomeScreen">
      <Stack.Screen name="screens/UserHomeScreen" component={UserHomeScreen} />
    </Stack.Navigator>
  );
}