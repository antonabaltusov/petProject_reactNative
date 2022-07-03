import React, {useRef} from 'react';
import {Animated, Easing, TouchableOpacity} from 'react-native';
import {styles} from './Checkbox.styles';
import {CheckboxProps} from './Checkbox.types';
import Icon from 'react-native-vector-icons/Entypo';

export const Checkbox = ({onPress, checked}: CheckboxProps) => {
  const checkboxScale = useRef(new Animated.Value(0)).current;
  const checkboxOpacity = useRef(new Animated.Value(checked ? 1 : 0)).current;

  const handlePress = () => {
    Animated.parallel([
      Animated.spring(checkboxScale, {
        toValue: 1,
        useNativeDriver: true,
      }),
      Animated.spring(checkboxOpacity, {
        toValue: checked ? 0 : 1,
        useNativeDriver: true,
      }),
    ]).start(() => {
      checkboxScale.setValue(0);
      onPress();
    });
  };
  return (
    <TouchableOpacity onPress={handlePress}>
      <Animated.View
        style={[
          styles.box,
          {
            transform: [
              {
                scale: checkboxScale.interpolate({
                  inputRange: [0, 0.7, 1],
                  outputRange: [1, 1.3, 1],
                }),
              },
            ],
          },
        ]}>
        <Animated.View
          style={[
            styles.icon,
            {
              opacity: checkboxOpacity,
            },
          ]}>
          <Icon name="check" size={20} color="red" />
        </Animated.View>
      </Animated.View>
    </TouchableOpacity>
  );
};
