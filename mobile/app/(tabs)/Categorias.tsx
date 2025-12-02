import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, Stack } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import { CATEGORIES } from '../../data/mockData';

type Category = {
  id: string;
  name: string;
  icon: React.ComponentType<{ size?: number; color?: string }>;
  bgColor?: string;
  iconColor?: string;
};

export default function CategoriesScreen() {
  const router = useRouter();

  const renderItem = ({ item }: { item: Category }) => {
    const Icon = item.icon;
    return (
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.8}
        // Al hacer clic, vamos a la lista filtrando por esta categoría
        onPress={() => router.push({ pathname: '/list', params: { categoryId: item.id, name: item.name } } as any)}
      >
        <View style={[styles.iconContainer, { backgroundColor: item.bgColor }]}>
          <Icon size={32} color={item.iconColor} />
        </View>
        <Text style={styles.cardText}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      {/* Configuramos la navegación para ocultar el header por defecto */}
      <Stack.Screen options={{ headerShown: false }} />

      <FlatList<Category>
        data={CATEGORIES}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2} // Grid de 2 columnas
        contentContainerStyle={styles.grid}
        columnWrapperStyle={styles.row} // Estilo para separar las columnas
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  header: {
    flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 16,
    backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#f1f5f9'
  },
  backButton: { 
    padding: 8, marginRight: 12, borderRadius: 12, backgroundColor: '#f1f5f9' 
  },
  title: { fontSize: 20, fontWeight: '800', color: '#0f172a' },
  
  grid: { padding: 20 },
  row: { justifyContent: 'space-between', marginBottom: 16 },
  
  card: {
    width: '48%', // Casi la mitad para dejar espacio en medio
    backgroundColor: '#fff', borderRadius: 24, padding: 20,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: '#e2e8f0',
    // Sombra suave
    shadowColor: '#64748b', shadowOpacity: 0.08, shadowRadius: 12, shadowOffset: { width: 0, height: 4 },
    elevation: 3
  },
  iconContainer: {
    width: 64, height: 64, borderRadius: 32, 
    alignItems: 'center', justifyContent: 'center', marginBottom: 14
  },
  cardText: { fontSize: 15, fontWeight: '700', color: '#334155', textAlign: 'center' }
});