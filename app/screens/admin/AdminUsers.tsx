import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, Alert, Modal, TextInput, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

const AdminUsersScreen = () => {
  const [activeTab, setActiveTab] = useState('All Users');
  const [users, setUsers] = useState([]);
  const [tempAdmins, setTempAdmins] = useState([]);
  const [requests, setRequests] = useState([]);
  const [players, setPlayers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentPlayerId, setCurrentPlayerId] = useState(null);
  const [newPlayer, setNewPlayer] = useState({
    name: '', team: '', batting_style: '', bowling_style: '', phone_number: '', email: '', date_of_birth: '', first_name: '', last_name: ''
  });
  const [teams, setTeams] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const fetchData = async () => {
      const token = await AsyncStorage.getItem('token');

      console.log('Retrieved Token:', await AsyncStorage.getItem('authToken'));
      console.log('Retrieved user type:', await AsyncStorage.getItem('user_type'));

      if (!token) return;

      try {
        const userResponse = await fetch('http://localhost:3000/auth/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!userResponse.ok) {
          const errorText = await userResponse.text();
          console.error('Failed to fetch user profile:', errorText);
          Alert.alert('Error', errorText);
          return;
        }

        const userData = await userResponse.json();
        console.log('User Data -- :', userData);
        if (userData.user_type !== 'admin') {
          Alert.alert('Error', 'Only admins can view this data.');
          return;
        }

        const [usersResponse, tempAdminsResponse, requestsResponse, playersResponse] = await Promise.all([
          fetch('http://localhost:3000/admin/view-all-users', {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch('http://localhost:3000/admin/view-temp-admins', {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch('http://localhost:3000/admin/view-user-type-change-requests', {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch('http://localhost:3000/player/all', {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        if (!usersResponse.ok) {
          const errorText = await usersResponse.text();
          console.error('Failed to fetch users:', errorText);
          Alert.alert('Error', errorText);
          return;
        }
        if (!tempAdminsResponse.ok) {
          const errorText = await tempAdminsResponse.text();
          console.error('Failed to fetch temp admins:', errorText);
          Alert.alert('Error', errorText);
          return;
        }
        if (!requestsResponse.ok) {
          const errorText = await requestsResponse.text();
          console.error('Failed to fetch requests:', errorText);
          Alert.alert('Error', errorText);
          return;
        }
        if (!playersResponse.ok) {
          const errorText = await playersResponse.text();
          console.error('Failed to fetch players:', errorText);
          Alert.alert('Error', errorText);
          return;
        }

        const usersData = await usersResponse.json();
        const tempAdminsData = await tempAdminsResponse.json();
        const requestsData = await requestsResponse.json();
        const playersData = await playersResponse.json();

        setUsers(usersData);
        setTempAdmins(tempAdminsData);
        setRequests(requestsData);
        setPlayers(playersData);
      } catch (error) {
        console.error('Error fetching data:', error);
        Alert.alert('Error', 'An error occurred while fetching data.');
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchTeams = async () => {
      const token = await AsyncStorage.getItem('token');
      if (!token) return;

      try {
        const response = await fetch('http://localhost:3000/teams', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error('Failed to fetch teams:', errorText);
          Alert.alert('Error', errorText);
          return;
        }

        const teamsData = await response.json();
        setTeams(teamsData);
      } catch (error) {
        console.error('Error fetching teams:', error);
        Alert.alert('Error', 'An error occurred while fetching teams.');
      }
    };

    fetchTeams();
  }, []);

  const handleTabPress = (tabName) => {
    setActiveTab(tabName);
  };

  const handleDeleteUser = async (userId) => {
    Alert.alert(
      'Delete User',
      'Are you sure you want to delete this user?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: async () => {
          const token = await AsyncStorage.getItem('token');
          if (!token) return;

          try {
            const response = await fetch(`http://localhost:3000/admin/delete-user/${userId}`, {
              method: 'DELETE',
              headers: { Authorization: `Bearer ${token}` },
            });

            if (response.ok) {
              setUsers(users.filter(user => user._id !== userId));
            } else {
              console.error('Failed to delete user');
            }
          } catch (error) {
            console.error('Error deleting user:', error);
          }
        }},
      ]
    );
  };

  const handleUpdateAdminStatus = async (userId, newStatus) => {
    Alert.alert(
      'Update User Status',
      `Are you sure you want to ${newStatus === 'user' ? 'remove' : 'promote'} admin privileges for this user?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Confirm', style: 'destructive', onPress: async () => {
          const token = await AsyncStorage.getItem('token');
          if (!token) return;

          const formData = new FormData();
          formData.append('username', userId);
          formData.append('new_type', newStatus);

          try {
            const response = await fetch('http://localhost:3000/admin/change-user-type', {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${token}`,
              },
              body: formData,
            });

            if (response.ok) {
              setUsers(users.map(user => user._id === userId ? { ...user, user_type: newStatus } : user));
            } else {
              console.error('Failed to update user status');
            }
          } catch (error) {
            console.error('Error updating user status:', error);
          }
        }},
      ]
    );
  };

  const handleDeletePlayer = async (playerId) => {
    Alert.alert(
      'Delete Player',
      'Are you sure you want to delete this player?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: async () => {
          const token = await AsyncStorage.getItem('token');
          if (!token) return;

          try {
            const response = await fetch(`http://localhost:3000/player/${playerId}`, {
              method: 'DELETE',
              headers: { Authorization: `Bearer ${token}` },
            });

            if (response.ok) {
              setPlayers(players.filter(player => player._id !== playerId));
            } else {
              console.error('Failed to delete player');
            }
          } catch (error) {
            console.error('Error deleting player:', error);
          }
        }},
      ]
    );
  };

  const handleAddPlayer = async () => {
    const token = await AsyncStorage.getItem('token');
    if (!token) return;

    const formData = new FormData();
    Object.keys(newPlayer).forEach(key => formData.append(key, newPlayer[key]));
    
    console.log('formData:', formData);

    try {
      const response = await fetch('http://localhost:3000/player', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      console.log('Response:', response);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Failed to add player:', errorText);
        Alert.alert('Error', errorText);
        return;
      }

      const addedPlayer = await response.json();
      setPlayers([...players, addedPlayer]);
      setIsModalVisible(false);
      setNewPlayer({ name: '', team: '', batting_style: '', bowling_style: '', phone_number: '', email: '', date_of_birth: '', first_name: '', last_name: '' });
    } catch (error) {
      console.error('Error adding player:', error);
      Alert.alert('Error', 'An error occurred while adding the player.');
    }
  };

  const handleEditPlayer = async () => {
    const token = await AsyncStorage.getItem('token');
    if (!token) return;

    const formData = new FormData();
    Object.keys(newPlayer).forEach(key => formData.append(key, newPlayer[key]));

    try {
      const response = await fetch(`http://localhost:3000/player/${currentPlayerId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        const updatedPlayer = await response.json();
        setPlayers(players.map(player => player._id === currentPlayerId ? updatedPlayer : player));
        setIsModalVisible(false);
        setIsEditMode(false);
        setNewPlayer({ name: '', team: '', batting_style: '', bowling_style: '', phone_number: '', email: '', date_of_birth: '', first_name: '', last_name: '' });
        setCurrentPlayerId(null);
      } else {
        console.error('Failed to update player');
      }
    } catch (error) {
      console.error('Error updating player:', error);
    }
  };

  const openEditModal = (player) => {
    setNewPlayer({
      name: player.name,
      team: player.team,
      batting_style: player.batting_style,
      bowling_style: player.bowling_style,
      phone_number: player.phone_number,
      email: player.email,
      date_of_birth: player.date_of_birth,
      first_name: player.first_name,
      last_name: player.last_name
    });
    setCurrentPlayerId(player._id);
    setIsEditMode(true);
    setIsModalVisible(true);
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
    setNewPlayer({ ...newPlayer, date_of_birth: currentDate.toISOString().split('T')[0] });
  };

  const openDatePicker = () => {
    setShowDatePicker(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>SLSCMA</Text>
        <View style={styles.headerIcons}>
          <Image source={require('./../images/notification.png')} style={styles.icon} />
          <Image source={require('./../images/document.png')} style={styles.icon} />
        </View>
      </View>

      <View style={styles.tabs}>
        <TouchableOpacity style={[styles.tab, activeTab === 'All Users' && styles.activeTab]} onPress={() => handleTabPress('All Users')}>
          <Text style={styles.tabText}>All Users</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tab, activeTab === 'Temporary Admins' && styles.activeTab]} onPress={() => handleTabPress('Temporary Admins')}>
          <Text style={styles.tabText}>Temporary Admins</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tab, activeTab === 'Requests' && styles.activeTab]} onPress={() => handleTabPress('Requests')}>
          <Text style={styles.tabText}>Requests</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tab, activeTab === 'Players' && styles.activeTab]} onPress={() => handleTabPress('Players')}>
          <Text style={styles.tabText}>Players</Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'All Users' && (
        <View style={styles.userList}>
          <FlatList
            data={users.filter(user => user.user_type === 'user')}
            renderItem={({ item }) => (
              <View style={styles.userItem}>
                {/* <Text style={styles.userId}>{item._id}</Text> */}
                <Text style={styles.userName}>{item.username}</Text>
                <Text style={styles.userEmail}>{item.email}</Text>
                <TouchableOpacity onPress={() => handleDeleteUser(item._id)}>
                  <Image source={require('./../images/delete.png')} style={styles.deleteIcon} />
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={(item) => item._id}
          />
        </View>
      )}

      {activeTab === 'Temporary Admins' && (
        <View style={styles.userList}>
          <FlatList
            data={tempAdmins}
            renderItem={({ item }) => (
              <View style={styles.userItem}>
                {/* <Text style={styles.userId}>{item._id}</Text> */}
                <Text style={styles.userName}>{item.username}</Text>
                <Text style={styles.userEmail}>{item.email}</Text>
                <TouchableOpacity onPress={() => handleUpdateAdminStatus(item.username, 'user')}>
                  <Image source={require('./../images/delete.png')} style={styles.actionIcon} />
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={(item) => item._id}
          />
        </View>
      )}

      {activeTab === 'Requests' && (
        <View style={styles.userList}>
          <FlatList
            data={requests}
            renderItem={({ item }) => (
              <View style={styles.userItem}>
                {/* <Text style={styles.userId}>{item._id}</Text> */}
                <Text style={styles.userName}>{item.username}</Text>
                <Text style={styles.userEmail}>{item.email}</Text>
                <TouchableOpacity onPress={() => handleUpdateAdminStatus(item.username, 'temp-admin')}>
                  <Image source={require('./../images/accept.png')} style={styles.actionIcon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleUpdateAdminStatus(item.username, 'rejected')}>
                  <Image source={require('./../images/delete.png')} style={styles.actionIcon} />
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={(item) => item._id}
          />
        </View>
      )}

      {activeTab === 'Players' && (
        <View style={styles.userList}>
          <TouchableOpacity style={styles.addButton} onPress={() => {
            setIsEditMode(false);
            setIsModalVisible(true);
          }}>
            <Text style={styles.addButtonText}>Add Player</Text>
          </TouchableOpacity>
          <FlatList
            data={players}
            renderItem={({ item }) => (
              <View style={styles.userItem}>
                <Text style={styles.userName}>{item.name}</Text>
                <Text style={styles.userEmail}>{item.email}</Text>
                <TouchableOpacity onPress={() => openEditModal(item)}>
                  <Image source={require('./../images/edit.png')} style={styles.actionIcon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDeletePlayer(item._id)}>
                  <Image source={require('./../images/delete.png')} style={styles.actionIcon} />
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={(item) => item._id}
          />
        </View>
      )}

      <Modal visible={isModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>{isEditMode ? 'Edit Player' : 'Add New Player'}</Text>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={newPlayer.name}
            onChangeText={(text) => setNewPlayer({ ...newPlayer, name: text })}
          />
          <Picker
            selectedValue={newPlayer.team}
            onValueChange={(itemValue) => setNewPlayer({ ...newPlayer, team: itemValue })}
            style={styles.input}
          >
            {teams.map((team) => (
              <Picker.Item key={team._id} label={team.name} value={team._id} />
            ))}
          </Picker>
          <TextInput
            style={styles.input}
            placeholder="Batting Style"
            value={newPlayer.batting_style}
            onChangeText={(text) => setNewPlayer({ ...newPlayer, batting_style: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Bowling Style"
            value={newPlayer.bowling_style}
            onChangeText={(text) => setNewPlayer({ ...newPlayer, bowling_style: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            value={newPlayer.phone_number}
            onChangeText={(text) => setNewPlayer({ ...newPlayer, phone_number: text })}
            keyboardType="phone-pad"
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={newPlayer.email}
            onChangeText={(text) => setNewPlayer({ ...newPlayer, email: text })}
            keyboardType="email-address"
          />
          <TouchableOpacity onPress={openDatePicker}>
            <TextInput
              style={styles.input}
              placeholder="Date of Birth"
              value={newPlayer.date_of_birth}
              editable={false}
            />
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}
          <TextInput
            style={styles.input}
            placeholder="First Name"
            value={newPlayer.first_name}
            onChangeText={(text) => setNewPlayer({ ...newPlayer, first_name: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            value={newPlayer.last_name}
            onChangeText={(text) => setNewPlayer({ ...newPlayer, last_name: text })}
          />
          <Button title={isEditMode ? 'Update Player' : 'Add Player'} onPress={isEditMode ? handleEditPlayer : handleAddPlayer} />
          <Button title="Cancel" onPress={() => setIsModalVisible(false)} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f0f0f0',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 10,
      backgroundColor: '#202020',
    },
    headerText: {
      color: 'white',
      fontSize: 20,
      fontWeight: 'bold',
    },
    headerIcons: {
      flexDirection: 'row',
    },
    icon: {
      width: 24,
      height: 24,
      marginLeft: 10,
    },
    tabs: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginBottom: 20,
    },
    tab: {
      padding: 10,
      borderBottomWidth: 2,
      borderBottomColor: 'transparent',
    },
    activeTab: {
      borderBottomColor: 'blue',
    },
    tabText: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    userList: {
      paddingHorizontal: 20,
    },
    userItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
      paddingVertical: 10,
    },
    userId: {
      fontSize: 16,
      fontWeight: 'bold',
      flex: 1,
    },
    userName: {
      fontSize: 16,
      flex: 2,
    },
    userEmail: {
      fontSize: 14,
      flex: 2,
    },
    deleteIcon: {
      width: 20,
      height: 20,
    },
    actionIcon: {
      width: 20,
      height: 20,
      marginLeft: 10,
    },
    navigation: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingHorizontal: 20,
      paddingVertical: 10,
      backgroundColor: '#f0f0f0',
    },
    navIcon: {
      width: 24,
      height: 24,
    },
    navText: {
      fontSize: 16,
      marginTop: 5,
    },
    addButton: {
      backgroundColor: 'blue',
      padding: 10,
      marginBottom: 10,
      alignItems: 'center',
    },
    addButtonText: {
      color: 'white',
      fontSize: 16,
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      padding: 20,
    },
    modalTitle: {
      fontSize: 20,
      marginBottom: 20,
      textAlign: 'center',
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 10,
      marginBottom: 10,
    },
});

export default AdminUsersScreen;
