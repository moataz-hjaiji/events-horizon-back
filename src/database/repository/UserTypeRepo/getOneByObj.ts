import UserType, { UserTypeModel } from '../../model/UserType';

const findByObj = (obj: object): Promise<UserType> => {
  return UserTypeModel.findOne(obj).lean<UserType>().exec();
};

export default findByObj;
