import {Asset} from 'react-native-image-picker';
import {TodoListNavigationProp} from '../../navigation/Navigation.types';

export type Todo = {
  completed: boolean;
  id: number;
  title: string;
  imgs: Asset[];
};
export type TodoListProps = {
  navigation: TodoListNavigationProp;
};
export type Section = {data: Todo[]; title: string};
