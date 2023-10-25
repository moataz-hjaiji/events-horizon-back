import express from 'express';
import authentication from '../../../auth/authentication';
import userTypeController from '../../../controllers/userType';
import validator, { ValidationSource } from '../../../helpers/validator';
import schema from './schema';

const router = express.Router();

router.use(
  '/',
  authentication
  // , authorization([RoleCode.ADMIN])
);

router
  .route('/')
  .post(validator(schema.create), userTypeController.createUserType)
  .get(userTypeController.getAllUserTypes);

router
  .route('/:id')
  .get(
    validator(schema.param, ValidationSource.PARAM),
    userTypeController.getUserType
  )
  .put(
    validator(schema.param, ValidationSource.PARAM),
    validator(schema.update),
    userTypeController.updateUserType
  )
  .delete(
    validator(schema.param, ValidationSource.PARAM),
    userTypeController.removeUserType
  );

// router.get('/all', userController.getAllUsers);
// router.get('/all/non-admins', userController.getAllNonAdmins);
// router.get('/all/count', userController.countAllUsers);
// router.get(
//   '/:id',
//   validator(schema.userId, ValidationSource.PARAM),
//   userController.getUser
// );
// router.put(
//   '/:id',
//   uploadMediaFilesToThisFolder('users'),
//   fileUploadHandler.handleMultipleFileUpload(['profilePicUrl', 'brandPicUrl']),
//   validator(mediaFodlerNameSchemaAndObjectId, ValidationSource.PARAM),
//   validator(schema.update),
//   userController.updateUser
// );
// router.post(
//   '/create',
//   uploadMediaFilesToThisFolder('users'),
//   fileUploadHandler.handleMultipleFileUpload(['profilePicUrl', 'brandPicUrl']),
//   validator(schema.create),
//   userController.createUser
// );

// router.delete(
//   '/:id',
//   validator(schema.userId, ValidationSource.PARAM),
//   userController.deleteUser
// );
export default router;
