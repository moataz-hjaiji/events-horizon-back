import asyncHandler from '../../helpers/asyncHandler';
import { ProtectedRequest } from 'app-request';
import { BadRequestError } from '../../core/ApiError';
import _ from 'lodash';

import UserRepo from '../../database/repository/UserRepo';
import { SuccessResponse } from '../../core/ApiResponse';
import User from '../../database/model/User';

export const createUser = asyncHandler(async (req: ProtectedRequest, res) => {
  const { name, email, password, roles, verified, phoneNumber, lastname } = req.body;
  const profilePicUrl = (req.files as any)?.profilePicUrl
    ? (req.files as any).profilePicUrl[0].path
    : '';
  const brandPicUrl = (req.files as any)?.brandPicUrl ? (req.files as any).brandPicUrl[0].path : '';

  let user = await UserRepo.findByEmail(email);
  if (user) throw new BadRequestError('User already registered');

  const createdUser = await UserRepo.create(
    { name, email, password, profilePicUrl, brandPicUrl, phoneNumber, lastname } as User,
    roles,
    verified,
  );

  new SuccessResponse(
    'User has been created successfully!',
    _.pick(createdUser, ['_id', 'name', 'email', 'roles', 'profilePicUrl', 'verified', 'lastname']),
  ).send(res);
});
