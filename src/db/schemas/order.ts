export const OrderSchema = {
  name: 'Order',
  primaryKey: 'id',
  properties: {
    id: 'string',
    timestamp: 'int',
    lineItems: 'string', // JSON stringified
    updatedAt: 'int',
    status: 'string', // 'pending' | 'synced'
  },
};
