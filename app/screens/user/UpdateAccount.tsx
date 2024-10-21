import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native';

const MyAccountScreen = () => {
  const [firstName, setFirstName] = useState('John');
  const [lastName, setLastName] = useState('Doe');
  const [email, setEmail] = useState('abc@gmail.com');
  const [phoneNumber, setPhoneNumber] = useState('0712345678');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleUpdateProfile = () => {
    // Handle update profile logic here
    console.log('Updated profile:', { firstName, lastName, email, phoneNumber });
  };

  const handleResetPassword = () => {
    // Handle reset password logic here
    console.log('Current Password:', currentPassword);
    console.log('New Password:', newPassword);
    console.log('Confirm Password:', confirmPassword);
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
      <View style={styles.profileContainer}>
        <Image source={require('./profilePicture.png')} style={styles.profileImage} />
        <Text style={styles.profileTitle}>My Account</Text>
      </View>
      <View style={styles.personalInfoContainer}>
        <Text style={styles.sectionTitle}>Personal Info</Text>
        <TextInput
          style={styles.input}
          placeholder="First Name"
          value={firstName}
          onChangeText={setFirstName}
        />
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          value={lastName}
          onChangeText={setLastName}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
        <Button title="Update" onPress={handleUpdateProfile} style={styles.updateButton} />
      </View>
      <View style={styles.resetPasswordContainer}>
        <Text style={styles.sectionTitle}>Reset Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Current Password"
          value={currentPassword}
          onChangeText={setCurrentPassword}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Create a Password"
          value={newPassword}
          onChangeText={setNewPassword}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
        <Button title="Reset Password" onPress={handleResetPassword} style={styles.updateButton} />
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
      paddingHorizontal:   
   20,
      paddingVertical: 10,
      backgroundColor:   
   '#202020',
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
    profileContainer: {
      alignItems: 'center',
      padding: 20,
    },
    profileImage: {
      width: 100,
      height: 100,
      borderRadius: 50,
      marginBottom: 20,
    },
    profileTitle: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    personalInfoContainer: {
      paddingHorizontal: 20,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    input: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 5,
      padding: 10,
      marginBottom: 15,
    },
    updateButton: {
      backgroundColor: 'blue',
      padding: 10,
      borderRadius: 5,
      marginTop: 20,
    },
    resetPasswordContainer: {
      paddingHorizontal: 20,
      marginTop: 20,
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

export default MyAccountScreen;
