import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
  ImageSourcePropType,
  TouchableOpacity,
  Modal,
  Linking,
  Alert,
} from 'react-native';

import SearchBar from '../../components/explore/SearchBar';
import CategoryCard from '../../components/explore/CategoryCard';
import SectionHeader from '../../components/explore/SectionHeader';
import PlaceCard from '../../components/explore/PlaceCard';
import { SafeAreaView } from 'react-native-safe-area-context';

import api from '../../services/api';

const banner = require('../../assets/images/banner.jpg');
const hotelImage = require('../../assets/images/hotel.jpg');
const restaurantImage = require('../../assets/images/restaurant.jpg');
const attractionImage = require('../../assets/images/attraction.jpg');
const cafeImage = require('../../assets/images/cafe.jpg');

// Keep local assets statically required so Metro can bundle them. The API can
// return either a filename (for example, "nilaveli.jpeg") or a full image URL.
const placeImages: Record<string, ImageSourcePropType> = {
  'hortain.jpeg': require('../../assets/images/hortain.jpeg'),
  'pizzahut.jpg': require('../../assets/images/pizzahut.jpg'),
  'nilaveli.jpeg': require('../../assets/images/nilaveli.jpeg'),
  'anuradhapura.jpg': require('../../assets/images/anuradhapura.jpg'),
  'polinnaruwa.jpg': require('../../assets/images/polinnaruwa.jpg'),
  'adamspeak.jpeg': require('../../assets/images/adamspeak.jpeg'),
  'hotel2.jpg': require('../../assets/images/hotel2.jpg'),
  'yala.jpeg': require('../../assets/images/yala.jpeg'),
  'hotel3.jpg': require('../../assets/images/hotel3.jpg'),
  'ravanafalls.jpg': require('../../assets/images/ravanafalls.jpg'),
  'hotel7.jpg': require('../../assets/images/hotel7.jpg'),
  'hotel6.jpg': require('../../assets/images/hotel6.jpg'),
  'attraction.jpg': require('../../assets/images/attraction.jpg'),
  'hotel4.jpg': require('../../assets/images/hotel4.jpg'),
  'hotel5.jpg': require('../../assets/images/hotel5.jpg'),
  'arugambay.jpeg': require('../../assets/images/arugambay.jpeg'),
  'hotel8.jpg': require('../../assets/images/hotel8.jpg'),
  'hotel9.jpg': require('../../assets/images/hotel9.jpg'),
  'gall fort.jpg': require('../../assets/images/gall fort.jpg'),
  'restaurant.jpg': require('../../assets/images/restaurant.jpg'),
  'java.jpg': require('../../assets/images/java.jpg'),
  'barista.jpg': require('../../assets/images/barista.jpg'),
  'ninearches.jpeg': require('../../assets/images/ninearches.jpeg'),
  'kalpitiya.jpeg': require('../../assets/images/kalpitiya.jpeg'),
  'resturent6.jpg': require('../../assets/images/resturent6.jpg'),
  'kfc.jpg': require('../../assets/images/kfc.jpg'),
  'cafe.jpg': require('../../assets/images/cafe.jpg'),
  'hotel10.jpg': require('../../assets/images/hotel10.jpg'),
  'resturent5.jpg': require('../../assets/images/resturent5.jpg'),
  'resturent4.jpg': require('../../assets/images/resturent4.jpg'),
  'hotel11.jpg': require('../../assets/images/hotel11.jpg'),
  'mountlavinia.jpeg': require('../../assets/images/mountlavinia.jpeg'),
  'minneriya.jpeg': require('../../assets/images/minneriya.jpeg'),
  'hotel.jpg': require('../../assets/images/hotel.jpg'),
  'burgerking.jpg': require('../../assets/images/burgerking.jpg'),
  'resturent3.jpg': require('../../assets/images/resturent3.jpg'),
  'resturent2.jpg': require('../../assets/images/resturent2.jpg'),
};

