import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import TeamScreen from './screens/TeamScreen';
import MatchScreen from './screens/MatchScreen';
import NewsScreen from './screens/NewsScreen';
import SettingsScreen from './screens/SettingsScreen';

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
  HomeScreen: undefined;
  TeamScreen: { team: Team };
  MatchScreen: undefined;
  NewsScreen: undefined;
  SettingsScreen: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function RootLayout() {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="TeamScreen" component={TeamScreen} />
      <Stack.Screen name="MatchScreen" component={MatchScreen} />
      <Stack.Screen name="NewsScreen" component={NewsScreen} />
      <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
    </Stack.Navigator>
  );
}