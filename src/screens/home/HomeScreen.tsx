import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

const windowWidth = Dimensions.get('window').width;

// -----------------------------
// Dữ liệu cho 10 danh mục
// -----------------------------

const categoryGrid3 = [
  { id: '1', title: 'Thể thao', icon: 'basketball-outline' },
  { id: '2', title: 'Công nghệ', icon: 'desktop-outline' },
  { id: '3', title: 'Giải trí', icon: 'film-outline' },
  { id: '4', title: 'Kinh doanh', icon: 'cash-outline' },
  { id: '5', title: 'Giáo dục', icon: 'school-outline' },
  { id: '6', title: 'Sức khỏe', icon: 'heart-outline' },
];

const categoryHorizontal = [
  { id: '1', title: 'Tin số 1' },
  { id: '2', title: 'Tin số 2' },
  { id: '3', title: 'Tin số 3' },
  { id: '4', title: 'Tin số 4' },
  { id: '5', title: 'Tin số 5' },
  { id: '6', title: 'Tin số 6' },
];

const categoryCardList = [
  { id: '1', title: 'Bài viết dài 1', desc: 'Chi tiết bài viết dài 1' },
  { id: '2', title: 'Bài viết dài 2', desc: 'Chi tiết bài viết dài 2' },
  { id: '3', title: 'Bài viết dài 3', desc: 'Nội dung chi tiết bài viết dài 3' },
];

const bannerCategory = [
  { id: '1', title: 'Banner 1' },
  { id: '2', title: 'Banner 2' },
];

const miniHorizontal = [
  { id: '1', title: 'Mini 1' },
  { id: '2', title: 'Mini 2' },
  { id: '3', title: 'Mini 3' },
];

const largeImageList = [
  { id: '1', title: 'Hình lớn 1' },
  { id: '2', title: 'Hình lớn 2' },
];

const coloredCardList = [
  { id: '1', title: 'Màu 1', color: '#FFD3B5' },
  { id: '2', title: 'Màu 2', color: '#FFDEE9' },
];

type IonIconName = 'heart-outline' | 'star-outline' | 'alarm-outline';

const iconList: { id: string; icon: IonIconName }[] = [
  { id: '1', icon: 'heart-outline' },
  { id: '2', icon: 'star-outline' },
  { id: '3', icon: 'alarm-outline' },
];

const stackedList = [
  { id: '1', title: 'Stack 1' },
  { id: '2', title: 'Stack 2' },
];

const bannerFull = [
  { id: '1', title: 'Banner Full' },
];

// -----------------------------
// Dữ liệu cho các danh mục mới
// -----------------------------
const categoryGrid2 = [
  { id: '1', title: 'Ẩm thực', color: '#FFD3B5' },
  { id: '2', title: 'Du lịch', color: '#FFDEE9' },
  { id: '3', title: 'Sức khỏe', color: '#B5FFD3' },
  { id: '4', title: 'Âm nhạc', color: '#D3B5FF' },
];

const roundCarousel = [
  { id: '1', title: 'Tech', color: '#FF512F' },
  { id: '2', title: 'Sport', color: '#FF8C00' },
  { id: '3', title: 'News', color: '#FFD700' },
];

const listWithBadge = [
  { id: '1', title: 'Tin mới', icon: 'newspaper-outline', count: 5 },
  { id: '2', title: 'Thể thao', icon: 'basketball-outline', count: 3 },
];

const masonryList = [
  { id: '1', title: 'Bài viết 1', height: 180 },
  { id: '2', title: 'Bài viết 2', height: 250 },
  { id: '3', title: 'Bài viết 3', height: 200 },
];

const bannerLarge = [
  { id: '1', title: 'Sự kiện hot', color: '#FF512F' },
];


