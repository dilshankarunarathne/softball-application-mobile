import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator, ScrollView } from 'react-native';
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
  const [endTime, setEndTime] = useState('');
  const [groundName, setGroundName] = useState('');
  const [tossWinner, setTossWinner] = useState('');
  const [batFirst, setBatFirst] = useState('');
  const [team1Score, setTeam1Score] = useState('');
  const [team2Score, setTeam2Score] = useState('');
  const [team1Wickets, setTeam1Wickets] = useState('');
  const [team2Wickets, setTeam2Wickets] = useState('');
  const [team1OversPlayed, setTeam1OversPlayed] = useState('');
  const [team2OversPlayed, setTeam2OversPlayed] = useState('');
  const [winner, setWinner] = useState('');
  const [status, setStatus] = useState('');
  const [team1FullName, setTeam1FullName] = useState('');
  const [team2FullName, setTeam2FullName] = useState('');

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
        setEndTime(data.end_time);
        setGroundName(data.location);
        setTossWinner(data.toss_winner);
        setBatFirst(data.bat_first);
        setTeam1Score(data.team1_score);
        setTeam2Score(data.team2_score);
        setTeam1Wickets(data.team1_wickets);
        setTeam2Wickets(data.team2_wickets);
        setTeam1OversPlayed(data.team1_overs_played);
        setTeam2OversPlayed(data.team2_overs_played);
        setWinner(data.winner);
        setStatus(data.status);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching match details:', error);
        Alert.alert('Error', 'Failed to fetch match details');
        setLoading(false);
      }
    };

    fetchMatchDetails();
  }, [matchId]);

  useEffect(() => {
    const fetchTeamNames = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        if (!token) {
          Alert.alert('Error', 'No auth token found');
          return;
        }

        const response1 = await fetch(`http://localhost:3000/teams/${team1Name}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const response2 = await fetch(`http://localhost:3000/teams/${team2Name}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response1.ok || !response2.ok) {
          throw new Error('Failed to fetch team names');
        }

        const data1 = await response1.json();
        const data2 = await response2.json();
        setTeam1FullName(data1.name);
        setTeam2FullName(data2.name);
      } catch (error) {
        console.error('Error fetching team names:', error);
        Alert.alert('Error', 'Failed to fetch team names');
      }
    };

    if (team1Name && team2Name) {
      fetchTeamNames();
    }
  }, [team1Name, team2Name]);

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
      formData.append('end_time', endTime);
      formData.append('location', groundName);
      formData.append('toss_winner', tossWinner);
      formData.append('bat_first', batFirst);
      formData.append('team1_score', team1Score);
      formData.append('team2_score', team2Score);
      formData.append('team1_wickets', team1Wickets);
      formData.append('team2_wickets', team2Wickets);
      formData.append('team1_overs_played', team1OversPlayed);
      formData.append('team2_overs_played', team2OversPlayed);
      formData.append('winner', winner);
      formData.append('status', status);
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
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Update Match</Text>
      <View style={styles.teamContainer}>
        <TextInput
          style={styles.teamInput}
          placeholder="Team 1 Name"
          value={team1FullName}
          editable={false}
        />
        <Text style={styles.vsText}>VS</Text>
        <TextInput
          style={styles.teamInput}
          placeholder="Team 2 Name"
          value={team2FullName}
          editable={false}
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
        placeholder="End Time"
        value={endTime}
        onChangeText={setEndTime}
      />
      <TextInput
        style={styles.input}
        placeholder="Ground Name"
        value={groundName}
        onChangeText={setGroundName}
      />
      <TextInput
        style={styles.input}
        placeholder="Team 1 Score"
        value={team1Score}
        onChangeText={setTeam1Score}
      />
      <TextInput
        style={styles.input}
        placeholder="Team 2 Score"
        value={team2Score}
        onChangeText={setTeam2Score}
      />
      <TextInput
        style={styles.input}
        placeholder="Team 1 Wickets"
        value={team1Wickets}
        onChangeText={setTeam1Wickets}
      />
      <TextInput
        style={styles.input}
        placeholder="Team 2 Wickets"
        value={team2Wickets}
        onChangeText={setTeam2Wickets}
      />
      <TextInput
        style={styles.input}
        placeholder="Team 1 Overs Played"
        value={team1OversPlayed}
        onChangeText={setTeam1OversPlayed}
      />
      <TextInput
        style={styles.input}
        placeholder="Team 2 Overs Played"
        value={team2OversPlayed}
        onChangeText={setTeam2OversPlayed}
      />
      <TextInput
        style={styles.input}
        placeholder="Winner"
        value={winner}
        onChangeText={setWinner}
      />
      <TextInput
        style={styles.input}
        placeholder="Status"
        value={status}
        onChangeText={setStatus}
      />
      <View style={styles.tossContainer}>
        <Text style={styles.tossTitle}>Coin Toss Winner:</Text>
        <View style={styles.radioGroup}>
          <RadioButton
            value="Team 1"
            status={tossWinner === team1Name ? 'checked' : 'unchecked'}
            onPress={() => setTossWinner(team1Name)}
          />
          <Text>{team1FullName}</Text>
          <RadioButton
            value="Team 2"
            status={tossWinner === team2Name ? 'checked' : 'unchecked'}
            onPress={() => setTossWinner(team2Name)}
          />
          <Text>{team2FullName}</Text>
        </View>
      </View>
      <View style={styles.batFirstContainer}>
        <Text style={styles.batFirstTitle}>Bat First:</Text>
        <View style={styles.radioGroup}>
          <RadioButton
            value="Team 1"
            status={batFirst === team1Name ? 'checked' : 'unchecked'}
            onPress={() => setBatFirst(team1Name)}
          />
          <Text>{team1FullName}</Text>
          <RadioButton
            value="Team 2"
            status={batFirst === team2Name ? 'checked' : 'unchecked'}
            onPress={() => setBatFirst(team2Name)}
          />
          <Text>{team2FullName}</Text>
        </View>
      </View>
      <Button title="Update Match" onPress={handleUpdateMatch} style={styles.updateButton} />
    </ScrollView>
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
