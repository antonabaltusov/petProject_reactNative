import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {TodoList} from '../screens/TodoList/TodoList';
import {RootBottomTabParams, RootStackParams} from './Navigation.types';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NullCom} from '../components/nullComponent/Nullcom';
import {TodoDetails} from '../screens/TodoDetails/TodoDetails';
import {BackButton} from '../components/BackButton/BackButton';
import {ImgFull} from '../screens/ImgFull/ImgFull';

const RootStack = createNativeStackNavigator<RootStackParams>();
export const MyStack = () => (
  <RootStack.Navigator initialRouteName="TodoList">
    <RootStack.Screen name="TodoList" component={TodoList} />
    <RootStack.Screen
      options={({navigation}) => ({
        title: 'Details',
        headerTitleStyle: {fontSize: 25},
        headerTitleAlign: 'center',
        headerLeft: () => <BackButton onPress={navigation.goBack} />,
      })}
      name="TodoDetails"
      component={TodoDetails}
    />
    <RootStack.Group screenOptions={{presentation: 'modal'}}>
      <RootStack.Screen name="ImgFull" component={ImgFull} />
    </RootStack.Group>
  </RootStack.Navigator>
);

const Tab = createBottomTabNavigator<RootBottomTabParams>();
export const MyTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Todos" component={MyStack} />
      <Tab.Screen name="Empty" component={NullCom} />
    </Tab.Navigator>
  );
};

export const Navigation = () => (
  <NavigationContainer>
    <MyTabs />
  </NavigationContainer>
);
