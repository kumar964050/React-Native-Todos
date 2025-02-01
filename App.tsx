import React, {useState} from 'react';

import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
//
import uuid from 'react-native-uuid';
import CheckBox from '@react-native-community/checkbox';
// icons
import Icon from '@react-native-vector-icons/material-icons';

const colors = {
  task_bg: '#E6F6FF',
};

interface Task {
  id: string;
  task: string;
  isCompleted: boolean;
}

const Task: React.FC = ({task, handleChangeStatus, handleDelete}) => {
  const handleChange = () => {
    handleChangeStatus(task.id);
  };
  return (
    <Pressable
      style={styles.task_container}
      onPress={() => handleChangeStatus(task.id)}>
      <View style={styles.task_content_container}>
        {/* <Icon name="delete" size={20} /> */}
        <CheckBox
          tintColors={{true: '#4C63B6', false: 'gray'}}
          value={task.isCompleted}
          onValueChange={handleChange}
        />
        <Text style={task.isCompleted ? styles.is_completed_task : styles.task}>
          {task.task}
        </Text>
        <Icon
          style={styles.delete_icon}
          name="delete"
          size={20}
          color={'red'}
          onPress={() => handleDelete(task.id)}
        />
      </View>
    </Pressable>
  );
};

const App: React.FC = () => {
  const [newTaskText, setNewTaskText] = useState<string>('');
  const [tasks, setTasks] = useState<Task[]>([
    {id: '1', task: 'Buy groceries', isCompleted: false},
    {id: '2', task: 'Complete React project', isCompleted: true},
    {id: '3', task: 'Go for a run', isCompleted: false},
    {id: '4', task: 'Read a book', isCompleted: true},
    {id: '5', task: 'Call mom', isCompleted: false},
    {id: '6', task: 'Water the plants', isCompleted: true},
    {id: '7', task: 'Finish TypeScript tutorial', isCompleted: false},
    {id: '8', task: 'Prepare dinner', isCompleted: true},
  ]);

  // add new task
  const handleAddNew = () => {
    const newTask: Task = {
      id: uuid.v4(),
      task: newTaskText,
      isCompleted: false,
    };
    setNewTaskText('');
    setTasks(prevValues => [...prevValues, newTask]);
  };
  // remove task from list
  const handleDelete = (id: string) => {
    setTasks(prevValue => prevValue.filter(task => task.id !== id));
  };

  // change task status
  const handleChangeStatus = (id: string) => {
    setTasks(prevValue =>
      prevValue.map(task => {
        if (task.id === id) {
          return {...task, isCompleted: !task.isCompleted};
        }
        return task;
      }),
    );
  };

  return (
    <View style={styles.main_container}>
      <Text style={styles.main_title}>Todos</Text>

      {/* todo input container  */}
      <Text style={styles.input_title}>
        Create<Text style={styles.input_sub_title}>Task</Text>
      </Text>
      <View style={styles.input_container}>
        <TextInput
          value={newTaskText}
          onChangeText={setNewTaskText}
          style={styles.text_input}
          placeholder="Whats need to be done?."
        />
        <Pressable
          style={styles.primary_btn}
          android_ripple={{color: '#5a7be8'}}
          onPress={handleAddNew}>
          <Text style={styles.primary_btn_text}>Add</Text>
        </Pressable>
      </View>

      {/* list of tasks  */}
      <Text style={{...styles.input_title, marginBlock: 10}}>
        My<Text style={styles.input_sub_title}> Tasks</Text>
      </Text>
      <ScrollView style={styles.list_tasks_container}>
        {/* <CheckBox /> */}
        {tasks.map((task, index) => (
          <Task
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
  input_container: {gap: 5, marginBlock: 20},
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

  list_tasks_container: {
    // paddingBlock: 10,
  },
  task_container: {
    backgroundColor: colors.task_bg,
    padding: 15,
    marginBlock: 3,
    borderColor: '#096F92',
    borderLeftWidth: 5,
    borderRadius: 6,
  },
  task_content_container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  task: {},
  is_completed_task: {
    textDecorationLine: 'line-through',
  },
  delete_icon: {
    marginLeft: 'auto',
  },
  // ui styles

  primary_btn: {
    backgroundColor: '#4C63B6',
    alignSelf: 'flex-end',
    paddingBlock: 12,
    paddingInline: 26,
    borderRadius: 10,
  },
  primary_btn_text: {color: '#fff'},
});

export default App;

// import Icon from '@react-native-vector-icons/fontawesome6';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {getData,storeData} from './src/utils/storage'
// concepts
// input type checkbox, icons, scrollable
// persistence async storage

// // Retrieve Data from storage
// useEffect(() => {
//   // (async () => {
//   //   const data = await getData('todo');
//   //   setTasks(data === null ? [] : data);
//   // })();
// }, []);

// // save data in device
// useEffect(() => {
//   // (async () => {
//   //   if (tasks.length === 0) return;
//   //   await storeData('todos', tasks);
//   //   const x = await getData('todos');
//   // })();
// }, [tasks]);

// const storeData = async (key: string, value: any) => {
//   try {
//     const data = await JSON.stringify(value);
//     await AsyncStorage.setItem(key, data);
//   } catch (e) {
//     // saving error
//   }
// };
// const getData = async (key: string) => {
//   try {
//     const data = await AsyncStorage.getItem(key);
//     return data == null ? null : JSON.parse(data);
//   } catch (e) {
//     // error reading value
//   }
// };
