import User, { UserModel } from '../../model/User';

const updateSimple = async (
  id: string,
  obj: Partial<User>
): Promise<User | null> => {
  return await UserModel.findByIdAndUpdate(
    id,
    { $set: { ...obj } },
    { new: true }
  )
    .lean<User>()
    .exec();
};

export default updateSimple;
