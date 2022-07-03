import axios from "axios";
import React, { createContext, useState } from "react";
import { useSessionstorageState } from "rooks";
import { useLocalStorage } from "../../hooks/useLocalStorage";


interface AuthContextType {
  user: any;
  authorize: () => void
  getUserInfo: (token: string) => Promise<any>
  getToken: (code: string) => Promise<any>
  logout: () => void
  refreshToken: (refreshToken: string) => Promise<any>
}

export const AuthContext = createContext<AuthContextType>(null!)

export function AuthProvider({ children }: { children: React.ReactNode}){
  const clientSecret = 'e1653759-e260-45ce-bfbe-72f0b164ed1e'

  const [user, setUser] = useSessionstorageState<any>("user", null)
  const [code, setCode] = useSessionstorageState<any>("code", null)
  const [accessToken, setAccessToken] = useSessionstorageState<any>("access_token", null)
  
  const authorize = () => {
    const authorizeUrl = "http://localhost:8180/auth/realms/inventory_manager/protocol/openid-connect/auth"
    const keycloakLoginUrl = new URL(authorizeUrl)
    keycloakLoginUrl.searchParams.append("response_type", 'code')
    keycloakLoginUrl.searchParams.append("client_id", 'inventory-manager')
    keycloakLoginUrl.searchParams.append("redirect_uri", 'http://localhost:3000/callback')

    window.location.replace(keycloakLoginUrl.href)
  }

  const getToken = async (code: string) => {
    const tokenUrl = 'http://localhost:8180/auth/realms/inventory_manager/protocol/openid-connect/token'
    const params = new URLSearchParams()
    params.append('grant_type', 'authorization_code')
    params.append('client_id', 'inventory-manager')
    params.append('client_secret', clientSecret)
    params.append('code', code)
    params.append('redirect_uri', 'http://localhost:3000/callback')

    const response = await axios.post(tokenUrl, params)
    return response.data
  }

  const getUserInfo = async (token: string) => {
    const userInfoUrl = 'http://localhost:8180/auth/realms/inventory_manager/protocol/openid-connect/userinfo'

    const headers = {
      Authorization: `Bearer ${token}`
    }

    const response = await axios.get(userInfoUrl, {headers: headers})
    return response.data
  }

  const logout = async () => {
    const tokenUrl = 'http://localhost:8180/auth/realms/inventory_manager/protocol/openid-connect/logout'
    const params = new URLSearchParams()
    params.append('client_id', 'inventory-manager')
    params.append('client_secret', clientSecret)
    params.append('refresh_token', accessToken.refresh_token)

    await axios.post(tokenUrl, params)
    setAccessToken(null)
    setCode(null)
    setUser(null)
    window.location.reload();
  }

  const refreshToken = async (refreshToken: string) => {
    const tokenUrl = 'http://localhost:8180/auth/realms/inventory_manager/protocol/openid-connect/token'
    const params = new URLSearchParams()
    params.append('grant_type', 'refresh_token')
    params.append('client_id', 'inventory-manager')
    params.append('client_secret', clientSecret)
    params.append('refresh_token', refreshToken)
    params.append('redirect_uri', 'http://localhost:3000/callback')

    const response = await axios.post(tokenUrl, params)
    return response.data
  }

  let value = {user, authorize, getToken, getUserInfo, logout, refreshToken}

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
