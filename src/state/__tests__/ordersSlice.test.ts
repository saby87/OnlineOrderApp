import reducer, {
  addOrder,
  updateOrder,
  deleteOrderLocal,
  clearQueue,
  loadInitialOrders,
} from '../../state/ordersSlice'

const sampleOrder = {
  id: 'test1',
  timestamp: Date.now(),
  lineItems: [{ productId: '1', quantity: 2 }],
  updatedAt: Date.now(),
  status: 'pending',
};

test('should add an order and queue it', () => {
  const state = reducer(undefined, addOrder(sampleOrder));
  expect(state.orders.length).toBe(1);
  expect(state.queue.length).toBe(1);
});

test('should update an order and queue it', () => {
  let state = reducer(undefined, addOrder(sampleOrder));
  const updated = { ...sampleOrder, lineItems: [{ productId: '1', quantity: 5 }], updatedAt: Date.now() };
  state = reducer(state, updateOrder(updated));
  expect(state.orders[0].lineItems[0].quantity).toBe(5);
  expect(state.queue.length).toBe(2);
});

test('should load initial orders from Realm', () => {
  const orders = [sampleOrder];
  const state = reducer(undefined, loadInitialOrders(orders));
  expect(state.orders).toEqual(orders);
});

test('should clear the sync queue', () => {
  let state = reducer(undefined, addOrder(sampleOrder));
  state = reducer(state, clearQueue());
  expect(state.queue.length).toBe(0);
});
