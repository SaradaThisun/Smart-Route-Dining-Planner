import React from 'react';
import {
  Modal,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  visible: boolean;
  onClose: () => void;
  restaurant: {
    name: string;
    rating: number;
    reviews: number;
    tags: string[];
    distanceInfo: string;
    detourInfo: string;
    about: string;
    hours: { day: string; time: string; isOpen?: boolean }[];
    image: string;
  } | null;
};

export default function RestaurantDetailSheet({ visible, onClose, restaurant }: Props) {
  if (!restaurant) return null;

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          <TouchableOpacity style={styles.handleArea} onPress={onClose}>
            <View style={styles.dragHandle} />
          </TouchableOpacity>

          <ScrollView contentContainerStyle={styles.scrollContent}>
            <Image source={{ uri: restaurant.image }} style={styles.photo} />

            <View style={styles.content}>
              <View style={styles.titleRow}>
                <View>
                  <Text style={styles.title}>{restaurant.name}</Text>
                  <View style={styles.ratingRow}>
                    <Text style={styles.ratingText}>{restaurant.rating}</Text>
                    <Ionicons name="star" size={14} color="#FC8F34" />
                    <Text style={styles.reviewsText}>({restaurant.reviews} reviews)</Text>
                  </View>
                </View>
                <TouchableOpacity>
                  <Ionicons name="heart-outline" size={26} color="#944A00" />
                </TouchableOpacity>
              </View>

              <View style={styles.tagsRow}>
                {restaurant.tags.map((tag) => (
                  <View key={tag} style={styles.tag}>
                    <Text style={styles.tagText}>{tag}</Text>
                  </View>
                ))}
              </View>

              <View style={styles.infoBox}>
                <Ionicons name="navigate" size={20} color="#154212" />
                <View style={{ flex: 1 }}>
                  <Text style={styles.infoTitle}>{restaurant.distanceInfo}</Text>
                  <Text style={styles.infoSubtitle}>{restaurant.detourInfo}</Text>
                </View>
              </View>

              <View style={styles.section}>
                <View style={styles.sectionHeaderRow}>
                  <Ionicons name="time-outline" size={18} color="#42493E" />
                  <Text style={styles.sectionTitle}>Opening Hours</Text>
                </View>
                {restaurant.hours.map((h) => (
                  <View key={h.day} style={styles.hourRow}>
                    <Text style={styles.hourDay}>{h.day}</Text>
                    <Text style={[styles.hourTime, h.isOpen && styles.hourTimeOpen]}>
                      {h.time}
                    </Text>
                  </View>
                ))}
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>About</Text>
                <Text style={styles.aboutText}>{restaurant.about}</Text>
              </View>
            </View>
          </ScrollView>

          <View style={styles.bottomBar}>
            <TouchableOpacity style={styles.directionsButton}>
              <Ionicons name="navigate-circle-outline" size={20} color="#FFFFFF" />
              <Text style={styles.directionsText}>Directions</Text>
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
  sheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    height: '85%',
  },
  handleArea: { alignItems: 'center', paddingVertical: 12 },
  dragHandle: {
    width: 36,
    height: 5,
    borderRadius: 3,
    backgroundColor: 'rgba(0,0,0,0.15)',
  },
  scrollContent: { paddingBottom: 100 },
  photo: {
    width: '90%',
    alignSelf: 'center',
    height: 200,
    borderRadius: 16,
  },
  content: { paddingHorizontal: 24, marginTop: 20 },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  title: { fontSize: 22, fontWeight: '700' },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 },
  ratingText: { fontWeight: '700', fontSize: 14 },
  reviewsText: { color: '#42493E', fontSize: 13, marginLeft: 4 },
  tagsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 16 },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: '#E3EFFF',
    borderWidth: 1,
    borderColor: '#C2C9BB',
  },
  tagText: { fontSize: 12, color: '#42493E' },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 24,
    padding: 16,
    backgroundColor: '#EDF4FF',
    borderRadius: 12,
  },
  infoTitle: { fontWeight: '600', fontSize: 14 },
  infoSubtitle: { fontSize: 12, color: '#42493E', marginTop: 2 },
  section: { marginTop: 28 },
  sectionHeaderRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  sectionTitle: { fontSize: 16, fontWeight: '700' },
  hourRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  hourDay: { color: '#42493E', fontSize: 13 },
  hourTime: { fontWeight: '600', fontSize: 13 },
  hourTimeOpen: { color: '#944A00' },
  aboutText: { color: '#42493E', fontSize: 14, lineHeight: 22, marginTop: 4 },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  directionsButton: {
    backgroundColor: '#154212',
    paddingVertical: 16,
    borderRadius: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  directionsText: { color: '#FFFFFF', fontWeight: '700', fontSize: 16 },
});