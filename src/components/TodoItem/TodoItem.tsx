import React, {useRef} from 'react';
import {Animated, Text, TouchableOpacity} from 'react-native';
import {Checkbox} from '../Checkbox/Checkbox';
import {DeleteButton} from '../DeleteButton/DeleteButton';
import {styles} from './TodoItem.styles';
import {TodoItemProps} from './TodoItem.types';

export const TodoItem = ({i, todo, onComplete, removeTodo}: TodoItemProps) => {
  const checkboxScale = useRef(new Animated.Value(0));
  const checkboxChecked = useRef(new Animated.Value(todo.completed ? 1 : 0));
  const handlePress = () => {
    if (todo.completed) {
      Animated.timing(checkboxChecked.current, {
        toValue: 0,
        duration: 600,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(checkboxChecked.current, {
        toValue: 1,
        duration: 600,
        useNativeDriver: false,
      }).start();
    }
    Animated.spring(checkboxScale.current, {
      toValue: 1,
      useNativeDriver: true,
    }).start(() => {
      checkboxScale.current.setValue(0);
      onComplete(todo.id);
    });
  };
  const onDelete = () => {
    removeTodo(todo.id);
  };
  return (
    <TouchableOpacity onPress={handlePress} style={styles.root}>
      <Checkbox
        scale={checkboxScale.current}
        checked={checkboxChecked.current}
      />
      <Text style={[styles.todoText, todo.completed && styles.todoTextCrossed]}>
        {i + 1}: {todo.title}
      </Text>
      <DeleteButton id={todo.id} onPress={onDelete} />
    </TouchableOpacity>
  );
};