const placeImageMatches: Array<[string, string]> = [
  ['pizza hut', 'pizzahut.jpg'],
  ['kfc', 'kfc.jpg'],
  ['sigiriya', 'attraction.jpg'],
  ['nine arches', 'ninearches.jpeg'],
  ['java lounge', 'java.jpg'],
  ['barista', 'barista.jpg'],
  ['burger king', 'burgerking.jpg'],
  ['galle fort', 'gall fort.jpg'],
  ['yala', 'yala.jpeg'],
  ['mount lavinia', 'mountlavinia.jpeg'],
  ["adam's peak", 'adamspeak.jpeg'],
  ['horton plains', 'hortain.jpeg'],
  ['ravana falls', 'ravanafalls.jpg'],
  ['minneriya', 'minneriya.jpeg'],
  ['anuradhapura', 'anuradhapura.jpg'],
  ['nilaveli', 'nilaveli.jpeg'],
  ['polonnaruwa', 'polinnaruwa.jpg'],
  ['arugam bay', 'arugambay.jpeg'],
  ['kalpitiya', 'kalpitiya.jpeg'],
];

const fallbackImagesByType: Record<string, ImageSourcePropType[]> = {
  hotel: [
    placeImages['hotel.jpg'],
    placeImages['hotel2.jpg'],
    placeImages['hotel3.jpg'],
    placeImages['hotel4.jpg'],
    placeImages['hotel5.jpg'],
    placeImages['hotel6.jpg'],
    placeImages['hotel7.jpg'],
    placeImages['hotel8.jpg'],
    placeImages['hotel9.jpg'],
    placeImages['hotel10.jpg'],
    placeImages['hotel11.jpg'],
  ],
  restaurant: [
    placeImages['restaurant.jpg'],
    placeImages['pizzahut.jpg'],
    placeImages['kfc.jpg'],
    placeImages['burgerking.jpg'],
    placeImages['resturent2.jpg'],
    placeImages['resturent3.jpg'],
    placeImages['resturent4.jpg'],
    placeImages['resturent5.jpg'],
    placeImages['resturent6.jpg'],
  ],
  attraction: [
    placeImages['attraction.jpg'],
    placeImages['ninearches.jpeg'],
    placeImages['yala.jpeg'],
    placeImages['adamspeak.jpeg'],
    placeImages['hortain.jpeg'],
    placeImages['ravanafalls.jpg'],
    placeImages['minneriya.jpeg'],
    placeImages['anuradhapura.jpg'],
    placeImages['nilaveli.jpeg'],
    placeImages['polinnaruwa.jpg'],
    placeImages['arugambay.jpeg'],
    placeImages['kalpitiya.jpeg'],
    placeImages['gall fort.jpg'],
  ],
  cafe: [placeImages['cafe.jpg'], placeImages['java.jpg'], placeImages['barista.jpg']],
};

interface Place {
  _id: string;
  name: string;
  type: string;
  city: string;
  rating: number;
  priceRange: string;
  image: string;
  category?: string;
  description?: string;
  address?: string;
  openingHours?: string;
  latitude?: number;
  longitude?: number;
}

