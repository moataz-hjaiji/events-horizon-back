import Keystore, { KeystoreModel } from '../../model/Keystore';
import { Types } from 'mongoose';

const remove = async (id: Types.ObjectId): Promise<Keystore | null> => {
  return KeystoreModel.findByIdAndRemove(id).lean<Keystore>().exec();
};

export default remove;
