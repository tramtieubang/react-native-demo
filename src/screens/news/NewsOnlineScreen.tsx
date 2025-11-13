import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, NewsItem } from '../../navigation/RootStackNavigator';

type NewsDetailNavigationProp = NativeStackNavigationProp<RootStackParamList, 'NewsDetail'>;

const NEWS_SOURCES = ['All', 'VnExpress', 'Tuổi Trẻ', 'VietnamNet'];
const SERVER_URL = 'http://192.168.1.9:4000';
const PAGE_LIMIT = 10;

export default function NewsOnlineScreen() {
  const navigation = useNavigation<NewsDetailNavigationProp>();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedSource, setSelectedSource] = useState('All');
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    resetAndFetch();
  }, [selectedSource]);

  const resetAndFetch = () => {
    setNews([]);
    setOffset(0);
    setHasMore(true);
    fetchNews(0);
  };

  const fetchNews = async (currentOffset = offset) => {
    if (!hasMore && currentOffset !== 0) return;
    try {
      if (currentOffset === 0) setLoading(true);

      const url =
        selectedSource === 'All'
          ? `${SERVER_URL}/api/news?limit=${PAGE_LIMIT}&offset=${currentOffset}`
          : `${SERVER_URL}/api/news?source=${selectedSource}&limit=${PAGE_LIMIT}&offset=${currentOffset}`;

      const res = await axios.get<NewsItem[]>(url);
      if (res.data.length < PAGE_LIMIT) setHasMore(false);

      setNews((prev) => (currentOffset === 0 ? res.data : [...prev, ...res.data]));
      setOffset(currentOffset + PAGE_LIMIT);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    resetAndFetch();
  };

  const handlePress = (item: NewsItem) => {
    navigation.navigate('NewsDetail', { newsItem: item });
  };

  const renderItem = ({ item }: { item: NewsItem }) => (
    <TouchableOpacity onPress={() => handlePress(item)}>
      <View style={styles.card}>
        {item.image ? (
          <Image source={{ uri: item.image }} style={styles.thumbnail} />
        ) : (
          <View style={[styles.thumbnail, styles.placeholder]}>
            <Text style={styles.placeholderText}>No Image</Text>
          </View>
        )}
        <View style={styles.content}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.desc}>{item.description}</Text>
          <View style={styles.footer}>
            <Text style={styles.source}>{item.source}</Text>
            {item.pubDate && <Text style={styles.date}>{new Date(item.pubDate).toLocaleDateString()}</Text>}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1 }}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabContainer}>
        {NEWS_SOURCES.map((source) => (
          <TouchableOpacity key={source} onPress={() => setSelectedSource(source)}>
            <View style={[styles.tab, selectedSource === source && styles.tabActive]}>
              <Text style={[styles.tabText, selectedSource === source && styles.tabTextActive]}>
                {source}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {loading && news.length === 0 ? (
        <ActivityIndicator size="large" style={{ marginTop: 50 }} />
      ) : (
        <FlatList
          data={news}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderItem}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          onEndReached={() => fetchNews()}
          onEndReachedThreshold={0.5}
          ListFooterComponent={hasMore ? <ActivityIndicator style={{ margin: 10 }} /> : null}
          ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 20 }}>Không có tin nào.</Text>}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  tabContainer: { flexDirection: 'row', marginVertical: 10, paddingHorizontal: 10 },
  tab: { paddingVertical: 6, paddingHorizontal: 14, backgroundColor: '#eee', borderRadius: 20, marginRight: 10 },
  tabActive: { backgroundColor: '#007bff' },
  tabText: { color: '#555', fontSize: 14 },
  tabTextActive: { color: '#fff', fontWeight: 'bold' },
  card: { marginHorizontal: 10, marginVertical: 5, backgroundColor: '#fff', borderRadius: 12, overflow: 'hidden', elevation: 3 },
  thumbnail: { width: '100%', height: 180, backgroundColor: '#eee', justifyContent: 'center', alignItems: 'center' },
  placeholder: { backgroundColor: '#ccc' },
  placeholderText: { color: '#666', fontSize: 16 },
  content: { padding: 12 },
  title: { fontSize: 17, fontWeight: 'bold', marginBottom: 6 },
  desc: { fontSize: 14, color: '#555', marginBottom: 8 },
  footer: { flexDirection: 'row', justifyContent: 'space-between' },
  source: { fontStyle: 'italic', color: '#007bff', fontSize: 13 },
  date: { fontSize: 12, color: '#999' },
});
