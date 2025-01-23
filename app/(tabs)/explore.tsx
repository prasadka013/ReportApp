import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  Text,
  Platform,
  Alert,
  TouchableOpacity,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as XLSX from 'xlsx';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

export default function TabTwoScreen() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [isSelectingStart, setIsSelectingStart] = useState(true);

  // Format date to display
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  // Get date range string
  const getDateRangeString = () => {
    return `${formatDate(startDate)} - ${formatDate(endDate)}`;
  };

  // Handle date change
  const onDateChange = (event: any, selectedDate?: Date) => {
    if (selectedDate) {
      if (isSelectingStart) {
        setStartDate(selectedDate);
        setIsSelectingStart(false);
      } else {
        if (selectedDate >= startDate) {
          setEndDate(selectedDate);
          setShowPicker(false);
          setIsSelectingStart(true);
        } else {
          Alert.alert('Invalid Date', 'End date must be after start date');
        }
      }
    } else {
      setShowPicker(false);
      setIsSelectingStart(true);
    }
  };

  // Dummy data for export
  const dummyData = [
    {
      WTG: "1",
      Location: "New York",
      Delivered: "Yes",
      Status: "Completed"
    },
    {
      WTG: "2",
      Location: "Los Angeles",
      Delivered: "No",
      Status: "Pending"
    },
    {
      WTG: "3",
      Location: "Chicago",
      Delivered: "Yes",
      Status: "Completed"
    }
  ];

  const handleExportReport = async () => {
    try {
      // Create worksheet
      const ws = XLSX.utils.json_to_sheet(dummyData);
      
      // Create workbook
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Report");
      
      // Generate Excel file
      const wbout = XLSX.write(wb, {
        type: 'base64',
        bookType: 'xlsx'
      });
      
      // Define file name
      const fileName = `Report_${new Date().getTime()}.xlsx`;
      
      if (Platform.OS === 'ios' || Platform.OS === 'android') {
        // Mobile platform
        const fileUri = FileSystem.documentDirectory + fileName;
        await FileSystem.writeAsStringAsync(fileUri, wbout, {
          encoding: FileSystem.EncodingType.Base64
        });
        
        await Sharing.shareAsync(fileUri, {
          mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          dialogTitle: 'Export Report',
          UTI: 'com.microsoft.excel.xlsx'
        });
      }
    } catch (error) {
      console.error('Error exporting file:', error);
      Alert.alert('Error', 'Failed to export report. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Generate Report</Text>
      
      <View style={styles.formContainer}>
        <Text style={styles.label}>Date Range</Text>
        <TouchableOpacity 
          onPress={() => {
            setIsSelectingStart(true);
            setShowPicker(true);
          }}
          style={styles.input}
        >
          <Text>{getDateRangeString()}</Text>
        </TouchableOpacity>

        {showPicker && (
          <View style={styles.datePickerContainer}>
            <Text style={styles.datePickerHeader}>
              Select {isSelectingStart ? 'Start' : 'End'} Date
            </Text>
            <DateTimePicker
              value={isSelectingStart ? startDate : endDate}
              mode="date"
              display="inline"
              onChange={onDateChange}
              minimumDate={isSelectingStart ? undefined : startDate}
              themeVariant="dark"
              textColor="#FFFFFF"
              accentColor="#075eec"
              style={styles.datePicker}
            />
          </View>
        )}

        <Text style={styles.label}>Project</Text>
        <TextInput style={styles.input} placeholder="All" editable={true} />

        <Text style={styles.label}>HOTO</Text>
        <TextInput style={styles.input} placeholder="All" editable={true} />

        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderText}>WTG</Text>
            <Text style={styles.tableHeaderText}>Location</Text>
            <Text style={styles.tableHeaderText}>Delivered</Text>
            <Text style={styles.tableHeaderText}>Status</Text>
          </View>
          {dummyData.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableCell}>{item.WTG}</Text>
              <Text style={styles.tableCell}>{item.Location}</Text>
              <Text style={styles.tableCell}>{item.Delivered}</Text>
              <Text style={styles.tableCell}>{item.Status}</Text>
            </View>
          ))}
        </View>

        <Button title="Export Report" onPress={handleExportReport} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  formContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 8,
    marginTop: 5,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  table: {
    marginVertical: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 5,
  },
  tableHeaderText: {
    fontWeight: 'bold',
    fontSize: 14,
    flex: 1,
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingVertical: 5,
  },
  tableCell: {
    fontSize: 14,
    flex: 1,
    textAlign: 'center',
  },
  datePickerContainer: {
    backgroundColor: '#222',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
  },
  datePickerHeader: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 15,
  },
  datePicker: {
    backgroundColor: '#222',
    height: 'auto',
  },
});