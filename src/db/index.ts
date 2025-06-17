import Realm from 'realm';
import { OrderSchema } from './schemas/order';

export const getRealm = async () => {
  return await Realm.open({
    schema: [OrderSchema],
    schemaVersion: 1,
  });
};
