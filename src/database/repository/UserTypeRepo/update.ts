import UserType, { UserTypeModel } from '../../model/UserType';

const update = async (
  id: string,
  obj: Partial<UserType>
): Promise<UserType> => {
  return await UserTypeModel.findByIdAndUpdate(
    id,
    { $set: { ...obj } },
    { new: true }
  )
    .lean<UserType>()
    .exec();
};

export default update;
