import User, { UserModel } from '../../model/User';

const findByObj = (obj: object): Promise<User | null> => {
  return UserModel.findOne(obj)
    .select('+roles +email')
    .populate({
      path: 'roles',
      select: { code: 1 },
    })
    .lean<User>()
    .exec();
};

export default findByObj;
