import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = () => {
    setError('');
    if (!email || !password) {
      setError('Please fill in both fields');
      return;
    }
    if (!email.includes('@')) {
      setError('Please enter a valid email');
      return;
    }
    // Placeholder: real auth wired in later
    router.push('/route-input' as any);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.header}>
        <Text style={styles.logoText}>
          <Text style={{ color: '#2D5A27' }}>Travel</Text>
          <Text style={{ color: '#E67E22' }}>Taste</Text>
        </Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Welcome back</Text>
        <Text style={styles.subtitle}>Log in to save your favorite trail stops</Text>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email</Text>
          <View style={styles.inputWithIcon}>
            <Ionicons name="mail-outline" size={18} color="#72796E" />
            <TextInput
              style={styles.input}
              placeholder="you@example.com"
              placeholderTextColor="#C2C9BB"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Password</Text>
          <View style={styles.inputWithIcon}>
            <Ionicons name="lock-closed-outline" size={18} color="#72796E" />
            <TextInput
              style={styles.input}
              placeholder="••••••••"
              placeholderTextColor="#C2C9BB"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons
                name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                size={18}
                color="#72796E"
              />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.forgotLink}>
          <Text style={styles.forgotText}>Forgot password?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Log In</Text>
        </TouchableOpacity>

        <View style={styles.dividerRow}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>or</Text>
          <View style={styles.dividerLine} />
        </View>

        <TouchableOpacity style={styles.googleButton}>
          <Ionicons name="logo-google" size={18} color="#091D2E" />
          <Text style={styles.googleButtonText}>Continue with Google</Text>
        </TouchableOpacity>

        <View style={styles.signupRow}>
          <Text style={styles.signupText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => router.push('/signup' as any)}>
            <Text style={styles.signupLink}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F9FF' },
  header: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 20,
  },
  logoText: { fontSize: 22, fontWeight: '700' },
  content: { paddingHorizontal: 24, paddingTop: 20 },
  title: { fontSize: 26, fontWeight: '700', marginBottom: 6 },
  subtitle: { fontSize: 14, color: '#72796E', marginBottom: 24 },
  errorText: {
    color: '#BA1A1A',
    fontSize: 13,
    marginBottom: 12,
    backgroundColor: '#FFDAD6',
    padding: 10,
    borderRadius: 8,
  },
  inputGroup: { marginBottom: 16 },
  label: { fontSize: 12, color: '#42493E', marginBottom: 6, fontWeight: '500' },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#C2C9BB',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 4,
  },
  input: { flex: 1, paddingVertical: 12, fontSize: 14 },
  forgotLink: { alignSelf: 'flex-end', marginBottom: 24 },
  forgotText: { fontSize: 13, color: '#154212', fontWeight: '600' },
  loginButton: {
    backgroundColor: '#154212',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButtonText: { color: '#FFFFFF', fontWeight: '700', fontSize: 16 },
  dividerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  dividerLine: { flex: 1, height: 1, backgroundColor: '#E5E9E2' },
  dividerText: { marginHorizontal: 12, color: '#72796E', fontSize: 12 },
  googleButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E9E2',
    paddingVertical: 14,
    borderRadius: 14,
    marginBottom: 24,
  },
  googleButtonText: { fontSize: 14, fontWeight: '600', color: '#091D2E' },
  signupRow: { flexDirection: 'row', justifyContent: 'center' },
  signupText: { fontSize: 13, color: '#72796E' },
  signupLink: { fontSize: 13, color: '#154212', fontWeight: '700' },
});