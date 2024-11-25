import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SummaryScreen = ({ route }) => {
  const { matchId } = route.params;
  const [matchDetails, setMatchDetails] = useState(null);
  const [scores, setScores] = useState([]);
  const [teamNames, setTeamNames] = useState({ team1: '', team2: '' });

  useEffect(() => {
    const fetchMatchDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/matches/${matchId}`);
        setMatchDetails(response.data);
        fetchTeamNames(response.data.team1, response.data.team2);
      } catch (error) {
        console.error('Error fetching match details:', error);
      }
    };

    const fetchScores = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        const response = await axios.get(`http://localhost:3000/score/current/${matchId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setScores(response.data);
        console.log(response.data);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          console.warn('Scores not found for this match.');
          setScores([]);
        } else {
          console.error('Error fetching scores:', error);
        }
      }
    };

    const fetchTeamNames = async (team1Id, team2Id) => {
      try {
        const [team1Response, team2Response] = await Promise.all([
          axios.get(`http://localhost:3000/teams/${team1Id}`),
          axios.get(`http://localhost:3000/teams/${team2Id}`)
        ]);
        setTeamNames({
          team1: team1Response.data.name,
          team2: team2Response.data.name
        });
      } catch (error) {
        console.error('Error fetching team names:', error);
      }
    };

    fetchMatchDetails();
    fetchScores();
  }, [matchId]);

  if (!matchDetails) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Match Summary</Text>
      <Text style={styles.subtitle}>Location: {matchDetails.location}</Text>
      <Text style={styles.subtitle}>Date: {new Date(matchDetails.date).toLocaleDateString()}</Text>
      <Text style={styles.subtitle}>Teams: {teamNames.team1} vs {teamNames.team2}</Text>
      <Text style={styles.subtitle}>Status: {matchDetails.status}</Text>

      <Text style={styles.title}>Scores</Text>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <Text style={styles.tableHeader}>Team</Text>
          <Text style={styles.tableHeader}>Score</Text>
          <Text style={styles.tableHeader}>Wickets</Text>
          <Text style={styles.tableHeader}>Overs</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>{teamNames.team1}</Text>
          <Text style={styles.tableCell}>{scores.team1_score}</Text>
          <Text style={styles.tableCell}>{scores.team1_wickets}</Text>
          <Text style={styles.tableCell}>{scores.team1_overs}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>{teamNames.team2}</Text>
          <Text style={styles.tableCell}>{scores.team2_score}</Text>
          <Text style={styles.tableCell}>{scores.team2_wickets}</Text>
          <Text style={styles.tableCell}>{scores.team2_overs}</Text>
        </View>
      </View>

      <Text style={styles.title}>Overs</Text>
      {scores.overs && scores.overs.map(over => (
        <View key={over._id} style={styles.overRow}>
          <Text style={styles.overText}>Over: {over.over_number}</Text>
          {over.balls.map(ball => (
            <View key={ball._id} style={styles.ballRow}>
              <Text style={styles.ballText}>Player: {ball.batsman_id}</Text>
              <Text style={styles.ballText}>Runs: {ball.runs}</Text>
              <Text style={styles.ballText}>Wickets: {ball.wicket ? 1 : 0}</Text>
            </View>
          ))}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 5,
  },
  table: {
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  tableHeader: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  tableCell: {
    fontSize: 16,
  },
  overRow: {
    marginBottom: 10,
  },
  overText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  ballRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  ballText: {
    fontSize: 16,
  },
});

export default SummaryScreen;
