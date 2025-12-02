import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { ChevronLeft, MessageSquare, Send, Star } from 'lucide-react-native';
import React, { useState } from 'react';
import { Alert, FlatList, KeyboardAvoidingView, Platform, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { PROFESSIONALS } from '../data/mockData';

export default function ReviewsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  
  // 1. Buscamos al profesional
  const pro = PROFESSIONALS.find(p => String(p.id) === String(id));
  
  // Aseguramos que reviewsList exista, si no, lo iniciamos vacío
  if (pro && !pro.reviewsList) {
    pro.reviewsList = [];
  }

  // 2. Estado local para las reseñas
  const [reviews, setReviews] = useState(pro?.reviewsList || []);
  
  // Estado para el formulario
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(0);

  if (!pro) return (
    <View style={styles.center}>
        <Stack.Screen options={{ headerTitle: 'Error' }} />
        <Text>Error: Profesional no encontrado</Text>
        <TouchableOpacity onPress={() => router.back()} style={{marginTop: 20}}>
            <Text style={{color: 'blue'}}>Volver</Text>
        </TouchableOpacity>
    </View>
  );

  // Función para agregar reseña
  const handleAddReview = () => {
    if (newRating === 0) {
      if (Platform.OS === 'web') window.alert("Selecciona las estrellas");
      else Alert.alert("Faltan datos", "Por favor selecciona una calificación.");
      return;
    }
    if (newComment.trim() === "") {
        if (Platform.OS === 'web') window.alert("Escribe un comentario");
        else Alert.alert("Faltan datos", "Por favor escribe un comentario.");
        return;
    }

    const newReview = {
      id: Date.now().toString(),
      user: "Tú", // Simulado
      date: "Ahora mismo",
      rating: newRating,
      comment: newComment
    };

    // 3. ACTUALIZACIÓN VISUAL Y DE "MEMORIA"
    // Actualizamos el estado visual
    const updatedReviews = [newReview, ...reviews];
    setReviews(updatedReviews);
    
    // TRUCO: Guardamos en el objeto mockData para que persista si sales y entras
    if (pro.reviewsList) {
        pro.reviewsList.unshift(newReview);
    } else {
        pro.reviewsList = [newReview];
    }

    // Limpiamos formulario
    setNewComment("");
    setNewRating(0);
  };

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.reviewCard}>
      <View style={styles.reviewHeader}>
        <View style={styles.userInfo}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{item.user.charAt(0)}</Text>
          </View>
          <View>
            <Text style={styles.userName}>{item.user}</Text>
            <Text style={styles.reviewDate}>{item.date}</Text>
          </View>
        </View>
        <View style={styles.ratingBadge}>
          <Star size={12} color="#ca8a04" fill="#facc15" />
          <Text style={styles.ratingText}>{item.rating}</Text>
        </View>
      </View>
      <Text style={styles.reviewText}>{item.comment}</Text>
    </View>
  );

  return (
    // 4. SOLUCIÓN TECLADO: KeyboardAvoidingView envuelve todo
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Stack.Screen options={{ headerShown: false }} />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ChevronLeft size={24} color="#0f172a" />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>Opiniones</Text>
          <Text style={styles.headerSubtitle}>de {pro.name}</Text>
        </View>
      </View>

      {/* CONTENIDO PRINCIPAL */}
      <FlatList
        data={reviews}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContent}
        
        // Componente para cuando no hay reseñas (Solución "No muestra nada")
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <MessageSquare size={48} color="#cbd5e1" />
            <Text style={styles.emptyTitle}>Sin opiniones aún</Text>
            <Text style={styles.emptySubtitle}>Sé la primera persona en calificar este servicio.</Text>
          </View>
        }

        ListHeaderComponent={
          <View style={styles.summaryContainer}>
            <View style={styles.bigRating}>
              <Text style={styles.bigRatingText}>{pro.rating}</Text>
              <View>
                <View style={{flexDirection: 'row'}}>
                  {[1,2,3,4,5].map(i => <Star key={i} size={16} color="#ca8a04" fill={i <= Math.round(pro.rating) ? "#facc15" : "transparent"} />)}
                </View>
                <Text style={styles.totalReviews}>{reviews.length} reseñas</Text>
              </View>
            </View>

            {/* CAJA PARA ESCRIBIR */}
            <View style={styles.writeBox}>
              <Text style={styles.writeTitle}>Escribe tu opinión</Text>
              <View style={styles.starSelector}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <TouchableOpacity key={star} onPress={() => setNewRating(star)}>
                    <Star size={32} color={star <= newRating ? "#ca8a04" : "#e2e8f0"} fill={star <= newRating ? "#facc15" : "transparent"} />
                  </TouchableOpacity>
                ))}
              </View>
              <View style={styles.inputRow}>
                <TextInput 
                  style={styles.input}
                  placeholder="Comparte tu experiencia..."
                  placeholderTextColor="#94a3b8"
                  multiline
                  value={newComment}
                  onChangeText={setNewComment}
                />
                <TouchableOpacity style={styles.sendButton} onPress={handleAddReview}>
                  <Send size={20} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        }
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  
  header: {
    flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 16, paddingTop: 50,
    backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#f1f5f9'
  },
  backButton: { padding: 8, marginRight: 16, borderRadius: 12, backgroundColor: '#f1f5f9' },
  headerTitle: { fontSize: 20, fontWeight: '800', color: '#0f172a' },
  headerSubtitle: { fontSize: 14, color: '#64748b' },

  listContent: { padding: 20, paddingBottom: 40 },

  summaryContainer: { marginBottom: 24 },
  bigRating: { flexDirection: 'row', alignItems: 'center', marginBottom: 24, gap: 16 },
  bigRatingText: { fontSize: 48, fontWeight: '800', color: '#0f172a' },
  totalReviews: { fontSize: 14, color: '#64748b', marginTop: 4 },

  writeBox: { backgroundColor: '#fff', padding: 16, borderRadius: 16, borderWidth: 1, borderColor: '#e2e8f0', shadowColor: '#000', shadowOpacity: 0.02, shadowRadius: 8, elevation: 1 },
  writeTitle: { fontSize: 16, fontWeight: '700', color: '#0f172a', marginBottom: 12 },
  starSelector: { flexDirection: 'row', gap: 12, marginBottom: 16, justifyContent: 'center' },
  inputRow: { flexDirection: 'row', gap: 12 },
  input: { flex: 1, backgroundColor: '#f8fafc', borderRadius: 12, padding: 12, height: 50, borderWidth: 1, borderColor: '#e2e8f0' },
  sendButton: { width: 50, height: 50, backgroundColor: '#4f46e5', borderRadius: 12, alignItems: 'center', justifyContent: 'center' },

  reviewCard: { backgroundColor: '#fff', padding: 16, borderRadius: 16, marginBottom: 12, borderWidth: 1, borderColor: '#f1f5f9' },
  reviewHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 },
  userInfo: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#eef2ff', alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontSize: 16, fontWeight: '700', color: '#4f46e5' },
  userName: { fontSize: 15, fontWeight: '700', color: '#0f172a' },
  reviewDate: { fontSize: 12, color: '#94a3b8' },
  ratingBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fffbeb', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  ratingText: { marginLeft: 4, fontWeight: '700', color: '#b45309' },
  reviewText: { fontSize: 14, color: '#475569', lineHeight: 22 },

  // Estilos para estado vacío
  emptyState: { alignItems: 'center', justifyContent: 'center', paddingVertical: 40 },
  emptyTitle: { fontSize: 18, fontWeight: '700', color: '#0f172a', marginTop: 12 },
  emptySubtitle: { fontSize: 14, color: '#64748b', marginTop: 4 }
});