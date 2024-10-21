import React from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';

const UserHomeScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>SLSCMA</Text>
        <View style={styles.headerIcons}>
          <Image source={require('./notification.png')} style={styles.icon} />
          <Image source={require('./document.png')} style={styles.icon} />
        </View>
      </View>
      <View style={styles.matchContainer}>
        <Text style={styles.date}>Today</Text>
        <Text style={styles.liveText}>LIVE</Text>
        <View style={styles.matchDetails}>
          <View style={styles.teamInfo}>
            <Image source={require('./team1logo.png')} style={styles.teamLogo} />
            <Text style={styles.teamName}>Team XYZ</Text>
            <Text style={styles.score}>260/6 (50 overs)</Text>
          </View>
          <View style={styles.vsContainer}>
            <Text style={styles.vsText}>VS</Text>
          </View>
          <View style={styles.teamInfo}>
            <Image source={require('./team2logo.png')} style={styles.teamLogo} />
            <Text style={styles.teamName}>Team XYZ</Text>
            <Text style={styles.score}>260/6 (50 overs)</Text>
          </View>
        </View>
        <Text style={styles.tournamentName}>ABC TOURNAMENT</Text>
      </View>
      <View style={styles.matchContainer}>
        <View style={styles.teamInfo}>
          <Image source={require('./team3logo.png')} style={styles.teamLogo} />
          <Text style={styles.teamName}>Team XYZ</Text>
          <Text style={styles.score}>260/6 (50 overs)</Text>
        </View>
        <View style={styles.vsContainer}>
          <Text style={styles.vsText}>VS</Text>
        </View>
        <View style={styles.teamInfo}>
          <Image source={require('./team4logo.png')} style={styles.teamLogo} />
          <Text style={styles.teamName}>Team XYZ</Text>
          <Text style={styles.score}>260/6 (50 overs)</Text>
        </View>
        <Text style={styles.tournamentName}>ABC TOURNAMENT</Text>
      </View>
      <View style={styles.adminRequest}>
        <Text style={styles.adminRequestText}>Are you a cricket match organizer?</Text>
        <Button title="Become a temporary admin" style={styles.adminButton} />
      </View>
      <View style={styles.navigation}>
        <Image source={require('./home.png')} style={styles.navIcon} />
        <Text style={styles.navText}>Home</Text>
        <Image source={require('./matches.png')} style={styles.navIcon} />
        <Text style={styles.navText}>Matches</Text>
        <Image source={require('./rankings.png')} style={styles.navIcon} />
        <Text style={styles.navText}>Rankings</Text>
        <Image source={require('./account.png')} style={styles.navIcon} />
        <Text style={styles.navText}>Account</Text>
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
});

export default UserHomeScreen;
