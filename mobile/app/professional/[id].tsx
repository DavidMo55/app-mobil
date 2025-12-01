import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { ChevronLeft, MapPin, MessageCircle, Send, Share2, Star } from 'lucide-react-native';
import React, { useRef, useState } from 'react';
import { Image, LayoutChangeEvent, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { PROFESSIONALS } from '../../data/mackData';

export default function ProfessionalDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  
  // Referencia para controlar el Scroll
  const scrollViewRef = useRef<ScrollView>(null);
  const [reviewsY, setReviewsY] = useState(0);

  // 1. Buscamos el profesional
  const proInitial = PROFESSIONALS.find(p => String(p.id) === String(id));

  // 2. Estado para las reseñas
  const [reviews, setReviews] = useState(proInitial?.reviewsList || []);
  
  // 3. Estado para el formulario de nueva reseña
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(0);

  if (!proInitial) {
    return (
      <View style={styles.center}>
        <Text>Profesional no encontrado</Text>
        <TouchableOpacity onPress={() => router.back()} style={{marginTop: 20}}>
           <Text style={{color: 'blue'}}>Volver</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Función para hacer scroll hasta las reseñas
  const scrollToReviews = () => {
    console.log("Intentando hacer scroll a Y:", reviewsY); // DEBUG: Revisa tu terminal
    if (scrollViewRef.current) {
      // Si reviewsY es 0, usamos un valor aproximado (800) como fallback
      const targetY = reviewsY > 0 ? reviewsY - 100 : 600;
      scrollViewRef.current.scrollTo({ y: targetY, animated: true });
    }
  };

  // Función para agregar reseña
  const handleAddReview = () => {
    if (newRating === 0) {
      alert("Por favor selecciona una calificación de estrellas."); 
      return;
    }
    if (newComment.trim() === "") {
      alert("Por favor escribe un comentario.");
      return;
    }

    const newReviewItem = {
      id: Date.now().toString(),
      user: "Tú",
      date: "Ahora mismo",
      rating: newRating,
      comment: newComment
    };

    setReviews([newReviewItem, ...reviews]);
    setNewComment("");
    setNewRating(0);
    
    // Scroll automático para ver tu nueva reseña
    if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({ y: reviewsY - 50, animated: true });
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      <ScrollView 
        ref={scrollViewRef}
        style={{ flex: 1 }} 
        contentContainerStyle={{ paddingBottom: 140 }} 
        showsVerticalScrollIndicator={false}
      >
        {/* IMAGEN PORTADA */}
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: proInitial.portfolio[0] }} 
            style={styles.coverImage}
            resizeMode="cover"
          />
          <View style={styles.overlay} />
          <View style={styles.headerButtons}>
            <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
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
              <Text style={styles.name}>{proInitial.name}</Text>
              <Text style={styles.jobTitle}>{proInitial.title}</Text>
            </View>
            <Text style={styles.price}>{proInitial.price}</Text>
          </View>

          {/* DATOS EXTRA - AHORA CLICABLES */}
          <View style={styles.statsContainer}>
            
            {/* 1. Rating Clicable */}
            <TouchableOpacity 
              style={styles.statItem}
              onPress={scrollToReviews}
              activeOpacity={0.5}
            >
               <View style={{flexDirection: 'row', alignItems: 'center'}}>
                 <Text style={[styles.statValue, { color: '#4338ca' }]}>{proInitial.rating}</Text>
                 <Star size={14} color="#ca8a04" fill="#facc15" style={{marginLeft: 2}}/>
               </View>
               <Text style={[styles.statLabel, { color: '#4338ca', fontWeight: '700' }]}>Rating</Text>
            </TouchableOpacity>
            
            {/* 2. Reseñas Clicable */}
            <TouchableOpacity 
              style={[styles.statItem, styles.borderLeft]}
              onPress={scrollToReviews}
              activeOpacity={0.5}
            >
               <Text style={[styles.statValue, { color: '#4338ca' }]}>{reviews.length}</Text>
               <Text style={[styles.statLabel, { color: '#4338ca', fontWeight: '700' }]}>Reseñas</Text>
            </TouchableOpacity>

            <View style={[styles.statItem, styles.borderLeft]}>
               <Text style={styles.statValue}>2+</Text>
               <Text style={styles.statLabel}>Años</Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Sobre mí</Text>
          <Text style={styles.description}>{proInitial.description}</Text>

          <Text style={styles.sectionTitle}>Ubicación</Text>
          <View style={styles.locationBox}>
            <MapPin size={20} color="#4f46e5" />
            <Text style={styles.locationText}>{proInitial.location}</Text>
          </View>
          
          {/* --- SECCIÓN DE RESEÑAS --- */}
          <View 
            style={styles.reviewsSection}
            onLayout={(event: LayoutChangeEvent) => {
              // Calculamos posición. 260 es la altura visible aproximada de la imagen antes del contenido
              const layout = event.nativeEvent.layout;
              console.log("Posición de reseñas detectada:", layout.y + 260); // DEBUG
              setReviewsY(layout.y + 260); 
            }}
          >
             <Text style={styles.sectionTitle}>Opiniones ({reviews.length})</Text>

             {/* Formulario Nueva Reseña */}
             <View style={styles.addReviewBox}>
                <Text style={styles.addReviewTitle}>¿Trabajaste con {proInitial.name.split(' ')[0]}?</Text>
                
                {/* Estrellas Interactivas */}
                <View style={styles.starSelector}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <TouchableOpacity key={star} onPress={() => setNewRating(star)}>
                       <Star 
                         size={28} 
                         color={star <= newRating ? "#ca8a04" : "#cbd5e1"} 
                         fill={star <= newRating ? "#facc15" : "transparent"} 
                       />
                    </TouchableOpacity>
                  ))}
                </View>

                {/* Input */}
                <View style={styles.inputWrapper}>
                   <TextInput 
                      style={styles.reviewInput}
                      placeholder="Escribe tu reseña..."
                      placeholderTextColor="#94a3b8"
                      multiline
                      value={newComment}
                      onChangeText={setNewComment}
                   />
                   <TouchableOpacity style={styles.sendButton} onPress={handleAddReview}>
                      <Send size={18} color="#fff" />
                   </TouchableOpacity>
                </View>
             </View>

             {/* Lista de Reseñas */}
             {reviews.map((review) => (
               <View key={review.id} style={styles.reviewCard}>
                 <View style={styles.reviewHeader}>
                   <Text style={styles.reviewUser}>{review.user}</Text>
                   <Text style={styles.reviewDate}>{review.date}</Text>
                 </View>
                 <View style={styles.reviewRatingRow}>
                    {[1, 2, 3, 4, 5].map((star) => (
                       <Star 
                         key={star} 
                         size={12} 
                         color={star <= review.rating ? "#ca8a04" : "#e2e8f0"} 
                         fill={star <= review.rating ? "#facc15" : "transparent"} 
                       />
                    ))}
                 </View>
                 <Text style={styles.reviewText}>{review.comment}</Text>
               </View>
             ))}
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
    backgroundColor: '#fff', marginTop: -40, borderTopLeftRadius: 32, borderTopRightRadius: 32,
    paddingHorizontal: 24, paddingTop: 12, minHeight: 500,
  },
  handle: {
    width: 40, height: 5, backgroundColor: '#e2e8f0', borderRadius: 10, alignSelf: 'center', marginBottom: 20
  },
  
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 },
  name: { fontSize: 24, fontWeight: 'bold', color: '#0f172a' },
  jobTitle: { fontSize: 14, color: '#64748b', marginTop: 4 },
  price: { fontSize: 18, fontWeight: 'bold', color: '#4f46e5' },

  statsContainer: {
    flexDirection: 'row', borderTopWidth: 1, borderBottomWidth: 1,
    borderColor: '#f1f5f9', paddingVertical: 16, marginBottom: 24
  },
  statItem: { flex: 1, alignItems: 'center', justifyContent: 'center' }, 
  borderLeft: { borderLeftWidth: 1, borderLeftColor: '#f1f5f9' },
  statValue: { fontSize: 18, fontWeight: 'bold', color: '#0f172a' },
  statLabel: { fontSize: 12, color: '#94a3b8' },

  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#0f172a', marginBottom: 12, marginTop: 12 },
  description: { fontSize: 14, color: '#475569', lineHeight: 22, marginBottom: 20 },

  locationBox: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#f8fafc',
    padding: 12, borderRadius: 12, marginBottom: 24
  },
  locationText: { marginLeft: 8, color: '#475569', fontWeight: '600' },

  // --- ESTILOS DE RESEÑAS ---
  reviewsSection: { marginBottom: 20 },
  
  // Caja para agregar reseña
  addReviewBox: {
    backgroundColor: '#f8fafc', padding: 16, borderRadius: 16, marginBottom: 20,
    borderWidth: 1, borderColor: '#e2e8f0'
  },
  addReviewTitle: { fontSize: 14, fontWeight: '600', color: '#334155', marginBottom: 8 },
  starSelector: { flexDirection: 'row', gap: 8, marginBottom: 12 },
  inputWrapper: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 12, borderWidth: 1, borderColor: '#e2e8f0', paddingRight: 8 },
  reviewInput: { flex: 1, padding: 12, maxHeight: 80, color: '#0f172a' },
  sendButton: { backgroundColor: '#4f46e5', padding: 8, borderRadius: 8 },

  // Tarjeta de reseña individual
  reviewCard: {
    backgroundColor: '#fff', padding: 16, borderRadius: 16, marginBottom: 12,
    borderWidth: 1, borderColor: '#f1f5f9',
    shadowColor: '#000', shadowOpacity: 0.02, shadowRadius: 4, elevation: 1
  },
  reviewHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  reviewUser: { fontWeight: '700', color: '#0f172a', fontSize: 14 },
  reviewDate: { fontSize: 12, color: '#94a3b8' },
  reviewRatingRow: { flexDirection: 'row', marginBottom: 8 },
  reviewText: { fontSize: 13, color: '#475569', lineHeight: 20 },

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