import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Button, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ManageTeamsScreen = () => {
  const [teams, setTeams] = useState([]);
  const [players, setPlayers] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [teamName, setTeamName] = useState('');

  useEffect(() => {
    fetchTeams();
    fetchPlayers();
  }, []);

  const fetchTeams = async () => {
    try {
      const response = await fetch('http://localhost:3000/teams');
      const data = await response.json();
      setTeams(data);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch teams');
    }
  };

  const fetchPlayers = async () => {
    try {
      const response = await fetch('http://localhost:3000/players/all');
      const data = await response.json();
      setPlayers(data);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch players');
    }
  };

  const handleDeleteTeam = async (teamId) => {
    const token = await AsyncStorage.getItem('authToken');
    try {
      await fetch(`http://localhost:3000/teams/${teamId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchTeams();
    } catch (error) {
      Alert.alert('Error', 'Failed to delete team');
    }
  };

  const handleEditTeam = async (team) => {
    setSelectedTeam(team);
    setTeamName(team.name);
  };

  const handleSaveTeam = async () => {
    const token = await AsyncStorage.getItem('authToken');
    try {
      await fetch(`http://localhost:3000/teams/${selectedTeam._id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: teamName }),
      });
      setSelectedTeam(null);
      setTeamName('');
      fetchTeams();
    } catch (error) {
      Alert.alert('Error', 'Failed to update team');
    }
  };

  const handleCreateTeam = async () => {
    const token = await AsyncStorage.getItem('authToken');
    try {
      await fetch('http://localhost:3000/teams', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: teamName }),
      });
      setTeamName('');
      fetchTeams();
    } catch (error) {
      Alert.alert('Error', 'Failed to create team');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Manage Teams</Text>
      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderText}>Team Name</Text>
          <Text style={styles.tableHeaderText}>Actions</Text>
        </View>
        {teams.map((team) => (
          <View key={team._id} style={styles.tableRow}>
            <Text style={styles.tableCell}>{team.name}</Text>
            <View style={styles.actions}>
              <Button title="Edit" onPress={() => handleEditTeam(team)} />
              <Button title="Delete" onPress={() => handleDeleteTeam(team._id)} />
            </View>
          </View>
        ))}
      </View>
      {selectedTeam && (
        <View style={styles.editContainer}>
          <TextInput
            style={styles.input}
            value={teamName}
            onChangeText={setTeamName}
            placeholder="Team Name"
          />
          <Button title="Save" onPress={handleSaveTeam} />
        </View>
      )}
      <View style={styles.createContainer}>
        <TextInput
          style={styles.input}
          value={teamName}
          onChangeText={setTeamName}
          placeholder="New Team Name"
        />
        <Button title="Create Team" onPress={handleCreateTeam} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  table: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginBottom: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  tableHeaderText: {
    fontWeight: 'bold',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  tableCell: {
    flex: 1,
  },
  actions: {
    flexDirection: 'row',
  },
  editContainer: {
    marginBottom: 20,
  },
  createContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});

export default ManageTeamsScreen;
