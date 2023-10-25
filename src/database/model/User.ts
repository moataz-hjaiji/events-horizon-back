import { model, Schema, Document } from 'mongoose';
import Role from './Role';
import { mongoosePagination, Pagination } from 'mongoose-paginate-ts';
import bcrypt from 'bcryptjs';

export const DOCUMENT_NAME = 'User';
export const COLLECTION_NAME = 'users';

export default interface User extends Document {
  name: string;
  lastname: string;
  email?: string;
  phoneNumber: string;
  password: string;
  profilePicUrl?: string;
  brandPicUrl?: string;
  roles: Role[];
  verified?: boolean;
  token: string | null;
  status?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const schema = new Schema(
  {
    name: {
      type: Schema.Types.String,
    },
    lastname: {
      type: Schema.Types.String,
      trim: true,
    },
    email: {
      type: Schema.Types.String,
      unique: true,
      trim: true,
    },
    phoneNumber: {
      type: Schema.Types.String,
      trim: true,
      nullable: true,
    },
    password: {
      type: Schema.Types.String,
      select: false,
    },
    profilePicUrl: {
      type: Schema.Types.String,
      trim: true,
    },
    brandPicUrl: {
      type: Schema.Types.String,
      trim: true,
    },
    roles: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Role',
        },
      ],
      select: false,
    },
    verified: {
      type: Schema.Types.Boolean,
      default: false,
    },
    status: {
      type: Schema.Types.Boolean,
      default: true,
    },
    token: {
      type: Schema.Types.String,
      nullable: true,
    },
    deletedAt: {
      type: Date,
      select: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

schema.plugin(mongoosePagination);
schema.pre('save', async function (this: User, next) {
  if (this.isModified('email')) this.email = this.email?.toLocaleLowerCase();

  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// on delete, remove it from config model
schema.pre('deleteOne', async function () {
  const user = this as User | any;
  const userId = user._conditions._id;
  await model('Video').updateMany({ user: userId }, { $unset: { user: 1 } });
  await model('Project').updateMany({ user: userId }, { $unset: { user: 1 } });
});

schema.methods.comparePassword = async function (password: string): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

export const UserModel = model<User, Pagination<User>>(DOCUMENT_NAME, schema, COLLECTION_NAME);
