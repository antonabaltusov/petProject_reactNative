import React, {FC, useState} from 'react';
import {TextInput} from 'react-native';
import {styles} from './TextField.styles';
import {TextFieldProps} from './TextField.types';

export const TextField: FC<TextFieldProps> = ({onSubmit}) => {
  const [newTodoText, setNewTodoText] = useState('');
  const onSubmitEditing = () => {
    if (newTodoText) {
      onSubmit(newTodoText);
      setNewTodoText('');
    }
  };
  return (
    <TextInput
      placeholder="Enter a Todo tittle"
      value={newTodoText}
      onChangeText={setNewTodoText}
      style={styles.textField}
      onSubmitEditing={onSubmitEditing}
    />
  );
};
