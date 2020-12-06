import { CONNECTION_ACTIONS } from './../constants/actionTypes'
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import EventEmitter from 'eventemitter3'
import { apiCall } from '../api/axios'
import { AUTH_API, METHOD } from '../constants/api'
import { ACTION_ACCOUNT, ACTION_DONE, ACTION_FAILED } from '../constants/events'
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

export class Account extends EventEmitter {
  profile: IProfile;
  constructor(profile: IProfile) {
    super();
    console.log('> account constructor')
    this.on(ACTION_ACCOUNT, (actionType) => this.actionAccount(actionType))
    this.profile = profile
  }

  actionAccount(actionType) {
    const { RESSOURCE, REGISTER, LOGIN } = AUTH_API,
      { register, login } = CONNECTION_ACTIONS

    let path = `${RESSOURCE}`, data: FixLater

    switch (actionType) {
      case register:
        path += `/${REGISTER}`
        data = {
          account: this.profile          
        }        
        break
      case login:
        path += `/${LOGIN}`
        data = {
          login: {
            pseudo: this.profile.pseudo,
            password: this.profile.password
          }
        }        
        break
      default:
        throw new Error('Unknown action type')
    }
    
    apiCall(path, METHOD.POST, data)
      .then(res => {
        this.emit(ACTION_DONE, res)
      })
      .catch(err => this.emit(ACTION_FAILED, err))
  }
}