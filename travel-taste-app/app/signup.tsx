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

export default function SignupScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSignup = () => {
    setError('');
    if (!name || !email || !password) {
      setError('Please fill in all fields');
      return;
    }
    if (!email.includes('@')) {
      setError('Please enter a valid email');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
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
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={22} color="#091D2E" />
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.title}>Create your account</Text>
        <Text style={styles.subtitle}>Join TravelTaste to save your favorite stops</Text>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Full Name</Text>
          <View style={styles.inputWithIcon}>
            <Ionicons name="person-outline" size={18} color="#72796E" />
            <TextInput
              style={styles.input}
              placeholder="Your name"
              placeholderTextColor="#C2C9BB"
              value={name}
              onChangeText={setName}
            />
          </View>
        </View>

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
              placeholder="At least 6 characters"
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

        <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
          <Text style={styles.signupButtonText}>Create Account</Text>
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

        <View style={styles.loginRow}>
          <Text style={styles.loginText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => router.push('/login' as any)}>
            <Text style={styles.loginLink}>Log in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F9FF' },
  backButton: { marginTop: 50, marginLeft: 16, width: 40 },
  content: { paddingHorizontal: 24, paddingTop: 16 },
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
  signupButton: {
    backgroundColor: '#154212',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 8,
  },
  signupButtonText: { color: '#FFFFFF', fontWeight: '700', fontSize: 16 },
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
  loginRow: { flexDirection: 'row', justifyContent: 'center' },
  loginText: { fontSize: 13, color: '#72796E' },
  loginLink: { fontSize: 13, color: '#154212', fontWeight: '700' },
});