import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CheckBox from '@react-native-community/checkbox';
import Icon from '@react-native-vector-icons/material-icons';
import {TaskProps} from '../types';

const Task = ({task, handleChangeStatus, handleDelete}: TaskProps) => {
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
          size={24}
          color={'#E96364'}
          onPress={() => handleDelete(task.id)}
        />
      </View>
    </Pressable>
  );
};

export default Task;

const styles = StyleSheet.create({
  task_container: {
    backgroundColor: '#E6F6FF',
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
  is_completed_task: {textDecorationLine: 'line-through'},
  delete_icon: {marginLeft: 'auto'},
});
