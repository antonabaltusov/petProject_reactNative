import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {TodoList} from '../screens/TodoList/TodoList';
import {RootStackParams} from './Navigation.types';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NullCom} from '../components/nullComponent/Nullcom';

const RootStack = createNativeStackNavigator<RootStackParams>();
export const MyStack = () => (
  <RootStack.Navigator initialRouteName="TodoList">
    <RootStack.Screen name="TodoList" component={TodoList} />
  </RootStack.Navigator>
);

const Tab = createBottomTabNavigator();
export const MyTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={MyStack} />
      <Tab.Screen name="Settings" component={NullCom} />
    </Tab.Navigator>
  );
};

export const Navigation = () => (
  <NavigationContainer>
    <MyTabs />
  </NavigationContainer>
);
