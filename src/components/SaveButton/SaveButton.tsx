import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {SaveButtonProps} from './SaveButton.types';

export const SaveButton = ({onPress, disabled}: SaveButtonProps) => (
  <TouchableOpacity disabled={disabled} onPress={onPress}>
    <Icon name="check" color={disabled ? 'gray' : 'green'} />
  </TouchableOpacity>
);
