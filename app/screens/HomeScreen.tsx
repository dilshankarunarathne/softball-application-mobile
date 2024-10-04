import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View>
      <Text>Home Screen</Text>
      <Button title="Go to Teams" onPress={() => navigation.navigate('TeamScreen')} />
      <Button title="Go to Matches" onPress={() => navigation.navigate('MatchScreen')} />
      <Button title="Go to News" onPress={() => navigation.navigate('NewsScreen')} />
      <Button title="Go to Settings" onPress={() => navigation.navigate('SettingsScreen')} />
    </View>
  );
}