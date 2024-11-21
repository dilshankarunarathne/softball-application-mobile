import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, SectionList, TouchableOpacity, Button, TextInput, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AdminMatchesScreen = () => {
  const navigation = useNavigation();
  const [matches, setMatches] = useState({ live: [], upcoming: [], past: [] });
  const [teams, setTeams] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    team1: '',
    team2: '',
    date: new Date(),
    start_time: new Date(),
    end_time: new Date(),
    location: ''
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await fetch('http://localhost:3000/matches');
        const data = await response.json();
        const live = data.filter(match => match.status === 'live');
        const upcoming = data.filter(match => match.status === 'pending');
        const past = data.filter(match => match.status === 'ended');
        setMatches({ live, upcoming, past });
      } catch (error) {
        console.error('Error fetching matches:', error);
      }
    };

    const fetchTeams = async () => {
      try {
        const response = await fetch('http://localhost:3000/teams');
        const data = await response.json();
        const teamsMap = data.reduce((acc, team) => {
          acc[team._id] = team.name;
          return acc;
        }, {});
        setTeams(teamsMap);
      } catch (error) {
        console.error('Error fetching teams:', error);
      }
    };

    fetchMatches();
    fetchTeams();
  }, []);

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    const token = await AsyncStorage.getItem('authToken');
    const form = new FormData();
    Object.keys(formData).forEach(key => {
      form.append(key, formData[key].toString());
    });

    console.log('formdata: ', formData);

    try {
      const response = await fetch('http://localhost:3000/matches', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: form
      });

      console.log('response: ', response);

      if (response.ok) {
        alert('Match created successfully');
        setShowForm(false);
        // Refresh matches
        fetchMatches();
      } else {
        alert('Error creating match');
      }
    } catch (error) {
      console.error('Error creating match:', error);
    }
  };

  const renderMatchItem = ({ item }) => (
    <View style={styles.matchItem}>
      <Text style={styles.tournamentName}>{item.tournamentName}</Text>
      <Text style={styles.matchDate}>{new Date(item.date).toLocaleDateString()}</Text>
      <View style={styles.teamContainer}>
        <View style={styles.teamInfo}>
          <Image source={require('./../images/team1logo.png')} style={styles.teamLogo} />
          <Text style={styles.teamName}>{teams[item.team1]}</Text>
        </View>
        <Text style={styles.vsText}>VS</Text>
        <View style={styles.teamInfo}>
          <Image source={require('./../images/team2logo.png')} style={styles.teamLogo} />
          <Text style={styles.teamName}>{teams[item.team2]}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.updateButton} onPress={() => navigation.navigate('screens/admin/UpdateMatch', { matchId: item._id })}>
        <Text style={styles.updateButtonText}>Update</Text>
      </TouchableOpacity>
    </View>
  );

  const sections = [
    { title: `Live Matches (${matches.live.length})`, data: matches.live },
    { title: `Upcoming Matches (${matches.upcoming.length})`, data: matches.upcoming },
    { title: `Past Matches (${matches.past.length})`, data: matches.past },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>SLSCMA</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity onPress={() => navigation.navigate('screens/user/Notifications')} style={styles.iconButton}>
            <Image source={require('./../images/notification.png')} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('screens/user/News')} style={styles.iconButton}>
            <Image source={require('./../images/document.png')} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
      <Button title="Create New Match" onPress={() => setShowForm(true)} />
      {showForm && (
        <ScrollView style={styles.form}>
          <Picker
            selectedValue={formData.team1}
            onValueChange={(itemValue) => handleInputChange('team1', itemValue)}
          >
            {Object.keys(teams).map(teamId => (
              <Picker.Item key={teamId} label={teams[teamId]} value={teamId} />
            ))}
          </Picker>
          <Picker
            selectedValue={formData.team2}
            onValueChange={(itemValue) => handleInputChange('team2', itemValue)}
          >
            {Object.keys(teams).map(teamId => (
              <Picker.Item key={teamId} label={teams[teamId]} value={teamId} />
            ))}
          </Picker>
          <TouchableOpacity onPress={() => setShowDatePicker(true)}>
            <Text style={styles.dateText}>{formData.date.toDateString()}</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={formData.date}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                setShowDatePicker(false);
                handleInputChange('date', selectedDate || formData.date);
              }}
            />
          )}
          <TouchableOpacity onPress={() => setShowStartTimePicker(true)}>
            <Text style={styles.dateText}>{formData.start_time.toLocaleTimeString()}</Text>
          </TouchableOpacity>
          {showStartTimePicker && (
            <DateTimePicker
              value={formData.start_time}
              mode="time"
              display="default"
              onChange={(event, selectedTime) => {
                setShowStartTimePicker(false);
                handleInputChange('start_time', selectedTime || formData.start_time);
              }}
            />
          )}
          <TouchableOpacity onPress={() => setShowEndTimePicker(true)}>
            <Text style={styles.dateText}>{formData.end_time.toLocaleTimeString()}</Text>
          </TouchableOpacity>
          {showEndTimePicker && (
            <DateTimePicker
              value={formData.end_time}
              mode="time"
              display="default"
              onChange={(event, selectedTime) => {
                setShowEndTimePicker(false);
                handleInputChange('end_time', selectedTime || formData.end_time);
              }}
            />
          )}
          <TextInput
            placeholder="Location"
            value={formData.location}
            onChangeText={(text) => handleInputChange('location', text)}
            style={styles.input}
          />
          <Button title="Submit" onPress={handleSubmit} />
        </ScrollView>
      )}
      <SectionList
        sections={sections}
        renderItem={renderMatchItem}
        renderSectionHeader={({ section: { title } }) => (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{title}</Text>
          </View>
        )}
        keyExtractor={(item) => item._id.toString()}
      />
      <View style={styles.scheduleMatchButton}>
        <Button title="Schedule a Match" onPress={() => navigation.navigate('screens/admin/ScheduleMatch')} />
      </View>
      <View style={styles.navigation}>
        <TouchableOpacity onPress={() => navigation.navigate('screens/admin/AdminHome')}>
          <Image source={require('./../images/home.png')} style={styles.navIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('screens/admin/AdminMatches')}>
          <Image source={require('./../images/matches.png')} style={styles.navIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('screens/admin/AdminRankings')}>
          <Image source={require('./../images/rankings.png')} style={styles.navIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('screens/admin/AdminUsers')}>
          <Image source={require('./../images/admin.png')} style={styles.navIcon} />
        </TouchableOpacity>
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
  section: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  matchItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
  },
  tournamentName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  matchDate: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 10,
  },
  teamContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  teamInfo: {
    alignItems: 'center',
  },
  teamLogo: {
    width: 40,
    height: 40,
    marginBottom: 5,
  },
  teamName: {
    fontSize: 14,
  },
  vsText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  updateButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'center',
    width: '50%',
  },
  updateButtonText: {
    color: 'white',
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#e0e0e0',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  navIcon: {
    width: 24,
    height: 24,
    alignSelf: 'center',
  },
  navText: {
    fontSize: 16,
    marginTop: 5,
  },
  scheduleMatchButton: {
    padding: 10,
    alignItems: 'center',
  },
  iconButton: {
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    padding: 5,
    marginHorizontal: 5,
  },
  form: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 20,
    marginBottom: 150, 
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  dateText: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginVertical: 5,
    textAlign: 'center',
  },
});

export default AdminMatchesScreen;
