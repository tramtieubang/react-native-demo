import React from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';

// 1. Định nghĩa kiểu dữ liệu Account
type Account = {
  id: number;
  name: string;
  email: string;
  avatar: string;
};

// 2. Dữ liệu mẫu
const accounts: Account[] = [
  { id: 1, name: 'Nguyen Van A', email: 'a@example.com', avatar: 'https://i.pravatar.cc/150?img=1' },
  { id: 2, name: 'Tran Thi B', email: 'b@example.com', avatar: 'https://i.pravatar.cc/150?img=2' },
  { id: 3, name: 'Le Van C', email: 'c@example.com', avatar: 'https://i.pravatar.cc/150?img=3' },
];

const AccountScreen: React.FC = () => {

  // 3. renderItem với kiểu dữ liệu cụ thể
  const renderItem = ({ item }: { item: Account }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.email}>{item.email}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList<Account>
        data={accounts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

export default AccountScreen;

// 4. Style giống Zalo
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingVertical: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e1f5fe', // xanh nhạt kiểu Zalo
    marginHorizontal: 10,
    marginVertical: 5,
    padding: 10,
    borderRadius: 8,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  info: {
    marginLeft: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0277bd',
  },
  email: {
    fontSize: 14,
    color: '#555',
    marginTop: 2,
  },
});
