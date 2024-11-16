import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';

const ScheduleMatchScreen = () => {
  const [selectedTeam, setSelectedTeam] = useState('');
  const [selectedOpponent, setSelectedOpponent] = useState('');
  const [scheduledDate, setScheduledDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [location, setLocation] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const fetchTeams = async () => {
      const token = await AsyncStorage.getItem('authToken');
      try {
        const response = await axios.get('http://localhost:3000/teams', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTeams(response.data);
      } catch (error) {
        console.error('Error fetching teams:', error);
      }
    };
    fetchTeams();
  }, []);

  const handleScheduleMatch = async () => {
    const token = await AsyncStorage.getItem('authToken');
    try {
      await axios.post(
        'http://localhost:3000/matches',
        {
          team1: selectedTeam,
          team2: selectedOpponent,
          date: scheduledDate,
          start_time: startTime,
          end_time: endTime,
          location,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      Alert.alert('Success', 'Match scheduled successfully');
    } catch (error) {
      console.error('Error scheduling match:', error);
      Alert.alert('Error', 'Failed to schedule match');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Match Scheduling</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Select a team</Text>
        <Picker
          selectedValue={selectedTeam}
          onValueChange={(itemValue) => setSelectedTeam(itemValue)}
          style={styles.inputField}
        >
          {teams.map((team) => (
            <Picker.Item key={team.id} label={team.name} value={team.name} />
          ))}
        </Picker>
        <Text style={styles.label}>Select an opponent</Text>
        <Picker
          selectedValue={selectedOpponent}
          onValueChange={(itemValue) => setSelectedOpponent(itemValue)}
          style={styles.inputField}
        >
          {teams.map((team) => (
            <Picker.Item key={team.id} label={team.name} value={team.name} />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>Scheduled date</Text>
      <TouchableOpacity style={styles.inputField} onPress={() => setShowDatePicker(true)}>
        <Text style={styles.inputText}>{scheduledDate.toDateString()}</Text>
        <MaterialIcons name="calendar-today" size={24} color="gray" />
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={scheduledDate}
          mode="date"
          onChange={handleDateChange}
        />
      )}

      <Text style={styles.label}>Start time</Text>
      <TouchableOpacity style={styles.inputField} onPress={() => setShowStartTimePicker(true)}>
        <Text style={styles.inputText}>{startTime.toLocaleTimeString()}</Text>
        <MaterialIcons name="access-time" size={24} color="gray" />
      </TouchableOpacity>
      {showStartTimePicker && (
        <DateTimePicker
          value={startTime}
          mode="time"
          onChange={handleStartTimeChange}
        />
      )}

      <Text style={styles.label}>End time</Text>
      <TouchableOpacity style={styles.inputField} onPress={() => setShowEndTimePicker(true)}>
        <Text style={styles.inputText}>{endTime.toLocaleTimeString()}</Text>
        <MaterialIcons name="access-time" size={24} color="gray" />
      </TouchableOpacity>
      {showEndTimePicker && (
        <DateTimePicker
          value={endTime}
          mode="time"
          onChange={handleEndTimeChange}
        />
      )}

      <Text style={styles.label}>Location</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter location"
        value={location}
        onChangeText={setLocation}
      />

      <Button title="Submit" onPress={handleScheduleMatch} style={styles.submitButton} />
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
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  inputField: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  inputText: {
    flex: 1,
  },
  submitButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
});

export default ScheduleMatchScreen;
