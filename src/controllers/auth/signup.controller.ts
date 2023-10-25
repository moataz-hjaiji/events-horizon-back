import { RoleRequest } from 'app-request';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { SuccessResponse } from '../../core/ApiResponse';
import User from '../../database/model/User';
import { RoleCode } from '../../database/model/Role';
import UserRepo from '../../database/repository/UserRepo';
import { BadRequestError } from '../../core/ApiError';
import asyncHandler from '../../helpers/asyncHandler';
import { sendEmail } from '../../helpers/emails';

export const signup = asyncHandler(async (req: RoleRequest, res) => {
  const { name, email, password } = req.body;
  let profilePicUrl = (req.files as any)?.profilePicUrl
    ? (req.files as any)?.profilePicUrl[0].path
    : '';
  let brandPicUrl = (req.files as any)?.brandPicUrl ? (req.files as any).brandPicUrl[0].path : '';

  let user = await UserRepo.findByEmail(email);
  if (user) throw new BadRequestError('User already registered');

  const confirmationToken = uuidv4();
  const confirmationLink = `${process.env.CLIENT_BASE_URL}/email/confirm/${confirmationToken}`;
  const createdUser = await UserRepo.create(
    { name, email, password, profilePicUrl, brandPicUrl, token: confirmationToken } as User,
    RoleCode.USER,
  );

  sendEmail({
    email: createdUser.email,
    subject: 'confirme ton email',
    message: '',
    template: 'emailConfirmationLink',
    variables: {
      name: createdUser.name,
      confirmationLink,
    },
  });

  new SuccessResponse('La confirmation par e-mail a été envoyée', {
    user: _.pick(createdUser, [
      '_id',
      'name',
      'email',
      'roles',
      'profilePicUrl',
      'brandPicUrl',
      'verified',
    ]),
  }).send(res);
});
