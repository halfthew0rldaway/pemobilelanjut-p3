import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DetailScreenProps } from '../types/navigation';
import { QuantitySelector } from '../components/QuantitySelector';
import { formatCurrency } from '../utils/formatCurrency';

export const DetailScreen: React.FC<DetailScreenProps> = ({ route, navigation }) => {
  // Kelola jumlah barang menggunakan useState (sesuai requirement akademik)
  const [quantity, setQuantity] = useState<number>(1);

  const product = route.params?.product;

  // Penanganan jika parameter tidak valid / tidak ada
  if (!product || !product.id || typeof product.price !== 'number') {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorTitle}>Produk Tidak Ditemukan</Text>
          <Text style={styles.errorMessage}>
            Data produk yang Anda pilih tidak tersedia atau parameter navigasi tidak valid.
          </Text>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Kembali ke katalog produk"
            style={({ pressed }) => [styles.backButtonAction, pressed && styles.buttonPressed]}
            onPress={() => {
              if (navigation.canGoBack()) {
                navigation.goBack();
              } else {
                navigation.navigate('Home');
              }
            }}
          >
            <Text style={styles.backButtonActionText}>Kembali ke Katalog</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrease = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleBuyNow = () => {
    // Navigasi ke Checkout dengan passing data product dan quantity aktual
    navigation.navigate('Checkout', {
      product,
      quantity,
    });
  };

  const handleBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate('Home');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Tombol Kembali */}
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Kembali ke halaman katalog"
          style={({ pressed }) => [styles.navBackButton, pressed && styles.buttonPressed]}
          onPress={handleBack}
        >
          <Text style={styles.navBackButtonText}>← Kembali ke Katalog</Text>
        </Pressable>

        {/* Visual Placeholder Produk */}
        <View style={styles.imagePlaceholder}>
          <View style={styles.placeholderBadge}>
            <Text style={styles.placeholderLabel}>{product.category.toUpperCase()}</Text>
          </View>
          <Text style={styles.placeholderId}>ID: {product.id.toUpperCase()}</Text>
        </View>

        {/* Card Info Utama */}
        <View style={styles.card}>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryBadgeText}>{product.category}</Text>
          </View>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.productPrice}>{formatCurrency(product.price)}</Text>
          <Text style={styles.unitNote}>Harga satuan resmi CompStore (sudah termasuk PPN)</Text>
        </View>

        {/* Card Deskripsi */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Deskripsi Produk</Text>
          <Text style={styles.descriptionText}>{product.description}</Text>
        </View>

        {/* Card Spesifikasi Teknis */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Spesifikasi Teknis</Text>
          {product.specifications && product.specifications.length > 0 ? (
            product.specifications.map((spec, index) => (
              <View
                key={`${spec.label}-${index}`}
                style={[
                  styles.specRow,
                  index < product.specifications.length - 1 && styles.specRowBorder,
                ]}
              >
                <Text style={styles.specLabel}>{spec.label}</Text>
                <Text style={styles.specValue}>{spec.value}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.emptySpecText}>Spesifikasi detail tidak tersedia.</Text>
          )}
        </View>

        {/* Card Pemilihan Jumlah & Aksi Beli */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Tentukan Jumlah Pembelian</Text>
          <QuantitySelector
            quantity={quantity}
            onIncrease={handleIncrease}
            onDecrease={handleDecrease}
            min={1}
          />

          <View style={styles.subtotalRow}>
            <Text style={styles.subtotalLabel}>Subtotal Estimasi ({quantity} unit):</Text>
            <Text style={styles.subtotalValue}>{formatCurrency(product.price * quantity)}</Text>
          </View>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`Beli sekarang ${product.name} sebanyak ${quantity} unit`}
            style={({ pressed }) => [styles.buyButton, pressed && styles.buyButtonPressed]}
            onPress={handleBuyNow}
          >
            <Text style={styles.buyButtonText}>Beli Sekarang</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 32,
  },
  navBackButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    marginBottom: 14,
  },
  navBackButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#334155',
  },
  buttonPressed: {
    opacity: 0.8,
  },
  imagePlaceholder: {
    height: 140,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },
  placeholderBadge: {
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 6,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: '#C7D2FE',
  },
  placeholderLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E40AF',
    letterSpacing: 0.8,
  },
  placeholderId: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  categoryBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1D4ED8',
  },
  productName: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A',
    lineHeight: 26,
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1E40AF',
    marginBottom: 4,
  },
  unitNote: {
    fontSize: 12,
    color: '#64748B',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#334155',
  },
  specRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  specRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  specLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748B',
    width: '38%',
  },
  specValue: {
    fontSize: 13,
    color: '#0F172A',
    fontWeight: '500',
    width: '60%',
    textAlign: 'right',
  },
  emptySpecText: {
    fontSize: 13,
    color: '#94A3B8',
  },
  subtotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  subtotalLabel: {
    fontSize: 14,
    color: '#475569',
    fontWeight: '500',
  },
  subtotalValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E40AF',
  },
  buyButton: {
    backgroundColor: '#2563EB',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buyButtonPressed: {
    backgroundColor: '#1D4ED8',
  },
  buyButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#DC2626',
    marginBottom: 8,
  },
  errorMessage: {
    fontSize: 14,
    color: '#475569',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  backButtonAction: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  backButtonActionText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});
