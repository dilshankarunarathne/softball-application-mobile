import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Button, ScrollView, TouchableOpacity } from 'react-native';
import { Image as RNImage } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NewsScreen = () => {
  const [news, setNews] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        const response = await axios.get('http://localhost:3000/news', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const newsData = response.data.map(item => ({
          ...item,
          image: item.image ? `http://localhost:3000${item.image}` : null
        }));
        setNews(newsData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchNews();
  }, []);

  const homeUri = RNImage.resolveAssetSource(require('./../images/home.png')).uri;
  const matchesUri = RNImage.resolveAssetSource(require('./../images/matches.png')).uri;
  const rankingsUri = RNImage.resolveAssetSource(require('./../images/rankings.png')).uri;
  const accountUri = RNImage.resolveAssetSource(require('./../images/account.png')).uri;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>NEWS</Text>
      </View>
      <ScrollView>
        {news.map((item) => (
          <View key={item._id} style={styles.newsItem}>
            {item.image && <Image source={{ uri: item.image }} style={styles.newsImage} />}
            <Text style={styles.newsTitle}>{item.description}</Text>
            <Text style={styles.newsDate}>{new Date(item.created_time).toLocaleString()}</Text>
            <Button title="See more" style={styles.seeMoreButton} />
          </View>
        ))}
      </ScrollView>
      <View style={styles.navigation}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Image source={{ uri: homeUri }} style={styles.navIcon} />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Matches')}>
          <Image source={{ uri: matchesUri }} style={styles.navIcon} />
          <Text style={styles.navText}>Matches</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Rankings')}>
          <Image source={{ uri: rankingsUri }} style={styles.navIcon} />
          <Text style={styles.navText}>Rankings</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Account')}>
          <Image source={{ uri: accountUri }} style={styles.navIcon} />
          <Text style={styles.navText}>Account</Text>
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
  newsItem: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  newsImage: {
    width: '100%',
    height: 200,
    marginBottom: 10,
  },
  newsTitle: {
    fontSize: 18,
    marginBottom: 5,
  },
  newsDate: {
    fontSize: 14,
    color: 'gray',
  },
  seeMoreButton: {
    backgroundColor: 'blue',
    padding: 5,
    borderRadius: 5,
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

export default NewsScreen;
