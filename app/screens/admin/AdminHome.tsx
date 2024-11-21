import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const fetchTeamName = async (teamId) => {
  try {
    const response = await fetch(`http://localhost:3000/teams/${teamId}`);
    const data = await response.json();
    return data.name;
  } catch (error) {
    console.error('Failed to fetch team name:', error);
    return 'Unknown Team';
  }
};

const AdminHomeScreen = () => {
  const navigation = useNavigation();
  const [matches, setMatches] = useState([]);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('authToken');
    await AsyncStorage.removeItem('user_type');
    navigation.navigate('screens/authentication/Login');
  };

  const currentDate = new Date().toLocaleDateString();

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem('authToken');
      const userType = await AsyncStorage.getItem('user_type');
      if (!token || !userType) {
        Alert.alert('Authentication Error', 'Please log in again.');
        navigation.navigate('screens/authentication/Login');
      }
    };

    const fetchMatches = async () => {
      try {
        const response = await fetch('http://localhost:3000/matches');
        const data = await response.json();
        const matchDetails = await Promise.all(
          data.map(async (match) => {
            const team1Name = await fetchTeamName(match.team1);
            const team2Name = await fetchTeamName(match.team2);
            return { ...match, team1Name, team2Name };
          })
        );
        setMatches(matchDetails);
      } catch (error) {
        Alert.alert('Error', 'Failed to fetch matches');
      }
    };

    checkAuth();
    fetchMatches();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>SLSCMA</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity onPress={() => navigation.navigate('screens/user/Notifications')} style={styles.iconButton}>
            <Image source={require('./../images/notification.png')} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('screens/user/News')} style={styles.iconButton}>
            <Image source={require('./../images/document.png')} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.dateContainer}>
        <Text style={styles.dateText}>Today</Text>
        <Text style={styles.dateText}>{currentDate}</Text>
      </View>
      <View style={styles.matchTable}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderText}>Match</Text>
          <Text style={styles.tableHeaderText}>Action</Text>
        </View>
        {matches.map(match => (
          <View key={match._id} style={styles.tableRow}>
            <Text style={styles.tableCell}>{`${match.team1Name} vs ${match.team2Name}`}</Text>
            <Text style={styles.tableCell}>Update</Text>
          </View>
        ))}
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Create News" onPress={() => navigation.navigate('screens/admin/CreateNews')} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Manage Teams" onPress={() => navigation.navigate('screens/admin/ManageTeams')} />
      </View>
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
  logoutButton: {
    backgroundColor: 'blue',
    padding: 5,
    borderRadius: 5,
    marginLeft: 10,
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 14,
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  dateText: {
    fontSize: 16,
  },
  matchTable: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    paddingBottom: 5,
  },
  tableHeaderText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    padding: 5,
  },
  tableCell: {
    fontSize: 14,
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
  iconButton: {
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    padding: 5,
    marginHorizontal: 5,
  },
  buttonContainer: {
    marginVertical: 5,
    paddingHorizontal: 20,
  },
});

export default AdminHomeScreen;
