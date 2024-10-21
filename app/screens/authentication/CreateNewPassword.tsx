import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const CreateNewPasswordScreen = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleCreateNewPassword = () => {
    // TODO Handle create new password logic here
    console.log('New Password:', newPassword);
    console.log('Confirm Password:', confirmPassword);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create new password</Text>
      <Text style={styles.subtitle}>Enter a new password to continue.</Text>
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
      <Button title="Login" onPress={handleCreateNewPassword} style={styles.loginButton} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  loginButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
});

export default CreateNewPasswordScreen;
