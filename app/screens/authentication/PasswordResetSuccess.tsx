import React from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import { Image as RNImage } from 'react-native';

const PasswordResetSuccessScreen = () => {
  const successIconUri = RNImage.resolveAssetSource(require('./../images/success.png')).uri;

  return (
    <View style={styles.container}>
      <Image source={{ uri: successIconUri }} style={styles.successIcon} />
      <Text style={styles.title}>Success!</Text>
      <Text style={styles.message}>You have successfully reset your password.</Text>
      <Button title="Back to Login" onPress={() => navigation.navigate('Login')} style={styles.loginButton} />
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
  successIcon: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  message: {
    textAlign: 'center',
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
});

export default PasswordResetSuccessScreen;