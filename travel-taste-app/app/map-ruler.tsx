import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import RestaurantDetailSheet from '../components/RestaurantDetailSheet';
import FilterPanel from '../components/FilterPanel';
import { useRouter } from 'expo-router';

const STOPS = [
  { id: 1, name: 'Start', km: 0, isStop: false },
  { id: 2, name: 'Viewpoint', km: 12, isStop: false },
  { id: 3, name: 'Ella Rice & Curry House', km: 34, isStop: true, icon: 'restaurant' },
  { id: 4, name: 'Nine Arches Tea Kade', km: 56, isStop: true, icon: 'cafe' },
  { id: 5, name: 'Finish', km: 78, isStop: false },
];

const STATIC_MAP_URL =
  'https://maps.geoapify.com/v1/staticmap?' +
  'style=osm-carto&width=600&height=500' +
  '&center=lonlat:81.0,6.88&zoom=10' +
  '&geometry=polyline:80.7891,6.9497,81.0463,6.8290,81.0466,6.8667;linecolor:%23154212;linewidth:4' +
  '&marker=lonlat:81.0466,6.8667;color:%23ff8c00;size:large|lonlat:81.0463,6.8290;color:%23ff8c00;size:large' +
  '&apiKey=ccb11eb089a34c0fa0cb561446a7b904';


const TOTAL_DISTANCE = 78;
const SAMPLE_RESTAURANT = {
  name: 'Ella Rice & Curry House',
  rating: 4.7,
  reviews: 186,
  tags: ['Sri Lankan', '$$', 'Halal', 'Vegetarian', 'Parking Available'],
  distanceInfo: '12km ahead · 8 min detour',
  detourInfo: 'Optimized for your current hiking route',
  about:
    "A family-run roadside spot known for authentic rice and curry, kottu, and fresh king coconuts. A favorite refuel stop for hikers heading toward Little Adam's Peak, using locally grown vegetables and spices.",
  hours: [
    { day: 'Monday — Friday', time: '07:00 - 21:00' },
    { day: 'Saturday', time: '07:00 - 22:00' },
    { day: 'Sunday', time: 'Open now · 07:00 - 21:00', isOpen: true },
  ],
  image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800',
};

const CURRENT_PROGRESS_KM = 27;

export default function MapRulerScreen() {
  const router = useRouter();
  const [sheetVisible, setSheetVisible] = React.useState(false);
  const [filterVisible, setFilterVisible] = React.useState(false);
  const nextStop = STOPS.find((s) => s.isStop && s.km > CURRENT_PROGRESS_KM);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerTitle}>
            <Text style={{ color: '#2D5A27' }}>Travel</Text>
            <Text style={{ color: '#E67E22' }}>Taste</Text>
          </Text>
        </View>
        <View style={styles.avatar} />
      </View>

