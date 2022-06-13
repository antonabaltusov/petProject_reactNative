import {Dispatch} from 'react';
import {ThunkAction} from 'redux-thunk';
import {Todo} from '../screens/TodoList/TodoList.types';
import {TODOS_URL} from '../utils/constants';
import {getTodosFailure, getTodosRequest, getTodosSuccess} from './actions';
import {Action, TodosState} from './types';

export const getTodos =
  (): ThunkAction<void, TodosState, undefined, Action> =>
  async (dispatch: Dispatch<Action>) => {
    try {
      dispatch(getTodosRequest());
      const response = await fetch(TODOS_URL);
      const result: Todo[] = await response.json();
      const todos = result.reduce((acc, todo) => {
        acc[todo.id] = todo;
        return acc;
      }, {});
      dispatch(getTodosSuccess(todos));
    } catch (e) {
      dispatch(getTodosFailure(e));
    }
  };
