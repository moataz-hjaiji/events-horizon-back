import express from 'express';
import validator, { ValidationSource } from '../../../helpers/validator';
import schema from './schema';
import authentication from '../../../auth/authentication';
import auth from '../../../controllers/auth';
import { tokenSchema } from '../global.routes.schema';

const router = express.Router();

router.post('/signup', validator(schema.signup), auth.signup);
router.post('/login', validator(schema.userLogin), auth.login);
router.get(
  '/confirm/:token',
  validator(tokenSchema, ValidationSource.PARAM),
  auth.confirmEmail
);
router.post(
  '/forget-password',
  validator(schema.forgetPassword),
  auth.forgetPassword
);

router.use('/', authentication);

router.post(
  '/refresh',
  validator(schema.auth, ValidationSource.HEADER),
  validator(schema.refreshToken),
  auth.refreshToken
);

router.delete('/logout', auth.logout);

export default router;
