import React from 'react';
import { View, Text, Image, TouchableOpacity, SafeAreaView, ScrollView, StyleSheet, StatusBar } from 'react-native';
import { ChevronLeft, Share2, Star, MapPin, MessageCircle } from 'lucide-react-native';

const PROFESSIONALS = [
  {
    id: 1,
    name: 'Carlos Méndez',
    title: 'Electricista Certificado',
    rating: 4.8,
    reviews: 124,
    price: '$400 / hora',
    location: 'Centro, Ciudad de México',
    distance: '1.2 km',
    description: 'Especialista en instalaciones residenciales y comerciales con más de 10 años de experiencia. Garantía en todos los trabajos.',
    portfolio: [
      'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1558402529-d2638a7023e9?auto=format&fit=crop&q=80&w=1200'
    ],
    coords: { lat: 19.4326, lon: -99.1332 }
  },
];

export default function DetailsScreen({ route, navigation = { goBack: () => {} } }) {
  const proId = route?.params?.proId || 1;
  const pro = PROFESSIONALS.find(p => p.id === proId) || PROFESSIONALS[0];

  if (!pro) {
    return (
      <SafeAreaView style={styles.safe}>
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
        <View style={styles.center}>
          <Text style={styles.notFound}>Profesional no encontrado</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <View style={styles.wrapper}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Cover */}
          <View style={styles.cover}>
            <Image source={{ uri: pro.portfolio[0] }} style={styles.coverImage} resizeMode="cover" />
            <View style={styles.coverOverlay}>
              <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.goBack()}>
                <ChevronLeft color="#fff" size={20} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconBtn}>
                <Share2 color="#fff" size={18} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Card */}
          <View style={styles.card}>
            <View style={styles.grabber} />

            <View style={styles.titleRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.name}>{pro.name}</Text>
                <Text style={styles.title}>{pro.title}</Text>
              </View>
              <Text style={styles.price}>{pro.price}</Text>
            </View>

            <View style={styles.stats}>
              <View style={styles.statItem}>
                <View style={styles.statRow}>
                  <Text style={styles.statValue}>{pro.rating}</Text>
                  <Star size={14} color="#ca8a04" />
                </View>
                <Text style={styles.statLabel}>Rating</Text>
              </View>

              <View style={[styles.statItem, styles.statBorder]}>
                <Text style={styles.statValue}>{pro.reviews}</Text>
                <Text style={styles.statLabel}>Reseñas</Text>
              </View>

              <View style={styles.statItem}>
                <Text style={styles.statValue}>2+</Text>
                <Text style={styles.statLabel}>Años exp.</Text>
              </View>
            </View>

            {/* About */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Sobre mí</Text>
              <Text style={styles.sectionText}>{pro.description}</Text>
            </View>

            {/* Location */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Ubicación</Text>
              <View style={styles.locationRow}>
                <MapPin size={16} color="#4f46e5" />
                <Text style={styles.locationText}>{pro.location}</Text>
              </View>

              <View style={styles.mapPlaceholder}>
                <Text style={styles.mapPlaceholderText}>Mapa (placeholder)</Text>
              </View>
            </View>
          </View>
        </ScrollView>

        <View style={styles.bottomBar}>
          <TouchableOpacity style={styles.chatBtn} activeOpacity={0.85}>
            <MessageCircle color="#4f46e5" size={22} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.hireBtn} activeOpacity={0.9}>
            <Text style={styles.hireText}>Contratar ahora</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#ffffff' },
  wrapper: { flex: 1, position: 'relative' },
  scrollContent: { paddingBottom: 120 }, 
  cover: { height: 280, backgroundColor: '#111827' },
  coverImage: { width: '100%', height: '100%' },
  coverOverlay: {
    position: 'absolute',
    top: 14,
    left: 14,
    right: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconBtn: {
    width: 42,
    height: 42,
    borderRadius: 10,
    backgroundColor: 'rgba(0,0,0,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  card: {
    backgroundColor: '#fff',
    marginTop: -30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
  },
  grabber: {
    width: 48,
    height: 6,
    backgroundColor: '#f1f5f9',
    borderRadius: 6,
    alignSelf: 'center',
    marginBottom: 12,
  },

  titleRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 12 },
  name: { fontSize: 22, fontWeight: '800', color: '#0f172a' },
  title: { color: '#64748b', marginTop: 4, fontWeight: '600' },
  price: { color: '#4f46e5', fontWeight: '800', fontSize: 16, marginLeft: 12 },

  stats: { flexDirection: 'row', borderTopWidth: 1, borderBottomWidth: 1, borderColor: '#f1f5f9', paddingVertical: 14, marginVertical: 18 },
  statItem: { flex: 1, alignItems: 'center' },
  statBorder: { borderLeftWidth: 1, borderRightWidth: 1, borderColor: '#f1f5f9' },
  statRow: { flexDirection: 'row', alignItems: 'center' },
  statValue: { fontWeight: '800', fontSize: 16, color: '#0f172a', marginRight: 6 },
  statLabel: { fontSize: 12, color: '#94a3b8', marginTop: 4 },

  section: { marginBottom: 18 },
  sectionTitle: { fontSize: 16, fontWeight: '800', color: '#0f172a', marginBottom: 6 },
  sectionText: { color: '#475569', fontSize: 14, lineHeight: 20 },

  locationRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  locationText: { marginLeft: 8, color: '#64748b' },

  mapPlaceholder: {
    width: '100%',
    height: 160,
    borderRadius: 18,
    backgroundColor: '#f1f5f9',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapPlaceholderText: { color: '#94a3b8' },

  bottomBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  chatBtn: {
    width: 56,
    height: 56,
    borderRadius: 14,
    backgroundColor: '#eef2ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hireBtn: {
    flex: 1,
    marginLeft: 12,
    height: 56,
    borderRadius: 14,
    backgroundColor: '#4f46e5',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  hireText: { color: '#fff', fontWeight: '800', fontSize: 16 },

  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  notFound: { color: '#64748b', fontSize: 16 },
});