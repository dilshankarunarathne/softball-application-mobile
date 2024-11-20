import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Image as RNImage } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RankingsScreen = () => {
  const navigation = useNavigation();
  const [selectedTab, setSelectedTab] = useState('Teams');
  const [teamRankingData, setTeamRankingData] = useState([]);
  const [playerRankingData, setPlayerRankingData] = useState([]);
  const [fallenBatsmen, setFallenBatsmen] = useState([]);

  useEffect(() => {
    const fetchTeamRankings = async () => {
      try {
        const response = await axios.get('http://localhost:3000/teams');
        setTeamRankingData(response.data.sort((a, b) => b.points - a.points));
      } catch (error) {
        console.error('Error fetching team rankings:', error);
      }
    };

    const fetchPlayerRankings = async () => {
      try {
        const response = await axios.get('http://localhost:3000/player/all');
        setPlayerRankingData(response.data.sort((a, b) => b.points - a.points));
      } catch (error) {
        console.error('Error fetching player rankings:', error);
      }
    };

    const loadFallenBatsmen = async () => {
      try {
        const storedFallenBatsmen = await AsyncStorage.getItem('fallenBatsmen');
        if (storedFallenBatsmen) {
          setFallenBatsmen(JSON.parse(storedFallenBatsmen));
        }
      } catch (error) {
        console.error('Error loading fallen batsmen:', error);
      }
    };

    fetchTeamRankings();
    fetchPlayerRankings();
    loadFallenBatsmen();
  }, []);

  const notificationUri = RNImage.resolveAssetSource(require('./../images/notification.png')).uri;
  const documentUri = RNImage.resolveAssetSource(require('./../images/document.png')).uri;
  const homeUri = RNImage.resolveAssetSource(require('./../images/home.png')).uri;
  const matchesUri = RNImage.resolveAssetSource(require('./../images/matches.png')).uri;
  const rankingsUri = RNImage.resolveAssetSource(require('./../images/rankings.png')).uri;
  const accountUri = RNImage.resolveAssetSource(require('./../images/account.png')).uri;

  const rankingData = selectedTab === 'Teams' ? teamRankingData : playerRankingData;

  const handleWicketFall = async (batsman) => {
    const updatedFallenBatsmen = [...fallenBatsmen, batsman];
    setFallenBatsmen(updatedFallenBatsmen);
    try {
      await AsyncStorage.setItem('fallenBatsmen', JSON.stringify(updatedFallenBatsmen));
    } catch (error) {
      console.error('Error saving fallen batsmen:', error);
    }
  };

  const availableBatsmen = playerRankingData.filter(player => !fallenBatsmen.includes(player.name));

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
        </View>
        {rankingData.map((item, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={styles.tableCell}>{index + 1}</Text>
            <Text style={styles.tableCell}>{item.name}</Text>
            <Text style={styles.tableCell}>{item.matches || item.matches_played}</Text>
            <Text style={styles.tableCell}>{item.points}</Text>
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
