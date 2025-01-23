import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Task Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#000', // Optional: Set a dark background for better contrast
    },
    text: {
      fontSize: 20,
      color: '#FFF', // Set the text color to white
    },
  });
