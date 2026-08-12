import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@react-native-vector-icons/ionicons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

const SplashScreen = ({ navigation }: Props) => {
  useEffect(() => {
    const timer = setTimeout(() => navigation.replace('Login'), 1800);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.background}>
        <View style={styles.glowTop} />
        <View style={styles.glowBottom} />

        <View style={styles.content}>
          <View style={styles.logoCircle}>
            <Ionicons name="map" size={54} color="#0B4773" />
            <View style={styles.pinBadge}>
              <Ionicons name="location" size={21} color="#FFFFFF" />
            </View>
          </View>

          <Text style={styles.brandTravel}>
            Travel<Text style={styles.brandTaste}>Taste</Text>
          </Text>
          <Text style={styles.tagline}>
            Taste the journey. Discover Sri Lanka.
          </Text>

          <View style={styles.loadingRow}>
            <View style={styles.loadingDot} />
            <Text style={styles.loadingText}>Preparing your adventure</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#E8F3FA' },
  background: {
    flex: 1,
    overflow: 'hidden',
    backgroundColor: '#E8F3FA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  glowTop: {
    position: 'absolute',
    width: 360,
    height: 360,
    borderRadius: 180,
    backgroundColor: '#8DDDD2',
    opacity: 0.55,
    top: -150,
    right: -120,
  },
  glowBottom: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: '#9CCDF4',
    opacity: 0.5,
    bottom: -130,
    left: -130,
  },
  content: { alignItems: 'center', paddingHorizontal: 24 },
  logoCircle: {
    width: 126,
    height: 126,
    borderRadius: 63,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#5597B6',
    shadowOpacity: 0.16,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
  pinBadge: {
    position: 'absolute',
    right: 12,
    bottom: 10,
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#26A69A',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  brandTravel: {
    fontSize: 42,
    fontWeight: '800',
    color: '#0B4773',
    marginTop: 26,
    letterSpacing: -1,
  },
  brandTaste: { color: '#168C82' },
  tagline: {
    fontSize: 15,
    color: '#47758C',
    marginTop: 8,
    textAlign: 'center',
  },
  loadingRow: { flexDirection: 'row', alignItems: 'center', marginTop: 52 },
  loadingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#168C82',
    marginRight: 9,
  },
  loadingText: { fontSize: 13, color: '#47758C', letterSpacing: 0.3 },
});
