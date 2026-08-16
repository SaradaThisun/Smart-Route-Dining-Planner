import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Switch,
} from 'react-native';
import Slider from '@react-native-community/slider';
import { Ionicons } from '@expo/vector-icons';

const CUISINES = ['Sri Lankan', 'Indian', 'Chinese', 'Italian', 'Thai', 'Mediterranean'];
const DIETARY = ['Vegetarian', 'Vegan', 'Halal'];

type Props = {
  visible: boolean;
  onClose: () => void;
  onApply: (filters: any) => void;
};

export default function FilterPanel({ visible, onClose, onApply }: Props) {
  const [budget, setBudget] = useState(3);
  const [distance, setDistance] = useState(5);
  const [rating, setRating] = useState(4.0);
  const [selectedDietary, setSelectedDietary] = useState<string[]>([]);
  const [selectedCuisine, setSelectedCuisine] = useState<string | null>(null);
  const [familyFriendly, setFamilyFriendly] = useState(false);
  const [parkingAvailable, setParkingAvailable] = useState(true);

  const toggleDietary = (item: string) => {
    setSelectedDietary((prev) =>
      prev.includes(item) ? prev.filter((d) => d !== item) : [...prev, item]
    );
  };

  const handleReset = () => {
    setBudget(3);
    setDistance(5);
    setRating(4.0);
    setSelectedDietary([]);
    setSelectedCuisine(null);
    setFamilyFriendly(false);
    setParkingAvailable(true);
  };

  const handleApply = () => {
    onApply({
      budget,
      distance,
      rating,
      dietary: selectedDietary,
      cuisine: selectedCuisine,
      familyFriendly,
      parkingAvailable,
    });
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.panel}>
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="#091D2E" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Filters</Text>
            <TouchableOpacity onPress={handleReset}>
              <Text style={styles.resetText}>Reset</Text>
            </TouchableOpacity>
          </View>

          <ScrollView contentContainerStyle={styles.scrollContent}>
            <View style={styles.section}>
              <View style={styles.sectionHeaderRow}>
                <Text style={styles.sectionLabel}>BUDGET RANGE</Text>
                <Text style={styles.sectionValue}>{'$'.repeat(budget)}</Text>
              </View>
              <Slider
                minimumValue={1}
                maximumValue={4}
                step={1}
                value={budget}
                onValueChange={setBudget}
                minimumTrackTintColor="#154212"
                maximumTrackTintColor="#C2C9BB"
                thumbTintColor="#154212"
              />
            </View>

            <View style={styles.section}>
              <View style={styles.sectionHeaderRow}>
                <Text style={styles.sectionLabel}>DISTANCE FROM ROUTE</Text>
                <Text style={styles.sectionValue}>{distance} km</Text>
              </View>
              <Slider
                minimumValue={1}
                maximumValue={25}
                step={1}
                value={distance}
                onValueChange={setDistance}
                minimumTrackTintColor="#154212"
                maximumTrackTintColor="#C2C9BB"
                thumbTintColor="#154212"
              />
            </View>

            <View style={styles.section}>
              <View style={styles.sectionHeaderRow}>
                <Text style={styles.sectionLabel}>RATING MINIMUM</Text>
                <View style={styles.ratingRow}>
                  <Text style={styles.sectionValue}>{rating.toFixed(1)}</Text>
                  <Ionicons name="star" size={16} color="#944A00" />
                </View>
              </View>
              <Slider
                minimumValue={1}
                maximumValue={5}
                step={0.1}
                value={rating}
                onValueChange={setRating}
                minimumTrackTintColor="#154212"
                maximumTrackTintColor="#C2C9BB"
                thumbTintColor="#154212"
              />
            </View>

            <View style={styles.divider} />

            <View style={styles.section}>
              <Text style={styles.sectionLabel}>DIETARY PREFERENCE</Text>
              {DIETARY.map((item) => (
                <TouchableOpacity
                  key={item}
                  style={styles.checkRow}
                  onPress={() => toggleDietary(item)}
                >
                  <Text style={styles.checkLabel}>{item}</Text>
                  <View
                    style={[
                      styles.checkbox,
                      selectedDietary.includes(item) && styles.checkboxChecked,
                    ]}
                  >
                    {selectedDietary.includes(item) && (
                      <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionLabel}>CUISINE TYPE</Text>
              <View style={styles.chipWrap}>
                {CUISINES.map((c) => (
                  <TouchableOpacity
                    key={c}
                    style={[
                      styles.cuisineChip,
                      selectedCuisine === c && styles.cuisineChipSelected,
                    ]}
                    onPress={() => setSelectedCuisine(c)}
                  >
                    <Text
                      style={[
                        styles.cuisineChipText,
                        selectedCuisine === c && styles.cuisineChipTextSelected,
                      ]}
                    >
                      {c}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionLabel}>FEATURES</Text>
              <View style={styles.switchRow}>
                <Text style={styles.checkLabel}>Family-friendly</Text>
                <Switch
                  value={familyFriendly}
                  onValueChange={setFamilyFriendly}
                  trackColor={{ false: '#E5E9E2', true: '#9DD090' }}
                  thumbColor="#FFFFFF"
                />
              </View>
              <View style={styles.switchRow}>
                <Text style={styles.checkLabel}>Parking available</Text>
                <Switch
                  value={parkingAvailable}
                  onValueChange={setParkingAvailable}
                  trackColor={{ false: '#E5E9E2', true: '#9DD090' }}
                  thumbColor="#FFFFFF"
                />
              </View>
            </View>
          </ScrollView>

          <View style={styles.footer}>
            <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
              <Text style={styles.applyText}>Apply Filters</Text>
              <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-end',
  },
  panel: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    height: '90%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#154212' },
  resetText: { color: '#154212', fontWeight: '600', fontSize: 14 },
  scrollContent: { padding: 20, paddingBottom: 40 },
  section: { marginBottom: 28 },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1,
    color: '#42493E',
    marginBottom: 8,
  },
  sectionValue: { fontSize: 14, fontWeight: '700', color: '#154212' },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  divider: { height: 1, backgroundColor: '#F0F0F0', marginVertical: 8 },
  checkRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderWidth: 1,
    borderColor: '#E5E9E2',
    borderRadius: 12,
    marginBottom: 8,
  },
  checkLabel: { fontSize: 14, color: '#091D2E' },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#C2C9BB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#154212',
    borderColor: '#154212',
  },
  chipWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  cuisineChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#C2C9BB',
    backgroundColor: '#FFFFFF',
  },
  cuisineChipSelected: {
    backgroundColor: '#154212',
    borderColor: '#154212',
  },
  cuisineChipText: { fontSize: 13, color: '#091D2E', fontWeight: '600' },
  cuisineChipTextSelected: { color: '#FFFFFF' },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  applyButton: {
    backgroundColor: '#154212',
    paddingVertical: 16,
    borderRadius: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  applyText: { color: '#FFFFFF', fontWeight: '700', fontSize: 16 },
});