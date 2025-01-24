import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

export default function HomeScreen() {
  // Static count for now - will be replaced with backend data later
  const pendingApprovalsCount = 10;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Dashboard</Text>
      
      {/* Approvals Box */}
      <View style={styles.approvalBox}>
        <Text style={styles.approvalTitle}>Approvals Pending</Text>
        <Text style={styles.count}>{pendingApprovalsCount}</Text>
      </View>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Filter</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
      </View>

      {/* Stats Box */}
      <View style={styles.statsContainer}>
        
        <ScrollView style={styles.statsBox}>
          <Text style={styles.statsTitle}>Stats</Text>
        </ScrollView>
      </View>

      
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    paddingTop: 40,
    fontSize: 20,
    marginBottom: 16,
    fontWeight: 'bold',
  },
  approvalTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 10,
    
  },
  approvalBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  count: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  statsContainer: {
    marginBottom: 16,
  },
  statsBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    minHeight: 250,
    marginTop: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
  },
  button: {
    padding: 8,
  },
  buttonText: {
    fontWeight: 'bold',
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 10,
    paddingLeft: 10,
    paddingTop: 10,
  },
});


