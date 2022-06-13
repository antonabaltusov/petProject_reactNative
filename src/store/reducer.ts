import {FETCH_STATUSES} from '../utils/constants';
import {
  Action,
  ChangeTodoAction,
  DeleteTodoAction,
  GetTodosSuccessAction,
  TodosState,
  TodosActionType,
  GetTodosFailureAction,
} from './types';

const initialState: TodosState = {
  todos: {},
  status: FETCH_STATUSES.idle,
  error: null,
  loading: false,
};

export const todosReducer = (
  state = initialState,
  action: Action,
): TodosState => {
  switch (action.type) {
    case TodosActionType.GET_TODOS_REQUEST: {
      return {
        ...state,
        status: FETCH_STATUSES.request,
        loading: true,
        error: null,
      };
    }
    case TodosActionType.GET_TODOS_SUCCESS: {
      return {
        ...state,
        status: FETCH_STATUSES.success,
        todos: {...state.todos, ...(action as GetTodosSuccessAction).payload},
        loading: false,
      };
    }
    case TodosActionType.GET_TODOS_FAILURE: {
      return {
        ...state,
        status: FETCH_STATUSES.failure,
        error: (action as GetTodosFailureAction).payload,
        loading: false,
      };
    }
    case TodosActionType.CHANGE_TODO: {
      const typedAction = action as ChangeTodoAction;
      return {
        ...state,
        todos: {
          ...state.todos,
          [typedAction.payload.id]: typedAction.payload,
        },
      };
    }
    case TodosActionType.DELETE_TODO: {
      const typedAction = action as DeleteTodoAction;
      const _todos = {...state.todos};
      delete _todos[typedAction.payload];

      return {
        ...state,
        todos: _todos,
      };
    }
    default:
      return state;
  }
};
