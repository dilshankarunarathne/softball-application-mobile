import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const NewsScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>NEWS</Text>
      </View>
      <View style={styles.newsItem}>
        <Image source={require('./newsImage.png')} style={styles.newsImage} />
        <Text style={styles.newsTitle}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud</Text>
        <Text style={styles.newsDate}>15 minutes ago</Text>
      </View>
      <View style={styles.newsItem}>
        <Image source={require('./newsImage2.png')} style={styles.newsImage} />
        <Text style={styles.newsTitle}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud</Text>
        <Text style={styles.newsDate}>1 day ago</Text>
        <Button title="See more" style={styles.seeMoreButton} />
      </View>
      <View style={styles.newsItem}>
        <Image source={require('./newsImage3.png')} style={styles.newsImage} />
        <Text style={styles.newsTitle}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud</Text>
        <Text style={styles.newsDate}>1 day ago</Text>
        <Button title="See more" style={styles.seeMoreButton} />
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
  // ... styles for each element
});

export default NewsScreen;
