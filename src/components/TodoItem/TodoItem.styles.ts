import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  root: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingVertical: 10,
    alignItems: 'center',
    borderStyle: 'solid',
    borderBottomWidth: 1,
  },
  left: {
    alignItems: 'center',
    flexDirection: 'row',
    width: '70%',
  },
  right: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  todoText: {
    fontSize: 17,
    fontWeight: 'bold',
    marginLeft: 17,
    flexWrap: 'wrap',
  },
  image: {
    minWidth: 35,
    maxWidth: 50,
    minHeight: 35,
    maxHeight: 50,
  },
  todoTextCrossed: {
    textDecorationLine: 'line-through',
    color: 'grey',
    fontWeight: 'normal',
  },
});
