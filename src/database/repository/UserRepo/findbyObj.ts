import User, { UserModel } from '../../model/User';

const findByObj = async (obj: object): Promise<User | null> => {
  return await UserModel.findOne(obj)
    .select('+roles +email')
    .populate({
      path: 'roles',
      select: { code: 1 },
    })
    .exec();
};

export default findByObj;
