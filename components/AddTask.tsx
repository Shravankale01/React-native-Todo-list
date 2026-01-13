import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface AddTaskProps {
  onAddTask: (title: string) => void;
}

export const AddTask: React.FC<AddTaskProps> = ({ onAddTask }) => {
  const [taskTitle, setTaskTitle] = useState('');

  const handleAdd = () => {
    if (taskTitle.trim().length === 0) {
      alert('Please enter a task title');
      return;
    }
    onAddTask(taskTitle);
    setTaskTitle('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Add a new task..."
        placeholderTextColor="#999"
        value={taskTitle}
        onChangeText={setTaskTitle}
        onSubmitEditing={handleAdd}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleAdd}
        activeOpacity={0.8}
      >
        <Ionicons name="add" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: 12,
    marginVertical: 16,
    marginTop: 20,
    alignItems: 'center',
    gap: 8,
  },
  input: {
    flex: 1,
    height: 48,
    borderWidth: 2,
    borderColor: '#4ECDC4',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#fff',
  },
  button: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: '#4ECDC4',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
});
