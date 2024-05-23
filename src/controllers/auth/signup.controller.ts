import { RoleRequest } from 'app-request';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { SuccessResponse } from '../../core/ApiResponse';
import IUser from '../../database/model/User';
import { RoleCode } from '../../database/model/Role';
import UserRepo from '../../database/repository/UserRepo';
import { BadRequestError } from '../../core/ApiError';
import asyncHandler from '../../helpers/asyncHandler';
import { sendEmail } from '../../helpers/emails';

export const signup = asyncHandler(async (req: RoleRequest, res) => {
  const { firstName, lastName, phoneNumber, email, password } = req.body;
  let user = await UserRepo.findByEmail(email);
  if (user) throw new BadRequestError('User already registered');

  const confirmationToken = uuidv4();
  const confirmationLink = `${process.env.CLIENT_BASE_URL}/email/confirm/${confirmationToken}`;
  const createdUser = await UserRepo.create(
    {
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
      token: confirmationToken,
      verified: false,
    } as IUser,
    RoleCode.USER
  );

  sendEmail({
    email: createdUser.email,
    subject: 'confirme ton email',
    message: '',
    template: 'emailConfirmationLink',
    variables: {
      name: createdUser.firstName,
      confirmationLink,
    },
  });

  new SuccessResponse('La confirmation par e-mail a été envoyée', {
    user: _.pick(createdUser, [
      '_id',
      'name',
      'email',
      'role',
      'profilePicUrl',
      'brandPicUrl',
      'verified',
    ]),
  }).send(res);
});
