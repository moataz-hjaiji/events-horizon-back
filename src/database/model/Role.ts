import { Schema, model, Document } from 'mongoose';

export const DOCUMENT_NAME = 'Role';
export const COLLECTION_NAME = 'roles';

export const enum RoleCode {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export default interface IRole extends Document {
  code: string;
}

const schema = new Schema<IRole>(
  {
    code: {
      type: Schema.Types.String,
      required: true,
      enum: [RoleCode.ADMIN, RoleCode.USER, RoleCode.SUPER_ADMIN],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const RoleModel = model<IRole>(DOCUMENT_NAME, schema, COLLECTION_NAME);
