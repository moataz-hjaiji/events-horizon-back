import { Request } from 'express';
import { Document } from 'mongoose';

import User from '../database/model/User';
import Keystore from '../database/model/Keystore';
import Config from '../database/model/Config';
import Info from '../database/model/Info';
import Video from '../database/model/Video';
import Song from '../database/model/Song';
import Scene from '../database/model/Scene';
import Project from '../database/model/Project';
import Filigrame from '../database/model/Filigrame';
import Layer from '../database/model/Layer';

declare interface PublicRequest extends Request {
  apiKey: string;
}

declare interface RoleRequest extends PublicRequest {
  currentRoleCode: string;
}

declare interface ProtectedRequest extends RoleRequest {
  user: User;
  accessToken: string;
  keystore: Keystore;
}

declare interface DataRequest extends ProtectedRequest {
  data: Config | null | Info | Video | Song | Scene | Project | Filigrame | Layer;
}

declare interface Tokens {
  accessToken: string;
  refreshToken: string;
}
declare interface ApiOptions {
  deleted?: boolean;
  isPaging?: boolean;
}

declare interface CommonModel extends Document {
  deletedAt?: Date | string;
  updatedAt?: Date | string;
  createdAt?: Date | string;
}
