// Định nghĩa kiểu dữ liệu cho các màn hình trong Stack
export type RootStackParamList = {
  Login: undefined;     // Màn hình đăng nhập, không có tham số
  Home: undefined;      // Màn hình chính
  Detail: { id: number }; // Màn hình chi tiết (có tham số id)
};
