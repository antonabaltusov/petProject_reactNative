import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {Checkbox} from '../Checkbox/Checkbox';
import {DeleteButton} from '../DeleteButton/DeleteButton';
import {styles} from './TodoItem.styles';
import {TodoItemProps} from './TodoItem.types';

export const TodoItem = ({i, todo, onComplete, removeTodo}: TodoItemProps) => {
  const handlePress = () => {
    onComplete(todo.id);
  };
  const onDelete = () => {
    removeTodo(todo.id);
  };
  return (
    <TouchableOpacity onPress={handlePress} style={styles.root}>
      <>
        <Checkbox checked={todo.completed} />
        <Text
          style={[styles.todoText, todo.completed && styles.todoTextCrossed]}>
          {i + 1}: {todo.title}
        </Text>
        <DeleteButton id={todo.id} onPress={onDelete} />
      </>
    </TouchableOpacity>
  );
};
