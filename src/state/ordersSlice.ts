import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { saveOrder, deleteOrder } from '../services/orderService';

const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: [],
    queue: [],
    failedQueue: [],
  },
  reducers: {
    addOrder: (state, action: PayloadAction<any>) => {
      state.orders.push(action.payload);
      state.queue.push(action.payload);
      saveOrder(action.payload);
    },
    updateOrder: (state, action: PayloadAction<any>) => {
      const index = state.orders.findIndex(o => o.id === action.payload.id);
      if (index !== -1) {
        state.orders[index] = action.payload;
      } else {
        state.orders.push(action.payload);
      }
      state.queue.push(action.payload);
      saveOrder(action.payload);
    },
    deleteOrderLocal: (state, action: PayloadAction<string>) => {
      state.orders = state.orders.filter(o => o.id !== action.payload);
      deleteOrder(action.payload);
    },
    clearQueue: (state) => {
      state.queue = [];
    },
    loadInitialOrders: (state, action: PayloadAction<Order[]>) => {
      state.orders = action.payload;
    },
    addToFailedQueue: (state, action: PayloadAction<Order>) => {
      state.failedQueue.push(action.payload);
    },
    clearFailedQueue: (state) => {
      state.failedQueue = [];
    },

  },
});

export const { addOrder, updateOrder, deleteOrderLocal, clearQueue,loadInitialOrders,addToFailedQueue,
  clearFailedQueue, } = ordersSlice.actions;
export default ordersSlice.reducer;
