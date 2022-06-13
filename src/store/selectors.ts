import {TypedUseSelectorHook, useSelector} from 'react-redux';
import {RootState} from './index';
import {TodosState} from './types';

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export const selectTodosState = (state: RootState): TodosState => state.todos;
