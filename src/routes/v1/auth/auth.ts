import express from 'express';
import validator, { ValidationSource } from '../../../helpers/validator';
import schema from './schema';
import authentication from '../../../auth/authentication';
import auth from '../../../controllers/auth';
import FileUploadHandler from '../../../helpers/fileUpload';
import { tokenSchema } from '../global.routes.schema';
import uploadMediaFilesToThisFolder from '../../../helpers/fileUpload/uploadDestiny';

const router = express.Router();
const fileUploadHandler = new FileUploadHandler();

router.post('/login', validator(schema.userLogin), auth.login);
router.post(
  '/signup',
  uploadMediaFilesToThisFolder('users'),
  fileUploadHandler.handleMultipleFileUpload(['brandPicUrl', 'profilePicUrl']),
  validator(schema.signup),
  auth.signup,
);
router.get('/confirm/:token', validator(tokenSchema, ValidationSource.PARAM), auth.confirmEmail);

router.use('/', authentication);

router.post(
  '/refresh',
  validator(schema.auth, ValidationSource.HEADER),
  validator(schema.refreshToken),
  auth.refreshToken,
);

router.delete('/logout', auth.logout);

export default router;
