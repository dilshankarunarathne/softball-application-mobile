import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const VerifyAccountScreen = () => {
  const [verificationCode, setVerificationCode] = useState('');

  const handleVerifyAccount = () => {
    // TODO Handle verify account logic here
    console.log('Verification Code:', verificationCode);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify Your Account</Text>
      <Text style={styles.subtitle}>We sent a code to abc@gmail.com</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter code"
        value={verificationCode}
        onChangeText={setVerificationCode}
        keyboardType="numeric"
      />
      <Button title="Continue" onPress={handleVerifyAccount} style={styles.loginButton} />
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

export default VerifyAccountScreen;
