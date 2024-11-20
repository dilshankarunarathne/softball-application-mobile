import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';

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
        const response = await axios.get(`http://localhost:3000/scores?matchId=${matchId}`);
        setScores(response.data);
      } catch (error) {
        console.error('Error fetching scores:', error);
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
      {scores.map(score => (
        <View key={score._id} style={styles.scoreRow}>
          <Text style={styles.scoreText}>Player: {score.player}</Text>
          <Text style={styles.scoreText}>Runs: {score.runs}</Text>
          <Text style={styles.scoreText}>Wickets: {score.wickets}</Text>
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
  scoreRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  scoreText: {
    fontSize: 16,
  },
});

export default SummaryScreen;
