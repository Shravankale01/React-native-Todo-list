import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

export interface Task {
  id: string;
  title: string;
  completed: boolean;
}

interface TaskItemProps {
  task: Task;
  onToggle: (taskId: string) => void;
  onDelete: (taskId: string) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onToggle,
  onDelete,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.touchable}
        onPress={() => onToggle(task.id)}
        activeOpacity={0.7}
      >
        <View style={styles.checkboxContainer}>
          {task.completed ? (
            <View style={styles.checkboxChecked}>
              <Ionicons name="checkmark" size={16} color="#fff" />
            </View>
          ) : (
            <View style={styles.checkboxUnchecked} />
          )}
        </View>
        <Text
          style={[
            styles.taskTitle,
            task.completed && styles.completedText,
          ]}
        >
          {task.title}
        </Text>
      </TouchableOpacity>

      <View style={[
        styles.statusBadge,
        task.completed ? styles.completedBadge : styles.pendingBadge
      ]}>
        <Text style={[
          styles.statusText,
          task.completed ? styles.completedText : styles.pendingText
        ]}>
          {task.completed ? 'Completed' : 'Pending'}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => onDelete(task.id)}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        <Ionicons name="trash-outline" size={20} color="#FF6B6B" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginVertical: 6,
    marginHorizontal: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  touchable: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxContainer: {
    marginRight: 12,
  },
  checkboxUnchecked: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#4ECDC4',
  },
  checkboxChecked: {
    width: 24,
    height: 24,
    borderRadius: 6,
    backgroundColor: '#4ECDC4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    flex: 1,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  deleteButton: {
    padding: 8,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pendingBadge: {
    backgroundColor: '#FFF3CD',
  },
  completedBadge: {
    backgroundColor: '#D4EDDA',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  pendingText: {
    color: '#856404',
  },
  completedStatusText: {
    color: '#155724',
  },
});
