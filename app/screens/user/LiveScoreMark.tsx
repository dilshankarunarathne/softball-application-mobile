import React, { useEffect, useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, FlatList } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FormData from 'form-data';
import { Picker } from '@react-native-picker/picker';

const LiveScoreMark = ({ route }) => {
  const { matchId } = route.params;
  const [overNumber, setOverNumber] = useState(1);
  const [balls, setBalls] = useState([]);
  const [currentBall, setCurrentBall] = useState({ runs: 0, result: '', runs_to: '', bowler_id: '', wicket: '' });
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        console.log('Fetching players for match ID:', matchId); // Add this line
        console.log('Fetching players with token:', token); // Add this line
        const response = await axios.get(`http://localhost:3000/player/match/${matchId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Players fetched:', response.data); // Add this line
        setPlayers(response.data);
      } catch (error) {
        console.error('Error fetching players:', error);
        console.log('Error details:', error.response ? error.response.data : error.message);
        alert('Failed to fetch players. Please try again later.');
      }
    };

    const createScoreEntity = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const formData = new FormData();
        formData.append('match_id', matchId);
        formData.append('balls_per_over', 6);

        await axios.post('http://localhost:3000/score/create', formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });
      } catch (error) {
        if (error.response && error.response.status === 400 && error.response.data === 'Match-scoring entity already created') {
          console.log('Match-scoring entity already exists');
        } else {
          console.error('Error creating score entity:', error);
          alert('Failed to create score entity. Please try again later.');
        }
      }
    };

    fetchPlayers();
    createScoreEntity();
  }, [matchId]);

  const handleAddBall = () => {
    setBalls([...balls, currentBall]);
    setCurrentBall({ runs: 0, result: '', runs_to: '', bowler_id: '', wicket: '' });
  };

  const handleSaveOver = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const formData = new FormData();
      formData.append('match_id', matchId);
      formData.append('over_number', overNumber);
      formData.append('bowler_id', currentBall.bowler_id);
      formData.append('balls', JSON.stringify(balls));

      await axios.post('http://localhost:3000/score/add-over', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      setOverNumber(overNumber + 1);
      setBalls([]);
    } catch (error) {
      console.error('Error saving over:', error);
      alert('Failed to save over. Please try again later.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Live Score Marking</Text>
      <Text>Over Number: {overNumber}</Text>

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
        <Picker.Item label="None" value="none" />
      </Picker>

      {currentBall.result === 'runs' && (
        <TextInput
          placeholder="Runs"
          value={currentBall.runs.toString()}
          onChangeText={(text) => setCurrentBall({ ...currentBall, runs: parseInt(text) })}
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
          {players.map((player) => (
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
          {players.map((player) => (
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
        {players.map((player) => (
          <Picker.Item key={player._id} label={player.name} value={player._id} />
        ))}
      </Picker>
      <Button title="Add Ball" onPress={handleAddBall} />
      <Button title="Save Over" onPress={handleSaveOver} />
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
});

export default LiveScoreMark;
