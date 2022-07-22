import {Button} from '@react-native-material/core';
import React, {useEffect, useState} from 'react';
import {Switch, Text, View} from 'react-native';
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
import notifee, {
  AndroidImportance,
  RepeatFrequency,
  TimestampTrigger,
  TriggerType,
} from '@notifee/react-native';
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
  const handleSetPush = async () => {
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      importance: AndroidImportance.HIGH,
    });
    const date = Date.now() + 5000;
    // date.setHours(12);
    // date.setMinutes(0);
    // date.setSeconds(0);
    const trigger: TimestampTrigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: date,
      repeatFrequency: RepeatFrequency.DAILY, // repeat once a week
    };
    await notifee.setNotificationCategories([
      {
        id: 'notifi',
        actions: [
          {
            id: 'later',
            title: 'later',
          },
        ],
      },
    ]);
    await notifee.createTriggerNotification(
      {
        id: `${todo.id}`,
        title: todo.title,
        body: 'just do it!',
        android: {
          channelId,
          importance: AndroidImportance.HIGH,
          asForegroundService: true,
          pressAction: {
            id: 'default',
          },
        },
        ios: {
          categoryId: 'notifi',
        },
        data: {
          id: `${todo.id}`,
        },
      },
      trigger,
    );
  };
  const handleCancelPush = async () => {
    await notifee.cancelTriggerNotification(`${todo.id}`);
  };
  const handleSwitch = async () => {
    if (todo.notificationIsOn) {
      await handleCancelPush();
    } else {
      await handleSetPush();
    }
    changeTodo({...todo, notificationIsOn: !todo.notificationIsOn});
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.todoContainer}>
        <TextField initialValue={todo.title} onChangeText={setEditedTittle} />
        <Text style={styles.text}>Todo Details, {todo.title}</Text>
        <Switch value={todo.notificationIsOn} onChange={handleSwitch} />
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
