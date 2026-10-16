import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Product } from '../types/product';
import { formatCurrency } from '../utils/formatCurrency';

interface ProductCardProps {
  product: Product;
  onPressDetail: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onPressDetail }) => {
  // Label representatif untuk visual placeholder berdasarkan kategori (tanpa emoji sesuai req.md)
  const getCategoryLabel = (cat: string) => {
    switch (cat.toLowerCase()) {
      case 'pc desktop':
        return 'DESKTOP PC';
      case 'laptop':
        return 'LAPTOP ULTRABOOK';
      case 'monitor':
        return 'IPS DISPLAY';
      case 'keyboard':
        return 'MECHANICAL KEYBOARD';
      case 'mouse':
        return 'GAMING MOUSE';
      case 'storage':
        return 'NVME SSD STORAGE';
      default:
        return 'HARDWARE KOMPUTER';
    }
  };

  return (
    <View style={styles.card}>
      {/* Placeholder visual produk */}
      <View style={styles.imagePlaceholder}>
        <View style={styles.placeholderBadge}>
          <Text style={styles.placeholderLabel}>{getCategoryLabel(product.category)}</Text>
        </View>
        <Text style={styles.placeholderId}>{product.id.toUpperCase()}</Text>
      </View>

      <View style={styles.infoContainer}>
        {/* Badge Kategori */}
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryBadgeText}>{product.category}</Text>
        </View>

        {/* Nama Produk */}
        <Text style={styles.productName} numberOfLines={2}>
          {product.name}
        </Text>

        {/* Harga */}
        <Text style={styles.productPrice}>{formatCurrency(product.price)}</Text>

        {/* Tombol Lihat Detail */}
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Lihat detail produk ${product.name}`}
          style={({ pressed }) => [styles.detailButton, pressed && styles.detailButtonPressed]}
          onPress={() => onPressDetail(product)}
        >
          <Text style={styles.detailButtonText}>Lihat Detail</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 16,
    overflow: 'hidden',
    // Shadow / elevation ringan
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  imagePlaceholder: {
    height: 120,
    backgroundColor: '#F8FAFC',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
  },
  placeholderBadge: {
    backgroundColor: '#E2E8F0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    marginBottom: 8,
  },
  placeholderLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#334155',
    letterSpacing: 0.5,
  },
  placeholderId: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748B',
    letterSpacing: 1,
  },
  infoContainer: {
    padding: 16,
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
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    lineHeight: 22,
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1E40AF',
    marginBottom: 14,
  },
  detailButton: {
    backgroundColor: '#2563EB',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailButtonPressed: {
    backgroundColor: '#1D4ED8',
  },
  detailButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});
