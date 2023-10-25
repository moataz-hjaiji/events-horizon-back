import User, { UserModel } from '../../model/User';

const updateInfo = (user: User): Promise<any> => {
  user.updatedAt = new Date();
  return UserModel.updateOne({ _id: user._id }, { $set: { ...user } })
    .lean()
    .exec();
};

export default updateInfo;
