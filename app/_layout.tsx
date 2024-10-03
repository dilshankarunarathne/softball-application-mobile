import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import TeamScreen from './screens/TeamScreen';
import MatchScreen from './screens/MatchScreen';
import NewsScreen from './screens/NewsScreen';
import SettingsScreen from './screens/SettingsScreen';

const Stack = createStackNavigator();

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