import {TodosState} from './types';

export const selectTodos = (state: TodosState) => state.todos;
export const selectLoading = (state: TodosState) => state.loading;
export const selectError = (state: TodosState) => state.error;
