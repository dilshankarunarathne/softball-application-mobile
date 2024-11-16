import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, SectionList, TouchableOpacity, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AdminMatchesScreen = () => {
  const navigation = useNavigation();
  const [matches, setMatches] = useState({ live: [], upcoming: [], past: [] });

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await fetch('http://localhost:3000/matches');
        const data = await response.json();
        const live = data.filter(match => match.status === 'live');
        const upcoming = data.filter(match => match.status === 'pending');
        const past = data.filter(match => match.status === 'ended');
        setMatches({ live, upcoming, past });
      } catch (error) {
        console.error('Error fetching matches:', error);
      }
    };

    fetchMatches();
  }, []);

  const renderMatchItem = ({ item }) => (
    <View style={styles.matchItem}>
      <Text style={styles.tournamentName}>{item.tournamentName}</Text>
      <Text style={styles.matchDate}>{new Date(item.date).toLocaleDateString()}</Text>
      <View style={styles.teamContainer}>
        <View style={styles.teamInfo}>
          <Image source={require('./../images/team1logo.png')} style={styles.teamLogo} />
          <Text style={styles.teamName}>{item.team1}</Text>
        </View>
        <Text style={styles.vsText}>VS</Text>
        <View style={styles.teamInfo}>
          <Image source={require('./../images/team2logo.png')} style={styles.teamLogo} />
          <Text style={styles.teamName}>{item.team2}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.updateButton} onPress={() => navigation.navigate('screens/admin/UpdateMatch', { matchId: item.id })}>
        <Text style={styles.updateButtonText}>Update</Text>
      </TouchableOpacity>
    </View>
  );

  const sections = [
    { title: `Live Matches (${matches.live.length})`, data: matches.live },
    { title: `Upcoming Matches (${matches.upcoming.length})`, data: matches.upcoming },
    { title: `Past Matches (${matches.past.length})`, data: matches.past },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>SLSCMA</Text>
        <View style={styles.headerIcons}>
          <Image source={require('./../images/notification.png')} style={styles.icon} />
          <Image source={require('./../images/document.png')} style={styles.icon} />
        </View>
      </View>
      <SectionList
        sections={sections}
        renderItem={renderMatchItem}
        renderSectionHeader={({ section: { title } }) => (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{title}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id ? item.id.toString() : item._id.toString()} // Ensure unique key
      />
      <View style={styles.scheduleMatchButton}>
        <Button title="Schedule a Match" onPress={() => navigation.navigate('screens/admin/ScheduleMatch')} />
      </View>
      <View style={styles.navigation}>
        <TouchableOpacity onPress={() => navigation.navigate('screens/admin/AdminHome')}>
          <Image source={require('./../images/home.png')} style={styles.navIcon} />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('screens/admin/AdminMatches')}>
          <Image source={require('./../images/matches.png')} style={styles.navIcon} />
          <Text style={styles.navText}>Matches</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('screens/admin/AdminRankings')}>
          <Image source={require('./../images/rankings.png')} style={styles.navIcon} />
          <Text style={styles.navText}>Rankings</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('screens/user/UpdateAccount')}>
          <Image source={require('./../images/users.png')} style={styles.navIcon} />
          <Text style={styles.navText}>Users</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('screens/admin/AdminUsers')}>
          <Image source={require('./../images/admin.png')} style={styles.navIcon} />
          <Text style={styles.navText}>Admin</Text>
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
  section: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  matchItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
  },
  tournamentName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  matchDate: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 10,
  },
  teamContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  teamInfo: {
    alignItems: 'center',
  },
  teamLogo: {
    width: 40,
    height: 40,
    marginBottom: 5,
  },
  teamName: {
    fontSize: 14,
  },
  vsText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  updateButton: {
    backgroundColor: 'blue',
    padding: 5,
    borderRadius: 5,
  },
  updateButtonText: {
    color: 'white',
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
  scheduleMatchButton: {
    padding: 10,
    alignItems: 'center',
  },
});

export default AdminMatchesScreen;
