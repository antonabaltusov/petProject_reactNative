import React from 'react';
import {Alert, Button, Dimensions, Image, View} from 'react-native';
import {useSelector} from 'react-redux';
import {useActions} from '../../hooks/useActions';
import {selectTodoById} from '../../store/selectors';
import {styles} from './ImgFull.styles';
import {ImgFullProps} from './ImgFull.types';
const {width, height} = Dimensions.get('window');
export const ImgFull = ({route, navigation}: ImgFullProps) => {
  const {changeTodo} = useActions();
  const todo = useSelector(selectTodoById(route.params.todoId));
  const handleConfirm = () => {
    const newTodo = {
      ...todo,
      imgs: todo.imgs.filter(({uri}) => uri !== route.params.uri),
    };
    changeTodo(newTodo);
    navigation.pop();
  };
  const handlePress = () => {
    Alert.alert('Delete image?', undefined, [
      {
        text: 'Delete',
        onPress: handleConfirm,
      },
      {
        text: 'Cancel',
      },
    ]);
  };

  return (
    <View style={styles.contaner}>
      <Button title="Delete image" onPress={handlePress} />
      <Image
        source={{uri: route.params.uri}}
        resizeMode="contain"
        style={(styles.img, {width: width * 0.9, height: height * 0.6})}
      />
    </View>
  );
};
