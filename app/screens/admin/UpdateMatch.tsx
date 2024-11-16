import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { RouteProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type RouteParams = {
  params: {
    matchId: string;
  };
};

const UpdateMatchScreen = (props: { route: RouteProp<RouteParams, 'params'> }) => {
  const { route } = props;
  const { matchId } = route.params;

  const [loading, setLoading] = useState(true);
  const [team1Name, setTeam1Name] = useState('');
  const [team2Name, setTeam2Name] = useState('');
  const [matchDate, setMatchDate] = useState('');
  const [matchTime, setMatchTime] = useState('');
  const [groundName, setGroundName] = useState('');
  const [tossWinner, setTossWinner] = useState('');
  const [batFirst, setBatFirst] = useState('');

  useEffect(() => {
    const fetchMatchDetails = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        if (!token) {
          Alert.alert('Error', 'No auth token found');
          return;
        }

        const response = await fetch(`http://localhost:3000/matches/${matchId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch match details');
        }

        const data = await response.json();
        setTeam1Name(data.team1);
        setTeam2Name(data.team2);
        setMatchDate(data.date);
        setMatchTime(data.start_time);
        setGroundName(data.location);
        setTossWinner(data.toss_winner);
        setBatFirst(data.bat_first);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching match details:', error);
        Alert.alert('Error', 'Failed to fetch match details');
        setLoading(false);
      }
    };

    fetchMatchDetails();
  }, [matchId]);

  const handleUpdateMatch = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (!token) {
        Alert.alert('Error', 'No auth token found');
        return;
      }

      const formData = new FormData();
      formData.append('team1', team1Name);
      formData.append('team2', team2Name);
      formData.append('date', matchDate);
      formData.append('start_time', matchTime);
      formData.append('location', groundName);
      formData.append('toss_winner', tossWinner);
      formData.append('bat_first', batFirst);
      // Add other match details as needed

      const response = await fetch(`http://localhost:3000/matches/${matchId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        Alert.alert('Success', 'Match updated successfully');
      } else {
        Alert.alert('Error', 'Failed to update match');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'An error occurred while updating the match');
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Update Match</Text>
      <View style={styles.teamContainer}>
        <TextInput
          style={styles.teamInput}
          placeholder="Team 1 Name"
          value={team1Name}
          onChangeText={setTeam1Name}
        />
        <Text style={styles.vsText}>VS</Text>
        <TextInput
          style={styles.teamInput}
          placeholder="Team 2 Name"
          value={team2Name}
          onChangeText={setTeam2Name}
        />
      </View>
      <TextInput
        style={styles.input}
        placeholder="Match Date"
        value={matchDate}
        onChangeText={setMatchDate}
      />
      <TextInput
        style={styles.input}
        placeholder="Match Time"
        value={matchTime}
        onChangeText={setMatchTime}
      />
      <TextInput
        style={styles.input}
        placeholder="Ground Name"
        value={groundName}
        onChangeText={setGroundName}
      />
      <View style={styles.tossContainer}>
        <Text style={styles.tossTitle}>Coin Toss Winner:</Text>
        <View style={styles.radioGroup}>
          <RadioButton
            value="Team 1"
            status={tossWinner === 'Team 1' ? 'checked' : 'unchecked'}
            onPress={() => setTossWinner('Team 1')}
          />
          <Text>Team 1</Text>
          <RadioButton
            value="Team 2"
            status={tossWinner === 'Team 2' ? 'checked' : 'unchecked'}
            onPress={() => setTossWinner('Team 2')}
          />
          <Text>Team 2</Text>
        </View>
      </View>
      <View style={styles.batFirstContainer}>
        <Text style={styles.batFirstTitle}>Bat First:</Text>
        <View style={styles.radioGroup}>
          <RadioButton
            value="Team 1"
            status={batFirst === 'Team 1' ? 'checked' : 'unchecked'}
            onPress={() => setBatFirst('Team 1')}
          />
          <Text>Team 1</Text>
          <RadioButton
            value="Team 2"
            status={batFirst === 'Team 2' ? 'checked' : 'unchecked'}
            onPress={() => setBatFirst('Team 2')}
          />
          <Text>Team 2</Text>
        </View>
      </View>
      <Button title="Update Match" onPress={handleUpdateMatch} style={styles.updateButton} />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    input: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 5,
      padding: 10,
      marginBottom: 15,
    },
    teamContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 15,
    },
    teamInput: {
      flex: 1,
      marginRight: 10,
    },
    vsText: {
      fontSize: 16,
    },
    tossContainer: {
      marginBottom: 15,
    },
    tossTitle: {
      fontSize: 16,
      marginBottom: 5,
    },
    radioGroup: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    batFirstContainer: {
      marginBottom: 15,
    },
    batFirstTitle: {
      fontSize: 16,
      marginBottom: 5,
    },
    updateButton: {
      backgroundColor: 'blue',
      padding: 10,
      borderRadius: 5,
    },
});

export default UpdateMatchScreen;
