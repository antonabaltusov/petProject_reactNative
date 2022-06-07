import React, {useEffect} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {TodoItem} from '../../components/TodoItem/TodoItem';
import {styles} from './TodoList.styles';
import {useDispatch, useSelector} from 'react-redux';
import {selectError, selectLoading, selectTodos} from '../../store/selectors';
import {changeTodo, getTodos, removeTodo} from '../../store/actions';
import {ActivityIndicator, Button} from '@react-native-material/core';
import {Todo} from './TodoList.types';
import {TextField} from '../../components/TextField/TextField';

export const TodoList = () => {
  const todos = useSelector(selectTodos);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const dispatch = useDispatch();

  const requestTodos = async () => {
    // @ts-ignore
    dispatch(getTodos());
  };

  useEffect(() => {
    requestTodos();
  }, []);
  const handlePressTodo = (id: number) => {
    const updatedTodo = {...todos[id], completed: !todos[id].completed};
    dispatch(changeTodo(updatedTodo));
  };
  function getNewTodoId(): number {
    return Date.now();
  }

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      title: text,
      id: getNewTodoId(),
      completed: false,
    };
    dispatch(changeTodo(newTodo));
  };

  const deleteTodo = (id: number) => {
    dispatch(removeTodo(id));
  };

  return (
    <>
      {loading && <ActivityIndicator style={styles.loader} size="large" />}
      {error ? (
        <View style={styles.error}>
          <Text style={{alignSelf: 'center'}}>Error</Text>
          <Text style={{alignSelf: 'center'}}>{error.message}</Text>
          <Button
            style={{width: '33%', alignSelf: 'center'}}
            variant="outlined"
            title="Retry"
            onPress={requestTodos}
          />
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.todosContainer}>
          <TextField onSubmit={addTodo} />
          {Object.values(todos).map((todo, i) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              i={i}
              onComplete={handlePressTodo}
              removeTodo={deleteTodo}
            />
          ))}
        </ScrollView>
      )}
    </>
  );
};
