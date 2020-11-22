/* eslint-disable @typescript-eslint/no-explicit-any */
import { IAuth } from './auth'

export type FixLater = any

export type AuthContextType = {
    setAuthData: FixLater;
    auth: IAuth
  }