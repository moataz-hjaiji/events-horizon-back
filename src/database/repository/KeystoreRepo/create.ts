import Keystore, { KeystoreModel } from '../../model/Keystore';
import { Types } from 'mongoose';
import User from '../../model/User';

const create = async (
  client: User,
  primaryKey: string,
  secondaryKey: string,
): Promise<Keystore> => {
  const now = new Date();
  const keystore = await KeystoreModel.create({
    client: client,
    primaryKey: primaryKey,
    secondaryKey: secondaryKey,
    createdAt: now,
    updatedAt: now,
  } as Keystore);
  return keystore.toObject();
};

export default create;
