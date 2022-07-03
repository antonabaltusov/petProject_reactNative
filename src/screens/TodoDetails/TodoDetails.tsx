import {Button} from '@react-native-material/core';
import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {SaveButton} from '../../components/SaveButton/SaveButton';
import {TextField} from '../../components/TextField/TextField';
import {useActions} from '../../hooks/useActions';
import {selectTodoById} from '../../store/selectors';
import {Todo} from '../TodoList/TodoList.types';
import {TodoDetailsProps} from './TodoDetails.types';
import {launchImageLibrary} from 'react-native-image-picker';
import {Gallery} from '../../components/Callery/Callery';
import {ScrollView} from 'react-native-gesture-handler';
import {styles} from './TodoDetails.styles';
export const TodoDetails = ({route, navigation}: TodoDetailsProps) => {
  const todo: Todo = useSelector(selectTodoById(route.params.todoId));
  const {changeTodo} = useActions();
  const [editedTittle, setEditedTittle] = useState(todo.title);
  const handleChangeTodo = () => {
    const newTodo: Todo = {
      ...todo,
      title: editedTittle,
    };
    changeTodo(newTodo);
  };
  useEffect(() => {
    navigation.setOptions({
      title: todo.title,
    });
  }, [navigation, todo]);
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <SaveButton
          disabled={editedTittle === todo.title}
          onPress={handleChangeTodo}
        />
      ),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation, todo.title, todo, handleChangeTodo]);

  const handlePress = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        selectionLimit: 0,
      },
      ({assets}) => {
        if (assets) {
          const newTodo = {
            ...todo,
            imgs: [...todo.imgs, ...assets],
          };
          changeTodo(newTodo);
        }
      },
    );
  };

  const handleImagePress = (imgUri: string) => {
    navigation.navigate('ImgFull', {uri: imgUri, todoId: todo.id});
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.todoContainer}>
        <TextField initialValue={todo.title} onChangeText={setEditedTittle} />
        <Text style={styles.text}>Todo Details, {todo.title}</Text>
        <Gallery onPress={handleImagePress} imgs={todo.imgs} />
      </ScrollView>
      <Button
        style={styles.button}
        onPress={handlePress}
        title="Select image"
      />
    </View>
  );
};
