import {FETCH_STATUSES} from '../utils/constants';
import {
  CHANGE_TODO,
  GET_TODOS_FAILURE,
  GET_TODOS_REQUEST,
  GET_TODOS_SUCCESS,
} from './actions';
import {
  Action,
  ChangeTodoAction,
  GetTodosSuccessAction,
  TodosState,
} from './types';

const initialState: TodosState = {
  todos: {},
  status: FETCH_STATUSES.idle,
  error: null,
  loading: false,
};

const todos = (state = initialState, action: Action): TodosState => {
  switch (action.type) {
    case GET_TODOS_REQUEST: {
      return {
        ...state,
        status: FETCH_STATUSES.request,
        loading: true,
        error: null,
      };
    }
    case GET_TODOS_SUCCESS: {
      return {
        ...state,
        status: FETCH_STATUSES.success,
        todos: (action as GetTodosSuccessAction).payload,
        loading: false,
      };
    }
    case GET_TODOS_FAILURE: {
      return {
        ...state,
        status: FETCH_STATUSES.failure,
        error: (action as GetTodosSuccessAction).payload,
        loading: false,
      };
    }
    case CHANGE_TODO: {
      const typedAction = action as ChangeTodoAction;
      return {
        ...state,
        todos: {
          ...state.todos,
          [typedAction.payload.id]: typedAction.payload,
        },
      };
    }
    default:
      return state;
  }
};

export default todos;
