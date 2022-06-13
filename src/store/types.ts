import {Todo} from '../screens/TodoList/TodoList.types';
import {FETCH_STATUSES} from '../utils/constants';

export type TodosMap = {
  [id: string]: Todo;
};

export type TodosState = {
  status: FETCH_STATUSES;
  loading: boolean;
  error: any;
  todos: TodosMap;
};
export enum TodosActionType {
  GET_TODOS_REQUEST = 'TODOS::GET_TODOS_REQUEST',
  GET_TODOS_SUCCESS = 'TODOS::GET_TODOS_SUCCESS',
  GET_TODOS_FAILURE = 'TODOS::GET_TODOS_FAILURE',
  CHANGE_TODO = 'TODOS::CHANGE_TODO',
  DELETE_TODO = 'TODOS::DELETE_TODO',
}
export interface GetTodosRequestAction {
  type: TodosActionType.GET_TODOS_REQUEST;
}

export interface GetTodosSuccessAction {
  type: TodosActionType.GET_TODOS_SUCCESS;
  payload: TodosMap;
}
export interface GetTodosFailureAction {
  type: TodosActionType.GET_TODOS_FAILURE;
  payload: any;
}
export interface ChangeTodoAction {
  type: TodosActionType;
  payload: Todo;
}
export interface DeleteTodoAction {
  type: TodosActionType;
  payload: number;
}

export type Action =
  | GetTodosRequestAction
  | GetTodosSuccessAction
  | GetTodosFailureAction
  | ChangeTodoAction
  | DeleteTodoAction;
