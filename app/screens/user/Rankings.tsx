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
  // ... styles for each element
});

export default RankingsScreen;
