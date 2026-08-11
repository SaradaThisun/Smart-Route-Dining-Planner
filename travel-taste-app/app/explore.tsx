import React from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import RestaurantDetailSheet from '../components/RestaurantDetailSheet';

const ALL_RESTAURANTS = [
  {
    id: 1,
    name: 'Ella Rice & Curry House',
    rating: 4.7,
    cuisine: 'Sri Lankan',
    price: '$$',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400',
  },
  {
    id: 2,
    name: 'Nine Arches Tea Kade',
    rating: 4.5,
    cuisine: 'Sri Lankan · Cafe',
    price: '$',
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400',
  },
  {
    id: 3,
    name: 'Kandy Spice Kitchen',
    rating: 4.6,
    cuisine: 'Sri Lankan · Indian',
    price: '$$',
    image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400',
  },
  {
    id: 4,
    name: 'Mountain View Bakery',
    rating: 4.3,
    cuisine: 'Bakery · Snacks',
    price: '$',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400',
  },
];

export default function ExploreScreen() {
  const router = useRouter();
  const [selectedRestaurant, setSelectedRestaurant] = React.useState<any>(null);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          <Text style={{ color: '#2D5A27' }}>Travel</Text>
          <Text style={{ color: '#E67E22' }}>Taste</Text>
        </Text>
        <View style={styles.avatar} />
      </View>

      <View style={styles.titleRow}>
        <Text style={styles.pageTitle}>Explore</Text>
        <Text style={styles.pageSubtitle}>Popular spots hikers love</Text>
      </View>

      <FlatList
        data={ALL_RESTAURANTS}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.list}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              setSelectedRestaurant({
                name: item.name,
                rating: item.rating,
                reviews: 120,
                tags: [item.cuisine, item.price, 'Halal'],
                distanceInfo: 'Add a route to see distance',
                detourInfo: 'Plan a journey to check detour time',
                about: `A popular ${item.cuisine} spot loved by travelers passing through.`,
                hours: [
                  { day: 'Monday — Friday', time: '07:00 - 21:00' },
                  { day: 'Saturday', time: '07:00 - 22:00' },
                  { day: 'Sunday', time: 'Open now · 07:00 - 21:00', isOpen: true },
                ],
                image: item.image,
              })
            }
          >
            <Image source={{ uri: item.image }} style={styles.cardImage} />
            <View style={styles.cardContent}>
              <Text style={styles.cardName} numberOfLines={1}>{item.name}</Text>
              <View style={styles.cardMetaRow}>
                <Ionicons name="star" size={11} color="#FC8F34" />
                <Text style={styles.cardMeta}>{item.rating}</Text>
                <Text style={styles.cardDot}>·</Text>
                <Text style={styles.cardMeta}>{item.price}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />

      <View style={styles.navBar}>
        <TouchableOpacity style={styles.navItemActive}>
          <Ionicons name="compass" size={22} color="#663100" />
          <Text style={styles.navLabelActive}>Explore</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/route-input' as any)}>
          <Ionicons name="map-outline" size={22} color="#72796E" />
          <Text style={styles.navLabel}>Route</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/saved' as any)}>
          <Ionicons name="heart-outline" size={22} color="#72796E" />
          <Text style={styles.navLabel}>Saved</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}onPress={() => router.push('/profile' as any)}>
          <Ionicons name="person-outline" size={22} color="#72796E" />
          <Text style={styles.navLabel}>Profile</Text>
        </TouchableOpacity>
      </View>

      <RestaurantDetailSheet
        visible={!!selectedRestaurant}
        onClose={() => setSelectedRestaurant(null)}
        restaurant={selectedRestaurant}
      />
    </View>
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
  headerTitle: { fontSize: 20, fontWeight: '700' },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E3EFFF',
    borderWidth: 2,
    borderColor: '#BCF0AE',
  },
  titleRow: { paddingHorizontal: 16, marginBottom: 16 },
  pageTitle: { fontSize: 26, fontWeight: '700' },
  pageSubtitle: { fontSize: 13, color: '#72796E', marginTop: 4 },
  list: { paddingHorizontal: 12, paddingBottom: 100 },
  row: { justifyContent: 'space-between', paddingHorizontal: 4 },
  card: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E9E2',
    overflow: 'hidden',
  },
  cardImage: { width: '100%', height: 100 },
  cardContent: { padding: 10 },
  cardName: { fontSize: 13, fontWeight: '700', marginBottom: 4 },
  cardMetaRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  cardMeta: { fontSize: 11, color: '#42493E' },
  cardDot: { color: '#C2C9BB', marginHorizontal: 2 },
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