import React, { createContext, useState, useEffect } from 'react'
import { IAuth } from '../models/auth'
import { FixLater } from '../models/types'

export const AuthContext = createContext({})

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const AuthProvider = ({ children }:{ children: FixLater }) => {
  const initAuth: IAuth = { loading: true, data: null }
  const [auth, setAuth] = useState(initAuth)

  const setAuthData = (data: FixLater) => {
    const authUpdate: IAuth = {
      loading: auth.loading,
      data: data,
    }
    setAuth(authUpdate)
    console.log('setAuthData auth=', auth)
  }

  useEffect(() => {
    const storedData: string | null = localStorage.getItem('authData')    
    const authUpdate: IAuth = {
      loading: false,
      data: null
    };

    if (storedData && storedData.length > 0) {
      authUpdate.data = JSON.parse(storedData)
    }

    setAuth(authUpdate);
  }, [])

  useEffect(() => {
    localStorage.setItem('authData', JSON.stringify(auth.data));
  }, [auth.data])

  return (
    <AuthContext.Provider value={{ auth, setAuthData }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider