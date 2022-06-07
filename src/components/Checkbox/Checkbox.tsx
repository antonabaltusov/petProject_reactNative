import React, {useRef} from 'react';
import {Animated} from 'react-native';
import {styles} from './Checkbox.styles';
import {CheckboxProps} from './Checkbox.types';

export const Checkbox = ({checked}: CheckboxProps) => {
  const checkboxScale = useRef(new Animated.Value(1));

  const handlePress = () => {
    Animated.timing(checkboxScale.current, {
      toValue: 1.2,
      useNativeDriver: true,
      duration: 300,
    }).start();
  };

  return (
    <Animated.View
      onTouchEnd={handlePress}
      style={[
        styles.box,
        checked && styles.filled,
        {
          transform: [
            {
              scale: checkboxScale.current,
            },
          ],
        },
      ]}
    />
  );
};
