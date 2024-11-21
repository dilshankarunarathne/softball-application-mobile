import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AdminRankingsScreen = () => {
  const [activeTab, setActiveTab] = useState('Teams');
  const [teamRankingData, setTeamRankingData] = useState([]);
  const [playerRankingData, setPlayerRankingData] = useState([]);
  const [fallenBatsmen, setFallenBatsmen] = useState([]);
  const navigation = useNavigation();

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

  const handleTabPress = (tabName) => {
    setActiveTab(tabName);
  };

  const handleWicketFall = async (batsman) => {
    const updatedFallenBatsmen = [...fallenBatsmen, batsman];
    setFallenBatsmen(updatedFallenBatsmen);
    try {
      await AsyncStorage.setItem('fallenBatsmen', JSON.stringify(updatedFallenBatsmen));
    } catch (error) {
      console.error('Error saving fallen batsmen:', error);
    }
  };

  const rankingData = activeTab === 'Teams' ? teamRankingData : playerRankingData;
  const availableBatsmen = playerRankingData.filter(player => !fallenBatsmen.includes(player.name));

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>SLSCMA</Text>
        <View style={styles.headerIcons}>
          <Image source={require('./../images/notification.png')} style={styles.icon} />
          <Image source={require('./../images/document.png')} style={styles.icon} />
        </View>
      </View>

      <View style={styles.tabs}>
        <TouchableOpacity style={[styles.tab, activeTab === 'Teams' && styles.activeTab]} onPress={() => handleTabPress('Teams')}>
          <Text style={styles.tabText}>Teams</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tab, activeTab === 'Players' && styles.activeTab]} onPress={() => handleTabPress('Players')}>
          <Text style={styles.tabText}>Players</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tableContainer}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderText}>Pos</Text>
          <Text style={styles.tableHeaderText}>Name</Text>
          <Text style={styles.tableHeaderText}>Matches</Text>
          <Text style={styles.tableHeaderText}>Pts</Text>
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
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  tab: {
    padding: 10,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: 'blue',
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  tableContainer: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    paddingBottom: 5,
  },
  tableHeaderText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  // Add styles for table rows and cells as needed
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
});

export default AdminRankingsScreen;
