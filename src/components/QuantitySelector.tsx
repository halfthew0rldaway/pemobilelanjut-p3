import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

interface QuantitySelectorProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  min?: number;
}

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  onIncrease,
  onDecrease,
  min = 1,
}) => {
  const isMin = quantity <= min;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Jumlah Barang:</Text>
      <View style={styles.controlsRow}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Kurangi jumlah barang"
          accessibilityState={{ disabled: isMin }}
          disabled={isMin}
          style={({ pressed }) => [
            styles.button,
            isMin && styles.buttonDisabled,
            pressed && !isMin && styles.buttonPressed,
          ]}
          onPress={onDecrease}
        >
          <Text style={[styles.buttonText, isMin && styles.buttonTextDisabled]}>−</Text>
        </Pressable>

        <View style={styles.valueContainer}>
          <Text style={styles.valueText}>{quantity}</Text>
        </View>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Tambah jumlah barang"
          style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
          onPress={onIncrease}
        >
          <Text style={styles.buttonText}>+</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 8,
  },
  controlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: '#EEF2FF',
    borderWidth: 1,
    borderColor: '#C7D2FE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#F1F5F9',
    borderColor: '#E2E8F0',
  },
  buttonPressed: {
    backgroundColor: '#E0E7FF',
  },
  buttonText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1E40AF',
    lineHeight: 24,
  },
  buttonTextDisabled: {
    color: '#94A3B8',
  },
  valueContainer: {
    minWidth: 54,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  valueText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
  },
});

