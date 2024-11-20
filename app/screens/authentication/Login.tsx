import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'; 

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // Add state for error message
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:3000/auth/login', {
        username: email,
        password: password,
      });

      if (response.status === 200) {
        const { token } = response.data;
        
        await AsyncStorage.setItem('authToken', token); // Ensure token is saved with the correct key

        console.log('Stored token at login --- :', token);
        
        // Fetch user profile
        const profileResponse = await axios.get('http://127.0.0.1:3000/auth/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (profileResponse.status === 200) {
          const { _id, user_type } = profileResponse.data;
          await AsyncStorage.setItem('userId', _id);
          await AsyncStorage.setItem('user_type', user_type); // Ensure user_type is saved with the correct key

          console.log('Stored user profile:', profileResponse.data);
          const storedToken = await AsyncStorage.getItem('authToken');
          const storedUserType = await AsyncStorage.getItem('user_type');
          console.log('Stored token:', storedToken);
          console.log('Stored user type:', storedUserType);

          // Navigate based on user type
          if (user_type === 'admin') {
            navigation.navigate('screens/admin/AdminHome');
          } else {
            navigation.navigate('screens/user/UserHome');
          }
        } else {
          Alert.alert('Profile Fetch Failed', 'Unable to fetch user profile.');
        }
      } else {
        Alert.alert('Login Failed', 'Invalid email or password.');
      }
    } catch (error) {
      console.error('Login error:', error);
      if (error.response && error.response.status === 401) {
        Alert.alert('Login Error', 'Username & password mismatch'); // Specific message for 401 status
      } else {
        Alert.alert('Login Error', 'An error occurred. Please try again.'); // General error message
      }
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
      <View style={styles.loginButtonContainer}>
        <Button title="Login" onPress={handleLogin} />
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('screens/authentication/Register')}>
        <Text style={styles.registerText}>Don't have an account? Register</Text>
      </TouchableOpacity>
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
  errorText: {
    color: 'red',
    marginBottom: 15,
  },
  loginButtonContainer: {
    width: '100%',
    marginBottom: 15,
  },
});

export default LoginScreen;
