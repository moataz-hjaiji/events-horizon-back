import asyncHandler from '../../helpers/asyncHandler';
import { ProtectedRequest } from 'app-request';
import { BadRequestError } from '../../core/ApiError';
import { Types } from 'mongoose';
import _ from 'lodash';

import UserRepo from '../../database/repository/UserRepo';
import { SuccessResponse } from '../../core/ApiResponse';

export const getUser = asyncHandler(async (req: ProtectedRequest, res) => {
  const userId = new Types.ObjectId(req.params.id);
  const user = await UserRepo.findByObj({
    _id: userId,
    deletedAt: null,
  });
  if (!user) throw new BadRequestError('User not registered or deleted');
  return new SuccessResponse('success', user).send(res);
});
