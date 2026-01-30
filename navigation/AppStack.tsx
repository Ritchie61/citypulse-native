import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import NewPost from '../screens/NewPost';

export type RootStackParamList = {
  Home: undefined;
  NewPost: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="NewPost" component={NewPost} />
    </Stack.Navigator>
  );
}
