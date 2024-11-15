import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, Button } from 'react-native';

const AdminMatchesScreen = () => {
  const [matches, setMatches] = useState([
    {
      id: 1,
      tournamentName: 'ABC Tournament',
      team1: 'Team ABC',
      team2: 'Team XYZ',
      date: '14/11/2024',
      status: 'Live',
    },
    // ... more matches
  ]);

  useEffect(() => {
    // Fetch match data from your backend API here
    const fetchMatches = async () => {
      try {
        const response = await fetch('your_api_endpoint');
        const data = await response.json();
        setMatches(data);
      } catch (error) {
        console.error('Error fetching matches:', error);
      }
    };

    fetchMatches();
  }, []);

  const renderMatchItem = ({ item }) => {
    return (
      <View style={styles.matchItem}>
        <Text style={styles.tournamentName}>{item.tournamentName}</Text>
        <Text style={styles.matchDate}>{item.date}</Text>
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
        <TouchableOpacity style={styles.updateButton}>
          <Text style={styles.updateButtonText}>Update</Text>
        </TouchableOpacity>
      </View>
    );
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
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Live Matches ({matches.filter(match => match.status === 'Live').length})</Text>
        <FlatList
          data={matches.filter(match => match.status === 'Live')}
          renderItem={renderMatchItem}
          keyExtractor={(item) => item.id}
        />
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Upcoming Matches ({matches.filter(match => match.status === 'Upcoming').length})</Text>
        <FlatList
          data={matches.filter(match => match.status === 'Upcoming')}
          renderItem={renderMatchItem}
          keyExtractor={(item) => item.id}
        />
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Past Matches ({matches.filter(match => match.status === 'Past').length})</Text>
        <FlatList
          data={matches.filter(match => match.status === 'Past')}
          renderItem={renderMatchItem}
          keyExtractor={(item) => item.id}
        />
      </View>
      <View style={styles.scheduleMatchButton}>
        <Button title="Schedule a Match" />
      </View>
      <View style={styles.navigation}>
        {/* ... navigation bar */}
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
      paddingHorizontal:   
   20,
      paddingVertical: 10,
      backgroundColor:   
   '#202020',
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
});

export default AdminMatchesScreen;
