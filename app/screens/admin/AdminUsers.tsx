import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AdminUsersScreen = () => {
  const [activeTab, setActiveTab] = useState('All Users');
  const [users, setUsers] = useState([]);
  const [tempAdmins, setTempAdmins] = useState([]);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = await AsyncStorage.getItem('authToken');
      if (!token) return;

      try {
        const [usersResponse, tempAdminsResponse, requestsResponse] = await Promise.all([
          fetch('http://localhost:3000/admin/view-all-users', {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch('http://localhost:3000/admin/view-temp-admins', {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch('http://localhost:3000/admin/view-user-type-change-requests', {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        const usersData = await usersResponse.json();
        const tempAdminsData = await tempAdminsResponse.json();
        const requestsData = await requestsResponse.json();

        setUsers(usersData);
        setTempAdmins(tempAdminsData);
        setRequests(requestsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleTabPress = (tabName) => {
    setActiveTab(tabName);
  };

  const handleDeleteUser = async (userId) => {
    Alert.alert(
      'Delete User',
      'Are you sure you want to delete this user?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: async () => {
          const token = await AsyncStorage.getItem('authToken');
          if (!token) return;

          try {
            const response = await fetch(`http://localhost:3000/admin/delete-user/${userId}`, {
              method: 'DELETE',
              headers: { Authorization: `Bearer ${token}` },
            });

            if (response.ok) {
              setUsers(users.filter(user => user._id !== userId));
            } else {
              console.error('Failed to delete user');
            }
          } catch (error) {
            console.error('Error deleting user:', error);
          }
        }},
      ]
    );
  };

  const handleUpdateAdminStatus = async (userId, newStatus) => {
    Alert.alert(
      'Update User Status',
      `Are you sure you want to ${newStatus === 'user' ? 'remove' : 'promote'} admin privileges for this user?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Confirm', style: 'destructive', onPress: async () => {
          const token = await AsyncStorage.getItem('authToken');
          if (!token) return;

          const formData = new FormData();
          formData.append('username', userId);
          formData.append('new_type', newStatus);

          try {
            const response = await fetch('http://localhost:3000/admin/change-user-type', {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${token}`,
              },
              body: formData,
            });

            if (response.ok) {
              setUsers(users.map(user => user._id === userId ? { ...user, user_type: newStatus } : user));
            } else {
              console.error('Failed to update user status');
            }
          } catch (error) {
            console.error('Error updating user status:', error);
          }
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
            data={users.filter(user => user.user_type === 'user')}
            renderItem={({ item }) => (
              <View style={styles.userItem}>
                {/* <Text style={styles.userId}>{item._id}</Text> */}
                <Text style={styles.userName}>{item.username}</Text>
                <Text style={styles.userEmail}>{item.email}</Text>
                <TouchableOpacity onPress={() => handleDeleteUser(item._id)}>
                  <Image source={require('./../images/delete.png')} style={styles.deleteIcon} />
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={(item) => item._id}
          />
        </View>
      )}

      {activeTab === 'Temporary Admins' && (
        <View style={styles.userList}>
          <FlatList
            data={tempAdmins}
            renderItem={({ item }) => (
              <View style={styles.userItem}>
                {/* <Text style={styles.userId}>{item._id}</Text> */}
                <Text style={styles.userName}>{item.username}</Text>
                <Text style={styles.userEmail}>{item.email}</Text>
                <TouchableOpacity onPress={() => handleUpdateAdminStatus(item.username, 'user')}>
                  <Image source={require('./../images/delete.png')} style={styles.actionIcon} />
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={(item) => item._id}
          />
        </View>
      )}

      {activeTab === 'Requests' && (
        <View style={styles.userList}>
          <FlatList
            data={requests}
            renderItem={({ item }) => (
              <View style={styles.userItem}>
                {/* <Text style={styles.userId}>{item._id}</Text> */}
                <Text style={styles.userName}>{item.username}</Text>
                <Text style={styles.userEmail}>{item.email}</Text>
                <TouchableOpacity onPress={() => handleUpdateAdminStatus(item.username, 'temp-admin')}>
                  <Image source={require('./../images/accept.png')} style={styles.actionIcon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleUpdateAdminStatus(item.username, 'rejected')}>
                  <Image source={require('./../images/delete.png')} style={styles.actionIcon} />
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={(item) => item._id}
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
