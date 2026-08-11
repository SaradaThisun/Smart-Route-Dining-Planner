import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  FlatList,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const CUISINES = ['Italian', 'Mexican', 'Burgers', 'Japanese', 'Vegan'];
const BUDGETS = ['$', '$$', '$$$'];
const MEALS = ['Breakfast', 'Lunch', 'Dinner', 'Snacks'];

export default function RouteInputScreen() {
  const router = useRouter();
  const [startPoint, setStartPoint] = useState('');
  const [destination, setDestination] = useState('');
  const [startSuggestions, setStartSuggestions] = useState<any[]>([]);
  const [destSuggestions, setDestSuggestions] = useState<any[]>([]);
  const [selectedCuisine, setSelectedCuisine] = useState<string | null>(null);
  const [selectedBudget, setSelectedBudget] = useState<string | null>(null);
  const [selectedMeal, setSelectedMeal] = useState<string | null>(null);

  const searchPlaces = async (query: string, isStart: boolean) => {
    if (query.length < 3) {
      isStart ? setStartSuggestions([]) : setDestSuggestions([]);
      return;
    }
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          query
        )}&countrycodes=lk&format=json&limit=5`,
        {
          headers: { 'User-Agent': 'TravelTasteApp/1.0' },
        }
      );
      const data = await res.json();
      isStart ? setStartSuggestions(data) : setDestSuggestions(data);
    } catch (err) {
      console.log('Places search error:', err);
    }
  };

  const handleStartChange = (text: string) => {
    setStartPoint(text);
    searchPlaces(text, true);
  };

  const handleDestChange = (text: string) => {
    setDestination(text);
    searchPlaces(text, false);
  };

  const selectStartSuggestion = (place: any) => {
    setStartPoint(place.display_name);
    setStartSuggestions([]);
  };

  const selectDestSuggestion = (place: any) => {
    setDestination(place.display_name);
    setDestSuggestions([]);
  };

  const Chip = ({
    label,
    selected,
    onPress,
  }: {
    label: string;
    selected: boolean;
    onPress: () => void;
  }) => (
    <TouchableOpacity
      style={[styles.chip, selected && styles.chipSelected]}
      onPress={onPress}
    >
      <Text style={[styles.chipText, selected && styles.chipTextSelected]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image
            source={{
              uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDWYCGlvmUdAkisn43mjBMLRj_UTyHc0pYPcIgDn9z7TPSELiYPSP-uzYqVlMGhGotK7MCSh64pGllxudZ7AXGt2pRCf42BaB0WaMk6_MFvRaWdlYRZUZIA1qoJ84-ZWtCJ9fbgAsOSPyzu4QbJ2mYrTDfg3tV5kX7KtPB7pDmUChkX0fJ9qjH0UdQtN8Wr1rbZ7ixcHlNg19CpfBm1g73lsATDJvFcNkz-ScE7p4O_XVCh7EQoSls6w',
            }}
            style={styles.logo}
          />
          <Text style={styles.headerTitle}>
            <Text style={{ color: '#2D5A27' }}>Travel</Text>
            <Text style={{ color: '#E67E22' }}>Taste</Text>
          </Text>
        </View>
        <View style={styles.avatar} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.pageTitle}>Plan Your Journey</Text>

        {/* Route Input Card */}
        <View style={styles.card}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Starting Point</Text>
            <View style={styles.inputWithIcon}>
              <Ionicons name="ellipse" size={10} color="#154212" />
              <TextInput
                style={styles.inputInner}
                placeholder="Current Location"
                placeholderTextColor="#C2C9BB"
                value={startPoint}
                onChangeText={handleStartChange}
              />
            </View>
            {startSuggestions.length > 0 && (
              <View style={styles.suggestionBox}>
                {startSuggestions.map((item) => (
                  <TouchableOpacity
                    key={item.place_id}
                    style={styles.suggestionItem}
                    onPress={() => selectStartSuggestion(item)}
                  >
                    <Ionicons name="location-outline" size={16} color="#72796E" />
                    <Text style={styles.suggestionText} numberOfLines={2}>
                      {item.display_name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Destination</Text>
            <View style={styles.inputWithIcon}>
              <Ionicons name="location" size={14} color="#944A00" />
              <TextInput
                style={styles.inputInner}
                placeholder="Where to?"
                placeholderTextColor="#C2C9BB"
                value={destination}
                onChangeText={handleDestChange}
              />
            </View>
            {destSuggestions.length > 0 && (
              <View style={styles.suggestionBox}>
                {destSuggestions.map((item) => (
                  <TouchableOpacity
                    key={item.place_id}
                    style={styles.suggestionItem}
                    onPress={() => selectDestSuggestion(item)}
                  >
                    <Ionicons name="location-outline" size={16} color="#72796E" />
                    <Text style={styles.suggestionText} numberOfLines={2}>
                      {item.display_name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        </View>

        {/* Cuisine */}
        <Text style={styles.sectionTitle}>CUISINE TYPE</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipRow}>
          {CUISINES.map((c) => (
            <Chip
              key={c}
              label={c}
              selected={selectedCuisine === c}
              onPress={() => setSelectedCuisine(c)}
            />
          ))}
        </ScrollView>

        {/* Budget */}
        <Text style={styles.sectionTitle}>BUDGET RANGE</Text>
        <View style={styles.budgetRow}>
          {BUDGETS.map((b) => (
            <TouchableOpacity
              key={b}
              style={[
                styles.budgetChip,
                selectedBudget === b && styles.chipSelected,
              ]}
              onPress={() => setSelectedBudget(b)}
            >
              <Text
                style={[
                  styles.chipText,
                  selectedBudget === b && styles.chipTextSelected,
                ]}
              >
                {b}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Meal Type */}
        <Text style={styles.sectionTitle}>MEAL TYPE</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipRow}>
          {MEALS.map((m) => (
            <Chip
              key={m}
              label={m}
              selected={selectedMeal === m}
              onPress={() => setSelectedMeal(m)}
            />
          ))}
        </ScrollView>

        {/* Route Preview */}
        <View style={styles.previewCard}>
          <Text style={styles.previewText}>
            🍽️ Discover 12 stops matching your taste
          </Text>
        </View>
      </ScrollView>

      {/* Fixed Bottom Section (CTA + Nav) */}
      <View style={styles.fixedBottom}>
        <TouchableOpacity
          style={styles.ctaButton}
          onPress={() => router.push('/map-ruler' as any)}
        >
          <Text style={styles.ctaText}>Find Stops Along My Route</Text>
        </TouchableOpacity>

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
          <TouchableOpacity style={styles.navItem}onPress={() => router.push('/profile' as any)}>
            <Ionicons name="person-outline" size={22} color="#72796E" />
            <Text style={styles.navLabel}>Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
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
  logo: { width: 32, height: 32 },
  headerTitle: { fontSize: 20, fontWeight: '700' },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E3EFFF',
    borderWidth: 2,
    borderColor: '#BCF0AE',
  },
  scroll: { flex: 1 },
  scrollContent: { padding: 16, paddingBottom: 220 },
  pageTitle: { fontSize: 26, fontWeight: '700', marginBottom: 16 },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#E5E9E2',
  },
  inputGroup: { marginBottom: 12 },
  label: { fontSize: 12, color: '#42493E', marginBottom: 4, fontWeight: '500' },
  input: {
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: '#C2C9BB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: '#C2C9BB',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  inputInner: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 14,
  },
  suggestionBox: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E9E2',
    borderRadius: 8,
    marginTop: 4,
    overflow: 'hidden',
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  suggestionText: { fontSize: 13, flex: 1, color: '#091D2E' },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1,
    color: '#091D2E',
    marginBottom: 8,
    marginTop: 4,
  },
  chipRow: { marginBottom: 20 },
  chip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#C2C9BB',
    backgroundColor: '#FFFFFF',
    marginRight: 8,
  },
  chipSelected: {
    backgroundColor: '#FC8F34',
    borderColor: '#FC8F34',
  },
  chipText: { fontSize: 14, fontWeight: '600', color: '#091D2E' },
  chipTextSelected: { color: '#663100' },
  budgetRow: { flexDirection: 'row', gap: 8, marginBottom: 20 },
  budgetChip: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#C2C9BB',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  previewCard: {
    height: 100,
    borderRadius: 16,
    backgroundColor: '#EDF4FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  previewText: { fontSize: 13, color: '#091D2E' },
fixedBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
  },
ctaButton: {
    backgroundColor: '#2D5A27',
    paddingVertical: 16,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginHorizontal: 16,
    marginTop: 8,
  },
  ctaText: { color: '#9DD090', fontSize: 16, fontWeight: '700' },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E9E2',
    paddingTop: 8,
    paddingBottom: 30,
  },
  navItem: {
    alignItems: 'center',
    gap: 2,
  },
  navItemActive: {
    alignItems: 'center',
    gap: 2,
    backgroundColor: '#FC8F34',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 999,
  },
  navIcon: { fontSize: 20 },
  navLabel: { fontSize: 11, color: '#72796E' },
  navLabelActive: { fontSize: 11, color: '#663100', fontWeight: '600' },
});