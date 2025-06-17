import React, { useEffect } from 'react';
import { SafeAreaView, Text, StyleSheet, View, Button } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { useAppDispatch, useAppSelector } from './src/state/hooks';
import { Provider } from 'react-redux';
import { store } from './src/state/store';
import { useNetworkSync } from './src/hooks/useNetworkSync';
import { ProductList } from './src/components/ProductList';
import { OrdersScreen } from './src/screens/OrdersScreen'
import { PendingSyncList } from './src/components/PendingSyncList';

const SyncStatus = () => {
  const [isConnected, setIsConnected] = React.useState(true);
  const queue = useAppSelector((state) => state.orders.queue);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected ?? true);
    });
    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.syncStatus}>
      <Text>Status: {isConnected ? 'Online' : 'Offline'}</Text>
      <Text>Pending Sync: {queue.length}</Text>
    </View>
  );
};

const AppInner = () => {
  useNetworkSync();
  const [view, setView] = React.useState<'products' | 'orders' | 'pending'>('products');
  

  return (
    <SafeAreaView style={styles.container}>
      <SyncStatus />
      <View style={styles.nav}>
        <Button title="View Products" onPress={() => setView('products')} />
        <Button title="View Orders" onPress={() => setView('orders')} />
        <Button title="Pending" onPress={() => setView('pending')} />
          
      </View>
      {view === 'products' ? <ProductList /> : (view === 'orders') ? <OrdersScreen />: <PendingSyncList/> }
    </SafeAreaView>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <AppInner />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  syncStatus: { marginBottom: 10 },
  nav: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 },
});
