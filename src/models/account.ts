import { FixLater } from '../models/types'

export interface IPhoto {
  name: string;
  contentType: string;
  content: FixLater;
}

export interface IProfile {
  pseudo: string;
  password?: string;
  isAdmin?: boolean;
  email?: string;
  presentation?: string;
  photo?: string | IPhoto;
  creationDate?: Date;
  modificationDate?: Date;
}

export class Account {
  profile: IProfile;
  constructor(profile: IProfile) {
    this.profile = profile
  }
}