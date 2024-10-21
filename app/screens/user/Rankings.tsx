import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const RankingsScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>SLSCMA</Text>
        <View style={styles.headerIcons}>
          <Image source={require('./notification.png')} style={styles.icon} />
          <Image source={require('./document.png')} style={styles.icon} />
        </View>
      </View>
      <View style={styles.tabs}>
        <Text style={styles.tabText}>Teams</Text>
        <Text style={styles.tabText}>Players</Text>
      </View>
      <View style={styles.rankingTable}>
        <Text style={styles.tableHeader}>Pos</Text>
        <Text style={styles.tableHeader}>Team</Text>
        <Text style={styles.tableHeader}>Matches</Text>
        <Text style={styles.tableHeader}>Pts</Text>
        <Text style={styles.tableHeader}>Rating</Text>
        {rankingData.map((team, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={styles.tableCell}>{index + 1}</Text>
            <Text style={styles.tableCell}>{team.name}</Text>
            <Text style={styles.tableCell}>{team.matches}</Text>
            <Text style={styles.tableCell}>{team.points}</Text>
            <Text style={styles.tableCell}>{team.rating}</Text>
          </View>
        ))}
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
    tabs: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginBottom: 20,
    },
    tabText: {
      fontSize: 18,
      fontWeight: 'bold',
      borderBottomWidth: 2,
      borderBottomColor: 'blue',
      paddingBottom: 5,
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
