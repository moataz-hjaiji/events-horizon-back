import asyncHandler from '../../helpers/asyncHandler';
import { ProtectedRequest } from 'app-request';
import { BadRequestError } from '../../core/ApiError';
import _ from 'lodash';

import UserRepo from '../../database/repository/UserRepo';
import { SuccessResponse } from '../../core/ApiResponse';
import IUser from '../../database/model/User';

export const createUser = asyncHandler(async (req: ProtectedRequest, res) => {
  const { firstName, email, password, role, verified, phoneNumber, lastName } =
    req.body;
  let user = await UserRepo.findByEmail(email);
  if (user) throw new BadRequestError('User already registered');

  const createdUser = await UserRepo.create(
    {
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
      verified: false,
    } as IUser,
    role,
    verified
  );

  new SuccessResponse(
    'User has been created successfully!',
    _.pick(createdUser, [
      '_id',
      'name',
      'email',
      'role',
      'profilePicUrl',
      'verified',
      'lastname',
    ])
  ).send(res);
});
