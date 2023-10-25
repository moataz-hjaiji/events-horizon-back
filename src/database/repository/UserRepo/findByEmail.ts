import User, { UserModel } from '../../model/User';

const findByEmail = (email: string): Promise<User | null> => {
  return UserModel.findOne({ email: email })
    .select('+email +password +roles +verified -status')
    .populate({
      path: 'roles',
      select: { code: 1 },
    })
    .lean<User>()
    .exec();
};

export default findByEmail;
