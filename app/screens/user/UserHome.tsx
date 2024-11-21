import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Button, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Image as RNImage } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserHomeScreen = () => {
  const navigation = useNavigation();
  const [matches, setMatches] = useState([]);
  const [teams, setTeams] = useState({});
  const [userType, setUserType] = useState('');

  const handleLogout = async () => {
    await AsyncStorage.removeItem('authToken');
    await AsyncStorage.removeItem('user_type');
    navigation.navigate('screens/authentication/Login');
  };

  const notificationUri = RNImage.resolveAssetSource(require('./../images/notification.png')).uri;
  const documentUri = RNImage.resolveAssetSource(require('./../images/document.png')).uri;
  const team1LogoUri = RNImage.resolveAssetSource(require('./../images/team1logo.png')).uri;
  const team2LogoUri = RNImage.resolveAssetSource(require('./../images/team2logo.png')).uri;
  const team3LogoUri = RNImage.resolveAssetSource(require('./../images/team3logo.png')).uri;
  const team4LogoUri = RNImage.resolveAssetSource(require('./../images/team4logo.png')).uri;
  const homeUri = RNImage.resolveAssetSource(require('./../images/home.png')).uri;
  const matchesUri = RNImage.resolveAssetSource(require('./../images/matches.png')).uri;
  const rankingsUri = RNImage.resolveAssetSource(require('./../images/rankings.png')).uri;
  const accountUri = RNImage.resolveAssetSource(require('./../images/account.png')).uri;
  const newsUri = RNImage.resolveAssetSource(require('./../images/news.png')).uri; 

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await fetch('http://localhost:3000/matches');
        const data = await response.json();
        setMatches(data);
      } catch (error) {
        Alert.alert('Error', 'Failed to fetch matches');
      }
    };

    fetchMatches();
  }, []);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch('http://localhost:3000/teams');
        const data = await response.json();
        const teamsMap = data.reduce((acc, team) => {
          acc[team._id] = team.name;
          return acc;
        }, {});
        setTeams(teamsMap);
      } catch (error) {
        Alert.alert('Error', 'Failed to fetch teams');
      }
    };

    fetchTeams();
  }, []);

  useEffect(() => {
    const fetchUserType = async () => {
      const type = await AsyncStorage.getItem('user_type');
      setUserType(type);
    };

    fetchUserType();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const fetchMatches = async () => {
        try {
          const response = await fetch('http://localhost:3000/matches');
          const data = await response.json();
          setMatches(data);
        } catch (error) {
          Alert.alert('Error', 'Failed to fetch matches');
        }
      };

      // console.log('fetching matches...');
      fetchMatches();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const handleAdminRequest = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (!token) {
        Alert.alert('Error', 'No token found');
        return;
      }

      const response = await fetch('http://localhost:3000/admin/request-user-type-change', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        Alert.alert('Success', 'User type change request submitted successfully');
      } else {
        Alert.alert('Error', 'Failed to submit request');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred');
    }
  };

  const renderMatch = (match) => (
    <View key={match._id} style={styles.matchContainer}>
      <Text style={styles.date}>{new Date(match.date).toDateString()}</Text>
      {match.status === 'live' && <Text style={styles.liveText}>LIVE</Text>}
      <View style={styles.matchDetails}>
        <View style={styles.teamInfo}>
          <Image source={{ uri: team1LogoUri }} style={styles.teamLogo} />
          <Text style={styles.teamName}>{teams[match.team1]}</Text>
          <Text style={styles.score}>{`${match.team1_score}/${match.team1_wickets} (${match.team1_overs_played} overs)`}</Text>
        </View>
        <View style={styles.vsContainer}>
          <Text style={styles.vsText}>VS</Text>
        </View>
        <View style={styles.teamInfo}>
          <Image source={{ uri: team2LogoUri }} style={styles.teamLogo} />
          <Text style={styles.teamName}>{teams[match.team2]}</Text>
          <Text style={styles.score}>{`${match.team2_score}/${match.team2_wickets} (${match.team2_overs_played} overs)`}</Text>
        </View>
      </View>
      <Text style={styles.tournamentName}>{match.location}</Text>
    </View>
  );

  const liveMatch = matches.find(match => match.status === 'live');

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>SLSCMA</Text>
        <View style={styles.headerIcons}>
          <Image source={{ uri: notificationUri }} style={styles.icon} />
          <Image source={{ uri: documentUri }} style={styles.icon} />
          <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
      {liveMatch && renderMatch(liveMatch)}
      {userType !== 'temp-admin' && (
        <View style={styles.adminRequest}>
          <Text style={styles.adminRequestText}>Are you a cricket match organizer?</Text>
          <Button title="Become a temporary admin" style={styles.adminButton} onPress={handleAdminRequest} />
        </View>
      )}
      <View style={styles.navigation}>
        <TouchableOpacity onPress={() => navigation.navigate('screens/user/UserHome')}>
          <Image source={{ uri: homeUri }} style={styles.navIcon} />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('screens/user/Matches')}>
          <Image source={{ uri: matchesUri }} style={styles.navIcon} />
          <Text style={styles.navText}>Matches</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('screens/user/Rankings')}>
          <Image source={{ uri: rankingsUri }} style={styles.navIcon} />
          <Text style={styles.navText}>Rankings</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('screens/user/UpdateAccount')}>
          <Image source={{ uri: accountUri }} style={styles.navIcon} />
          <Text style={styles.navText}>Account</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('screens/user/News')}>
          <Image source={{ uri: newsUri }} style={styles.navIcon} />
          <Text style={styles.navText}>News</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('screens/user/Notifications')}>
          <Image source={{ uri: notificationUri }} style={styles.navIcon} />
          <Text style={styles.navText}>Notifications</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
  matchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  date: {
    fontSize: 16,
    marginBottom: 5,
  },
  liveText: {
    color: 'green',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  matchDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  teamInfo: {
    alignItems: 'center',
  },
  teamLogo: {
    width: 50,
    height: 50,
    marginBottom: 5,
  },
  teamName: {
    fontSize: 18,
    marginBottom: 2,
  },
  score: {
    fontSize: 16,
  },
  vsContainer: {
    alignItems: 'center',
  },
  vsText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  tournamentName: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
  adminRequest: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  adminRequestText: {
    fontSize: 18,
    textAlign: 'center',
  },
  adminButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
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
});

export default UserHomeScreen;