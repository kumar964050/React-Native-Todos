import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';

// packages
import uuid from 'react-native-uuid';

// types
import {Task} from './src/types';

// components
import EachTask from './src/components/Task';
import Button from './src/components/Button';
import {getData, storeData} from './src/utils/storage';

// Todo
// do sorting new ones add one top
// completed ones are should go to bottom
// add error msg (add only unq tasks)
// increase the size of dlt btn

const App: React.FC = () => {
  const [newTaskText, setNewTaskText] = useState<string>('');
  const [tasks, setTasks] = useState<Task[]>([]);

  // add new task
  const handleAddNew = async () => {
    const newTask: Task = {
      id: uuid.v4(),
      task: newTaskText,
      isCompleted: false,
    };
    setNewTaskText('');
    const data = [...tasks, newTask];
    await storeData('todos', data);
    setTasks(data);
  };
  // remove task from list
  const handleDelete = async (id: string) => {
    const data = tasks.filter(task => task.id !== id);
    await storeData('todos', data);
    setTasks(data);
  };

  // change task status
  const handleChangeStatus = async (id: string) => {
    const data = tasks.map(task => {
      if (task.id === id) {
        return {...task, isCompleted: !task.isCompleted};
      }
      return task;
    });

    await storeData('todos', data);
    setTasks(data);
  };

  // retrieve tasks from local device
  useEffect(() => {
    (async () => {
      // await storeData('todos', tasks);
      const data = await getData('todos');
      console.log(data);
      if (data === null) {
        setTasks([]);
      } else {
        setTasks(data);
      }
    })();
  }, []);

  const isBtnDisabled = newTaskText.trim().length === 0;

  return (
    <View style={styles.main_container}>
      {/* main title */}
      <Text style={styles.main_title}>Todos</Text>

      {/* todo input container  */}
      <View style={styles.input_container}>
        <Text style={styles.input_title}>
          Create<Text style={styles.input_sub_title}>Task</Text>
        </Text>
        <TextInput
          value={newTaskText}
          onChangeText={setNewTaskText}
          style={styles.text_input}
          placeholder="Whats need to be done?."
        />
        <Button
          disabled={isBtnDisabled}
          title="Add"
          handleClick={handleAddNew}
          isPrimary={true}
        />
      </View>

      {/* list of tasks  */}
      <Text style={styles.sub_title}>
        My<Text style={styles.input_sub_title}> Tasks</Text>
      </Text>
      {/* no tasks  */}
      {tasks.length === 0 && (
        <View style={styles.no_task_found}>
          <Text style={styles.zero_task}>No Tasks found</Text>
        </View>
      )}
      <ScrollView style={styles.list_tasks_container}>
        {tasks.map((task, index) => (
          <EachTask
            key={index}
            task={task}
            handleChangeStatus={handleChangeStatus}
            handleDelete={handleDelete}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  main_container: {flex: 1, backgroundColor: '#F9FBFE', padding: 10},
  main_title: {
    fontSize: 28,
    fontWeight: '600',
    textAlign: 'center',
    marginBlock: 30,
  },
  // input container
  input_container: {gap: 5, marginBlock: 10},
  input_title: {fontSize: 18, fontWeight: 600},
  input_sub_title: {fontWeight: 400},
  text_input: {
    height: 46,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#E4E7EB',
  },
  sub_title: {fontSize: 18, fontWeight: 600, marginBlock: 10},
  list_tasks_container: {paddingBottom: 30},
  no_task_found: {
    flex: 3,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  zero_task: {
    color: '#282828',
    fontSize: 14,
    fontWeight: 600,
  },
});

export default App;
