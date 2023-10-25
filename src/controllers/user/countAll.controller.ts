import asyncHandler from '../../helpers/asyncHandler';
import { DataRequest } from 'app-request';

import { SuccessResponse } from '../../core/ApiResponse';
import UserRepo from '../../database/repository/UserRepo';

const countAllUsers = asyncHandler(async (req: DataRequest, res) => {
  const count = await UserRepo.countAll();
  return new SuccessResponse('success', {
    users: count,
  }).send(res);
});

export default countAllUsers;
