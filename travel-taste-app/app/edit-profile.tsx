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

export default function EditProfileScreen() {
  const router = useRouter();
  const [name, setName] = useState('Vinura Rajapaksha');
  const [email, setEmail] = useState('vinura@example.com');
  const [phone, setPhone] = useState('');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    // Note: not yet connected to backend — changes won't persist after reload
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const initial = name.trim().charAt(0).toUpperCase() || '?';

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color="#091D2E" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <View style={{ width: 22 }} />
      </View>

      <View style={styles.avatarSection}>
        <View style={styles.avatarLarge}>
          <Text style={styles.avatarInitial}>{initial}</Text>
        </View>
        <TouchableOpacity style={styles.changePhotoButton}>
          <Ionicons name="camera-outline" size={16} color="#154212" />
          <Text style={styles.changePhotoText}>Change Photo</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {saved && (
          <View style={styles.savedBanner}>
            <Ionicons name="checkmark-circle" size={18} color="#154212" />
            <Text style={styles.savedText}>Profile updated</Text>
          </View>
        )}

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Full Name</Text>
          <View style={styles.inputWithIcon}>
            <Ionicons name="person-outline" size={18} color="#72796E" />
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Your name"
              placeholderTextColor="#C2C9BB"
            />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email</Text>
          <View style={styles.inputWithIcon}>
            <Ionicons name="mail-outline" size={18} color="#72796E" />
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="you@example.com"
              placeholderTextColor="#C2C9BB"
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Phone Number</Text>
          <View style={styles.inputWithIcon}>
            <Ionicons name="call-outline" size={18} color="#72796E" />
            <TextInput
              style={styles.input}
              value={phone}
              onChangeText={setPhone}
              placeholder="+94 7X XXX XXXX"
              placeholderTextColor="#C2C9BB"
              keyboardType="phone-pad"
            />
          </View>
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F9FF' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 12,
  },
  headerTitle: { fontSize: 17, fontWeight: '700' },
  avatarSection: { alignItems: 'center', marginBottom: 20 },
  avatarLarge: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: '#E3EFFF',
    borderWidth: 3,
    borderColor: '#BCF0AE',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatarInitial: { fontSize: 32, fontWeight: '700', color: '#154212' },
  changePhotoButton: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  changePhotoText: { color: '#154212', fontWeight: '600', fontSize: 13 },
  content: { paddingHorizontal: 24 },
  savedBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#E3EFFF',
    padding: 12,
    borderRadius: 10,
    marginBottom: 16,
  },
  savedText: { color: '#154212', fontWeight: '600', fontSize: 13 },
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
  saveButton: {
    backgroundColor: '#154212',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  saveButtonText: { color: '#FFFFFF', fontWeight: '700', fontSize: 16 },
});