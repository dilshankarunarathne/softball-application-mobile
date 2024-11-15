import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const AdminRankingsScreen = () => {
  const [activeTab, setActiveTab] = useState('Teams');

  const handleTabPress = (tabName) => {
    setActiveTab(tabName);
  };

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
        <TouchableOpacity style={[styles.tab, activeTab === 'Teams' && styles.activeTab]} onPress={() => handleTabPress('Teams')}>
          <Text style={styles.tabText}>Teams</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tab, activeTab === 'Players' && styles.activeTab]} onPress={() => handleTabPress('Players')}>
          <Text style={styles.tabText}>Players</Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'Teams' && (
        <View style={styles.tableContainer}>
          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderText}>Pos</Text>
            <Text style={styles.tableHeaderText}>Team</Text>
            <Text style={styles.tableHeaderText}>Matches</Text>
            <Text style={styles.tableHeaderText}>Pts</Text>
            <Text style={styles.tableHeaderText}>Rating</Text>
          </View>
          {/* ... (render team ranking data here) */}
        </View>
      )}
      {activeTab === 'Players' && (
        <View style={styles.tableContainer}>
          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderText}>Pos</Text>
            <Text style={styles.tableHeaderText}>Player</Text>
            <Text style={styles.tableHeaderText}>Rating</Text>
          </View>
          {/* ... (render player ranking data here) */}
        </View>
      )}

      <View style={styles.navigation}>
        {/* ... navigation bar */}
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

export default AdminRankingsScreen;