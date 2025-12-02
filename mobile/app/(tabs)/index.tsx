import { useRouter } from 'expo-router';
import { Briefcase, Home, MapPin, Monitor, Paintbrush, Search, Star, User, Wrench } from 'lucide-react-native';
import React, { useState } from 'react';
import { Image, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Si prefieres usar los datos centralizados, descomenta la siguiente línea y borra las constantes locales:
// import { CATEGORIES, PROFESSIONALS } from '../../data/mockData';

const CATEGORIES = [
  { id: 'tech', name: 'Tecnología', icon: Monitor, bgColor: '#DBEAFE', iconColor: '#2563eb' },
  { id: 'home', name: 'Hogar', icon: Home, bgColor: '#FFEDD5', iconColor: '#ea580c' },
  { id: 'design', name: 'Diseño', icon: Paintbrush, bgColor: '#EDE9FE', iconColor: '#9333ea' },
  { id: 'repair', name: 'Reparaciones', icon: Wrench, bgColor: '#D1FAE5', iconColor: '#16a34a' },
  { id: 'legal', name: 'Legal', icon: Briefcase, bgColor: '#F1F5F9', iconColor: '#475569' },
  { id: 'beauty', name: 'Belleza', icon: User, bgColor: '#FCE7F3', iconColor: '#db2777' },
];

const FEATURED_PROS = [
  {
    id: '7',
    categoryId: 'repair',
    name: 'Carlos Méndez',
    title: 'Electricista Certificado',
    rating: 4.8,
    reviews: 124,
    price: '$400 / hora',
    location: 'Centro, CDMX',
    distance: '1.2 km',
    description: 'Instalaciones residenciales y comerciales. 10+ años de experiencia.',
    portfolio: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=300',
  },
  {
    id: '9',
    categoryId: 'legal',
    name: 'Adriana Ruíz',
    title: 'Abogada Civil',
    rating: 4.9,
    reviews: 150,
    price: '$1200 / hora',
    location: 'Reforma, CDMX',
    distance: '1.1 km',
    description: 'Especialista en casos civiles, asesoría legal y contratos.',
    portfolio: 'https://images.unsplash.com/photo-1555374018-13a8994ab246?auto=format&fit=crop&q=80&w=300',
  },
];

export default function HomeScreen() {
  const [query, setQuery] = useState('');
  const router = useRouter(); 

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        
        {/* HEADER */}
        <View style={styles.header}>
          <View>
            <Text style={styles.locationLabel}>Ubicación actual</Text>
            <View style={styles.locationRow}>
              <MapPin size={18} color="#4f46e5" strokeWidth={2.5} />
              <Text style={styles.locationText}>CDMX, Reforma</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.avatarButton}
            activeOpacity={0.8}
          >
            <User size={20} color="#4f46e5" />
          </TouchableOpacity>
        </View>

        <View style={styles.contentPadding}>
          <View style={styles.searchContainer}>
            <Search size={20} color="#94a3b8" />
            <TextInput
              value={query}
              onChangeText={setQuery}
              // FIX: Usamos `as any` para evitar error de tipado estricto en rutas dinámicas
              onSubmitEditing={() => router.push({ pathname: '/list', params: { search: query } } as any)}
              
              placeholder="¿Qué servicio necesitas?"
              placeholderTextColor="#94a3b8"
              style={styles.searchInput}
              returnKeyType="search"
            />
          </View>

          <View style={styles.banner}>
            <View style={styles.bannerInner}>
              <Text style={styles.badge}>NUEVO</Text>
              <Text style={styles.bannerTitle}>Descuento en servicios de hogar</Text>
              {/* FIX: Botón conectado a la pantalla de Cupones */}
              <TouchableOpacity 
                style={styles.bannerButton} 
                activeOpacity={0.85}
                onPress={() => router.push('/cupones' as any)}
              >
                <Text style={styles.bannerButtonText}>Ver oferta</Text>
              </TouchableOpacity>
            </View>
          </View>

           <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Categorías</Text>
            
              <TouchableOpacity onPress={() => router.push('/Categorias' as any)}>
                <Text style={styles.linkText}>Ver todas</Text>
              </TouchableOpacity>

            </View>

            <View style={styles.categoryGrid}>
              {CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                return (
                  <TouchableOpacity
                    key={cat.id}
                    // FIX: `as any` añadido aquí también
                    onPress={() => router.push({ pathname: '/list', params: { categoryId: cat.id, name: cat.name } } as any)}
                    style={styles.categoryItem}
                    activeOpacity={0.85}
                  >
                    <View style={[styles.catIconWrap, { backgroundColor: cat.bgColor }]}>
                      <Icon size={24} color={cat.iconColor} />
                    </View>
                    <Text style={styles.catLabel} numberOfLines={1}>{cat.name}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { marginBottom: 12 }]}>Recomendados</Text>

            {FEATURED_PROS.map((pro) => (
              <TouchableOpacity
                key={pro.id}
                onPress={() => router.push(`/professional/${pro.id}` as any)}
                style={styles.proCard}
                activeOpacity={0.9}
              >
                <Image source={{ uri: pro.portfolio }} style={styles.proImage} />

                <View style={styles.proBody}>
                  <View style={styles.proTop}>
                    <Text style={styles.proName}>{pro.name}</Text>
                    <View style={styles.rating}>
                      <Star size={12} color="#ca8a04" fill="#facc15" />
                      <Text style={styles.ratingText}>{pro.rating}</Text>
                    </View>
                  </View>

                  <Text style={styles.proTitle} numberOfLines={1}>{pro.title}</Text>

                  <View style={styles.proMeta}>
                    <View style={styles.metaRow}>
                      <MapPin size={12} color="#94a3b8" />
                      <Text style={styles.metaText}>{pro.distance}</Text>
                    </View>
                    <Text style={styles.price}>{pro.price}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F8FAFC' },
  container: { paddingBottom: 28 },
  header: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 1,
  },
  locationLabel: { color: '#64748b', fontSize: 12, fontWeight: '500' },
  locationRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  locationText: { marginLeft: 6, fontSize: 16, fontWeight: '700', color: '#0f172a' },
  avatarButton: {
    width: 40, height: 40, borderRadius: 20, backgroundColor: '#EEF2FF',
    alignItems: 'center', justifyContent: 'center'
  },
  contentPadding: { paddingHorizontal: 20, paddingTop: 12 },

  searchContainer: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#FFFFFF', padding: 12, borderRadius: 16,
    borderWidth: 1, borderColor: '#F1F5F9', marginBottom: 16
  },
  searchInput: { marginLeft: 8, flex: 1, color: '#0f172a', fontWeight: '600' },

  banner: {
    marginBottom: 20,
  },
  bannerInner: {
    height: 160, backgroundColor: '#4F46E5', borderRadius: 20, padding: 18, justifyContent: 'center',
    overflow: 'hidden'
  },
  badge: { color: 'rgba(255,255,255,0.9)', backgroundColor: 'rgba(255,255,255,0.12)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, alignSelf: 'flex-start', fontSize: 12, fontWeight: '700' },
  bannerTitle: { color: '#fff', fontSize: 20, fontWeight: '800', marginTop: 8, marginBottom: 12 },
  bannerButton: { backgroundColor: '#FFFFFF', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 999 },
  bannerButtonText: { color: '#4F46E5', fontWeight: '800', fontSize: 12 },

  section: { marginBottom: 18 },

  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 8 },
  sectionTitle: { fontSize: 20, fontWeight: '800', color: '#0f172a' },
  linkText: { color: '#4F46E5', fontSize: 14, fontWeight: '600' },

  categoryGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  categoryItem: { width: '31%', backgroundColor: '#fff', borderRadius: 16, paddingVertical: 14, alignItems: 'center', marginBottom: 12, borderWidth: 1, borderColor: '#F1F5F9' },
  catIconWrap: { width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  catLabel: { fontSize: 12, color: '#475569', fontWeight: '600', textAlign: 'center' },

  proCard: { flexDirection: 'row', backgroundColor: '#fff', padding: 14, borderRadius: 16, marginBottom: 12, borderWidth: 1, borderColor: '#F1F5F9', alignItems: 'center' },
  proImage: { width: 64, height: 64, borderRadius: 32, backgroundColor: '#E2E8F0' },
  proBody: { flex: 1, marginLeft: 12, justifyContent: 'center' },
  proTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  proName: { fontSize: 16, fontWeight: '800', color: '#0f172a' },
  rating: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFBEB', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  ratingText: { color: '#92400e', fontSize: 12, fontWeight: '700', marginLeft: 6 },

  proTitle: { color: '#64748b', fontSize: 13, marginTop: 4 },
  proMeta: { flexDirection: 'row', alignItems: 'center', marginTop: 8, justifyContent: 'space-between' },
  metaRow: { flexDirection: 'row', alignItems: 'center' },
  metaText: { color: '#94a3b8', fontSize: 12, marginLeft: 6 },
  price: { color: '#059669', fontSize: 13, fontWeight: '700' },
});