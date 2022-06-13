import {useDispatch} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as TodoAction from '../store/actions';

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(TodoAction, dispatch);
};
