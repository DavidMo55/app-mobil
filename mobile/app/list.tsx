import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { ChevronLeft, MapPin, Search, SlidersHorizontal, Star, X } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, Modal, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
// CORRECCIÓN 1: Nombre del archivo correcto 'mockData'
import { PROFESSIONALS } from '../data/mockData';

type SortOption = 'relevance' | 'price_asc' | 'price_desc' | 'rating_desc';

export default function ListScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  
  // Estados
  const [searchQuery, setSearchQuery] = useState(params.search as string || '');
  const [results, setResults] = useState(PROFESSIONALS);
  const [activeSort, setActiveSort] = useState<SortOption>('relevance');
  const [showFilters, setShowFilters] = useState(false); 
  
  const [minRating, setMinRating] = useState(0);

  useEffect(() => {
    let filtered = PROFESSIONALS;

    // 1. Filtrado por Texto (Buscador)
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.title.toLowerCase().includes(q)
      );
    }

    // 2. Filtrado por Categoría (CORRECCIÓN 2: Lógica activada)
    if (params.categoryId) {
      // Como ya agregamos 'categoryId' a mockData, ahora sí podemos filtrar
      filtered = filtered.filter(p => p.categoryId === params.categoryId);
    }

    // 3. Filtrado por Rating
    if (minRating > 0) {
      filtered = filtered.filter(p => p.rating >= minRating);
    }
    
    // 4. Ordenamiento
    if (activeSort === 'price_asc') {
      filtered.sort((a, b) => parseInt(a.price.replace(/\D/g,'')) - parseInt(b.price.replace(/\D/g,'')));
    } else if (activeSort === 'price_desc') {
      filtered.sort((a, b) => parseInt(b.price.replace(/\D/g,'')) - parseInt(a.price.replace(/\D/g,'')));
    } else if (activeSort === 'rating_desc') {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    setResults(filtered);
  }, [searchQuery, params.categoryId, minRating, activeSort]);


  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity 
      style={styles.card} 
      onPress={() => router.push(`/professional/${item.id}`)}
      activeOpacity={0.9}
    >
      <Image source={{ uri: item.portfolio[0] }} style={styles.cardImage} />
      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardName}>{item.name}</Text>
          <View style={styles.ratingBadge}>
            <Star size={12} color="#ca8a04" fill="#facc15" />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
        </View>
        <Text style={styles.cardTitle} numberOfLines={1}>{item.title}</Text>
        <View style={styles.cardFooter}>
          <View style={styles.locationRow}>
            <MapPin size={14} color="#94a3b8" />
            <Text style={styles.locationText}>{item.distance}</Text>
          </View>
          <Text style={styles.priceText}>{item.price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ChevronLeft size={24} color="#0f172a" />
        </TouchableOpacity>
        <View style={styles.searchBar}>
          <Search size={20} color="#94a3b8" />
          <TextInput 
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Buscar profesionista..."
            autoFocus={false}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <X size={18} color="#94a3b8" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View style={styles.filterBarContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterBar}>
          <TouchableOpacity style={styles.filterButton} onPress={() => setShowFilters(true)}>
            <SlidersHorizontal size={16} color="#0f172a" />
            <Text style={styles.filterBtnText}>Filtros</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.chip, activeSort === 'price_asc' && styles.chipActive]}
            onPress={() => setActiveSort(activeSort === 'price_asc' ? 'relevance' : 'price_asc')}
          >
            <Text style={[styles.chipText, activeSort === 'price_asc' && styles.chipTextActive]}>Precio: Menor a Mayor</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.chip, activeSort === 'rating_desc' && styles.chipActive]}
            onPress={() => setActiveSort(activeSort === 'rating_desc' ? 'relevance' : 'rating_desc')}
          >
            <Text style={[styles.chipText, activeSort === 'rating_desc' && styles.chipTextActive]}>Mejor Valorados</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <FlatList
        data={results}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Search size={48} color="#e2e8f0" />
            <Text style={styles.emptyText}>No se encontraron resultados</Text>
            <Text style={styles.emptySubText}>Intenta con otra palabra clave</Text>
          </View>
        }
      />

      <Modal visible={showFilters} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Filtros</Text>
              <TouchableOpacity onPress={() => setShowFilters(false)}>
                <X size={24} color="#0f172a" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.filterSection}>
              <Text style={styles.filterLabel}>Calificación Mínima</Text>
              <View style={styles.ratingOptions}>
                {[4, 3, 2, 1].map((star) => (
                  <TouchableOpacity 
                    key={star} 
                    style={[styles.ratingChip, minRating === star && styles.ratingChipActive]}
                    onPress={() => setMinRating(minRating === star ? 0 : star)}
                  >
                    <Text style={[styles.ratingChipText, minRating === star && styles.ratingChipTextActive]}>{star}+ </Text>
                    <Star size={14} color={minRating === star ? "#fff" : "#ca8a04"} fill={minRating === star ? "#fff" : "transparent"} />
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <TouchableOpacity 
              style={styles.applyButton} 
              onPress={() => setShowFilters(false)}
            >
              <Text style={styles.applyButtonText}>Ver {results.length} resultados</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  
  header: {
    flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12, paddingTop: 50,
    backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#f1f5f9'
  },
  backButton: { padding: 8, marginRight: 8 },
  searchBar: {
    flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#f1f5f9',
    borderRadius: 12, paddingHorizontal: 12, height: 44
  },
  searchInput: { flex: 1, marginLeft: 8, fontSize: 16, color: '#0f172a' },

  filterBarContainer: { backgroundColor: '#fff', paddingVertical: 12 },
  filterBar: { paddingHorizontal: 16, gap: 10 },
  filterButton: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', 
    borderWidth: 1, borderColor: '#e2e8f0', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20
  },
  filterBtnText: { marginLeft: 6, fontSize: 14, fontWeight: '600', color: '#0f172a' },
  
  chip: { backgroundColor: '#f1f5f9', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20 },
  chipActive: { backgroundColor: '#eef2ff', borderWidth: 1, borderColor: '#4f46e5' },
  chipText: { fontSize: 14, color: '#475569', fontWeight: '500' },
  chipTextActive: { color: '#4f46e5', fontWeight: '600' },

  listContent: { padding: 16 },
  card: {
    flexDirection: 'row', backgroundColor: '#fff', borderRadius: 16, marginBottom: 16,
    padding: 12, borderWidth: 1, borderColor: '#f1f5f9',
    shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, shadowOffset: { width: 0, height: 2 }, elevation: 2
  },
  cardImage: { width: 80, height: 80, borderRadius: 12, backgroundColor: '#e2e8f0' },
  cardContent: { flex: 1, marginLeft: 12, justifyContent: 'center' },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  cardName: { fontSize: 16, fontWeight: '700', color: '#0f172a' },
  ratingBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fffbeb', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6 },
  ratingText: { marginLeft: 4, fontSize: 12, fontWeight: '700', color: '#b45309' },
  cardTitle: { fontSize: 13, color: '#64748b', marginBottom: 8 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  locationRow: { flexDirection: 'row', alignItems: 'center' },
  locationText: { marginLeft: 4, fontSize: 12, color: '#94a3b8' },
  priceText: { fontSize: 14, fontWeight: '700', color: '#059669' },

  emptyState: { alignItems: 'center', justifyContent: 'center', marginTop: 60 },
  emptyText: { marginTop: 16, fontSize: 18, fontWeight: '600', color: '#0f172a' },
  emptySubText: { fontSize: 14, color: '#64748b', marginTop: 4 },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: '#fff', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, minHeight: 300 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  modalTitle: { fontSize: 20, fontWeight: '700', color: '#0f172a' },
  filterSection: { marginBottom: 24 },
  filterLabel: { fontSize: 16, fontWeight: '600', color: '#0f172a', marginBottom: 12 },
  ratingOptions: { flexDirection: 'row', gap: 12 },
  ratingChip: { 
    flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 10, 
    borderRadius: 12, backgroundColor: '#f8fafc', borderWidth: 1, borderColor: '#e2e8f0' 
  },
  ratingChipActive: { backgroundColor: '#0f172a', borderColor: '#0f172a' },
  ratingChipText: { fontWeight: '600', color: '#0f172a' },
  ratingChipTextActive: { color: '#fff' },
  applyButton: { backgroundColor: '#4f46e5', paddingVertical: 16, borderRadius: 16, alignItems: 'center', marginTop: 'auto' },
  applyButtonText: { color: '#fff', fontSize: 16, fontWeight: '700' }
});