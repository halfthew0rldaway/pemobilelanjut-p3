/**
 * Memformat angka harga menjadi format Rupiah standar Indonesia.
 * Contoh: 12500000 -> "Rp12.500.000", 275000 -> "Rp275.000"
 */
export function formatCurrency(price: number): string {
  if (typeof price !== 'number' || isNaN(price)) {
    return 'Rp0';
  }

  // Gunakan pemisah ribuan titik standar Rupiah Indonesia
  const integerPart = Math.round(price);
  const formatted = integerPart.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `Rp${formatted}`;
}

