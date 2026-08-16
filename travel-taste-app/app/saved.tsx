import React from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import RestaurantDetailSheet from '../components/RestaurantDetailSheet';

const SAVED_RESTAURANTS = [
  {
    id: 1,
    name: 'Ella Rice & Curry House',
    rating: 4.7,
    cuisine: 'Sri Lankan',
    distance: '12km ahead',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400',
  },
  {
    id: 2,
    name: 'Nine Arches Tea Kade',
    rating: 4.5,
    cuisine: 'Sri Lankan · Cafe',
    distance: '56km ahead',
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400',
  },
];

export default function SavedScreen() {
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
        <Text style={styles.pageTitle}>Saved Places</Text>
        <Text style={styles.pageSubtitle}>{SAVED_RESTAURANTS.length} places saved</Text>
      </View>

      {SAVED_RESTAURANTS.length === 0 ? (
        <View style={styles.emptyState}>
          <Ionicons name="heart-outline" size={48} color="#C2C9BB" />
          <Text style={styles.emptyText}>No saved places yet</Text>
          <Text style={styles.emptySubtext}>
            Tap the heart icon on any restaurant to save it here
          </Text>
        </View>
      ) : (
        <FlatList
          data={SAVED_RESTAURANTS}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() =>
                setSelectedRestaurant({
                  name: item.name,
                  rating: item.rating,
                  reviews: 150,
                  tags: [item.cuisine, '$$', 'Halal'],
                  distanceInfo: item.distance,
                  detourInfo: 'Optimized for your current hiking route',
                  about: `A favorite stop for hikers, known for great ${item.cuisine} food.`,
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
                <Text style={styles.cardName}>{item.name}</Text>
                <View style={styles.cardMetaRow}>
                  <Ionicons name="star" size={12} color="#FC8F34" />
                  <Text style={styles.cardMeta}>{item.rating}</Text>
                  <Text style={styles.cardDot}>·</Text>
                  <Text style={styles.cardMeta}>{item.cuisine}</Text>
                </View>
                <Text style={styles.cardDistance}>{item.distance}</Text>
              </View>
              <TouchableOpacity style={styles.heartButton}>
                <Ionicons name="heart" size={22} color="#944A00" />
              </TouchableOpacity>
            </TouchableOpacity>
          )}
        />
      )}

      <View style={styles.navBar}>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/explore' as any)}>
          <Ionicons name="compass-outline" size={22} color="#72796E" />
          <Text style={styles.navLabel}>Explore</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/map-ruler' as any)}>
          <Ionicons name="map-outline" size={22} color="#72796E" />
          <Text style={styles.navLabel}>Route</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItemActive}>
          <Ionicons name="heart" size={22} color="#663100" />
          <Text style={styles.navLabelActive}>Saved</Text>
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
  list: { paddingHorizontal: 16, paddingBottom: 100 },
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: '#E5E9E2',
    alignItems: 'center',
    gap: 12,
  },
  cardImage: { width: 70, height: 70, borderRadius: 12 },
  cardContent: { flex: 1 },
  cardName: { fontSize: 15, fontWeight: '700', marginBottom: 4 },
  cardMetaRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  cardMeta: { fontSize: 12, color: '#42493E' },
  cardDot: { color: '#C2C9BB', marginHorizontal: 2 },
  cardDistance: { fontSize: 12, color: '#944A00', marginTop: 4, fontWeight: '600' },
  heartButton: { padding: 8 },
  emptyState: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 40, gap: 8 },
  emptyText: { fontSize: 16, fontWeight: '600', color: '#42493E', marginTop: 8 },
  emptySubtext: { fontSize: 13, color: '#72796E', textAlign: 'center' },
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