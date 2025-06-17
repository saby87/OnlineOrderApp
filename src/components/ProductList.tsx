import React from 'react';
import { View, Text, Button, FlatList, StyleSheet, Image } from 'react-native';
import { useAppDispatch } from '../state/hooks';
import { addOrder } from '../state/ordersSlice';
import products from '../assets/products.json';

export const ProductList = () => {
  const dispatch = useAppDispatch();

  const handleAdd = (product: any) => {
    const newOrder = {
      id: Math.random().toString(),
      timestamp: Date.now(),
      lineItems: [{ productId: product.id, quantity: 1 }],
      updatedAt: Date.now(),
      status: 'pending'
    };
    dispatch(addOrder(newOrder));
  };

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Image source={{ uri: item.image }} style={styles.image} />
          <View style={styles.info}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>₹{item.price}</Text>
            <Button title="Add Order" onPress={() => handleAdd(item)} />
          </View>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
    alignItems: 'center'
  },
  image: {
    width: 70,
    height: 70,
    marginRight: 10,
    borderRadius: 8
  },
  info: {
    flex: 1
  },
  name: {
    fontSize: 16,
    fontWeight: '600'
  },
  price: {
    fontSize: 14,
    color: 'gray',
    marginVertical: 4
  }
});
