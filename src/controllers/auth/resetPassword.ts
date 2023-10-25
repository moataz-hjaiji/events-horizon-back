import { ProtectedRequest } from 'app-request';
import crypto from 'crypto';
import { SuccessMsgResponse } from '../../core/ApiResponse';
import UserRepo from '../../database/repository/UserRepo';
import { BadRequestError } from '../../core/ApiError';
import asyncHandler from '../../helpers/asyncHandler';
import { sendEmail } from '../../helpers/emails';

export const resetPassword = asyncHandler(
  async (req: ProtectedRequest, res) => {
    const { resetCode } = req.body;

    // let user = await UserRepo.findByObj({ resetCode });
    // if (!user) throw new BadRequestError('Invalid code');

    // await UserRepo.updateSimple(user._id, { resetCode });

    // sendEmail({
    //   email: user.email,
    //   subject: 'forget Password',
    //   message: '',
    //   template: 'emailConfirmationCode',
    //   variables: {
    //     code: resetCode,
    //   },
    // });

    // return new SuccessMsgResponse('an email have been sent').send(res);
  }
);
