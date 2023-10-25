import Role, { RoleModel } from '../../model/Role';

const findByCode = (code: string): Promise<Role | null> => {
  return RoleModel.findOne({ code: code }).lean<Role>().exec();
};

export default findByCode;
