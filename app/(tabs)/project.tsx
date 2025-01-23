import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';

type Project = {
  project: string;
  total: number;
  status: string;
};

export default function ProjectScreen() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [projects, setProjects] = useState<Project[]>([
    { project: 'LOC ABC', total: 100, status: '20 Land Hoto' },
    { project: 'LOC ABC', total: 101, status: '21 Land Hoto' },
    { project: 'LOC ABC', total: 102, status: '22 Land Hoto' },
    { project: 'LOC ABC', total: 103, status: '23 Land Hoto' },
  ]);
  const [newProject, setNewProject] = useState({
    projectName: '',
    location: '',
    noOfWTGs: '',
    projectId: '',
  });

  const handleSave = () => {
    // Add the new project to the list
    const project = {
      project: newProject.projectName,
      total: Number(newProject.noOfWTGs),
      status: newProject.location,
    };
    setProjects([...projects, project]);
    setIsFormVisible(false); // Return to the project list view
    setNewProject({ projectName: '', location: '', noOfWTGs: '', projectId: '' }); // Reset form
  };

  const renderProjectRow = ({ item }: { item: Project }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.project}</Text>
      <Text style={styles.cell}>{item.total}</Text>
      <Text style={styles.cell}>{item.status}</Text>
      <View style={styles.actions}>
        <TouchableOpacity>
          <Text style={styles.actionText}>View</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.actionText}>Edit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (isFormVisible) {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Add Project</Text>
        <TextInput
          style={styles.input}
          placeholder="Project Name"
          placeholderTextColor="#888"
          value={newProject.projectName}
          onChangeText={(text) =>
            setNewProject({ ...newProject, projectName: text })
          }
        />
        <TextInput
          style={styles.input}
          placeholder="Location"
          placeholderTextColor="#888"
          value={newProject.location}
          onChangeText={(text) =>
            setNewProject({ ...newProject, location: text })
          }
        />
        <TextInput
          style={styles.input}
          placeholder="No. of WTGs"
          placeholderTextColor="#888"
          value={newProject.noOfWTGs}
          keyboardType="numeric"
          onChangeText={(text) =>
            setNewProject({ ...newProject, noOfWTGs: text })
          }
        />
        <TextInput
          style={styles.input}
          placeholder="Project ID"
          placeholderTextColor="#888"
          value={newProject.projectId}
          onChangeText={(text) =>
            setNewProject({ ...newProject, projectId: text })
          }
        />
        <View style={styles.formActions}>
          <TouchableOpacity style={styles.button} onPress={handleSave}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.cancelButton]}
            onPress={() => setIsFormVisible(false)}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Projects</Text>
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setIsFormVisible(true)}>
          <Text style={styles.buttonText}>Add Project</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Add Users</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.tableHeader}>
        <Text style={styles.headerCell}>Project</Text>
        <Text style={styles.headerCell}>Total</Text>
        <Text style={styles.headerCell}>Status</Text>
        <Text style={styles.headerCell}>Action</Text>
      </View>
      <FlatList
        data={projects}
        renderItem={renderProjectRow}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.tableBody}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#000',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 16,
    marginVertical: 90,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#444',
    padding: 10,
    borderRadius: 8,
  },
  cancelButton: {
    backgroundColor: '#800',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#888',
    paddingBottom: 8,
    marginBottom: 8,
  },
  headerCell: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
  },
  tableBody: {
    flexGrow: 1,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  cell: {
    flex: 1,
    fontSize: 16,
    color: '#FFF',
    textAlign: 'center',
    padding: 4,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    flex: 1,
  },
  actionText: {
    color: '#00F',
    fontSize: 16,
    marginHorizontal: 4,
  },
  input: {
    backgroundColor: '#222',
    color: '#FFF',
    padding: 10,
    marginBottom: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#888',
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 16,
  },
});
