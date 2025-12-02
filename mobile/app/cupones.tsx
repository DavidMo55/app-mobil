import { Stack, useRouter } from 'expo-router';
import { ChevronLeft, Clock, Ticket } from 'lucide-react-native';
import React from 'react';
import { FlatList, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const COUPONS = [
  {
    id: '1',
    code: 'HOGAR20',
    title: '20% OFF en Limpieza',
    description: 'Descuento válido para tu primer servicio de limpieza profunda.',
    expiry: 'Vence en 3 días',
    color: '#4F46E5',
    bgColor: '#EEF2FF'
  },
  {
    id: '2',
    code: 'PLOMERIA10',
    title: '$100 MXN de regalo',
    description: 'En reparaciones de plomería mayores a $500.',
    expiry: 'Vence hoy',
    color: '#059669',
    bgColor: '#D1FAE5'
  },
  {
    id: '3',
    code: 'TECH50',
    title: '50% OFF Diagnóstico',
    description: 'Mitad de precio en diagnóstico de laptops y PCs.',
    expiry: 'Válido todo el mes',
    color: '#2563EB',
    bgColor: '#DBEAFE'
  },
  {
    id: '4',
    code: 'BIENVENIDA',
    title: '15% OFF Primer Servicio',
    description: 'Cupón de bienvenida para cualquier categoría.',
    expiry: 'Sin vigencia',
    color: '#DB2777',
    bgColor: '#FCE7F3'
  }
];

export default function CouponsScreen() {
  const router = useRouter();

  // CORRECCIÓN AQUÍ: Agregamos el tipo ': { item: any }'
  const renderCoupon = ({ item }: { item: any }) => (
    <View style={styles.couponCard}>
      {/* Lado Izquierdo (Icono) */}
      <View style={[styles.couponLeft, { backgroundColor: item.bgColor }]}>
        <Ticket color={item.color} size={32} />
        <View style={[styles.circle, { top: -10 }]} />
        <View style={[styles.circle, { bottom: -10 }]} />
      </View>

      {/* Lado Derecho (Info) */}
      <View style={styles.couponRight}>
        <View>
          <Text style={styles.couponTitle}>{item.title}</Text>
          <Text style={styles.couponDesc}>{item.description}</Text>
        </View>
        
        <View style={styles.couponFooter}>
          <View style={styles.expiryTag}>
            <Clock size={12} color="#64748b" />
            <Text style={styles.expiryText}>{item.expiry}</Text>
          </View>
          
          <TouchableOpacity style={[styles.useButton, { backgroundColor: item.color }]} activeOpacity={0.8}>
            <Text style={styles.useButtonText}>Canjear</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Stack.Screen options={{ headerShown: false }} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ChevronLeft size={24} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mis Cupones</Text>
      </View>

      <FlatList 
        data={COUPONS}
        renderItem={renderCoupon}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  header: {
    flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 16, paddingTop: 50,
    backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#f1f5f9'
  },
  backButton: { padding: 8, marginRight: 12, borderRadius: 12, backgroundColor: '#f1f5f9' },
  headerTitle: { fontSize: 20, fontWeight: '800', color: '#0f172a' },

  listContent: { padding: 16 },

  couponCard: {
    flexDirection: 'row', backgroundColor: '#fff', borderRadius: 16, marginBottom: 16,
    height: 140, overflow: 'hidden',
    shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, shadowOffset: { width: 0, height: 2 }, elevation: 2
  },
  couponLeft: {
    width: 80, alignItems: 'center', justifyContent: 'center', position: 'relative',
    borderRightWidth: 2, borderRightColor: '#fff', borderStyle: 'dashed' 
  },
  // Círculos para efecto de recorte de ticket
  circle: {
    position: 'absolute', width: 20, height: 20, borderRadius: 10, backgroundColor: '#F8FAFC',
    left: -10
  },
  
  couponRight: { flex: 1, padding: 16, justifyContent: 'space-between' },
  couponTitle: { fontSize: 18, fontWeight: '700', color: '#0f172a', marginBottom: 4 },
  couponDesc: { fontSize: 13, color: '#64748b', lineHeight: 18 },
  
  couponFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 },
  expiryTag: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  expiryText: { fontSize: 12, color: '#64748b', fontWeight: '500' },
  
  useButton: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 8 },
  useButtonText: { color: '#fff', fontWeight: '700', fontSize: 12 },
});