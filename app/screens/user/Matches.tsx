import React from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';

const LiveMatchesScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>SLSCMA</Text>
        <View style={styles.headerIcons}>
          <Image source={require('./notification.png')} style={styles.icon} />
          <Image source={require('./document.png')} style={styles.icon} />
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Live Matches (20)</Text>
        <Button title="See all" style={styles.seeAllButton} />
        <View style={styles.matchContainer}>
          <Text style={styles.tournamentName}>ABC Tournament</Text>
          <Text style={styles.matchDate}>14/11/2024</Text>
          <View style={styles.teamInfo}>
            <Image source={require('./team1logo.png')} style={styles.teamLogo} />
            <Text style={styles.teamName}>Team ABC</Text>
          </View>
          <View style={styles.vsContainer}>
            <Text style={styles.vsText}>VS</Text>
          </View>
          <View style={styles.teamInfo}>
            <Image source={require('./team2logo.png')} style={styles.teamLogo} />
            <Text style={styles.teamName}>Team XYZ</Text>
          </View>
          <Image source={require('./star.png')} style={styles.starIcon} />
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Upcoming Matches (250)</Text>
        <Button title="See all" style={styles.seeAllButton} />
        <View style={styles.matchContainer}>
          <Text style={styles.tournamentName}>ABC Tournament</Text>
          <Text style={styles.matchDate}>14/11/2024</Text>
          <View style={styles.teamInfo}>
            <Image source={require('./team1logo.png')} style={styles.teamLogo} />
            <Text style={styles.teamName}>Team ABC</Text>
          </View>
          <View style={styles.vsContainer}>
            <Text style={styles.vsText}>VS</Text>
          </View>
          <View style={styles.teamInfo}>
            <Image source={require('./team2logo.png')} style={styles.teamLogo} />
            <Text style={styles.teamName}>Team XYZ</Text>
          </View>
          <Image source={require('./star.png')} style={styles.starIcon} />
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Past Matches (1500)</Text>
        <Button title="See all" style={styles.seeAllButton} />
        <View style={styles.matchContainer}>
          <Text style={styles.tournamentName}>ABC Tournament</Text>
          <Text style={styles.matchDate}>14/11/2024</Text>
          <View style={styles.teamInfo}>
            <Image source={require('./team1logo.png')} style={styles.teamLogo} />
            <Text style={styles.teamName}>Team ABC</Text>
          </View>
          <View style={styles.vsContainer}>
            <Text style={styles.vsText}>VS</Text>
          </View>
          <View style={styles.teamInfo}>
            <Image source={require('./team2logo.png')} style={styles.teamLogo} />
            <Text style={styles.teamName}>Team XYZ</Text>
          </View>
          <Image source={require('./star.png')} style={styles.starIcon} />
        </View>
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
    section: {
      paddingHorizontal: 20,
      paddingVertical: 10,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    seeAllButton: {
      backgroundColor: 'blue',
      padding: 5,
      borderRadius: 5,
    },
    matchContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 15,
    },
    tournamentName: {
      fontSize: 16,
      marginBottom: 5,
    },
    matchDate: {
      fontSize: 14,
      color: 'gray',
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
    vsContainer: {
      alignItems: 'center',
    },
    vsText: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    starIcon: {
      width: 20,
      height: 20,
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

export default LiveMatchesScreen;
