import {useSelector} from 'react-redux';
import {Dispatch} from 'redux';
import {ThunkAction} from 'redux-thunk';
import {Todo} from '../screens/TodoList/TodoList.types';
import {TODOS_URL} from '../utils/constants';
import {selectTodosState} from './selectors';
import {
  Action,
  GetTodosRequestAction,
  TodosMap,
  TodosState,
  TodosActionType,
  GetTodosSuccessAction,
  GetTodosFailureAction,
  DeleteTodoAction,
  ChangeTodoAction,
} from './types';

export const getTodosRequest = (): GetTodosRequestAction => ({
  type: TodosActionType.GET_TODOS_REQUEST,
});

export const getTodosSuccess = (todos: TodosMap): GetTodosSuccessAction => ({
  type: TodosActionType.GET_TODOS_SUCCESS,
  payload: todos,
});

export const getTodosFailure = (e: any): GetTodosFailureAction => ({
  type: TodosActionType.GET_TODOS_FAILURE,
  payload: e,
});

export const changeTodo = (newTodo: Todo): ChangeTodoAction => ({
  type: TodosActionType.CHANGE_TODO,
  payload: newTodo,
});

export const removeTodo = (id: number): DeleteTodoAction => ({
  type: TodosActionType.DELETE_TODO,
  payload: id,
});

export const getTodos =
  (): ThunkAction<void, TodosState, undefined, Action> =>
  async (dispatch: Dispatch<Action>) => {
    try {
      dispatch(getTodosRequest());
      const response = await fetch(TODOS_URL);
      const result: Todo[] = await response.json();
      const Newtodos = result.reduce((acc, todo) => {
        acc[todo.id] = {...todo, imgs: []};
        return acc;
      }, {});
      dispatch(getTodosSuccess(Newtodos));
    } catch (e) {
      dispatch(getTodosFailure(e));
    }
  };
