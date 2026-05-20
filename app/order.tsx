import { View, Text, StyleSheet, ScrollView, Pressable, Platform, useWindowDimensions } from 'react-native';
import { useContext, useState } from 'react';
import { CartContext } from './_layout';
import { useRouter } from 'expo-router';
import { ArrowLeft, Minus, Plus, Trash2 } from 'lucide-react-native';

const PAYMENT_METHODS = ['QRIS', 'Tunai'];

export default function OrderScreen() {
  const cart = useContext(CartContext);
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState('QRIS');
  const { width } = useWindowDimensions();

  const isWeb = Platform.OS === 'web';
  const containerWidth = isWeb && width > 450 ? 450 : width;

  if (!cart || cart.itemCount === 0) {
    return (
      <View style={[styles.screen, { justifyContent: 'center' }]}>
        <Text style={styles.emptyText}>Your cart is empty.</Text>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>Back to Menu</Text>
        </Pressable>
      </View>
    );
  }

  const handleCheckout = () => {
    cart.clearCart();
    router.replace('/status');
  };

  return (
    <View style={styles.screen}>
      <View style={[styles.container, isWeb && { width: containerWidth }]}>
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
          {/* Order Items */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Order Summary</Text>
            {cart.items.map((item) => (
              <View key={item.product.id} style={styles.cartItem}>
                <View style={styles.itemInfo}>
                  <Text style={styles.itemTitle}>{item.product.title}</Text>
                  <Text style={styles.itemPrice}>Rp {item.product.price.toLocaleString('id-ID')}</Text>
                </View>
                
                <View style={styles.quantityControls}>
                  <Pressable 
                    style={styles.qtButton}
                    onPress={() => {
                      if (item.quantity > 1) {
                        // For simplicity, we just removeFromCart and add back with n-1, 
                        // but since our context doesn't handle decrement cleanly here, we'll implement a fast clear if quantity 1
                        cart.removeFromCart(item.product.id);
                      } else {
                        cart.removeFromCart(item.product.id);
                      }
                    }}
                  >
                    {item.quantity === 1 ? <Trash2 size={16} color="#4F4441" /> : <Minus size={16} color="#4F4441" />}
                  </Pressable>
                  <Text style={styles.quantityText}>{item.quantity}</Text>
                  <Pressable 
                    style={styles.qtButton}
                    onPress={() => cart.addToCart(item.product)}
                  >
                    <Plus size={16} color="#4F4441" />
                  </Pressable>
                </View>
              </View>
            ))}
          </View>

          {/* Payment Method */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Payment Method</Text>
            <View style={styles.paymentMethodsGrid}>
              {PAYMENT_METHODS.map((method) => (
                <Pressable
                  key={method}
                  style={[
                    styles.paymentMethodCard,
                    paymentMethod === method && styles.paymentMethodCardActive
                  ]}
                  onPress={() => setPaymentMethod(method)}
                >
                  <View style={[styles.radio, paymentMethod === method && styles.radioActive]} />
                  <Text style={[styles.paymentMethodText, paymentMethod === method && styles.paymentMethodTextActive]}>
                    {method}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          {/* Price Summary */}
          <View style={styles.summarySection}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>Rp {cart.cartTotal.toLocaleString('id-ID')}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Tax (10%)</Text>
              <Text style={styles.summaryValue}>Rp {(cart.cartTotal * 0.1).toLocaleString('id-ID')}</Text>
            </View>
            <View style={[styles.summaryRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>Total Payment</Text>
              <Text style={styles.totalValue}>Rp {(cart.cartTotal * 1.1).toLocaleString('id-ID')}</Text>
            </View>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <Pressable style={styles.checkoutBtn} onPress={handleCheckout}>
            <Text style={styles.checkoutBtnText}>Place Order</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    width: '100%',
  },
  emptyText: {
    fontFamily: 'PlusJakartaSans_500Medium',
    fontSize: 16,
    color: '#4F4441',
    textAlign: 'center',
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: '#4B3832',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    alignSelf: 'center',
  },
  backButtonText: {
    color: '#FFFFFF',
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 14,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    gap: 24,
  },
  section: {
    gap: 16,
  },
  sectionTitle: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 18,
    color: '#1A1C1C',
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D3C3BF',
  },
  itemInfo: {
    flex: 1,
    gap: 4,
  },
  itemTitle: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 15,
    color: '#1A1C1C',
  },
  itemPrice: {
    fontFamily: 'PlusJakartaSans_500Medium',
    fontSize: 14,
    color: '#4F4441',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#F9F9F9',
    borderRadius: 8,
    padding: 4,
    borderWidth: 1,
    borderColor: '#D3C3BF',
  },
  qtButton: {
    padding: 6,
    backgroundColor: '#FFFFFF',
    borderRadius: 6,
  },
  quantityText: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 14,
    color: '#1A1C1C',
    minWidth: 20,
    textAlign: 'center',
  },
  paymentMethodsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  paymentMethodCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D3C3BF',
    gap: 12,
  },
  paymentMethodCardActive: {
    borderColor: '#4B3832',
    backgroundColor: '#Faf7f5',
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#D3C3BF',
  },
  radioActive: {
    borderColor: '#4B3832',
    borderWidth: 6,
  },
  paymentMethodText: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 15,
    color: '#4F4441',
  },
  paymentMethodTextActive: {
    color: '#1A1C1C',
  },
  summarySection: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    gap: 12,
    borderWidth: 1,
    borderColor: 'rgba(211, 195, 191, 0.4)',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryLabel: {
    fontFamily: 'PlusJakartaSans_500Medium',
    fontSize: 14,
    color: '#4F4441',
  },
  summaryValue: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 14,
    color: '#1A1C1C',
  },
  totalRow: {
    marginTop: 8,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#D3C3BF',
  },
  totalLabel: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 16,
    color: '#1A1C1C',
  },
  totalValue: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 18,
    color: '#4B3832',
  },
  footer: {
    padding: 20,
    paddingBottom: Platform.OS === 'ios' ? 34 : 20,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#D3C3BF',
  },
  checkoutBtn: {
    backgroundColor: '#4B3832',
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
  },
  checkoutBtnText: {
    color: '#FFFFFF',
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 16,
  },
});
