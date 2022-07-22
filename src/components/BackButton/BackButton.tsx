import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {BackButtonProps} from './BackButton.types';

export const BackButton = ({onPress}: BackButtonProps) => (
  <TouchableOpacity onPress={onPress}>
    <Icon name="chevron-left" />
  </TouchableOpacity>
);
