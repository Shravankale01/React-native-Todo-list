import AsyncStorage from '@react-native-async-storage/async-storage';
import { Task } from '@/components/TaskItem';

const TASKS_KEY = '@tasks_storage';

export const taskStorage = {
  async getTasks(): Promise<Task[]> {
    try {
      const data = await AsyncStorage.getItem(TASKS_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error reading tasks:', error);
      return [];
    }
  },

  async saveTasks(tasks: Task[]): Promise<void> {
    try {
      await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.error('Error saving tasks:', error);
    }
  },

  async clearTasks(): Promise<void> {
    try {
      await AsyncStorage.removeItem(TASKS_KEY);
    } catch (error) {
      console.error('Error clearing tasks:', error);
    }
  },
};
