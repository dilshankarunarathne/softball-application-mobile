import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AdminHomeScreen = () => {
  const navigation = useNavigation();
  const [matches, setMatches] = useState([]);
  const currentDate = new Date().toLocaleDateString();

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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>SLSCMA</Text>
        <View style={styles.headerIcons}>
          <Image source={require('./../images/notification.png')} style={styles.icon} />
          <Image source={require('./../images/document.png')} style={styles.icon} />
        </View>
      </View>
      <View style={styles.dateContainer}>
        <Text style={styles.dateText}>Today</Text>
        <Text style={styles.dateText}>{currentDate}</Text>
      </View>
      <View style={styles.matchTable}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderText}>Match ID</Text>
          <Text style={styles.tableHeaderText}>Match</Text>
          <Text style={styles.tableHeaderText}>Action</Text>
        </View>
        {matches.map(match => (
          <View key={match._id} style={styles.tableRow}>
            <Text style={styles.tableCell}>{match._id}</Text>
            <Text style={styles.tableCell}>{`${match.team1} vs ${match.team2}`}</Text>
            <Text style={styles.tableCell}>Update</Text>
          </View>
        ))}
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
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  dateText: {
    fontSize: 16,
  },
  matchTable: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    paddingBottom: 5,
  },
  tableHeaderText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    padding: 5,
  },
  tableCell: {
    fontSize: 14,
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

export default AdminHomeScreen;
