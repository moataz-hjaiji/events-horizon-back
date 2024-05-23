import express from 'express';
import authentication from '../../../auth/authentication';
import authorization from '../../../auth/authorization';
import { RoleCode } from '../../../database/model/Role';
import validator from '../../../helpers/validator';
import { ValidationSource } from '../../../helpers/validator';
import schema from './schema';
import post from '../../../controllers/post';
const router = express.Router({
  mergeParams: true,
});

router.use('/', authentication, authorization([RoleCode.ADMIN, RoleCode.USER]));

router.post(
  '/',
  validator(schema.postId, ValidationSource.PARAM),
  validator(schema.create, ValidationSource.BODY),
  post.createPost
);

router.get('/', post.getAll);

router.get(
  '/:postId',
  validator(schema.postId, ValidationSource.PARAM),
  post.getPost
);

router.patch(
  '/:postId',
  validator(schema.postId, ValidationSource.PARAM),
  validator(schema.update, ValidationSource.BODY),
  post.UpdatePost
);

router.delete(
  '/:postId',
  validator(schema.postId, ValidationSource.PARAM),
  post.deletePost
);

export default router;
