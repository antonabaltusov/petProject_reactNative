import React, {useCallback, useEffect, useMemo} from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  SectionList,
  Text,
  View,
} from 'react-native';
import {TodoItem} from '../../components/TodoItem/TodoItem';
import {styles} from './TodoList.styles';
import {useSelector} from 'react-redux';
import {ActivityIndicator, Button} from '@react-native-material/core';
import {Section, Todo, TodoListProps} from './TodoList.types';
import {TextField} from '../../components/TextField/TextField';
import {selectTodosState} from '../../store/selectors';
import {useActions} from '../../hooks/useActions';
import {FETCH_STATUSES} from '../../utils/constants';
import notifee, {
  AndroidImportance,
  TimestampTrigger,
  TriggerType,
} from '@notifee/react-native';

export const TodoList = ({navigation}: TodoListProps) => {
  const {todos, loading, error, status} = useSelector(selectTodosState);
  const {getTodos, changeTodo, removeTodo} = useActions();

  useEffect(() => {
    if (status !== FETCH_STATUSES.success) {
      getTodos();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const isAppOpenedByNotif = async () => {
    const initNotif = await notifee.getInitialNotification();
    if (initNotif) {
      const {id} = initNotif.notification.data;
      navigation.navigate('TodoDetails', {
        todoId: +(id as string),
      });
    }
  };
  useEffect(() => {
    isAppOpenedByNotif();
  }, []);
  // useEffect(() => {
  //   return notifee.onForegroundEvent(({type, detail}) => {
  //     switch (type) {
  //       case EventType.DISMISSED:
  //         console.log('User dismissed notification', detail.notification);
  //         break;
  //       case EventType.PRESS:
  //         console.log('User pressed notification', detail.notification);
  //         break;
  //       default:
  //         console.log(type);
  //     }
  //   });
  // }, []);
  // const sections = useMemo(
  //   () =>
  //     Object.values(todos).reduce<Section[]>(
  //       (acc, todo) => {
  //         if (!todo.completed) {
  //           acc[0].data.push(todo);
  //         } else {
  //           acc[1].data.push(todo);
  //         }
  //         return acc;
  //       },
  //       [
  //         {data: [], title: 'Todo'},
  //         {data: [], title: 'Complete'},
  //       ],
  //     ),
  //   [todos],
  // );
  const sections = useMemo(() => {
    return Object.values(todos).reduce<{completed: Todo[]; notCompl: Todo[]}>(
      (acc, el) => {
        if (el.completed) {
          acc.completed.push(el);
        } else {
          acc.notCompl.push(el);
        }
        return acc;
      },
      {completed: [], notCompl: []},
    );
  }, [todos]);
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
  const sendPush = async () => {
    await notifee.requestPermission();
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'default',
      importance: AndroidImportance.HIGH,
    });
    const trigger: TimestampTrigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: Date.now() + 5000, // Через 5 секунд
    };
    await notifee.setNotificationCategories([
      {
        id: 'post',
        actions: [
          {
            id: 'like',
            title: 'Like Post',
          },
          {
            id: 'dislike',
            title: 'Dislike Post',
          },
        ],
      },
    ]);
    await notifee.createTriggerNotification(
      {
        title: 'Notification Title',
        body: 'Main body content of the notification',
        android: {
          channelId,
          importance: AndroidImportance.HIGH,
          pressAction: {
            id: 'default',
          },
        },
        ios: {
          categoryId: 'post',
        },
        data: {
          id: '1',
        },
      },
      trigger,
    );
    // await notifee.displayNotification({
    //   title: 'Notification Title',
    //   body: 'Main body content of the notification',
    //   android: {
    //     channelId: channelId,
    //     // pressAction is needed if you want the notification to open the app when pressed
    //     pressAction: {
    //       id: 'default',
    //     },
    //   },
    //   ios: {},
    // });
  };

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
        <>
          <Button title="Send push" onPress={sendPush} />
          {/* <SectionList
            ListHeaderComponent={() => <TextField onSubmit={addTodo} />}
            ListHeaderComponentStyle={styles.header}
            renderSectionHeader={renderSectionHeader}
            sections={sections}
            renderItem={renderTodo}
            contentContainerStyle={styles.todosContainer}
          /> */}
          <FlatList
            data={sections.completed}
            contentContainerStyle={styles.todosContainer}
            style={styles.todosContainer}
            ListHeaderComponent={() => <TextField onSubmit={addTodo} />}
            renderItem={renderTodo}
          />
        </>
      )}
    </>
  );
};
