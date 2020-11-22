import { CONNECTION_ACTIONS } from './../constants/actionTypes';
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import EventEmitter from 'eventemitter3'
import { apiCall } from '../api/axios';
import { CONNECTION_API, METHOD } from '../constants/api';
import { ACTION_ACCOUNT, ACTION_DONE, ACTION_FAILED } from '../constants/events';


export interface IPhoto {
  name: string;
  contentType: string;
  content: any;
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

export class Account extends EventEmitter {
  profile: IProfile;
  constructor(profile: IProfile) {
    super();
    console.log('> account constructor')
    this.on(ACTION_ACCOUNT, (actionType) => this.actionAccount(actionType))
    this.profile = profile
  }

  actionAccount(actionType) {
    const { SERVICE, REGISTER, LOGIN } = CONNECTION_API,
      { register, login } = CONNECTION_ACTIONS

    let path = `${SERVICE}`, data: any

    switch (actionType) {
      case register:
        path += `/${REGISTER}`
        data = {
          account: this.profile
        }
        break;
      case login:
        path += `/${LOGIN}`
        data = {
          login: {
            pseudo: this.profile.pseudo,
            password: this.profile.password
          }
        }
        break;
      default:
        throw new Error('Unknown action type')
    }

    this.callApiAccounts(path, METHOD.POST, data)
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