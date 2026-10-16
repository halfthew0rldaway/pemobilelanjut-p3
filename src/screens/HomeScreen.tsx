import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HomeScreenProps } from '../types/navigation';
import { Product } from '../types/product';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const handlePressDetail = (product: Product) => {
    navigation.navigate('Detail', { product });
  };

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <Text style={styles.appTitle}>CompStore</Text>
      <Text style={styles.appSubtitle}>Temukan perangkat yang sesuai kebutuhanmu</Text>
      <View style={styles.badgeInfo}>
        <Text style={styles.badgeInfoText}>Katalog Komputer & Aksesori Resmi</Text>
      </View>
    </View>
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyTitle}>Katalog Belum Tersedia</Text>
      <Text style={styles.emptySubtitle}>Tidak ada produk yang dapat ditampilkan saat ini.</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={PRODUCTS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ProductCard product={item} onPressDetail={handlePressDetail} />
        )}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmpty}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 24,
  },
  headerContainer: {
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 12,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  appTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1E40AF',
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  appSubtitle: {
    fontSize: 14,
    color: '#475569',
    marginBottom: 12,
    lineHeight: 20,
  },
  badgeInfo: {
    backgroundColor: '#F1F5F9',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
  },
  badgeInfoText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#334155',
  },
  emptyContainer: {
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#334155',
    marginBottom: 6,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
  },
});
