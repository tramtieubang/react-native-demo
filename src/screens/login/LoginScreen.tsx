import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Animated,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import GradientButton from '../../components/GradientButton';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/AuthStackNavigator';

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'> & {
  onLogin: () => void;
};

export default function LoginScreen({ onLogin }: Props) {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const logoAnim = useRef(new Animated.Value(0)).current;
  const gradientAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(logoAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(gradientAnim, { toValue: 1, duration: 5000, useNativeDriver: false }),
        Animated.timing(gradientAnim, { toValue: 0, duration: 5000, useNativeDriver: false }),
      ])
    ).start();
  }, []);

  const gradients = [['#FFEEE6', '#FFD3B5'], ['#FFD3B5', '#FFEEE6']];
  const bgColor1 = gradientAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [gradients[0][0], gradients[1][0]],
  });
  const bgColor2 = gradientAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [gradients[0][1], gradients[1][1]],
  });

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Thông báo', 'Vui lòng nhập tên đăng nhập và mật khẩu');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://192.168.1.9/yii_ttb/web/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();

      if (data.success) {
        console.log('Login successful', data.data);
        onLogin(); // gọi callback từ App.tsx để chuyển navigator
      } else {
        Alert.alert('Lỗi', data.message);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Lỗi', 'Không thể kết nối tới server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatedLinearGradient colors={[bgColor1, bgColor2]} style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
            <Animated.View style={[styles.logoContainer, { opacity: logoAnim, transform: [{ scale: logoAnim }] }]}>
              <Image source={require('../../../assets/icons/DNTN.png')} style={styles.logo} />
              <Text style={styles.title}>Đăng nhập</Text>
              <Text style={styles.subtitle}>Chào mừng bạn trở lại!</Text>
            </Animated.View>

            <View style={styles.form}>
              <View style={styles.inputWrapper}>
                <Ionicons name="person-outline" size={20} color="#666" style={styles.icon} />
                <TextInput
                  style={styles.input}
                  placeholder="Tên đăng nhập"
                  placeholderTextColor="#888"
                  value={username}
                  onChangeText={setUserName}
                  keyboardType="default"
                  autoCapitalize="none"
                />
              </View>

              <View style={styles.inputWrapper}>
                <Ionicons name="lock-closed-outline" size={20} color="#666" style={styles.icon} />
                <TextInput
                  style={styles.input}
                  placeholder="Mật khẩu"
                  placeholderTextColor="#888"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                />
                <TouchableOpacity style={styles.eyeIcon} onPress={() => setShowPassword(!showPassword)}>
                  <Ionicons name={showPassword ? 'eye-outline' : 'eye-off-outline'} size={20} color="#666" />
                </TouchableOpacity>
              </View>

              <TouchableOpacity style={styles.forgot}>
                <Text style={{ color: '#FF512F', fontWeight: '500' }}>Quên mật khẩu?</Text>
              </TouchableOpacity>

              {loading ? (
                <ActivityIndicator size="large" color="#FF512F" style={{ marginVertical: 10 }} />
              ) : (
                <GradientButton title="Đăng nhập" onPress={handleLogin} />
              )}

              <View style={styles.signupRow}>
                <Text style={{ color: '#555' }}>Chưa có tài khoản? </Text>
                <TouchableOpacity>
                  <Text style={{ color: '#FF512F', fontWeight: '600' }}>Đăng ký</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </AnimatedLinearGradient>
  );
}

const styles = StyleSheet.create({
  scrollContainer: { flexGrow: 1, justifyContent: 'flex-start', paddingHorizontal: 60, paddingVertical: 100 },
  logoContainer: { alignItems: 'center', marginBottom: 50, marginTop: 70 },
  logo: { width: 90, height: 90, resizeMode: 'contain', marginBottom: 10 },
  title: { fontSize: 28, fontWeight: '700', textAlign: 'center' },
  subtitle: { fontSize: 16, marginTop: 4, textAlign: 'center' },
  form: { width: '100%' },
  inputWrapper: { position: 'relative', flexDirection: 'row', alignItems: 'center', marginBottom: 16, zIndex: 1 },
  icon: { position: 'absolute', left: 14, zIndex: 2 },
  input: { flex: 1, padding: 14, paddingLeft: 40, borderWidth: 1, borderColor: '#ccc', borderRadius: 12, fontSize: 16, backgroundColor: '#fff' },
  eyeIcon: { position: 'absolute', right: 14, zIndex: 3 },
  forgot: { alignSelf: 'flex-end', marginBottom: 20 },
  signupRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 25 },
});
