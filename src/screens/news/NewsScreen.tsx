import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/RootStackNavigator';
import { useNavigation } from '@react-navigation/native';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Detail'>;

type NewsItem = {
    id: number;
    title: string;
    description: string;
    content: string;
};

export default function NewsScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://192.168.1.9:3000/api/news') // Android Emulator; iOS dùng localhost
      .then(res => res.json())
      .then(data => {
        setNews(data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const renderItem = ({ item }: { item: NewsItem }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.content}</Text>
      <TouchableOpacity
        style={styles.detailBtn}
        onPress={() => navigation.navigate('Detail', { articleId: item.id })}
      >
        <Text style={{ color: '#fff' }}>Xem chi tiết</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) return <ActivityIndicator style={{ flex: 1 }} size="large" color="#FF512F" />;

  return <FlatList data={news} renderItem={renderItem} keyExtractor={item => item.id.toString()} contentContainerStyle={{ padding: 15 }} />;
}

const styles = StyleSheet.create({
  card: { marginBottom: 20, borderRadius: 12, backgroundColor: '#fff', padding: 15, elevation: 3 },
  title: { fontSize: 18, fontWeight: '700', marginBottom: 6 },
  description: { fontSize: 14, color: '#555', marginBottom: 10 },
  detailBtn: { backgroundColor: '#FF512F', padding: 10, borderRadius: 8, alignItems: 'center' },
});
