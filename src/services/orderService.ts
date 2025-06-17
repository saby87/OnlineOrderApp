import Realm from 'realm';
import { getRealm } from '../db';
import { Order } from '../types';
Realm.flags.THROW_ON_GLOBAL_REALM = true;


export const saveOrder = async (order: any) => {
  const realm = await getRealm();
  realm.write(() => {
    realm.create(
      'Order',
      {
        ...order,
        lineItems: JSON.stringify(order.lineItems), // ✅ FIX
      },
      Realm.UpdateMode.Modified
    );
  });
};

export const deleteOrder = async (id: string) => {
  const realm = await getRealm();
  realm.write(() => {
    const order = realm.objectForPrimaryKey('Order', id);
    if (order) realm.delete(order);
  });
};

export const getAllOrders = async (): Promise<Order[]> => {
  const realm = await getRealm();
  const results = realm.objects('Order');
  return results.map((order: any) => ({
    id: order.id,
    timestamp: order.timestamp,
    lineItems: JSON.parse(order.lineItems),
    updatedAt: order.updatedAt,
    status: order.status,
  }));
};
