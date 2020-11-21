/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import EventEmitter from 'eventemitter3'
import { apiCall } from '../api/axios';
import { CONNECTION } from '../constants/api';
import { ADD_ACCOUNT, ACTION_DONE, ACTION_FAILED } from '../constants/events';

export interface IPhoto {
  name: string;
  contentType: string;
  content: any;
}

export interface IProfile {
  pseudo: string;
  password?: string;
  isAdmin?: boolean;
  email: string;
  presentation?: string;
  photo?: string | IPhoto;
  creationDate?: Date;
}

export class Account extends EventEmitter {
  profile: IProfile;
  constructor(profile: IProfile) {
    super();
    console.log('> account constructor')
    this.on(ADD_ACCOUNT, () => this.addAccount())
    this.profile = profile
  }

  addAccount() {
    console.log('>addAccount')
    const { SERVICE, REGISTER } = CONNECTION
    const path = `${SERVICE}/${REGISTER}`
    const data = {
      account: this.profile
    }
    this.callApiAccounts(path, 'post', data)
      .then(() => this.emit(ACTION_DONE))
      .catch(() => this.emit(ACTION_FAILED))
  }

  async callApiAccounts(path: string, method: string, data: any) {
    console.log('>callApiAccounts with', path, data)
    try {
      await apiCall(path, method, data)
    } catch (error) {
      console.log('oups!', error)
      throw error;
    }
  }
}