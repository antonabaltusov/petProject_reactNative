import React, {FC} from 'react';
import {Animated} from 'react-native';
import {styles} from './Checkbox.styles';
import {CheckboxProps} from './Checkbox.types';
import Icon from 'react-native-vector-icons/Entypo';

export const Checkbox: FC<CheckboxProps> = ({scale, checked}) => {
  return (
    <Animated.View
      style={[
        styles.box,
        {
          transform: [
            {
              scale: scale.interpolate({
                inputRange: [0, 0.7, 1],
                outputRange: [1, 1.3, 1],
              }),
            },
          ],
        },
      ]}>
      <Animated.View style={[styles.icon, {opacity: checked}]}>
        <Icon name="check" size={20} color="red" />
      </Animated.View>
    </Animated.View>
  );
};
