import { IProfile } from "./account";

export interface IUser {
  account: IProfile;
  accessToken: string,
  expiresIn: number
}
