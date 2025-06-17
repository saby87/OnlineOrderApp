import React from 'react';
import { View, Text, FlatList, StyleSheet, Button, ActivityIndicator } from 'react-native';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import { clearFailedQueue, updateOrder } from '../state/ordersSlice';

export const PendingSyncList = () => {
  const queue = useAppSelector(state => state.orders.queue);
  const failed = useAppSelector(state => state.orders.failedQueue);
  const dispatch = useAppDispatch();

  const retryFailed = async () => {
    for (const order of failed) {
      try {
        await new Promise((res) => setTimeout(res, 300));
        dispatch(updateOrder(order));
      } catch {
        // ignore
      }
    }
    dispatch(clearFailedQueue());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🟡 Pending Syncs: {queue.length}</Text>
      {queue.map((item) => (
        <View key={item.id} style={styles.item}>
          <Text>{item.id}</Text>
          <ActivityIndicator size="small" color="#007AFF" />
        </View>
      ))}

      {failed.length > 0 && (
        <>
          <Text style={styles.title}>🔴 Failed Syncs: {failed.length}</Text>
          {failed.map((item) => (
            <View key={item.id} style={styles.item}>
              <Text>{item.id}</Text>
              <Text style={{ color: 'red' }}>Sync failed</Text>
            </View>
          ))}
          <Button title="Retry Failed Syncs" onPress={retryFailed} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 10 },
  title: { fontWeight: 'bold', marginTop: 10 },
  item: { paddingVertical: 5, flexDirection: 'row', alignItems: 'center', gap: 10 },
});
