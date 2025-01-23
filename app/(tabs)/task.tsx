import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Task Screen</Text>
      <TextInput style={styles.input} placeholder="Task Name" placeholderTextColor="#888" />
      <TextInput style={styles.input} placeholder="Task Description" placeholderTextColor="#888" />
      <TextInput style={styles.input} placeholder="Task Status" placeholderTextColor="#888" />
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
    input: {
      width: '80%',
      padding: 10,
      margin: 10,
      backgroundColor: '#FFF',
      borderRadius: 5,
    },
  });
