import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const MENU_ITEMS = [
  { icon: 'person-outline', label: 'Edit Profile' },
  { icon: 'notifications-outline', label: 'Notifications' },
  { icon: 'restaurant-outline', label: 'Dietary Preferences' },
  { icon: 'card-outline', label: 'Budget Settings' },
  { icon: 'help-circle-outline', label: 'Help & Support' },
  { icon: 'document-text-outline', label: 'Terms & Privacy' },
];

export default function ProfileScreen() {
  const router = useRouter();

  const handleLogout = () => {
    router.push('/login' as any);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          <Text style={{ color: '#2D5A27' }}>Travel</Text>
          <Text style={{ color: '#E67E22' }}>Taste</Text>
        </Text>
      </View>

      <View style={styles.profileCard}>
        <View style={styles.avatarLarge}>
            
          <Text style={styles.avatarInitial}>V</Text>
        </View>
        <Text style={styles.userName}>Vinura Sandaruwan</Text>
        <Text style={styles.userEmail}>vinura@example.com</Text>

        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>2</Text>
            <Text style={styles.statLabel}>Saved</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>5</Text>
            <Text style={styles.statLabel}>Trips</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Reviews</Text>
          </View>
        </View>
      </View>

      <View style={styles.menuList}>
        {MENU_ITEMS.map((item) => (
          <TouchableOpacity
            key={item.label}
            style={styles.menuItem}
            onPress={() => {
              if (item.label === 'Edit Profile') router.push('/edit-profile' as any);
            }}
          >
            <View style={styles.menuLeft}>
              <Ionicons name={item.icon as any} size={20} color="#42493E" />
              <Text style={styles.menuLabel}>{item.label}</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#C2C9BB" />
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={20} color="#BA1A1A" />
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>

      <View style={styles.navBar}>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/explore' as any)}>
          <Ionicons name="compass-outline" size={22} color="#72796E" />
          <Text style={styles.navLabel}>Explore</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/route-input' as any)}>
          <Ionicons name="map-outline" size={22} color="#72796E" />
          <Text style={styles.navLabel}>Route</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/saved' as any)}>
          <Ionicons name="heart-outline" size={22} color="#72796E" />
          <Text style={styles.navLabel}>Saved</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItemActive}>
          <Ionicons name="person" size={22} color="#663100" />
          <Text style={styles.navLabelActive}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F9FF' },
  header: {
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 12,
  },
  headerTitle: { fontSize: 20, fontWeight: '700' },
  profileCard: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: '#E5E9E2',
    marginBottom: 20,
  },
avatarLarge: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#E3EFFF',
    borderWidth: 3,
    borderColor: '#BCF0AE',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarInitial: { fontSize: 28, fontWeight: '700', color: '#154212' },
  userName: { fontSize: 18, fontWeight: '700' },
  userEmail: { fontSize: 13, color: '#72796E', marginTop: 2, marginBottom: 16 },
  statsRow: { flexDirection: 'row', alignItems: 'center', width: '100%' },
  statItem: { flex: 1, alignItems: 'center' },
  statNumber: { fontSize: 18, fontWeight: '700', color: '#154212' },
  statLabel: { fontSize: 12, color: '#72796E', marginTop: 2 },
  statDivider: { width: 1, height: 30, backgroundColor: '#E5E9E2' },
  menuList: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E9E2',
    marginBottom: 20,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  menuLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  menuLabel: { fontSize: 14, color: '#091D2E' },
  logoutButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#FFDAD6',
    backgroundColor: '#FFF5F4',
  },
  logoutText: { color: '#BA1A1A', fontWeight: '700', fontSize: 14 },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E9E2',
    paddingTop: 8,
    paddingBottom: 20,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  navItem: { alignItems: 'center', gap: 2 },
  navItemActive: {
    alignItems: 'center',
    gap: 2,
    backgroundColor: '#FC8F34',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 999,
  },
  navLabel: { fontSize: 11, color: '#72796E' },
  navLabelActive: { fontSize: 11, color: '#663100', fontWeight: '600' },
});