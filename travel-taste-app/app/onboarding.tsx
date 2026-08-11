import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function OnboardingScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.centerContent}>
        <Image
          source={{
            uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDWYCGlvmUdAkisn43mjBMLRj_UTyHc0pYPcIgDn9z7TPSELiYPSP-uzYqVlMGhGotK7MCSh64pGllxudZ7AXGt2pRCf42BaB0WaMik6_MFvRaWdlYRZUZIA1qoJ84-ZWtCJ9fbgAsOSPyzu4QbJ2mYrTDfg3tV5kX7KtPB7pDmUChkX0fJ9qjH0UdQtN8Wr1rbZ7ixcHlNg19CpfBm1g73lsATDJvFcNkz-ScE7p4O_XVCh7EQoSls6w',
          }}
          style={styles.logo}
        />
        <Text style={styles.title}>
          <Text style={{ color: '#2D5A27' }}>Travel</Text>
          <Text style={{ color: '#E67E22' }}>Taste</Text>
        </Text>
        <Text style={styles.tagline}>Plan food along your trail</Text>
      </View>

      <View style={styles.bottomSection}>
     

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('/login')}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>
          Discover local culinary gems on every adventure.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9FF',
    justifyContent: 'space-between',
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  logo: {
    width: 160,
    height: 160,
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
  },
  tagline: {
    fontSize: 18,
    color: '#42493E',
    textAlign: 'center',
    maxWidth: 280,
  },
  bottomSection: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  featureRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 24,
  },
  featureItem: {
    alignItems: 'center',
    gap: 4,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EDF4FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  iconText: {
    fontSize: 18,
  },
  featureLabel: {
    fontSize: 12,
    color: '#42493E',
  },
  button: {
    backgroundColor: '#154212',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  footerText: {
    fontSize: 12,
    color: '#72796E',
    textAlign: 'center',
  },
});