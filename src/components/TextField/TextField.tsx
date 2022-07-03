import React, {FC, useState} from 'react';
import {TextInput} from 'react-native';
import {styles} from './TextField.styles';
import {TextFieldProps} from './TextField.types';

export const TextField: FC<TextFieldProps> = ({
  onSubmit,
  initialValue = '',
  onChangeText,
}) => {
  const [newTodoText, setNewTodoText] = useState(initialValue);
  const [isFocused, setIsFocused] = useState(false);
  const onSubmitEditing = () => {
    setNewTodoText(newTodoText.trim());
    if (newTodoText) {
      onSubmit && onSubmit(newTodoText);
      if (!initialValue) {
        setNewTodoText('');
      }
    }
  };
  const handleChange = (text: string) => {
    setNewTodoText(text);
    onChangeText && onChangeText(text);
  };
  return (
    <TextInput
      placeholder="Enter a Todo tittle"
      value={newTodoText}
      onChangeText={handleChange}
      style={[styles.textField, isFocused && {color: 'black'}]}
      onSubmitEditing={onSubmitEditing}
      onBlur={() => setIsFocused(false)}
      onFocus={() => setIsFocused(true)}
    />
  );
};