const ExploreScreen = () => {
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<{
    place: Place;
    image: ImageSourcePropType;
  } | null>(null);

  useEffect(() => {
    loadPlaces();
  }, []);

  const loadPlaces = async () => {
    try {
      const response = await api.get('/places');
      setPlaces(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const filterPlaces = (type: string) => {
    return places.filter(
      place =>
        place.type === type &&
        place.name.toLowerCase().includes(search.toLowerCase()),
    );
  };

  const showCategory = (type: string) =>
    selectedCategory === null || selectedCategory === type;

  const getImage = (type: string): ImageSourcePropType => {
    switch (type) {
      case 'hotel':
        return hotelImage;

      case 'restaurant':
        return restaurantImage;

      case 'attraction':
        return attractionImage;

      case 'cafe':
        return cafeImage;

      default:
        return banner;
    }
  };

  const getPlaceImage = (place: Place, fallbackIndex: number): ImageSourcePropType => {
    if (place.image) {
      const imageName = place.image
        .replace(/[?#].*$/, '')
        .split('/')
        .pop()
        ?.trim()
        .toLowerCase();
      const localImage = imageName
        ? placeImages[imageName] ||
          placeImages[`${imageName}.jpg`] ||
          placeImages[`${imageName}.jpeg`]
        : undefined;

      if (localImage) {
        return localImage;
      }

      if (/^https?:\/\//i.test(place.image)) {
        return {uri: place.image};
      }
    }

    const placeName = place.name.toLowerCase();
    const matchingAsset = placeImageMatches.find(([name]) =>
      placeName.includes(name),
    );
    if (matchingAsset) {
      return placeImages[matchingAsset[1]];
    }

    const fallbackImages = fallbackImagesByType[place.type];
    if (fallbackImages?.length) {
      return fallbackImages[fallbackIndex % fallbackImages.length];
    }

    return getImage(place.type);
  };

  const openPlaceDetails = (place: Place, index: number) => {
    setSelectedPlace({place, image: getPlaceImage(place, index)});
  };

  const openPlaceInMaps = async (place: Place) => {
    const hasCoordinates =
      place.latitude !== undefined && place.longitude !== undefined;
    const query = hasCoordinates
      ? `${place.latitude},${place.longitude}`
      : `${place.name}, ${place.city}`;
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

    try {
      await Linking.openURL(url);
    } catch (error) {
      Alert.alert('Error', 'Unable to open Google Maps.');
    }
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#1565C0" />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top']}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Image source={banner} style={styles.banner} />

        <View style={styles.header}>
          <Text style={styles.greeting}>👋 Good Morning</Text>

          <Text style={styles.title}>Explore Sri Lanka</Text>
        </View>

        <SearchBar value={search} onChangeText={setSearch} />

        <View style={styles.categories}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categories}
          >
            <CategoryCard
              emoji="🏨"
              title="Hotels"
              onPress={() => setSelectedCategory('hotel')}
              selected={selectedCategory === 'hotel'}
            />
            <CategoryCard
              emoji="🍽"
              title="Restaurants"
              onPress={() => setSelectedCategory('restaurant')}
              selected={selectedCategory === 'restaurant'}
            />
            <CategoryCard
              emoji="⭐"
              title="Attractions"
              onPress={() => setSelectedCategory('attraction')}
              selected={selectedCategory === 'attraction'}
            />
            <CategoryCard
              emoji="☕"
              title="Cafes"
              onPress={() => setSelectedCategory('cafe')}
              selected={selectedCategory === 'cafe'}
            />
          </ScrollView>
        </View>

        {selectedCategory !== null && (
          <View style={styles.showAllContainer}>
            <CategoryCard
              emoji="✕"
              title="Show All"
              onPress={() => setSelectedCategory(null)}
              selected={false}
              compact
            />
          </View>
        )}

        {showCategory('hotel') && <SectionHeader title="🏨 Hotels" />}

        {showCategory('hotel') && <FlatList
          horizontal
          data={filterPlaces('hotel')}
          keyExtractor={item => item._id}
          renderItem={({ item, index }) => (
            <PlaceCard place={item} image={getPlaceImage(item, index)} onPress={() => openPlaceDetails(item, index)} />
          )}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.list}
        />}

        {showCategory('restaurant') && <SectionHeader title="🍽 Restaurants" />}

        {showCategory('restaurant') && <FlatList
          horizontal
          data={filterPlaces('restaurant')}
          keyExtractor={item => item._id}
          renderItem={({ item, index }) => (
            <PlaceCard place={item} image={getPlaceImage(item, index)} onPress={() => openPlaceDetails(item, index)} />
          )}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.list}
        />}

        {showCategory('attraction') && <SectionHeader title="⭐ Attractions" />}

        {showCategory('attraction') && <FlatList
          horizontal
          data={filterPlaces('attraction')}
          keyExtractor={item => item._id}
          renderItem={({ item, index }) => (
            <PlaceCard place={item} image={getPlaceImage(item, index)} onPress={() => openPlaceDetails(item, index)} />
          )}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.list}
        />}

        {showCategory('cafe') && <SectionHeader title="☕ Cafes" />}

        {showCategory('cafe') && <FlatList
          horizontal
          data={filterPlaces('cafe')}
          keyExtractor={item => item._id}
          renderItem={({ item, index }) => (
            <PlaceCard place={item} image={getPlaceImage(item, index)} onPress={() => openPlaceDetails(item, index)} />
          )}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.list}
        />}

        <Modal
          visible={selectedPlace !== null}
          transparent
          animationType="fade"
          onRequestClose={() => setSelectedPlace(null)}
        >
          {selectedPlace && (
            <View style={styles.modalBackdrop}>
              <View style={styles.placeModal}>
                <Image source={selectedPlace.image} style={styles.modalImage} />
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setSelectedPlace(null)}
                  accessibilityLabel="Close place details"
                >
                  <Text style={styles.closeButtonText}>×</Text>
                </TouchableOpacity>
                <Text style={styles.modalPlaceName}>{selectedPlace.place.name}</Text>
                <Text style={styles.modalRating}>
                  ⭐ {selectedPlace.place.rating}  •  {selectedPlace.place.priceRange}
                </Text>
                <Text style={styles.modalDetail}>📍 {selectedPlace.place.city}</Text>
                <Text style={styles.modalDetail}>
                  🍽 {selectedPlace.place.category || selectedPlace.place.type}
                </Text>
                {selectedPlace.place.openingHours && (
                  <Text style={styles.modalDetail}>🕒 {selectedPlace.place.openingHours}</Text>
                )}
                {selectedPlace.place.address && (
                  <Text style={styles.modalDetail}>🏠 {selectedPlace.place.address}</Text>
                )}
                {selectedPlace.place.description && (
                  <Text style={styles.modalDescription}>{selectedPlace.place.description}</Text>
                )}
                <TouchableOpacity
                  style={styles.goButton}
                  onPress={() => openPlaceInMaps(selectedPlace.place)}
                >
                  <Text style={styles.goButtonText}>GO</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ExploreScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },

  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  banner: {
    width: '100%',
    height: 220,
  },

  header: {
    paddingHorizontal: 20,
    marginTop: 20,
  },

  greeting: {
    fontSize: 16,
    color: '#666',
  },

  title: {
    fontSize: 30,
    fontWeight: '700',
    color: '#1565C0',
    marginTop: 5,
  },

  categories: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    gap: 15,
  },

  showAllContainer: {
    marginHorizontal: 20,
    marginTop: 4,
    marginBottom: 8,
  },

  list: {
    paddingHorizontal: 20,
    paddingBottom: 10,
  },

  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    justifyContent: 'center',
    padding: 20,
  },

  placeModal: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    overflow: 'hidden',
    paddingBottom: 22,
  },

  modalImage: {
    width: '100%',
    height: 190,
  },

  closeButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 28,
    lineHeight: 30,
  },

  modalPlaceName: {
    fontSize: 23,
    fontWeight: '700',
    color: '#1F2937',
    marginTop: 18,
    marginHorizontal: 20,
    marginRight: 60,
  },

  modalRating: {
    color: '#F59E0B',
    fontWeight: '700',
    marginTop: 8,
    marginHorizontal: 20,
  },

  modalDetail: {
    color: '#4B5563',
    marginTop: 9,
    marginHorizontal: 20,
  },

  modalDescription: {
    color: '#374151',
    lineHeight: 21,
    marginTop: 14,
    marginHorizontal: 20,
  },

  goButton: {
    backgroundColor: '#1565C0',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 13,
    marginTop: 20,
    marginHorizontal: 20,
  },

  goButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});