<View style={styles.mapSection}>
        <Image
          source={{ uri: STATIC_MAP_URL }}
          style={styles.map}
          resizeMode="cover"
        />

        <TouchableOpacity style={styles.filterFab} onPress={() => setFilterVisible(true)}>
          <Ionicons name="filter" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.rulerSection}>
        <View style={styles.rulerHeader}>
          <View>
            <Text style={styles.rulerTitle}>Trip Progress</Text>
            <Text style={styles.rulerSubtitle}>
              Mountain Ridge Trail • {TOTAL_DISTANCE}km Total
            </Text>
          </View>
          <View style={styles.liveBadge}>
            <Text style={styles.liveBadgeText}>Live</Text>
          </View>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.rulerScroll}>

          <View style={styles.rulerTrack}>
            <View style={styles.rulerLine} />
            <View
              style={[
                styles.rulerProgress,
                { width: `${(CURRENT_PROGRESS_KM / TOTAL_DISTANCE) * 100}%` },
              ]}
            />
            <View style={styles.rulerMarkers}>
              {STOPS.map((stop) => (
                <View key={stop.id} style={styles.markerColumn}>
                  <Text style={styles.markerLabel}>{stop.name}</Text>
                  <View
                    style={[
                      styles.markerDot,
                      stop.km <= CURRENT_PROGRESS_KM && styles.markerDotActive,
                    ]}
                  />
                  <Text
                    style={[
                      styles.markerKm,
                      stop.km <= CURRENT_PROGRESS_KM && styles.markerKmActive,
                    ]}
                  >
                    {stop.km}km
                  </Text>
                </View>
              ))}
              
            </View>
          </View>
        </ScrollView>

        {nextStop && (
          <TouchableOpacity style={styles.nextStopCard} onPress={() => setSheetVisible(true)}>
            <View style={styles.nextStopIcon}>
              <Ionicons name="restaurant" size={20} color="#663100" />
            </View>
            <View style={styles.nextStopInfo}>
              <Text style={styles.nextStopLabel}>
                NEXT STOP • {nextStop.km - CURRENT_PROGRESS_KM}KM AWAY
              </Text>
              <Text style={styles.nextStopName}>{nextStop.name}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#72796E" />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.navBar}>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/explore' as any)}>
          <Ionicons name="compass-outline" size={22} color="#72796E" />
          <Text style={styles.navLabel}>Explore</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItemActive}>
          <Ionicons name="map" size={22} color="#663100" />
          <Text style={styles.navLabelActive}>Route</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/saved' as any)}>
          <Ionicons name="heart-outline" size={22} color="#72796E" />
          <Text style={styles.navLabel}>Saved</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/profile' as any)}>
          <Ionicons name="person-outline" size={22} color="#72796E" />
          <Text style={styles.navLabel}>Profile</Text>
        </TouchableOpacity>
      </View>

      <RestaurantDetailSheet
        visible={sheetVisible}
        onClose={() => setSheetVisible(false)}
        restaurant={SAMPLE_RESTAURANT}
      />

      <FilterPanel
        visible={filterVisible}
        onClose={() => setFilterVisible(false)}
        onApply={(filters) => console.log('Filters applied:', filters)}
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
    backgroundColor: '#F7F9FF',
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  headerTitle: { fontSize: 20, fontWeight: '700' },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E3EFFF',
    borderWidth: 2,
    borderColor: '#BCF0AE',
  },
  mapSection: { flex: 6, position: 'relative' },
  map: { flex: 1, width: '100%', height: '100%' },
  filterFab: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#944A00',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  rulerSection: {
    flex: 4,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E9E2',
    paddingTop: 12,
  },
  rulerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  rulerTitle: { fontSize: 18, fontWeight: '700' },
  rulerSubtitle: { fontSize: 12, color: '#42493E', marginTop: 2 },
  liveBadge: {
    backgroundColor: '#2D5A27',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 999,
  },
  liveBadgeText: { color: '#9DD090', fontSize: 12, fontWeight: '600' },
  rulerScroll: { flexGrow: 0, marginBottom: 8 },
  rulerTrack: {
    minWidth: 600,
    paddingHorizontal: 32,
    justifyContent: 'center',
    position: 'relative',
  },
  rulerLine: {
    position: 'absolute',
    left: 32,
    right: 32,
    height: 3,
    backgroundColor: '#C2C9BB',
    top: 42,
    borderRadius: 2,
  },
  rulerProgress: {
    position: 'absolute',
    left: 32,
    height: 3,
    backgroundColor: '#154212',
    top: 42,
    borderRadius: 2,
  },
  rulerMarkers: { flexDirection: 'row' },
  markerColumn: { alignItems: 'center', minWidth: 110 },
  markerLabel: { fontSize: 11, color: '#42493E', marginBottom: 8 },
  markerDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#C2C9BB',
  },
  markerDotActive: {
    backgroundColor: '#154212',
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 3,
    borderColor: '#BCF0AE',
  },
  markerKm: { fontSize: 12, color: '#72796E', marginTop: 8 },
  markerKmActive: { color: '#154212', fontWeight: '700' },
  nextStopCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EDF4FF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E9E2',
    marginHorizontal: 16,
    padding: 12,
    gap: 12,
  },
  nextStopIcon: {
    backgroundColor: '#FFDCC5',
    padding: 10,
    borderRadius: 8,
  },
  nextStopInfo: { flex: 1 },
  nextStopLabel: { fontSize: 11, color: '#944A00', fontWeight: '600' },
  nextStopName: { fontSize: 15, fontWeight: '700', marginTop: 2 },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E9E2',
    paddingTop: 8,
    paddingBottom: 20,
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