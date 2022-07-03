import React, {useCallback, useEffect, useMemo} from 'react';
import {ListRenderItemInfo, SectionList, Text, View} from 'react-native';
import {TodoItem} from '../../components/TodoItem/TodoItem';
import {styles} from './TodoList.styles';
import {useSelector} from 'react-redux';
import {ActivityIndicator, Button} from '@react-native-material/core';
import {Section, Todo, TodoListProps} from './TodoList.types';
import {TextField} from '../../components/TextField/TextField';
import {selectTodosState} from '../../store/selectors';
import {useActions} from '../../hooks/useActions';

export const TodoList = ({navigation}: TodoListProps) => {
  const {todos, loading, error} = useSelector(selectTodosState);
  const {getTodos, changeTodo, removeTodo} = useActions();

  useEffect(() => {
    if (!todos.length) {
      getTodos();
    }
  }, []);
  const sections = useMemo(
    () =>
      Object.values(todos).reduce<Section[]>(
        (acc, todo) => {
          if (!todo.completed) {
            acc[0].data.push(todo);
          } else {
            acc[1].data.push(todo);
          }
          return acc;
        },
        [
          {data: [], title: 'Todo'},
          {data: [], title: 'Complete'},
        ],
      ),
    [todos],
  );
  const handlePressTodo = (id: number) => {
    const updatedTodo = {...todos[id], completed: !todos[id].completed};
    changeTodo(updatedTodo);
  };

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      title: text,
      id: Date.now(),
      completed: false,
      imgs: [],
    };
    changeTodo(newTodo);
  };

  const toDetails = (id: number) => {
    navigation.navigate('TodoDetails', {todoId: id});
  };

  const deleteTodo = (id: number) => {
    removeTodo(id);
  };
  const renderTodo = ({item, index}: ListRenderItemInfo<Todo>) => (
    <TodoItem
      todo={item}
      i={index}
      onPress={toDetails}
      onComplete={handlePressTodo}
      removeTodo={deleteTodo}
    />
  );
  const renderSectionHeader = useCallback(({section}) => {
    return <Text>{section.title}</Text>;
  }, []);

  return (
    <>
      {loading && <ActivityIndicator style={styles.loader} size="large" />}
      {error ? (
        <View style={styles.error}>
          <Text style={styles.center}>Error</Text>
          <Text style={styles.center}>{error.message}</Text>
          <Button
            style={styles.button}
            variant="outlined"
            title="Retry"
            onPress={getTodos}
          />
        </View>
      ) : (
        <SectionList
          ListHeaderComponent={() => <TextField onSubmit={addTodo} />}
          ListHeaderComponentStyle={styles.header}
          renderSectionHeader={renderSectionHeader}
          sections={sections}
          renderItem={renderTodo}
          contentContainerStyle={styles.todosContainer}
        />
      )}
    </>
  );
};
