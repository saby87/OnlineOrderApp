import React from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import { updateOrder } from '../state/ordersSlice';

export const OrdersScreen = () => {
  const orders = useAppSelector(state => state.orders.orders);
  const dispatch = useAppDispatch();

  const handleIncrement = (order) => {
    const newOrder = {
      ...order,
      lineItems: order.lineItems.map(item => ({
        ...item,
        quantity: item.quantity + 1
      })),
      updatedAt: Date.now(),
      status: 'pending'
    };
    dispatch(updateOrder(newOrder));
  };

  const handleDelete = (id) => {
    const newOrder = {
      id,
      timestamp: Date.now(),
      lineItems: [],
      updatedAt: Date.now(),
      status: 'pending'
    };
    dispatch(updateOrder(newOrder)); // empty lineItems treated as delete
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Orders</Text>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.orderItem}>
            <Text>ID: {item.id}</Text>
            <Text>Items: {JSON.stringify(item.lineItems)}</Text>
            <Button title="+" onPress={() => handleIncrement(item)} />
            <Button title="Delete" onPress={() => handleDelete(item.id)} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  orderItem: { marginBottom: 10, padding: 10, backgroundColor: '#ddd' }
});
