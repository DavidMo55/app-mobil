import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { ChevronLeft, Share2, MapPin, MessageCircle, Star } from 'lucide-react-native';
import { PROFESSIONALS } from '../../data/mackData';

const { width } = Dimensions.get('window');

export default function ProfessionalDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  
  // Buscamos convirtiendo ambos a string para asegurar match
  const pro = PROFESSIONALS.find(p => String(p.id) === String(id));

  if (!pro) {
    return (
      <View style={styles.center}>
        <Text>Profesional no encontrado</Text>
        <TouchableOpacity onPress={() => router.back()} style={{marginTop: 20}}>
           <Text style={{color: 'blue'}}>Volver</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Ocultamos el header nativo */}
      <Stack.Screen options={{ headerShown: false }} />

      <ScrollView contentContainerStyle={{ paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
        {/* IMAGEN PORTADA */}
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: pro.portfolio[0] }} 
            style={styles.coverImage}
            resizeMode="cover"
          />
          <View style={styles.overlay} />
          
          {/* Botones Flotantes */}
          <View style={styles.headerButtons}>
            <TouchableOpacity 
              onPress={() => router.back()} 
              style={styles.iconButton}
            >
              <ChevronLeft color="white" size={24} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
               <Share2 color="white" size={20} />
            </TouchableOpacity>
          </View>
        </View>

        {/* INFO CARD */}
        <View style={styles.contentCard}>
          <View style={styles.handle} />
          
          <View style={styles.titleRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{pro.name}</Text>
              <Text style={styles.jobTitle}>{pro.title}</Text>
            </View>
            <Text style={styles.price}>{pro.price}</Text>
          </View>

          {/* DATOS EXTRA */}
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
               <View style={{flexDirection: 'row', alignItems: 'center'}}>
                 <Text style={styles.statValue}>{pro.rating}</Text>
                 <Star size={14} color="#ca8a04" fill="#facc15" style={{marginLeft: 2}}/>
               </View>
               <Text style={styles.statLabel}>Rating</Text>
            </View>
            <View style={[styles.statItem, styles.borderLeft]}>
               <Text style={styles.statValue}>{pro.reviews}</Text>
               <Text style={styles.statLabel}>Reseñas</Text>
            </View>
            <View style={[styles.statItem, styles.borderLeft]}>
               <Text style={styles.statValue}>2+</Text>
               <Text style={styles.statLabel}>Años</Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Sobre mí</Text>
          <Text style={styles.description}>{pro.description}</Text>

          <Text style={styles.sectionTitle}>Ubicación</Text>
          <View style={styles.locationBox}>
            <MapPin size={20} color="#4f46e5" />
            <Text style={styles.locationText}>{pro.location}</Text>
          </View>
          
          {/* Mapa Fake (Imagen estática o View gris) */}
          <View style={styles.mapPlaceholder}>
             <Text style={{color: '#94a3b8'}}>Mapa interactivo aquí</Text>
          </View>
        </View>
      </ScrollView>

      {/* FOOTER FIJO */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.chatButton}>
          <MessageCircle color="#4f46e5" size={24} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.hireButton}>
          <Text style={styles.hireButtonText}>Contratar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  
  imageContainer: { height: 300, width: '100%', position: 'relative', backgroundColor: '#1e293b' },
  coverImage: { width: '100%', height: '100%', opacity: 0.9 },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.2)' },
  
  headerButtons: {
    position: 'absolute', top: 50, left: 20, right: 20,
    flexDirection: 'row', justifyContent: 'space-between', zIndex: 10
  },
  iconButton: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    alignItems: 'center', justifyContent: 'center'
  },

  contentCard: {
    backgroundColor: '#fff',
    marginTop: -40,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 24,
    paddingTop: 12,
    minHeight: 500, // Asegura altura mínima para cubrir pantalla
  },
  handle: {
    width: 40, height: 5, backgroundColor: '#e2e8f0',
    borderRadius: 10, alignSelf: 'center', marginBottom: 20
  },
  
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 },
  name: { fontSize: 24, fontWeight: 'bold', color: '#0f172a' },
  jobTitle: { fontSize: 14, color: '#64748b', marginTop: 4 },
  price: { fontSize: 18, fontWeight: 'bold', color: '#4f46e5' },

  statsContainer: {
    flexDirection: 'row', borderTopWidth: 1, borderBottomWidth: 1,
    borderColor: '#f1f5f9', paddingVertical: 16, marginBottom: 24
  },
  statItem: { flex: 1, alignItems: 'center' },
  borderLeft: { borderLeftWidth: 1, borderLeftColor: '#f1f5f9' },
  statValue: { fontSize: 18, fontWeight: 'bold', color: '#0f172a' },
  statLabel: { fontSize: 12, color: '#94a3b8' },

  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#0f172a', marginBottom: 8, marginTop: 12 },
  description: { fontSize: 14, color: '#475569', lineHeight: 22, marginBottom: 20 },

  locationBox: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#f8fafc',
    padding: 12, borderRadius: 12, marginBottom: 16
  },
  locationText: { marginLeft: 8, color: '#475569', fontWeight: '600' },
  mapPlaceholder: {
    height: 150, backgroundColor: '#f1f5f9', borderRadius: 16,
    alignItems: 'center', justifyContent: 'center', marginBottom: 20
  },

  footer: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#f1f5f9',
    padding: 20, paddingBottom: 30, flexDirection: 'row', gap: 12
  },
  chatButton: {
    width: 56, height: 56, borderRadius: 16, backgroundColor: '#eef2ff',
    alignItems: 'center', justifyContent: 'center'
  },
  hireButton: {
    flex: 1, height: 56, borderRadius: 16, backgroundColor: '#4f46e5',
    alignItems: 'center', justifyContent: 'center',
    shadowColor: '#4f46e5', shadowOpacity: 0.3, shadowOffset: { width: 0, height: 4 }, shadowRadius: 8, elevation: 4
  },
  hireButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
});