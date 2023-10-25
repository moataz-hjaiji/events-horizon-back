import UserType, { UserTypeModel } from '../../model/UserType';

const remove = async (id: string): Promise<UserType | null> => {
  return UserTypeModel.findByIdAndRemove(id).lean<UserType>().exec();
};

export default remove;
