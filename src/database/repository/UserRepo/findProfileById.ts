import User, { UserModel } from '../../model/User';
import { Types } from 'mongoose';

const findProfileById = (id: Types.ObjectId): Promise<User | null> => {
  return UserModel.findOne({ _id: id })
    .select('+name +lastname +roles +email')
    .populate({
      path: 'roles',
      select: { code: 1 },
    })
    .lean<User>()
    .exec();
};

export default findProfileById;
