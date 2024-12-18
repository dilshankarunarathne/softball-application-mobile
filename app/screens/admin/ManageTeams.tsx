import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Button, TextInput, FlatList, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ManageTeamsScreen = ({ navigation }) => {
  const [teams, setTeams] = useState([]);
  const [players, setPlayers] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [teamName, setTeamName] = useState('');
  const [teamPlayers, setTeamPlayers] = useState([]);

  useEffect(() => {
    fetchTeams();
    fetchPlayers();
  }, []);

  const fetchTeams = async () => {
    try {
      const response = await fetch('http://localhost:3000/teams');
      if (!response.ok) throw new Error(`HTTP status ${response.status}`);
      const data = await response.json();
      setTeams(data);
    } catch (error) {
      Alert.alert('Error', `Failed to fetch teams: ${error.message}`);
    }
  };

  const fetchPlayers = async () => {
    try {
      const response = await fetch('http://localhost:3000/player/all');
      if (!response.ok) throw new Error(`HTTP status ${response.status}`);
      const data = await response.json();
      setPlayers(data);
    } catch (error) {
      Alert.alert('Error', `Failed to fetch players: ${error.message}`);
    }
  };

  const handleDeleteTeam = async (teamId) => {
    const token = await AsyncStorage.getItem('authToken');
    try {
      const response = await fetch(`http://localhost:3000/teams/${teamId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error(`HTTP status ${response.status}`);
      fetchTeams();
    } catch (error) {
      Alert.alert('Error', `Failed to delete team: ${error.message}`);
    }
  };

  const handleEditTeam = async (team) => {
    setSelectedTeam(team);
    setTeamName(team.name);
    setTeamPlayers(team.players || []);
  };

  const handleSaveTeam = async () => {
    const token = await AsyncStorage.getItem('authToken');
    try {
      const response = await fetch(`http://localhost:3000/teams/${selectedTeam._id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: teamName, players: teamPlayers }),
      });
      if (!response.ok) throw new Error(`HTTP status ${response.status}`);
      setSelectedTeam(null);
      setTeamName('');
      setTeamPlayers([]);
      fetchTeams();
    } catch (error) {
      Alert.alert('Error', `Failed to update team: ${error.message}`);
    }
  };

  const handleCreateTeam = async () => {
    const token = await AsyncStorage.getItem('authToken');
    try {
      const response = await fetch('http://localhost:3000/teams', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: teamName, players: teamPlayers }),
      });
      if (!response.ok) throw new Error(`HTTP status ${response.status}`);
      setTeamName('');
      setTeamPlayers([]);
      fetchTeams();
    } catch (error) {
      Alert.alert('Error', `Failed to create team: ${error.message}`);
    }
  };

  const handleAddPlayerToTeam = async (player) => {
    const token = await AsyncStorage.getItem('authToken');
    const formData = new FormData();
    formData.append('team', selectedTeam._id);
    try {
      const response = await fetch(`http://localhost:3000/player/${player._id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      
      if (!response.ok) throw new Error(`HTTP status ${response.status}`);
      setTeamPlayers([...teamPlayers, player]);
      fetchPlayers(); // Reload players
    } catch (error) {
      Alert.alert('Error', `Failed to add player to team: ${error.message}`);
    }
  };

  const handleRemovePlayerFromTeam = async (playerId) => {
    const token = await AsyncStorage.getItem('authToken');
    const formData = new FormData();
    formData.append('team', 'None');
    try {
      const response = await fetch(`http://localhost:3000/player/${playerId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      
      if (!response.ok) throw new Error(`HTTP status ${response.status}`);
      setTeamPlayers(teamPlayers.filter(player => player._id !== playerId));
      fetchPlayers(); // Reload players
    } catch (error) {
      Alert.alert('Error', `Failed to remove player from team: ${error.message}`);
    }
  };

  return (
    <>
      <FlatList
        style={styles.scrollContainer}
        contentContainerStyle={{ paddingBottom: 100 }} // Add padding to ensure content is not hidden
        data={teams}
        keyExtractor={(item) => item._id}
        ListHeaderComponent={
          <>
            <Text style={styles.header}>Manage Teams</Text>
            <View style={styles.headerIcons}>
              <TouchableOpacity onPress={() => navigation.navigate('screens/user/Notifications')} style={styles.iconButton}>
                <Image source={require('./../images/notification.png')} style={styles.icon} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('screens/user/News')} style={styles.iconButton}>
                <Image source={require('./../images/document.png')} style={styles.icon} />
              </TouchableOpacity>
            </View>
            <View style={styles.table}>
              <View style={styles.tableHeader}>
                <Text style={styles.tableHeaderText}>Team Name</Text>
                <Text style={styles.tableHeaderText}>Actions</Text>
              </View>
            </View>
          </>
        }
        renderItem={({ item: team }) => (
          <View key={team._id} style={styles.tableRow}>
            <Text style={styles.tableCell}>{team.name}</Text>
            <View style={styles.actions}>
              <Button title="Edit" onPress={() => handleEditTeam(team)} />
              <Button title="Delete" onPress={() => handleDeleteTeam(team._id)} />
            </View>
          </View>
        )}
        ListFooterComponent={
          <>
            {selectedTeam && (
              <View style={styles.editContainer}>
                <TextInput
                  style={styles.input}
                  value={teamName}
                  onChangeText={setTeamName}
                  placeholder="Team Name"
                />
                <FlatList
                  data={players}
                  keyExtractor={(item) => item._id}
                  renderItem={({ item }) => (
                    <View style={styles.playerRow}>
                      <Text>{item.name}</Text>
                      <Button
                        title={item.team !== selectedTeam._id ? "Add" : "Remove"}
                        onPress={() =>
                          item.team !== selectedTeam._id
                            ? handleAddPlayerToTeam(item)
                            : handleRemovePlayerFromTeam(item._id)
                        }
                      />
                    </View>
                  )}
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
          </>
        }
      />
      <View style={styles.navigation}>
        <TouchableOpacity onPress={() => navigation.navigate('screens/admin/AdminHome')}>
          <Image source={require('./../images/home.png')} style={styles.navIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('screens/admin/AdminMatches')}>
          <Image source={require('./../images/matches.png')} style={styles.navIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('screens/admin/AdminRankings')}>
          <Image source={require('./../images/rankings.png')} style={styles.navIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('screens/admin/AdminUsers')}>
          <Image source={require('./../images/admin.png')} style={styles.navIcon} />
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    paddingBottom: 60, // Add padding to avoid overlap with bottom navigation
  },
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
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
  playerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#e0e0e0',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    zIndex: 1, // Ensure the navigation bar is above other content
  },
  navIcon: {
    width: 24,
    height: 24,
    alignSelf: 'center',
  },
  iconButton: {
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    padding: 5,
    marginHorizontal: 5,
  },
});

export default ManageTeamsScreen;
