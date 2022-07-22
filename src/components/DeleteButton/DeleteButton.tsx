import React, {FC} from 'react';
import {Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import {styles} from './DeleteButton.styles';
import {DeleteButtonProps} from './DeleteButton.types';

export const DeleteButton: FC<DeleteButtonProps> = ({id, onPress}) => {
  const handlePress = () => {
    onPress(id);
  };
  return (
    <Pressable style={styles.box} onPress={handlePress}>
      <Icon name="cross" size={30} color="red" />
    </Pressable>
  );
};
