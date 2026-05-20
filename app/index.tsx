import { View, Text, StyleSheet, ScrollView, Image, Pressable, useWindowDimensions, Platform } from 'react-native';
import { useContext, useState } from 'react';
import { CartContext } from './_layout';
import { Plus, ShoppingBag } from 'lucide-react-native';
import { useRouter } from 'expo-router';

const PRODUCTS = [
  { id: '1', title: 'Caramel Macchiato', price: 45000, category: 'Coffee', image: 'https://images.unsplash.com/photo-1485600469007-95bd97fb414c?q=80&w=600&auto=format&fit=crop' },
  { id: '2', title: 'Iced Americano', price: 30000, category: 'Coffee', image: 'https://images.unsplash.com/photo-1517701550927-30cf0ba293f2?q=80&w=600&auto=format&fit=crop' },
  { id: '3', title: 'Matcha Latte', price: 40000, category: 'Non-Coffee', image: 'https://images.unsplash.com/photo-1536514072410-5019a3c69182?q=80&w=600&auto=format&fit=crop' },
  { id: '4', title: 'Chocolate Muffin', price: 25000, category: 'Pastry', image: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?q=80&w=600&auto=format&fit=crop' },
  { id: '5', title: 'Flat White', price: 38000, category: 'Coffee', image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=600&auto=format&fit=crop' },
  { id: '6', title: 'Almond Croissant', price: 35000, category: 'Pastry', image: 'https://images.unsplash.com/photo-1509424523528-dbd08ea3bada?q=80&w=600&auto=format&fit=crop' },
];

const CATEGORIES = ['All', 'Coffee', 'Non-Coffee', 'Pastry'];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('All');
  const cart = useContext(CartContext);
  const router = useRouter();
  const { width } = useWindowDimensions();

  // Mobile first, max width for desktop
  const isWeb = Platform.OS === 'web';
  const containerWidth = isWeb && width > 450 ? 450 : width;
  const padding = 20;
  const availableWidth = containerWidth - (padding * 2);
  const cardWidth = (availableWidth - 16) / 2; // 16 is the gap

  const filteredProducts = activeCategory === 'All' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === activeCategory);

  return (
    <View style={styles.screen}>
      <View style={[styles.container, isWeb && { width: containerWidth }]}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Header Text */}
          <View style={styles.header}>
            <Text style={styles.greeting}>Good morning, Alex</Text>
            <Text style={styles.prompt}>What would you like to drink today?</Text>
          </View>

          {/* Categories */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoriesContainer}>
            {CATEGORIES.map((cat, idx) => {
              const isActive = cat === activeCategory;
              return (
                <Pressable 
                  key={cat} 
                  style={[styles.categoryChip, isActive && styles.categoryChipActive, idx === 0 && { marginLeft: 20 }]}
                  onPress={() => setActiveCategory(cat)}
                >
                  <Text style={[styles.categoryText, isActive && styles.categoryTextActive]}>{cat}</Text>
                </Pressable>
              );
            })}
          </ScrollView>

          {/* Product Grid */}
          <View style={styles.gridContainer}>
            {filteredProducts.map((product) => (
              <View key={product.id} style={[styles.card, { width: cardWidth }]}>
                <Image source={{ uri: product.image }} style={styles.cardImage} />
                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle} numberOfLines={1}>{product.title}</Text>
                  <View style={styles.priceRow}>
                    <Text style={styles.cardPrice}>Rp {product.price.toLocaleString('id-ID')}</Text>
                    <Pressable 
                      style={styles.addButton}
                      onPress={() => cart?.addToCart(product)}
                    >
                      <Plus size={16} color="#FFFFFF" />
                    </Pressable>
                  </View>
                </View>
              </View>
            ))}
          </View>
          
          {/* Bottom spacing for floating cart */}
          {cart && cart.itemCount > 0 && <View style={{ height: 100 }} />}
        </ScrollView>

        {/* Floating Cart Bar */}
        {cart && cart.itemCount > 0 && (
          <View style={styles.floatingCartContainer}>
            <Pressable 
              style={styles.floatingCart}
              onPress={() => router.push('/order')}
            >
              <View style={styles.cartInfo}>
                <View style={styles.cartIconBadge}>
                  <ShoppingBag size={20} color="#FFFFFF" />
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{cart.itemCount}</Text>
                  </View>
                </View>
                <Text style={styles.cartTotal}>Rp {cart.cartTotal.toLocaleString('id-ID')}</Text>
              </View>
              <Text style={styles.checkoutText}>View Cart</Text>
            </Pressable>
          </View>
        )}
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
  scrollContent: {
    paddingBottom: 20,
  },
  header: {
    padding: 20,
    paddingTop: 10,
  },
  greeting: {
    fontFamily: 'PlusJakartaSans_500Medium',
    fontSize: 14,
    color: '#4F4441',
    marginBottom: 4,
  },
  prompt: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 24,
    color: '#1A1C1C',
    lineHeight: 32,
  },
  categoriesContainer: {
    paddingRight: 20,
    paddingBottom: 20,
    gap: 12,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D3C3BF',
  },
  categoryChipActive: {
    backgroundColor: '#4B3832',
    borderColor: '#4B3832',
  },
  categoryText: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 14,
    color: '#4F4441',
  },
  categoryTextActive: {
    color: '#FFFFFF',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    gap: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#4B3832',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
    borderWidth: 1,
    borderColor: 'rgba(211, 195, 191, 0.4)',
  },
  cardImage: {
    width: '100%',
    height: 140,
    backgroundColor: '#F0EBE9',
  },
  cardContent: {
    padding: 12,
  },
  cardTitle: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 14,
    color: '#1A1C1C',
    marginBottom: 8,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardPrice: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 15,
    color: '#4B3832',
  },
  addButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#4B3832',
    alignItems: 'center',
    justifyContent: 'center',
  },
  floatingCartContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    paddingBottom: Platform.OS === 'ios' ? 34 : 20,
  },
  floatingCart: {
    backgroundColor: '#33231D',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#33231D',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 6,
  },
  cartInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  cartIconBadge: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -6,
    right: -8,
    backgroundColor: '#D15B40',
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#33231D',
  },
  badgeText: {
    color: '#FFFFFF',
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 10,
  },
  cartTotal: {
    color: '#FFFFFF',
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 16,
  },
  checkoutText: {
    color: '#FFFFFF',
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 15,
  },
});
