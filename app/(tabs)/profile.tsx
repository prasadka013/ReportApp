import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { router } from 'expo-router';

export default function ProfileScreen() {
  const handleLogout = () => {
    // Add any logout logic here (clear tokens, user data, etc.)
    router.replace('/login');
  };

  return (
    <View style={styles.container}>
      {/* Profile Heading */}
      <Text style={styles.heading}>Profile</Text>

      {/* Input Fields */}
      <TextInput style={styles.input} placeholder="Name" placeholderTextColor="#888" />
      <TextInput style={styles.input} placeholder="Designation" placeholderTextColor="#888" />
      <TextInput style={styles.input} placeholder="Department" placeholderTextColor="#888" />
      <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#888" />
      <TextInput style={styles.input} placeholder="Mobile" placeholderTextColor="#888" />

      {/* Logout Button */}
      <TouchableOpacity 
        style={styles.logoutButton}
        onPress={handleLogout}
      >
        <Text style={styles.logoutButtonText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#000', // Keeping original dark background
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 30, // Reduced from 60
    marginTop: 20,    // Added instead of marginVertical: 180
  },
  input: {
    borderWidth: 1,
    borderColor: '#888',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
    color: '#FFF',
    backgroundColor: '#222',
  },
  // New styles for logout button
  logoutButton: {
    backgroundColor: '#222', // Matching your input field background
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,    // Changed from 'auto' to give specific spacing
    marginBottom: 20, // Added to ensure button isn't at the very bottom
    borderWidth: 1,
    borderColor: '#888', // Matching your input field border
  },
  logoutButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
