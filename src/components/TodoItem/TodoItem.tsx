import React, {FC, useCallback} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {Checkbox} from '../Checkbox/Checkbox';
import {DeleteButton} from '../DeleteButton/DeleteButton';
import {styles} from './TodoItem.styles';
import {TodoItemProps} from './TodoItem.types';

export const TodoItem: FC<TodoItemProps> = ({
  i,
  todo,
  onComplete,
  removeTodo,
  onPress,
}) => {
  const handlePress = () => {
    onPress(todo.id);
  };
  const handleComplete = () => {
    onComplete(todo.id);
  };
  const onDelete = () => {
    removeTodo(todo.id);
  };
  const getImg = useCallback(({imgs}) => {
    if (imgs) {
      imgs.length ? (
        <Image source={{uri: imgs[0].uri}} style={styles.image} />
      ) : null;
    }
  }, []);

  return (
    <View style={styles.root}>
      <View style={styles.left}>
        <Checkbox onPress={handleComplete} checked={todo.completed} />
        <TouchableOpacity onPress={handlePress}>
          <Text
            style={[styles.todoText, todo.completed && styles.todoTextCrossed]}>
            {i + 1}: {todo.title}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.right}>
        <>
          {getImg(todo)}
          <DeleteButton id={todo.id} onPress={onDelete} />
        </>
      </View>
    </View>
  );
};
