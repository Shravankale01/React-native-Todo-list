import React, { useState, useEffect, useCallback } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  StatusBar,
  Platform,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import { Task } from '@/components/TaskItem';
import { TaskList } from '@/components/TaskList';
import { AddTask } from '@/components/AddTask';
import { taskStorage } from '@/utils/taskStorage';

export default function HomeScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load tasks from AsyncStorage on app start
  useEffect(() => {
    loadTasks();
  }, []);

  // Reload tasks when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      loadTasks();
    }, [])
  );

  const loadTasks = async () => {
    setIsLoading(true);
    const storedTasks = await taskStorage.getTasks();
    setTasks(storedTasks);
    setIsLoading(false);
  };

  const handleAddTask = async (title: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title: title.trim(),
      completed: false,
    };

    const updatedTasks = [newTask, ...tasks];
    setTasks(updatedTasks);
    await taskStorage.saveTasks(updatedTasks);
  };

  const handleToggleTask = async (taskId: string) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    await taskStorage.saveTasks(updatedTasks);
  };

  const handleDeleteTask = async (taskId: string) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    await taskStorage.saveTasks(updatedTasks);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#fff"
        translucent={false}
      />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Task Manager</Text>
        <Text style={styles.headerSubtitle}>Keep track of your daily tasks</Text>
      </View>

      <AddTask onAddTask={handleAddTask} />

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading tasks...</Text>
        </View>
      ) : (
        <TaskList
          tasks={tasks}
          onToggleTask={handleToggleTask}
          onDeleteTask={handleDeleteTask}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#999',
  },
});
