import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainTabNavigator from './MainTabNavigator';
import DetailScreen from '../screens/detail/DetailScreen';

export type RootStackParamList = {
  MainTabs: undefined;
  Detail: { articleId: number };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* Tab navigator */}
      <Stack.Screen name="MainTabs" component={MainTabNavigator} />
      {/* Detail screen */}
      <Stack.Screen name="Detail" component={DetailScreen} />
    </Stack.Navigator>
  );
}
