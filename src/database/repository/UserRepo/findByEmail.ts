import User, { UserModel } from '../../model/User';

const findByEmail = (email: string): Promise<User | null> => {
  return UserModel.findOne({ email: email, status: true })
    .select('+email +password +roles +verified -status')
    .populate({
      path: 'roles',
      match: { status: true },
      select: { code: 1 },
    })
    .lean<User>()
    .exec();
};

export default findByEmail;
