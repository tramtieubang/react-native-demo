import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, Button, useWindowDimensions, ActivityIndicator } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/RootStackNavigator';
import RenderHtml from 'react-native-render-html';
import axios from 'axios';

type Props = NativeStackScreenProps<RootStackParamList, 'NewsDetail'>;

export default function NewsDetailScreen({ route, navigation }: Props) {
  const { newsItem } = route.params;
  const { width } = useWindowDimensions();
  const [content, setContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await axios.get(
          `http://192.168.1.9:4000/api/news/content?url=${encodeURIComponent(newsItem.link ?? '')}`
        );
        setContent(res.data.content);
      } catch (err) {
        console.error(err);
        setContent('<p>Không thể tải nội dung chi tiết.</p>');
      } finally {
        setLoading(false);
      }
    };
    fetchContent();
  }, [newsItem.link]);

  return (
    <ScrollView style={{ flex: 1, padding: 10 }}>
      <Button title="← Quay lại" onPress={() => navigation.goBack()} />

      <Text style={{ fontSize: 22, fontWeight: 'bold', marginVertical: 10 }}>
        {newsItem.title}
      </Text>

      {newsItem.image && (
        <Image
          source={{ uri: newsItem.image }}
          style={{ width: '100%', height: 250, marginBottom: 10, borderRadius: 8 }}
          resizeMode="cover"
        />
      )}

      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" style={{ marginTop: 20 }} />
      ) : (
        <RenderHtml
          contentWidth={width}
          source={{ html: content || '' }}
          tagsStyles={{
            p: { fontSize: 16, color: '#333', lineHeight: 24 },
            img: { borderRadius: 8, marginVertical: 10 },
          }}
          ignoredDomTags={['svg', 'meta', 'source', 'link', 'iframe', 'noscript']}
        />
      )}
    </ScrollView>
  );
}
