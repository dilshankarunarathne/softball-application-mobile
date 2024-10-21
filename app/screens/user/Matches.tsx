import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

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
  // ... styles for each element
});

export default LiveMatchesScreen;
