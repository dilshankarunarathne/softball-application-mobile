import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native';

const EditPlayerScreen = ({ route }) => {
  const { playerId } = route.params;

  const [player, setPlayer] = useState({
    id: '',
    name: '',
    dateOfBirth: new Date(),
    email: '',
    phoneNumber: '',
    team: '',
    battingStyle: '',
    bowlingStyle: '',
  });

  useEffect(() => {
    // Fetch player data from your backend API
    const fetchPlayer = async () => {
      try {
        const response = await fetch(`your_api_endpoint/${playerId}`);
        const data = await response.json();
        setPlayer(data);
      } catch (error) {
        console.error('Error fetching player:', error);
      }
    };

    fetchPlayer();
  }, [playerId]);

  const handleUpdatePlayer = () => {
    // Implement logic to update the player's information on the backend
    console.log('Updated player:', player);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Player</Text>

      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={player.name.split(' ')[0]}
        onChangeText={(firstName) => setPlayer({ ...player, name: `${firstName} ${player.name.split(' ')[1]}` })}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={player.name.split(' ')[1]}
        onChangeText={(lastName) => setPlayer({ ...player, name: `${player.name.split(' ')[0]} ${lastName}` })}
      />
      {/* ... other input fields for date of birth, email, phone number, team, batting style, bowling style */}

      <Button title="Save Changes" onPress={handleUpdatePlayer} />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    input: {
      height: 40,
      borderColor: 'gray',
      borderWidth:   
   1,
      borderRadius: 5,
      padding: 10,
      marginBottom:   
   15,
    },
    saveButton: {
      backgroundColor: 'blue',
      padding: 10,
      borderRadius: 5,
    },
});

export default EditPlayerScreen;
