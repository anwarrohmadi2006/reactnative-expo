import { View, Text, StyleSheet, Pressable, Platform, useWindowDimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { Coffee, CheckCircle2 } from 'lucide-react-native';

export default function StatusScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isWeb = Platform.OS === 'web';
  const containerWidth = isWeb && width > 450 ? 450 : width;

  return (
    <View style={styles.screen}>
      <View style={[styles.container, isWeb && { width: containerWidth }]}>
        <View style={styles.content}>
          <View style={styles.iconContainer}>
            <Coffee size={48} color="#4B3832" />
            <View style={styles.checkBadge}>
              <CheckCircle2 size={24} color="#4CAF50" fill="#FFFFFF" />
            </View>
          </View>
          
          <Text style={styles.title}>Order Received!</Text>
          <Text style={styles.subtitle}>
            Your coffee is being prepared. We'll call your name when it's ready.
          </Text>

          <View style={styles.statusBox}>
            <Text style={styles.statusLabel}>Order Number</Text>
            <Text style={styles.orderNumber}>#A-042</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Pressable 
            style={styles.doneBtn}
            onPress={() => router.replace('/')}
          >
            <Text style={styles.doneBtnText}>Back to Menu</Text>
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
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  iconContainer: {
    width: 100,
    height: 100,
    backgroundColor: '#F0EBE9',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
    position: 'relative',
  },
  checkBadge: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
  },
  title: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 28,
    color: '#1A1C1C',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: 'PlusJakartaSans_500Medium',
    fontSize: 16,
    color: '#4F4441',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
  },
  statusBox: {
    backgroundColor: '#FFFFFF',
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    width: '100%',
    borderWidth: 1,
    borderColor: '#D3C3BF',
    borderStyle: 'dashed',
  },
  statusLabel: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 14,
    color: '#4F4441',
    marginBottom: 8,
  },
  orderNumber: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 32,
    color: '#33231D',
  },
  footer: {
    padding: 20,
    paddingBottom: Platform.OS === 'ios' ? 34 : 20,
  },
  doneBtn: {
    backgroundColor: '#4B3832',
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
  },
  doneBtnText: {
    color: '#FFFFFF',
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 16,
  },
});
