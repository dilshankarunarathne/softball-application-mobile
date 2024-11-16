import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, ScrollView } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { RouteProp } from '@react-navigation/native';

type RouteParams = {
  params: {
    matchData?: {
      id: string;
      tournamentName: string;
      team1Name: string;
      team2Name: string;
      matchDate: string;
      matchTime: string;
      groundName: string;
      tossWinner: string;
      batFirst: string;
    };
  };
};

const UpdateMatchScreen = (props: { route: RouteProp<RouteParams, 'params'> }) => {
  const { route } = props;
  const { matchData } = route.params;

  if (!matchData) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>No match data available</Text>
      </View>
    );
  }

  const [matchId, setMatchId] = useState(matchData.id);
  const [tournamentName, setTournamentName] = useState(matchData.tournamentName);
  const [team1Name, setTeam1Name] = useState(matchData.team1Name);
  const [team2Name, setTeam2Name] = useState(matchData.team2Name);
  const [matchDate, setMatchDate] = useState(matchData.matchDate);
  const [matchTime, setMatchTime] = useState(matchData.matchTime);
  const [groundName, setGroundName] = useState(matchData.groundName);
  const [tossWinner, setTossWinner] = useState(matchData.tossWinner);
  const [batFirst, setBatFirst] = useState(matchData.batFirst);

  const [scoreboardData, setScoreboardData] = useState({
    over: 1,
    runs: 0,
    wickets: 0,
    extras: 0,
  });

  const handleUpdateScoreboard = (updatedScoreboardData) => {
    // Handle updating the scoreboard data and sending it to the backend
    setScoreboardData(updatedScoreboardData);
  };

  const handleUpdateMatch = () => {
    // Handle update match logic here
    console.log('Updated match data:', {
      matchId,
      tournamentName,
      team1Name,
      team2Name,
      matchDate,
      matchTime,
      groundName,
      tossWinner,
      batFirst,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Update Match</Text>
      <TextInput
        style={styles.input}
        placeholder="Match ID"
        value={matchId}
        onChangeText={setMatchId}
        editable={false} 
      />
      <TextInput
        style={styles.input}
        placeholder="Tournament Name"
        value={tournamentName}
        onChangeText={setTournamentName}
      />
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
          <RadioButton value="Team 1" label="Team 1" selected={tossWinner === 'Team 1'} onPress={() => setTossWinner('Team 1')} />
          <RadioButton value="Team 2" label="Team 2" selected={tossWinner === 'Team 2'} onPress={() => setTossWinner('Team 2')} />
        </View>
      </View>
      <View style={styles.batFirstContainer}>
        <Text style={styles.batFirstTitle}>Bat First:</Text>
        <View style={styles.radioGroup}>
          <RadioButton value="Team 1" label="Team 1" selected={batFirst === 'Team 1'} onPress={() => setBatFirst('Team 1')} />
          <RadioButton value="Team 2" label="Team 2" selected={batFirst === 'Team 2'} onPress={() => setBatFirst('Team 2')} />
        </View>
      </View>
      <ScrollView style={styles.scoreboardContainer}>
        <Text style={styles.scoreboardTitle}>Scoreboard</Text>
        <View style={styles.scoreboardHeader}>
          <Text style={styles.scoreboardHeaderCell}>Over</Text>
          <Text style={styles.scoreboardHeaderCell}>Runs</Text>
          <Text style={styles.scoreboardHeaderCell}>Wickets</Text>
          <Text style={styles.scoreboardHeaderCell}>Extras</Text>
        </View>
        {scoreboardData.map((overData, index) => (
          <View key={index} style={styles.scoreboardRow}>
            <Text style={styles.scoreboardCell}>{overData.over}</Text>
            <Text style={styles.scoreboardCell}>{overData.runs}</Text>
            <Text style={styles.scoreboardCell}>{overData.wickets}</Text>
            <Text style={styles.scoreboardCell}>{overData.extras}</Text>
          </View>
        ))}
        {/* ... (add more rows for additional overs) */}
      </ScrollView>
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
      justifyContent: 'space-between',
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
    scoreboardContainer: {
      flex: 1,
      maxHeight: 300,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 5,
      padding: 10,
      marginBottom: 15,
    },
    scoreboardHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 5,
    },
    scoreboardHeaderCell: {
      flex: 1,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    scoreboardRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 5,
    },
    scoreboardCell: {
      flex: 1,
      textAlign: 'center',
    },
});

export default UpdateMatchScreen;
