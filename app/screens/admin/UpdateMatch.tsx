import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native';

const UpdateMatchScreen = ({ route }) => {
  const { matchData } = route.params;

  const [matchId, setMatchId] = useState(matchData.id);
  const [tournamentName, setTournamentName] = useState(matchData.tournamentName);
  const [team1Name, setTeam1Name] = useState(matchData.team1Name);
  const [team2Name, setTeam2Name] = useState(matchData.team2Name);
  const [matchDate, setMatchDate] = useState(matchData.matchDate);
  const [matchTime, setMatchTime] = useState(matchData.matchTime);
  const [groundName, setGroundName] = useState(matchData.groundName);
  const [tossWinner, setTossWinner] = useState(matchData.tossWinner);
  const [batFirst, setBatFirst] = useState(matchData.batFirst);

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
        editable={false} // Make the Match ID field read-only
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
      <Button title="Update Match" onPress={handleUpdateMatch} style={styles.updateButton} />
    </View>
  );
};

const styles = StyleSheet.create({
  // ... styles for each element
});

export default UpdateMatchScreen;