import React from 'react';
import { View, Text, StyleSheet, Image, Button, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Image as RNImage } from 'react-native';

const LiveMatchesScreen = () => {
  const navigation = useNavigation();

  const notificationUri = RNImage.resolveAssetSource(require('./../images/notification.png')).uri;
  const documentUri = RNImage.resolveAssetSource(require('./../images/document.png')).uri;
  const team1LogoUri = RNImage.resolveAssetSource(require('./../images/team1logo.png')).uri;
  const team2LogoUri = RNImage.resolveAssetSource(require('./../images/team2logo.png')).uri;
  const starUri = RNImage.resolveAssetSource(require('./../images/star.png')).uri;
  const homeUri = RNImage.resolveAssetSource(require('./../images/home.png')).uri;
  const matchesUri = RNImage.resolveAssetSource(require('./../images/matches.png')).uri;
  const rankingsUri = RNImage.resolveAssetSource(require('./../images/rankings.png')).uri;
  const accountUri = RNImage.resolveAssetSource(require('./../images/account.png')).uri;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>SLSCMA</Text>
        <View style={styles.headerIcons}>
          <Image source={{ uri: notificationUri }} style={styles.icon} />
          <Image source={{ uri: documentUri }} style={styles.icon} />
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Live Matches (20)</Text>
        <Button title="See all" style={styles.seeAllButton} />
        <View style={styles.matchContainer}>
          <Text style={styles.tournamentName}>ABC Tournament</Text>
          <Text style={styles.matchDate}>14/11/2024</Text>
          <View style={styles.teamInfo}>
            <Image source={{ uri: team1LogoUri }} style={styles.teamLogo} />
            <Text style={styles.teamName}>Team ABC</Text>
          </View>
          <View style={styles.vsContainer}>
            <Text style={styles.vsText}>VS</Text>
          </View>
          <View style={styles.teamInfo}>
            <Image source={{ uri: team2LogoUri }} style={styles.teamLogo} />
            <Text style={styles.teamName}>Team XYZ</Text>
          </View>
          <Image source={{ uri: starUri }} style={styles.starIcon} />
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Upcoming Matches (250)</Text>
        <Button title="See all" style={styles.seeAllButton} />
        <View style={styles.matchContainer}>
          <Text style={styles.tournamentName}>ABC Tournament</Text>
          <Text style={styles.matchDate}>14/11/2024</Text>
          <View style={styles.teamInfo}>
            <Image source={{ uri: team1LogoUri }} style={styles.teamLogo} />
            <Text style={styles.teamName}>Team ABC</Text>
          </View>
          <View style={styles.vsContainer}>
            <Text style={styles.vsText}>VS</Text>
          </View>
          <View style={styles.teamInfo}>
            <Image source={{ uri: team2LogoUri }} style={styles.teamLogo} />
            <Text style={styles.teamName}>Team XYZ</Text>
          </View>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Past Matches (1500)</Text>
        <Button title="See all" style={styles.seeAllButton} />
        <View style={styles.matchContainer}>
          <Text style={styles.tournamentName}>ABC Tournament</Text>
          <Text style={styles.matchDate}>14/11/2024</Text>
          <View style={styles.teamInfo}>
            <Image source={{ uri: team1LogoUri }} style={styles.teamLogo} />
            <Text style={styles.teamName}>Team ABC</Text>
          </View>
          <View style={styles.vsContainer}>
            <Text style={styles.vsText}>VS</Text>
          </View>
          <View style={styles.teamInfo}>
            <Image source={{ uri: team2LogoUri }} style={styles.teamLogo} />
            <Text style={styles.teamName}>Team XYZ</Text>
          </View>
          <Image source={{ uri: starUri }} style={styles.starIcon} />
        </View>
      </View>
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
