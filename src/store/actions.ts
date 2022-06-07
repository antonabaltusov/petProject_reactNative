import {Dispatch} from 'redux';
import {ThunkAction} from 'redux-thunk';
import {Todo} from '../screens/TodoList/TodoList.types';
import {TODOS_URL} from '../utils/constants';
import {Action, TodosMap, TodosState} from './types';

export const GET_TODOS_REQUEST = 'TODOS::GET_TODOS_REQUEST';
export const GET_TODOS_SUCCESS = 'TODOS::GET_TODOS_SUCCESS';
export const GET_TODOS_FAILURE = 'TODOS::GET_TODOS_FAILURE';
export const CHANGE_TODO = 'TODOS::CHANGE_TODO';
export const DELETE_TODO = 'TODOS::DELETE_TODO';

export const getTodosRequest = () => ({
  type: GET_TODOS_REQUEST,
});

export const getTodosSuccess = (todos: TodosMap) => ({
  type: GET_TODOS_SUCCESS,
  payload: todos,
});

export const getTodosFailure = (e: any) => ({
  type: GET_TODOS_FAILURE,
  payload: e,
});

export const getTodos =
  (): ThunkAction<void, TodosState, undefined, Action> =>
  async (dispatch: Dispatch<any>) => {
    try {
      dispatch(getTodosRequest());
      const response = await fetch(TODOS_URL);
      const result: Todo[] = await response.json();
      const todos = result.slice(0, 20).reduce((acc, todo) => {
        acc[todo.id] = todo;
        return acc;
      }, {});
      dispatch(getTodosSuccess(todos));
    } catch (e) {
      console.warn(e);
      dispatch(getTodosFailure(e));
    }
  };

export const changeTodo = (newTodo: Todo) => ({
  type: CHANGE_TODO,
  payload: newTodo,
});

export const removeTodo = (id: number) => ({
  type: DELETE_TODO,
  payload: id,
});
