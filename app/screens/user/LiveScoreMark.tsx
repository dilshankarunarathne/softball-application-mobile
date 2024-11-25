import React, { useEffect, useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FormData from 'form-data';
import { Picker } from '@react-native-picker/picker';
import { Image as RNImage } from 'react-native';

const LiveScoreMark = ({ route, navigation }) => {
  const { matchId } = route.params;
  const [overNumber, setOverNumber] = useState(1);
  const [balls, setBalls] = useState([]);
  const [currentBall, setCurrentBall] = useState({ runs: 0, result: '', runs_to: '', bowler_id: '', wicket: '' });
  const [players, setPlayers] = useState([]);
  const [totalScore, setTotalScore] = useState({ team1_score: 0, team2_score: 0, team1_wickets: 0, team2_wickets: 0 });
  const [coinTossWinner, setCoinTossWinner] = useState('');
  const [batFirstTeam, setBatFirstTeam] = useState('');
  const [ballsPerOver, setBallsPerOver] = useState(6);
  const [scoreEntryExists, setScoreEntryExists] = useState(false);
  const [team1Name, setTeam1Name] = useState('');
  const [team2Name, setTeam2Name] = useState('');
  const [team1Players, setTeam1Players] = useState([]);
  const [team2Players, setTeam2Players] = useState([]);
  const [sidesSwitched, setSidesSwitched] = useState(false);
  const [team1OversPlayed, setTeam1OversPlayed] = useState(0);
  const [team2OversPlayed, setTeam2OversPlayed] = useState(0);
  const [wicketOutBatsmen, setWicketOutBatsmen] = useState([]);

  const homeUri = RNImage.resolveAssetSource(require('./../images/home.png')).uri;
  const matchesUri = RNImage.resolveAssetSource(require('./../images/matches.png')).uri;
  const rankingsUri = RNImage.resolveAssetSource(require('./../images/rankings.png')).uri;
  const accountUri = RNImage.resolveAssetSource(require('./../images/account.png')).uri;

  const fetchPlayers = async (team1Id, team2Id) => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      console.log('Fetching players for match ID:', matchId);
      console.log('Fetching players with token:', token);
      const response = await axios.get(`http://localhost:3000/player/match/${matchId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const team1Players = response.data.filter(player => player.team === team1Id);
      const team2Players = response.data.filter(player => player.team === team2Id);

      setTeam1Players(team1Players);
      setTeam2Players(team2Players);
      setPlayers(response.data);
      console.log('Team 1 Players:', team1Players);
      console.log('Team 2 Players:', team2Players);
    } catch (error) {
      console.error('Error fetching players:', error);
      console.log('Error details:', error.response ? error.response.data : error.message);
      alert('Failed to fetch players. Please try again later.');
    }
  };

  const fetchTeamName = async (teamId) => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      const response = await axios.get(`http://localhost:3000/teams/${teamId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.name;
    } catch (error) {
      console.error('Error fetching team name:', error);
      alert('Failed to fetch team name. Please try again later.');
      return '';
    }
  };

  const fetchMatchDetails = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      const response = await axios.get(`http://localhost:3000/matches/${matchId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const matchData = response.data;

      console.log('Match details:', matchData);

      const team1Name = await fetchTeamName(matchData.team1);
      const team2Name = await fetchTeamName(matchData.team2);

      setTeam1Name(team1Name);
      setTeam2Name(team2Name);

      setTeam1OversPlayed(matchData.team1_overs_played);
      setTeam2OversPlayed(matchData.team2_overs_played);

      await fetchPlayers(matchData.team1, matchData.team2);

      const halftimeResponse = await axios.post('http://localhost:3000/matches/halftime', { match_id: matchId }, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      const { batting_team, halftime } = halftimeResponse.data;
      setBatFirstTeam(batting_team === matchData.team1 ? 'Team 1' : 'Team 2');
      setSidesSwitched(halftime === 'Yes');
    } catch (error) {
      console.error('Error fetching match details:', error);
      alert('Failed to fetch match details. Please try again later.');
    }
  };

  const checkScoreEntity = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      const response = await axios.get(`http://localhost:3000/score/current/${matchId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const scoreData = response.data;
      setTotalScore({
        team1_score: scoreData.team1_score,
        team2_score: scoreData.team2_score,
        team1_wickets: scoreData.team1_wickets,
        team2_wickets: scoreData.team2_wickets,
      });
      setOverNumber(scoreData.overs.length + 1);
      setCoinTossWinner(scoreData.coin_toss_winner);
      setBatFirstTeam(scoreData.bat_first_team);
      setScoreEntryExists(true);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.log('No existing score entity found, prompting user to enter details.');
      } else {
        console.error('Error checking score entity:', error);
        alert('Failed to check score entity. Please try again later.');
      }
    }
  };

  const fetchWicketOutBatsmen = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      const response = await axios.get(`http://localhost:3000/score/wicket-out-batsmans/${matchId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setWicketOutBatsmen(response.data);
    } catch (error) {
      console.error('Error fetching wicket out batsmen:', error);
      alert('Failed to fetch wicket out batsmen. Please try again later.');
    }
  };

  useEffect(() => {
    fetchMatchDetails();
    checkScoreEntity();
    fetchWicketOutBatsmen();
  }, [matchId]);

  const createScoreEntity = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      const formData = new FormData();
      formData.append('match_id', matchId);
      formData.append('balls_per_over', ballsPerOver);
      formData.append('coin_toss_winner', coinTossWinner);
      formData.append('bat_first_team', batFirstTeam);

      console.log('Creating score entity for match ID:', matchId);
      const response = await axios.post('http://localhost:3000/score/create', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Score entity created:', response.data);
      setScoreEntryExists(true);
      fetchCurrentScore();
      await fetchMatchDetails(); // Ensure players are loaded after creating score entity
    } catch (error) {
      console.error('Error creating score entity:', error);
      alert('Failed to create score entity. Please try again later.');
    }
  };

  const fetchCurrentScore = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      const response = await axios.get(`http://localhost:3000/score/current/${matchId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const scoreData = response.data;
      setTotalScore({
        team1_score: scoreData.team1_score,
        team2_score: scoreData.team2_score,
        team1_wickets: scoreData.team1_wickets,
        team2_wickets: scoreData.team2_wickets,
      });
      setOverNumber(scoreData.overs.length + 1);
      setCoinTossWinner(scoreData.coin_toss_winner);
      setBatFirstTeam(scoreData.bat_first_team);
      setScoreEntryExists(true);
    } catch (error) {
      console.error('Error fetching current score:', error);
      alert('Failed to fetch current score. Please try again later.');
    }
  };

  const handleAddBall = () => {
    if (!currentBall.bowler_id) {
      alert('Please select a bowler.');
      return;
    }
    console.log('Adding ball:', currentBall);
    setBalls([...balls, currentBall]);
    if (currentBall.result === 'wicket') {
      setWicketOutBatsmen([...wicketOutBatsmen, currentBall.wicket]);
    }
    setCurrentBall({ runs: 0, result: '', runs_to: '', bowler_id: '', wicket: '' });
  };

  const resetFields = () => {
    setOverNumber(1);
    setBalls([]);
    setCurrentBall({ runs: 0, result: '', runs_to: '', bowler_id: '', wicket: '' });
  };

  const handleSaveOver = async () => {
    if (!balls.every(ball => ball.bowler_id)) {
      alert('Please select a bowler for each ball.');
      return;
    }

    try {
      const token = await AsyncStorage.getItem('authToken');
      const formData = new FormData();
      formData.append('match_id', matchId);
      formData.append('over_number', overNumber);
      formData.append('bowler_id', balls[0].bowler_id); // Use the bowler_id from the first ball
      formData.append('balls', JSON.stringify(balls));

      console.log('Saving over:', { matchId, overNumber, bowler_id: balls[0].bowler_id, balls });
      const response = await axios.post('http://localhost:3000/score/add-over', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Over saved:', response.data);

      setOverNumber(overNumber + 1);
      setBalls([]);
      resetFields(); // Reset fields after successful request
      await fetchCurrentScore(); // Fetch current score after saving over
      await fetchMatchDetails(); // Fetch match details to ensure sides remain switched
    } catch (error) {
      console.error('Error saving over:', error);
      console.log('Error details:', error.response ? error.response.data : error.message);
      alert('Failed to save over. Please try again later.');
    }
  };

  const switchSides = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      const formData = new FormData();
      formData.append('match_id', matchId);

      const response = await axios.post('http://localhost:3000/matches/switch', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data === 'Teams switched successfully') {
        setSidesSwitched(true);
        console.log('Sides switched successfully.');
      } else {
        console.log('Failed to switch sides:', response.data);
        alert('Failed to switch sides. Please try again later.');
      }
    } catch (error) {
      console.error('Error switching sides:', error);
      alert('Failed to switch sides. Please try again later.');
    }
  };

  const finishMatch = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      const response = await axios.get(`http://localhost:3000/matches/${matchId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const matchData = response.data;

      const winningTeam = totalScore.team1_score > totalScore.team2_score ? 'Team 1' : 'Team 2';
      const winningTeamId = totalScore.team1_score > totalScore.team2_score ? matchData.team1 : matchData.team2;

      console.log('match id: ' + matchId);

      // const winning_team_id = 

      const res = await axios.put(`http://localhost:3000/matches/${matchId}`, { 
        status: 'ended', 
        winner: winningTeamId 
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('update match response: ', res.data);

      await axios.put(`http://localhost:3000/teams/${winningTeamId}/add-point`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Match finished:', response.data);
      alert('Match has been finished.');
    } catch (error) {
      console.error('Error finishing match:', error);
      alert('Failed to finish match. Please try again later.');
    }
  };

  const getBattingTeamPlayers = () => {
    return batFirstTeam === 'Team 1' ? team1Players : team2Players;
  };

  const getBowlingTeamPlayers = () => {
    return batFirstTeam === 'Team 1' ? team2Players : team1Players;
  };

  const getAvailableBatsmen = () => {
    return getBattingTeamPlayers().filter(player => !wicketOutBatsmen.includes(player._id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Live Score Marking</Text>
      {/* <View style={styles.headerIcons}>
        <TouchableOpacity onPress={() => navigation.navigate('screens/user/Notifications')} style={styles.iconButton}>
          <Image source={require('./../images/notification.png')} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('screens/user/News')} style={styles.iconButton}>
          <Image source={require('./../images/document.png')} style={styles.icon} />
        </TouchableOpacity>
      </View> */}
      {scoreEntryExists ? (
        <>
          <Text>Batting Team: {batFirstTeam === 'Team 1' ? team1Name : team2Name}</Text>
          <Text>Bowling Team: {batFirstTeam === 'Team 1' ? team2Name : team1Name}</Text>
          {!sidesSwitched ? (
            <Button title="Switch Sides" onPress={switchSides} />
          ) : (
            <Button title="Finish Match" onPress={finishMatch} />
          )}
        </>
      ) : (
        <>
          <Picker
            selectedValue={coinTossWinner}
            onValueChange={(itemValue) => setCoinTossWinner(itemValue)}
            style={styles.input}
          >
            <Picker.Item label={`Select Coin Toss Winner (${team1Name} or ${team2Name})`} value="" />
            <Picker.Item label={team1Name} value="Team 1" />
            <Picker.Item label={team2Name} value="Team 2" />
          </Picker>
          <Picker
            selectedValue={batFirstTeam}
            onValueChange={(itemValue) => setBatFirstTeam(itemValue)}
            style={styles.input}
          >
            <Picker.Item label={`Select Bat First Team (${team1Name} or ${team2Name})`} value="" />
            <Picker.Item label={team1Name} value="Team 1" />
            <Picker.Item label={team2Name} value="Team 2" />
          </Picker>
          <TextInput
            placeholder="Balls Per Over"
            value={ballsPerOver.toString()}
            onChangeText={(text) => {
              const balls = parseInt(text);
              if (!isNaN(balls)) {
                setBallsPerOver(balls);
              } else {
                setBallsPerOver(6);
              }
            }}
            keyboardType="numeric"
            style={styles.input}
          />
          <Button title="Create Score Entity" onPress={createScoreEntity} />
        </>
      )}
      <Text>Over Number: {overNumber}</Text>
      <Text>Total Score: {team1Name} - {totalScore.team1_score}/{totalScore.team1_wickets} ({team1OversPlayed} overs), {team2Name} - {totalScore.team2_score}/{totalScore.team2_wickets} ({team2OversPlayed} overs)</Text>

      <FlatList
        data={balls}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.ballRow}>
            <Text>Ball {index + 1}: {item.result} - {item.runs} runs</Text>
          </View>
        )}
      />

      <Picker
        selectedValue={currentBall.result}
        onValueChange={(itemValue) => setCurrentBall({ ...currentBall, result: itemValue })}
        style={styles.input}
      >
        <Picker.Item label="Select Result" value="" />
        <Picker.Item label="Runs" value="runs" />
        <Picker.Item label="Wicket" value="wicket" />
        <Picker.Item label="Extra Run" value="Extra Run" />
        <Picker.Item label="None" value="none" />
      </Picker>

      {currentBall.result === 'runs' && (
        <TextInput
          placeholder="Runs"
          value={currentBall.runs.toString()}
          onChangeText={(text) => {
            const runs = parseInt(text);
            if (!isNaN(runs)) {
              setCurrentBall({ ...currentBall, runs });
            } else {
              setCurrentBall({ ...currentBall, runs: 0 });
            }
          }}
          keyboardType="numeric"
          style={styles.input}
        />
      )}

      {currentBall.result === 'runs' && (
        <Picker
          selectedValue={currentBall.runs_to}
          onValueChange={(itemValue) => setCurrentBall({ ...currentBall, runs_to: itemValue })}
          style={styles.input}
        >
          <Picker.Item label="Select Batsman" value="" />
          {getAvailableBatsmen().map((player) => (
            <Picker.Item key={player._id} label={player.name} value={player._id} />
          ))}
        </Picker>
      )}

      {currentBall.result === 'wicket' && (
        <Picker
          selectedValue={currentBall.wicket}
          onValueChange={(itemValue) => setCurrentBall({ ...currentBall, wicket: itemValue })}
          style={styles.input}
        >
          <Picker.Item label="Select Batsman Out" value="" />
          {getAvailableBatsmen().map((player) => (
            <Picker.Item key={player._id} label={player.name} value={player._id} />
          ))}
        </Picker>
      )}

      <Picker
        selectedValue={currentBall.bowler_id}
        onValueChange={(itemValue) => setCurrentBall({ ...currentBall, bowler_id: itemValue })}
        style={styles.input}
      >
        <Picker.Item label="Select Bowler" value="" />
        {getBowlingTeamPlayers().map((player) => (
          <Picker.Item key={player._id} label={player.name} value={player._id} />
        ))}
      </Picker>
      <View style={styles.actionButtonsContainer}>
        <Button title="Add Ball" onPress={handleAddBall} style={styles.actionButton} />
        <View style={styles.buttonSpacer} />
        <Button title="Save Over" onPress={handleSaveOver} style={styles.actionButton} />
      </View>
      <View style={styles.navigation}>
        <TouchableOpacity onPress={() => navigation.navigate('screens/user/UserHome')}>
          <Image source={{ uri: homeUri }} style={styles.navIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('screens/user/Matches')}>
          <Image source={{ uri: matchesUri }} style={styles.navIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('screens/user/Rankings')}>
          <Image source={{ uri: rankingsUri }} style={styles.navIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('screens/user/UpdateAccount')}>
          <Image source={{ uri: accountUri }} style={styles.navIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  ballRow: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerIcons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
  icon: {
    width: 24,
    height: 24,
    marginHorizontal: 10,
  },
  iconButton: {
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    padding: 5,
    marginHorizontal: 5,
  },
  actionButtonsContainer: {
    marginBottom: 50,
  },
  actionButton: {
    marginVertical: 10,
    padding: 10,
  },
  buttonSpacer: {
    height: 10,
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#e0e0e0',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  navIcon: {
    width: 24,
    height: 24,
    alignSelf: 'center',
  },
  navText: {
    fontSize: 16,
    marginTop: 5,
  },
});

export default LiveScoreMark;
