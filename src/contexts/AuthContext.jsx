import React, { createContext, useCallback, useState } from 'react'
import { useHistory } from 'react-router'

import api from '../services/api'

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const history =useHistory()

  const [auth, setAuth] = useState(()=>{
    const authLocalStorage = localStorage.getItem('@pw2:auth')
    if(authLocalStorage){
      const userData = JSON.parse(authLocalStorage)
      api.defaults.headers.authorization = `Bearer ${userData.token}`
      return userData
    }
    return {}
  })

  const login = useCallback( async ({email,password})=>{
    try{
      const resp = await api.post('/login', {
        email,password
      })
      console.log("resp: ");
      console.log(resp);
      const {data: {token}} =resp
      if(token){
        api.defaults.headers.authorization = `Bearer ${token}`
        const userData = {
          email,password, token
        }
        localStorage.setItem('@pw2:auth', JSON.stringify(userData))
        setAuth(userData)
        return userData
      }
    } catch(error){
      return error.response.data
    }
  },[auth])
  
  const isAuth = !!Object.keys(auth).length

  const logout = useCallback(async ()=>{
    try{
      localStorage.removeItem('@pw2:auth')
      history.replace('/')
      setAuth({})
    }catch(error){
      console.error(error);
    }
  },[setAuth,history])


  return (
    <AuthContext.Provider value={{
      auth, login, logout,isAuth
    }}>
      {children}
    </AuthContext.Provider>
  )
}


export default AuthContext