import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

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
  'screens/HomeScreen': undefined;
  'screens/TeamScreen': { team: Team };
  'screens/MatchScreen': undefined;
  'screens/NewsScreen': undefined;
  'screens/SettingsScreen': undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function RootLayout() {
  return (
    <Stack.Navigator initialRouteName="screens/HomeScreen">
      <Stack.Screen name="screens/HomeScreen" component={HomeScreen} />
      <Stack.Screen name="screens/TeamScreen" component={TeamScreen} />
      <Stack.Screen name="screens/MatchScreen" component={MatchScreen} />
      <Stack.Screen name="screens/NewsScreen" component={NewsScreen} />
      <Stack.Screen name="screens/SettingsScreen" component={SettingsScreen} />
    </Stack.Navigator>
  );
}