export default function HomeScreen() {
  // -----------------------------
  // Render item danh mục Grid 3 cột
  // -----------------------------
  const renderGridItem = ({ item }: any) => (
    <TouchableOpacity style={styles.gridCard}>
      <Ionicons name={item.icon} size={30} color="#FF512F" />
      <Text style={styles.gridText}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <LinearGradient colors={['#FFDEE9', '#B5FFFC']} style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
          
          {/* DANH MỤC 1: Grid 3 cột */}
          <Text style={styles.header}>Danh mục 1: Grid 3 cột</Text>
          <FlatList
            data={categoryGrid3}
            renderItem={renderGridItem}
            keyExtractor={(item) => item.id}
            numColumns={3}
            columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 15 }}
            scrollEnabled={false}
          />

          {/* DANH MỤC 2: Carousel ngang */}
          <Text style={styles.header}>Danh mục 2: Carousel ngang</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 10 }}>
            {categoryHorizontal.map((item) => (
              <View key={item.id} style={styles.newsCard}>
                <Text style={styles.newsTitle}>{item.title}</Text>
              </View>
            ))}
          </ScrollView>

          {/* DANH MỤC 3: List thẻ dài */}
          <Text style={styles.header}>Danh mục 3: List thẻ dài</Text>
          {categoryCardList.map((item) => (
            <View key={item.id} style={styles.longCard}>
              <Text style={styles.longTitle}>{item.title}</Text>
              <Text style={styles.longDesc}>{item.desc}</Text>
            </View>
          ))}

          {/* DANH MỤC 4: Banner full-width */}
          <Text style={styles.header}>Danh mục 4: Banner full-width</Text>
          {bannerCategory.map((item) => (
            <View key={item.id} style={styles.bannerCard}>
              <Text style={styles.bannerText}>{item.title}</Text>
            </View>
          ))}

          {/* DANH MỤC 5: Mini card ngang */}
          <Text style={styles.header}>Danh mục 5: Mini card ngang</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingVertical: 10 }}>
            {miniHorizontal.map((item) => (
              <View key={item.id} style={styles.miniCard}>
                <Text style={styles.miniText}>{item.title}</Text>
              </View>
            ))}
          </ScrollView>

          {/* DANH MỤC 6: Large Image */}
          <Text style={styles.header}>Danh mục 6: Large Image</Text>
          {largeImageList.map((item) => (
            <View key={item.id} style={styles.largeImage}>
              <Text style={styles.largeText}>{item.title}</Text>
            </View>
          ))}

          {/* DANH MỤC 7: Colored card list */}
          <Text style={styles.header}>Danh mục 7: Colored Cards</Text>
          {coloredCardList.map((item) => (
            <View key={item.id} style={[styles.coloredCard, { backgroundColor: item.color }]}>
              <Text>{item.title}</Text>
            </View>
          ))}

          {/* DANH MỤC 8: Icon list */}
          <Text style={styles.header}>Danh mục 8: Icon List</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 15 }}>
            {iconList.map((item) => (
              <Ionicons key={item.id} name={item.icon} size={30} color="#FF512F" />
            ))}
          </View>

          {/* DANH MỤC 9: Stacked List */}
          <Text style={styles.header}>Danh mục 9: Stacked List</Text>
          {stackedList.map((item) => (
            <View key={item.id} style={styles.stackedCard}>
              <Text>{item.title}</Text>
            </View>
          ))}

          {/* DANH MỤC 10: Banner Full */}
          <Text style={styles.header}>Danh mục 10: Banner Full</Text>
          {bannerFull.map((item) => (
            <View key={item.id} style={styles.fullBanner}>
              <Text style={{ color: '#fff', fontWeight: '700' }}>{item.title}</Text>
            </View>
          ))}

          {/* DANH MỤC 11: Grid 2 cột với màu nền */}
<Text style={styles.header}>Danh mục 11: Grid 2 cột</Text>
<FlatList
  data={categoryGrid2}
  keyExtractor={(item) => item.id}
  numColumns={2}
  columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 15 }}
  scrollEnabled={false}
  renderItem={({ item }) => (
    <View style={[styles.grid2Card, { backgroundColor: item.color }]}>
      <Text style={{ fontWeight: '700', color: '#333' }}>{item.title}</Text>
    </View>
  )}
/>

