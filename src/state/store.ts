import { configureStore } from '@reduxjs/toolkit';
import ordersReducer from './ordersSlice';

export const store = configureStore({
  reducer: {
    orders: ordersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
