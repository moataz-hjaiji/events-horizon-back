import Joi from "@hapi/joi";
import { JoiObjectId } from "../../../helpers/validator";
import { PostType } from "../../../database/model/Post";

export default {
  postId: Joi.object().keys({
    postId: JoiObjectId().required(),
  }),
  create: Joi.object().keys({
    title: Joi.string().min(1).max(100).required(),
    content: Joi.string().min(1).max(300).required(),
    postType: Joi.string()
      .valid(...Object.values(PostType))
      .required(),
  }),
  update: Joi.object().keys({
    title: Joi.string().min(1).max(100).optional(),
    content: Joi.string().min(1).max(300).optional(),
  }),
};
