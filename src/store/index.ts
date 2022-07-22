import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {todosReducer} from './reducer';
import {Action, TodosState} from './types';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer<TodosState, Action>(
  persistConfig,
  todosReducer,
);

export const rootReducer = combineReducers({
  todos: persistedReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);
