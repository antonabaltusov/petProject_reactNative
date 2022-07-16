import React, {FC, useCallback} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {Checkbox} from '../Checkbox/Checkbox';
import {DeleteButton} from '../DeleteButton/DeleteButton';
import {styles} from './TodoItem.styles';
import {TodoItemProps} from './TodoItem.types';
import Animated, {
  LightSpeedInLeft,
  LightSpeedOutRight,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';

export const TodoItem: FC<TodoItemProps> = ({
  i,
  todo,
  onComplete,
  removeTodo,
  onPress,
}) => {
  const MAX_OFFSET = -70;
  const offset = useSharedValue(0);
  const start = useSharedValue(0);
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{translateX: offset.value}],
    };
  });
  const deleteStyle = useAnimatedStyle(() => ({
    opacity: offset.value / MAX_OFFSET,
  }));
  const gesture = Gesture.Pan()
    .onUpdate(e => {
      if (
        e.translationX < -start.value &&
        e.translationX > MAX_OFFSET - start.value
      ) {
        offset.value = e.translationX + start.value;
      }
    })
    .onEnd(() => {
      if (offset.value > MAX_OFFSET / 2) {
        start.value = offset.value = 0;
      } else {
        start.value = offset.value = MAX_OFFSET;
      }
    });
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
    <GestureDetector gesture={gesture}>
      <Animated.View
        entering={LightSpeedInLeft}
        exiting={LightSpeedOutRight}
        style={[styles.root, animatedStyles]}>
        <View style={styles.left}>
          <Checkbox onPress={handleComplete} checked={todo.completed} />
          <TouchableOpacity onPress={handlePress}>
            <Text
              style={[
                styles.todoText,
                todo.completed && styles.todoTextCrossed,
              ]}>
              {i + 1}: {todo.title}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.right}>
          <>
            {getImg(todo)}
            <Animated.View style={deleteStyle}>
              <DeleteButton id={todo.id} onPress={onDelete} />
            </Animated.View>
          </>
        </View>
      </Animated.View>
    </GestureDetector>
  );
};
