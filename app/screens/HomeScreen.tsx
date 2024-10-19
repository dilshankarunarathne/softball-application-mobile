import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation();

  const team = {
    name: 'Team A',
    logo: 'https://example.com/logo.png',
    players: ['Player 1', 'Player 2'],
    stats: {
      wins: 10,
      losses: 5,
      ties: 2,
    },
  };

  return (
    <View>
      <Text>Home Screen</Text>
      <Button title="Go to Teams" onPress={() => navigation.navigate('screens/TeamScreen', { team })} />
      <Button title="Go to Matches" onPress={() => navigation.navigate('screens/MatchScreen')} />
      <Button title="Go to News" onPress={() => navigation.navigate('screens/NewsScreen')} />
      <Button title="Go to Settings" onPress={() => navigation.navigate('screens/SettingsScreen')} />
    </View>
  );
}