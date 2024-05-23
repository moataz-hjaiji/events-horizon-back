import { ProtectedRequest } from 'app-request';
import { Types } from 'mongoose';
import { NotFoundError } from '../../core/ApiError';
import { SuccessResponse } from '../../core/ApiResponse';
import PostRepo from '../../database/repository/PostRepo';
import asyncHandler from '../../helpers/asyncHandler';

export const UpdatePost = asyncHandler(async (req: ProtectedRequest, res) => {
  const postId = new Types.ObjectId(req.params.postId);
  const post = await PostRepo.findOne({ _id: postId });
  if (!post) new NotFoundError('Post not found ');
  const report = await PostRepo.updateOne(
    {
      _id: postId,
    },
    req.body
  );

  new SuccessResponse('Post updated successfully', report).send(res);
});
