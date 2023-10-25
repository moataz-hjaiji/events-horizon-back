import UserType, { UserTypeModel } from '../../model/UserType';

const findByObj = (obj: object): Promise<UserType | null> => {
  return UserTypeModel.findOne(obj).lean<UserType>().exec();
};

export default findByObj;
