import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Image as RNImage } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const RankingsScreen = () => {
  const navigation = useNavigation();
  const [selectedTab, setSelectedTab] = useState('Teams');

  const notificationUri = RNImage.resolveAssetSource(require('./../images/notification.png')).uri;
  const documentUri = RNImage.resolveAssetSource(require('./../images/document.png')).uri;
  const homeUri = RNImage.resolveAssetSource(require('./../images/home.png')).uri;
  const matchesUri = RNImage.resolveAssetSource(require('./../images/matches.png')).uri;
  const rankingsUri = RNImage.resolveAssetSource(require('./../images/rankings.png')).uri;
  const accountUri = RNImage.resolveAssetSource(require('./../images/account.png')).uri;

  const teamRankingData = [
    { name: 'Team A', matches: 10, points: 20, rating: 200 },
    { name: 'Team B', matches: 12, points: 18, rating: 180 },
    // Add more teams as needed
  ];

  const playerRankingData = [
    { name: 'Player A', matches: 10, points: 20, rating: 200 },
    { name: 'Player B', matches: 12, points: 18, rating: 180 },
    // Add more players as needed
  ];

  const rankingData = selectedTab === 'Teams' ? teamRankingData : playerRankingData;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>SLSCMA</Text>
        <View style={styles.headerIcons}>
          <Image source={{ uri: notificationUri }} style={styles.icon} />
          <Image source={{ uri: documentUri }} style={styles.icon} />
        </View>
      </View>
      <View style={styles.tabs}>
        <TouchableOpacity onPress={() => setSelectedTab('Teams')}>
          <Text style={[styles.tabText, selectedTab === 'Teams' && styles.activeTab]}>Teams</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedTab('Players')}>
          <Text style={[styles.tabText, selectedTab === 'Players' && styles.activeTab]}>Players</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.rankingTable}>
        <View style={styles.tableRow}>
          <Text style={styles.tableHeader}>Pos</Text>
          <Text style={styles.tableHeader}>Name</Text>
          <Text style={styles.tableHeader}>Matches</Text>
          <Text style={styles.tableHeader}>Pts</Text>
          <Text style={styles.tableHeader}>Rating</Text>
        </View>
        {rankingData.map((item, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={styles.tableCell}>{index + 1}</Text>
            <Text style={styles.tableCell}>{item.name}</Text>
            <Text style={styles.tableCell}>{item.matches}</Text>
            <Text style={styles.tableCell}>{item.points}</Text>
            <Text style={styles.tableCell}>{item.rating}</Text>
          </View>
        ))}
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
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  tabText: {
    fontSize: 18,
    fontWeight: 'bold',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
    paddingBottom: 5,
  },
  activeTab: {
    borderBottomColor: 'blue',
  },
  rankingTable: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
  },
  tableHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 5,
    flex: 1,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    padding: 5,
  },
  tableCell: {
    fontSize: 14,
    textAlign: 'center',
    flex: 1,
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

export default RankingsScreen;
