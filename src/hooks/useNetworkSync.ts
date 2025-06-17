import { useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import {
  updateOrder,
  clearQueue,
  addToFailedQueue,
} from '../state/ordersSlice';

export const useNetworkSync = () => {
  const { orders, queue } = useAppSelector(state => state.orders);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(async state => {
      if (state.isConnected) {
        for (const order of queue) {
          try {
            // simulate sync
            await new Promise((res, rej) =>
              Math.random() > 0.3 ? res(true) : rej('sync error')
            );

            const existing = orders.find(o => o.id === order.id);
            if (!existing || order.updatedAt > existing.updatedAt) {
              dispatch(updateOrder(order));
            }
          } catch (error) {
            console.log('❌ Sync failed for order:', order.id);
            dispatch(addToFailedQueue(order));
          }
        }

        dispatch(clearQueue());
      }
    });

    return () => unsubscribe();
  }, [queue.length]);
};
