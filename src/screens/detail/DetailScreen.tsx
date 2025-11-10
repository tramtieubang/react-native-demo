// DetailScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/RootStackNavigator';
import { GestureHandlerRootView, TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

type Props = NativeStackScreenProps<RootStackParamList, 'Detail'>;

type NewsDetail = {
  id: number;
  title: string;
  description: string;
  content: string;
};

export default function DetailScreen({ navigation, route }: Props) {
  const { articleId } = route.params; // Lấy id từ route
  const [detail, setDetail] = useState<NewsDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Dùng template string đúng cú pháp
    fetch(`http://192.168.1.9:3000/api/news/${articleId}`)
      .then(res => res.json())
      .then(data => {
        setDetail(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [articleId]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF512F" />
      </View>
    );
  }

  if (!detail) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Không tìm thấy bài viết</Text>
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons name="arrow-back-outline" size={24} color="#FF512F" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Chi tiết bài viết</Text>
        </View>

        {/* Content */}
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <Text style={styles.title}>{detail.title}</Text>
          <Text style={styles.description}>{detail.description}</Text>
          <Text style={styles.content}>{detail.content}</Text>
        </ScrollView>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 15, borderBottomWidth: 1, borderBottomColor: '#eee' },
  backBtn: { marginRight: 10 },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#333' },
  contentContainer: { padding: 15 },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 10 },
  description: { fontSize: 16, color: '#555', marginBottom: 10 },
  content: { fontSize: 16, color: '#333', lineHeight: 22 },
});
