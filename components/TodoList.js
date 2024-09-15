import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, FlatList, Button } from 'react-native';
import TodoItem from './TodoItem';

const TodoList = () => {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Doctor Appointment', completed: false },
    { id: 2, text: 'Meeting at School', completed: false },
    { id: 3, text: 'Buy Groceries', completed: true },
    { id: 4, text: 'Gym Workout', completed: false },
    { id: 5, text: 'Complete React Native Assignment', completed: false },
    { id: 6, text: 'Read New Book Chapter', completed: false },
    { id: 7, text: 'Clean the House', completed: false },
    { id: 8, text: 'Reply to Emails', completed: true },
  ]);

  const [text, setText] = useState('');
  const [filter, setFilter] = useState('all'); // 'all', 'completed', 'incomplete'

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'incomplete') return !task.completed;
    return true; // 'all'
  });

  const addTask = () => {
    if (text.trim()) {
      setTasks([...tasks, { id: Date.now().toString(), text, completed: false }]);
      setText('');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.filters}>
        <TouchableOpacity style={styles.filterButton} onPress={() => setFilter('all')}>
          <Text style={styles.filterButtonText}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton} onPress={() => setFilter('completed')}>
          <Text style={styles.filterButtonText}>Completed</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton} onPress={() => setFilter('incomplete')}>
          <Text style={styles.filterButtonText}>Incomplete</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredTasks}
        renderItem={({ item }) => (
          <TodoItem task={item} />
        )}
        keyExtractor={item => item.id}
      />
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={setText}
        placeholder="New Task"
      />
      <TouchableOpacity onPress={addTask} style={styles.addButton}>
        <Text style={styles.addButtonText}>Add Task</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  filters: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  filterButton: {
    backgroundColor: '#007BFF', // Blue color for buttons
    padding: 10,
    borderRadius: 4,
  },
  filterButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
  input: {
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
    marginBottom: 8,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 4,
  },
  addButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default TodoList;
