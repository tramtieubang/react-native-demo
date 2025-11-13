import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainTabNavigator from './MainTabNavigator';
import DetailScreen from '../screens/detail/DetailScreen';
import NewsDetailScreen from '../screens/detail/NewsDetailScreen';
//import { NewsItem } from './types'; // định nghĩa kiểu NewsItem

export type NewsItem = {
  id: number;
  title: string;
  description: string;
  image?: string;
  link?: string;
  content?: string; // 👈 thêm dòng này
  source?: string;          // 👈 Thêm dòng này
  pubDate?: string;    // 👈 thêm dòng này
};

export type RootStackParamList = {
  MainTabs: undefined;
  Detail: { articleId: number };
  NewsDetail: { newsItem: NewsItem }; // sửa thành đối tượng newsItem
  
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* Tab navigator */}
      <Stack.Screen name="MainTabs" component={MainTabNavigator} />
      {/* Detail screen */}
      <Stack.Screen name="Detail" component={DetailScreen} />
       {/* News detail screen */}
      <Stack.Screen name="NewsDetail" component={NewsDetailScreen} />

    </Stack.Navigator>
  );
}
