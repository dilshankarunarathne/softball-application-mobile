import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:3000/auth/login', {
        username: email,
        password: password,
      });

      if (response.status === 200) {
        const { token } = response.data;
        // Save the token (e.g., in AsyncStorage or Context)
        console.log('Token:', token);
        Alert.alert('Login Successful', 'You have successfully logged in.');
      } else {
        Alert.alert('Login Failed', 'Invalid email or password.');
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Login Failed', 'An error occurred. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>WELCOME</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Text style={styles.forgotPassword}>Forgot password?</Text>
      <Button title="Login" onPress={handleLogin} style={styles.loginButton} />
      <Text style={styles.registerText}>Don't have an account? Register</Text>
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
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    width: '100%',
  },
  forgotPassword: {
    marginBottom: 15,
    color: 'blue',
    textDecorationLine: 'underline',
  },
  loginButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  registerText: {
    marginTop: 15,
    color: 'gray',
  },
});

export default LoginScreen;
