import {TypedUseSelectorHook, useSelector} from 'react-redux';
import {RootState, TodosState} from './types';

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export const selectTodosState = (state: RootState): TodosState => state.todos;
export const selectTodoById = (id: number) => (state: TodosState) =>
  state.todos.todos[id];