{/* DANH MỤC 12: Carousel ảnh tròn */}
<Text style={styles.header}>Danh mục 12: Carousel ảnh tròn</Text>
<ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 10, paddingVertical: 10 }}>
  {roundCarousel.map((item) => (
    <View key={item.id} style={[styles.roundCard, { backgroundColor: item.color }]}>
      <Text style={{ color: '#fff', fontWeight: '700' }}>{item.title}</Text>
    </View>
  ))}
</ScrollView>

{/* DANH MỤC 13: List với badge */}
<Text style={styles.header}>Danh mục 13: List với badge</Text>
{listWithBadge.map((item) => (
  <View key={item.id} style={styles.listBadge}>
    <Ionicons name={item.icon as any} size={24} color="#FF512F" />
    <Text style={{ flex: 1, marginLeft: 10 }}>{item.title}</Text>
    <View style={styles.badge}>
      <Text style={{ color: '#fff', fontWeight: '700' }}>{item.count}</Text>
    </View>
  </View>
))}

{/* DANH MỤC 14: Masonry Grid */}
<Text style={styles.header}>Danh mục 14: Masonry Grid</Text>
<FlatList
  data={masonryList}
  keyExtractor={(item) => item.id}
  numColumns={2}
  columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 10 }}
  scrollEnabled={false}
  renderItem={({ item }) => (
    <View style={[styles.masonryCard, { height: item.height }]}>
      <Text style={{ fontWeight: '700', color: '#333' }}>{item.title}</Text>
    </View>
  )}
/>

{/* DANH MỤC 15: Banner lớn + overlay text */}
<Text style={styles.header}>Danh mục 15: Banner lớn</Text>
{bannerLarge.map((item) => (
  <View key={item.id} style={[styles.largeBanner, { backgroundColor: item.color }]}>
    <Text style={{ color: '#fff', fontWeight: '700', fontSize: 18 }}>{item.title}</Text>
  </View>
))}


        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  header: {
    fontSize: 18,
    fontWeight: '700',
    marginVertical: 10,
    color: '#333',
  },
  gridCard: {
    width: (windowWidth - 60) / 3,
    height: 90,
    backgroundColor: '#fff',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  gridText: { marginTop: 5, fontSize: 14, fontWeight: '500' },
  newsCard: {
    width: 200,
    height: 100,
    backgroundColor: '#fff',
    marginRight: 15,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  newsTitle: { fontWeight: '700' },
  longCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
  },
  longTitle: { fontSize: 16, fontWeight: '700' },
  longDesc: { fontSize: 14, color: '#555', marginTop: 5 },
  bannerCard: {
    height: 120,
    borderRadius: 12,
    backgroundColor: '#FF512F',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  bannerText: { color: '#fff', fontWeight: '700', fontSize: 18 },
  miniCard: {
    width: 100,
    height: 80,
    borderRadius: 12,
    backgroundColor: '#fff',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  miniText: { fontWeight: '600' },
  largeImage: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  largeText: { fontWeight: '700' },
  coloredCard: {
    height: 80,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  stackedCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    elevation: 3,
  },
  fullBanner: {
    width: '100%',
    height: 150,
    borderRadius: 12,
    backgroundColor: '#FF512F',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },

  grid2Card: {
  flex: 1,
  height: 120,
  borderRadius: 12,
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: 10,
  marginHorizontal: 5,
},

roundCard: {
  width: 80,
  height: 80,
  borderRadius: 40,
  justifyContent: 'center',
  alignItems: 'center',
  marginRight: 15,
},

listBadge: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#fff',
  borderRadius: 12,
  padding: 10,
  marginBottom: 10,
  elevation: 2,
},

badge: {
  backgroundColor: '#FF512F',
  borderRadius: 12,
  width: 24,
  height: 24,
  justifyContent: 'center',
  alignItems: 'center',
},

masonryCard: {
  flex: 1,
  borderRadius: 12,
  backgroundColor: '#FFD3B5',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: 10,
},

largeBanner: {
  width: '100%',
  height: 150,
  borderRadius: 12,
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: 15,
},


});
