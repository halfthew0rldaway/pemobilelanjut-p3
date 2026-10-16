import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Alert, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CheckoutScreenProps } from '../types/navigation';
import { formatCurrency } from '../utils/formatCurrency';

export const CheckoutScreen: React.FC<CheckoutScreenProps> = ({ route, navigation }) => {
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);

  const product = route.params?.product;
  const quantity = route.params?.quantity;

  // Validasi runtime terhadap parameter yang diterima
  const isProductValid =
    product &&
    typeof product.id === 'string' &&
    typeof product.price === 'number' &&
    !isNaN(product.price);

  const isQuantityValid =
    typeof quantity === 'number' &&
    Number.isInteger(quantity) &&
    quantity >= 1;

  if (!isProductValid || !isQuantityValid) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorTitle}>Data Checkout Tidak Valid</Text>
          <Text style={styles.errorMessage}>
            Informasi produk atau jumlah barang tidak lengkap. Silakan pilih kembali dari katalog produk.
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

  // Perhitungan total aktual: total = hargaSatuan × jumlah
  const total = product.price * quantity;

  const handleConfirmOrder = () => {
    if (isConfirmed) return;

    setIsConfirmed(true);

    const feedbackTitle = 'Pesanan Demo Berhasil!';
    const feedbackMessage =
      'Pesanan demo Anda berhasil dikonfirmasi.\n\nCatatan: Ini adalah aplikasi simulasi tugas akademik. Tidak ada transaksi perbankan atau pembayaran sungguhan.';

    if (Platform.OS === 'web') {
      // Pada web, alert standar browser didukung
      window.alert(`${feedbackTitle}\n\n${feedbackMessage}`);
    } else {
      Alert.alert(
        feedbackTitle,
        feedbackMessage,
        [{ text: 'OK', onPress: () => {} }],
        { cancelable: true }
      );
    }
  };

  const handleBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate('Home');
    }
  };

  const handleReturnHome = () => {
    navigation.navigate('Home');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Tombol Kembali ke Detail */}
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Kembali ke detail produk"
          style={({ pressed }) => [styles.navBackButton, pressed && styles.buttonPressed]}
          onPress={handleBack}
        >
          <Text style={styles.navBackButtonText}>← Kembali ke Detail</Text>
        </Pressable>

        {/* Header Layar */}
        <View style={styles.headerBox}>
          <Text style={styles.screenTitle}>Ringkasan Pembelian</Text>
          <Text style={styles.screenSubtitle}>
            Periksa rincian barang sebelum menyelesaikan konfirmasi pesanan demo.
          </Text>
        </View>

        {/* Card Rincian Barang */}
        <View style={styles.card}>
          <Text style={styles.cardHeaderTitle}>Barang yang Dipesan</Text>
          
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryBadgeText}>{product.category}</Text>
          </View>

          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.productIdText}>Kode Item: {product.id.toUpperCase()}</Text>

          <View style={styles.divider} />

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Harga Satuan</Text>
            <Text style={styles.summaryValue}>{formatCurrency(product.price)}</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Jumlah Barang</Text>
            <Text style={styles.summaryValue}>{quantity} unit</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total Pembayaran</Text>
            <Text style={styles.totalValue}>{formatCurrency(total)}</Text>
          </View>
        </View>

        {/* Catatan Simulasi */}
        <View style={styles.simulationNoteCard}>
          <Text style={styles.simulationNoteTitle}>Informasi Simulasi</Text>
          <Text style={styles.simulationNoteText}>
            Aplikasi ini ditujukan untuk tugas akademik (Pertemuan 3). Tidak ada pembayaran nyata,
            integrasi gateway perbankan, atau mutasi saldo rekening.
          </Text>
        </View>

        {/* Banner Feedback Setelah Konfirmasi */}
        {isConfirmed && (
          <View style={styles.confirmedBanner}>
            <Text style={styles.confirmedBannerTitle}>Pesanan Demo Berhasil Dikonfirmasi!</Text>
            <Text style={styles.confirmedBannerText}>
              Total pesanan sebesar {formatCurrency(total)} untuk {quantity} unit {product.name} telah
              tercatat dalam simulasi.
            </Text>
          </View>
        )}

        {/* Tombol Aksi Konfirmasi */}
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Konfirmasi Pembelian Demo"
          accessibilityState={{ disabled: isConfirmed }}
          disabled={isConfirmed}
          style={({ pressed }) => [
            styles.confirmButton,
            isConfirmed && styles.confirmButtonDisabled,
            pressed && !isConfirmed && styles.confirmButtonPressed,
          ]}
          onPress={handleConfirmOrder}
        >
          <Text style={[styles.confirmButtonText, isConfirmed && styles.confirmButtonTextDisabled]}>
            {isConfirmed ? 'Pesanan Terkonfirmasi' : 'Konfirmasi Pembelian'}
          </Text>
        </Pressable>

        {/* Tombol Kembali ke Katalog */}
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Kembali ke Katalog Produk"
          style={({ pressed }) => [styles.returnCatalogButton, pressed && styles.returnCatalogButtonPressed]}
          onPress={handleReturnHome}
        >
          <Text style={styles.returnCatalogButtonText}>Kembali ke Katalog</Text>
        </Pressable>
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
  headerBox: {
    marginBottom: 16,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 4,
  },
  screenSubtitle: {
    fontSize: 14,
    color: '#64748B',
    lineHeight: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },
  cardHeaderTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 12,
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
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
    lineHeight: 24,
    marginBottom: 4,
  },
  productIdText: {
    fontSize: 12,
    color: '#94A3B8',
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 14,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#475569',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0F172A',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 4,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
  },
  totalValue: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1E40AF',
  },
  simulationNoteCard: {
    backgroundColor: '#F0FDF4',
    borderRadius: 10,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#BBF7D0',
  },
  simulationNoteTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#166534',
    marginBottom: 4,
  },
  simulationNoteText: {
    fontSize: 12,
    color: '#15803D',
    lineHeight: 18,
  },
  confirmedBanner: {
    backgroundColor: '#EFF6FF',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  confirmedBannerTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1E40AF',
    marginBottom: 4,
  },
  confirmedBannerText: {
    fontSize: 13,
    color: '#1D4ED8',
    lineHeight: 19,
  },
  confirmButton: {
    backgroundColor: '#1E40AF',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  confirmButtonPressed: {
    backgroundColor: '#1D4ED8',
  },
  confirmButtonDisabled: {
    backgroundColor: '#94A3B8',
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  confirmButtonTextDisabled: {
    color: '#F8FAFC',
  },
  returnCatalogButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  returnCatalogButtonPressed: {
    backgroundColor: '#F8FAFC',
  },
  returnCatalogButtonText: {
    color: '#334155',
    fontSize: 15,
    fontWeight: '600',
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
