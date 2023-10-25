import IUser, { UserModel } from '../../model/User';
import Role, { RoleModel } from '../../model/Role';
import { InternalError } from '../../../core/ApiError';

const create = async (
  user: IUser,
  roleCode: string,
  verified?: boolean
): Promise<IUser> => {
  const now = new Date();
  const role = await RoleModel.findOne({ code: roleCode }).lean<Role>().exec();
  if (!role) throw new InternalError('Role must be defined');
  user.roles = [role._id];
  user.verified = verified ? true : false;
  const createdUser = (await UserModel.create(user)).populate({
    path: 'roles',
    select: { code: 1 },
  });
  return createdUser;
};

export default create;
