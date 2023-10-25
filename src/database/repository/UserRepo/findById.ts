import User, { UserModel } from '../../model/User';
import { Types } from 'mongoose';

const findById = (id: Types.ObjectId): Promise<User | null> => {
  return UserModel.findOne({ _id: id })
    .select('+email +password +roles +_id')
    .populate({
      path: 'roles',
    })
    .lean<User>()
    .exec();
};

export default findById;
