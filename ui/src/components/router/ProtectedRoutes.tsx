import axios from "axios";
import jwtDecode from "jwt-decode";
import { useContext, useEffect } from "react";
import { useSessionstorageState } from "rooks";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { AuthContext } from "./AuthProvider";

export default function ProtectedRoutes({ children }: { children: JSX.Element }) {
  let auth = useContext(AuthContext)
  const [code, setCode] = useSessionstorageState<any>("code", null)
  const [accessToken, setAccessToken] = useSessionstorageState<any>("access_token", null)

  if (!code) {
    auth.authorize()
  }


  axios.interceptors.response.use(
    response => response,
    async (error) => {
      if (error.response?.status == 401) {
        //TODO: if refresh token expired then logout, clean Session storage and refresh
        if (hasTokenExpired(accessToken.refresh_token)) {
          await auth.logout()
        }

        //TODO: If access token expired then refresh token, update Session storage and retry request
        if (hasTokenExpired(accessToken.access_token)) {
          // if refresh token fails then logout
          const token = await auth.refreshToken(accessToken.refresh_token)
          setAccessToken(token)
          const requestConfig = { ...error.config }
          requestConfig.headers.Authorization = `Bearer ${token.access_token}`
          return axios.request(error.config)
        }
        
      }

      return Promise.reject(error)
    }
  )

  function hasTokenExpired(access_token: string) {
    const jwt_token: any = jwtDecode(access_token)
    const expiredAt = jwt_token.exp
    return expiredAt < Date.now()
  }

  return children
}