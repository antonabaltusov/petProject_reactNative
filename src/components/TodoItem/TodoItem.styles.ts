import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    paddingVertical: 10,
    alignItems: 'center',
    borderStyle: 'solid',
    borderBottomWidth: 1,
  },
  todoText: {
    fontSize: 17,
    fontWeight: 'bold',
    marginLeft: 17,
    flex: 1,
    flexWrap: 'wrap',
  },
  todoTextCrossed: {
    textDecorationLine: 'line-through',
    color: 'grey',
    fontWeight: 'normal',
  },
});
