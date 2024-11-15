import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, Alert } from 'react-native';

const AdminUsersScreen = () => {
  const [activeTab, setActiveTab] = useState('All Users');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch user data from your backend API
    const fetchUsers = async () => {
      try {
        const response = await fetch('your_api_endpoint');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleTabPress = (tabName) => {
    setActiveTab(tabName);
  };

  const handleDeleteUser = (userId) => {
    Alert.alert(
      'Delete User',
      'Are you sure you want to delete this user?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => {
          // Implement the logic to delete the user from the backend
          setUsers(users.filter(user => user.id !== userId));
        }},
      ]
    );
  };

  const handleUpdateAdminStatus = (userId, newStatus) => {
    Alert.alert(
      'Update User Status',
      `Are you sure you want to ${newStatus === 'user' ? 'remove' : 'promote'} admin privileges for this user?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Confirm', style: 'destructive', onPress: () => {
          // Implement the logic to update the user's status on the backend
          setUsers(users.map(user => user.id === userId ? { ...user, is_admin: newStatus === 'admin' } : user));
        }},
      ]
    );
  };

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
        <TouchableOpacity style={[styles.tab, activeTab === 'All Users' && styles.activeTab]} onPress={() => handleTabPress('All Users')}>
          <Text style={styles.tabText}>All Users</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tab, activeTab === 'Temporary Admins' && styles.activeTab]} onPress={() => handleTabPress('Temporary Admins')}>
          <Text style={styles.tabText}>Temporary Admins</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tab, activeTab === 'Requests' && styles.activeTab]} onPress={() => handleTabPress('Requests')}>
          <Text style={styles.tabText}>Requests</Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'All Users' && (
        <View style={styles.userList}>
          <FlatList
            data={users.filter(user => !user.is_admin)}
            renderItem={({ item }) => (
              <View style={styles.userItem}>
                <Text style={styles.userId}>{item.id}</Text>
                <Text style={styles.userName}>{item.name}</Text>
                <Text style={styles.userEmail}>{item.email}</Text>
                <TouchableOpacity onPress={() => handleDeleteUser(item.id)}>
                  {/* <Image source={require('./../images/delete_icon.png')} style={styles.deleteIcon} /> */}
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
      )}

      {activeTab === 'Temporary Admins' && (
        <View style={styles.userList}>
          <FlatList
            data={users.filter(user => user.is_admin)}
            renderItem={({ item }) => (
              <View style={styles.userItem}>
                <Text style={styles.userId}>{item.id}</Text>
                <Text style={styles.userName}>{item.name}</Text>
                <Text style={styles.userEmail}>{item.email}</Text>
                <TouchableOpacity onPress={() => handleUpdateAdminStatus(item.id, 'user')}>
                  {/* <Image source={require('./../images/remove_admin_icon.png')} style={styles.actionIcon} /> */}
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
      )}

      {activeTab === 'Requests' && (
        <View style={styles.userList}>
          <FlatList
            data={users.filter(user => user.request_status === 'pending')}
            renderItem={({ item }) => (
              <View style={styles.userItem}>
                <Text style={styles.userId}>{item.id}</Text>
                <Text style={styles.userName}>{item.name}</Text>
                <Text style={styles.userEmail}>{item.email}</Text>
                <TouchableOpacity onPress={() => handleUpdateAdminStatus(item.id, 'admin')}>
                  {/* <Image source={require('./../images/accept_icon.png')} style={styles.actionIcon} /> */}
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleUpdateAdminStatus(item.id, 'rejected')}>
                  {/* <Image source={require('./../images/reject_icon.png')} style={styles.actionIcon} /> */}
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
      )}
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
    userList: {
      paddingHorizontal: 20,
    },
    userItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
      paddingVertical: 10,
    },
    userId: {
      fontSize: 16,
      fontWeight: 'bold',
      flex: 1,
    },
    userName: {
      fontSize: 16,
      flex: 2,
    },
    userEmail: {
      fontSize: 14,
      flex: 2,
    },
    deleteIcon: {
      width: 20,
      height: 20,
    },
    actionIcon: {
      width: 20,
      height: 20,
      marginLeft: 10,
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

export default AdminUsersScreen;
