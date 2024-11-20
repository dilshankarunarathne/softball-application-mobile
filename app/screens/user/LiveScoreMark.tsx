import React, { useEffect, useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FormData from 'form-data';

const LiveScoreMark = ({ route }) => {
  const { matchId } = route.params;
  const [overNumber, setOverNumber] = useState(1);
  const [balls, setBalls] = useState([]);
  const [currentBall, setCurrentBall] = useState({ runs: 0, result: '', runs_to: '', bowler_id: '' });

  useEffect(() => {
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
        console.error('Error creating score entity:', error);
        alert('Failed to create score entity. Please try again later.');
      }
    };

    createScoreEntity();
  }, [matchId]);

  const handleAddBall = () => {
    setBalls([...balls, currentBall]);
    setCurrentBall({ runs: 0, result: '', runs_to: '', bowler_id: '' });
  };

  const handleSaveOver = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const formData = new FormData();
      formData.append('match_id', matchId);
      formData.append('over_number', overNumber);
      formData.append('bowler_id', currentBall.bowler_id);
      formData.append('ball', JSON.stringify(currentBall));

      await axios.post('http://localhost:3000/score/add-ball', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
    } catch (error) {
      console.error('Error saving over:', error);
      alert('Failed to save over. Please try again later.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Live Score Marking</Text>
      <Text>Over Number: {overNumber}</Text>
      <TextInput
        placeholder="Runs"
        value={currentBall.runs.toString()}
        onChangeText={(text) => setCurrentBall({ ...currentBall, runs: parseInt(text) })}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        placeholder="Result (runs/wicket/none)"
        value={currentBall.result}
        onChangeText={(text) => setCurrentBall({ ...currentBall, result: text })}
        style={styles.input}
      />
      <TextInput
        placeholder="Runs to (Player ID)"
        value={currentBall.runs_to}
        onChangeText={(text) => setCurrentBall({ ...currentBall, runs_to: text })}
        style={styles.input}
      />
      <TextInput
        placeholder="Bowler ID"
        value={currentBall.bowler_id}
        onChangeText={(text) => setCurrentBall({ ...currentBall, bowler_id: text })}
        style={styles.input}
      />
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
});

export default LiveScoreMark;
